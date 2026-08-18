const GITHUB_USERNAME = "elcascavel";
const COMMIT_REPOS = [
	"elcascavel/holt",
	"elcascavel/Achievements.SA",
	"elcascavel/Snake",
];

const REVALIDATE_SECONDS = 600;

export interface GithubStats {
	totalStars: number;
	totalForks: number;
	publicRepos: number;
}

export interface WakatimeStats {
	totalTime: string;
	mainLanguage: {
		name: string;
		percent: string;
	};
}

export interface LatestCommit {
	sha: string;
	href: string;
	repo: string;
	message: string;
	date: string;
}

function githubHeaders(): HeadersInit {
	const token = process.env.GITHUB_TOKEN;
	return {
		Accept: "application/vnd.github+json",
		...(token ? { Authorization: `Bearer ${token}` } : {}),
	};
}

export async function getGithubStats(): Promise<GithubStats | null> {
	try {
		const headers = githubHeaders();
		const options = { headers, next: { revalidate: REVALIDATE_SECONDS } };

		const [userResponse, reposResponse] = await Promise.all([
			fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, options),
			fetch(
				`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`,
				options,
			),
		]);

		if (!userResponse.ok || !reposResponse.ok) {
			throw new Error("Failed to fetch GitHub data");
		}

		const userData = await userResponse.json();
		const reposData: Array<{ stargazers_count: number; forks_count: number }> =
			await reposResponse.json();

		return {
			totalStars: reposData.reduce(
				(sum, repo) => sum + repo.stargazers_count,
				0,
			),
			totalForks: reposData.reduce((sum, repo) => sum + repo.forks_count, 0),
			publicRepos: userData.public_repos,
		};
	} catch (error) {
		console.error("Error fetching GitHub stats:", error);
		return null;
	}
}

export async function getWakatimeStats(): Promise<WakatimeStats | null> {
	try {
		const apiKey = process.env.WAKATIME_API_KEY;
		if (!apiKey) {
			throw new Error("Missing WAKATIME_API_KEY");
		}

		const response = await fetch(
			`https://wakatime.com/api/v1/users/${GITHUB_USERNAME}/stats`,
			{
				headers: {
					Authorization: `Basic ${Buffer.from(`${apiKey}:`).toString(
						"base64",
					)}`,
				},
				next: { revalidate: REVALIDATE_SECONDS },
			},
		);

		if (!response.ok) {
			throw new Error(`WakaTime responded with ${response.status}`);
		}

		const { data } = await response.json();

		return {
			totalTime: data.human_readable_total,
			mainLanguage: data.languages?.[0] ?? { name: "N/A", percent: "0" },
		};
	} catch (error) {
		console.error("Error fetching WakaTime stats:", error);
		return null;
	}
}

export async function getLatestCommits(): Promise<LatestCommit[]> {
	try {
		const headers = githubHeaders();

		const commits = await Promise.all(
			COMMIT_REPOS.map(async (repo): Promise<LatestCommit | null> => {
				const response = await fetch(
					`https://api.github.com/repos/${repo}/commits?per_page=1`,
					{ headers, next: { revalidate: REVALIDATE_SECONDS } },
				);

				if (!response.ok) {
					console.error(`Failed to fetch commits for ${repo}`);
					return null;
				}

				const [commit] = await response.json();
				if (!commit) return null;

				return {
					sha: commit.sha,
					href: commit.html_url,
					repo,
					message: commit.commit.message,
					date: commit.commit.author?.date ?? "",
				};
			}),
		);

		return commits
			.filter((commit): commit is LatestCommit => commit !== null)
			.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
	} catch (error) {
		console.error("Error fetching GitHub commits:", error);
		return [];
	}
}
