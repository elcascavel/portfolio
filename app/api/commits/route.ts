import { NextResponse } from "next/server";

const REPOS = ["elcascavel/holt", "elcascavel/ResumosCM", "Members-Only-GTA/Achievements.SA"];

export async function GET() {
  try {
    const githubToken = process.env.GITHUB_TOKEN;
    if (!githubToken) {
      return NextResponse.json(
        { error: "Missing GITHUB_TOKEN" },
        { status: 500 }
      );
    }

    const latestCommits: Array<{
      sha: string;
      href: string;
      repo: string;
      message: string;
      date: string;
    }> = [];

    for (const repo of REPOS) {
      const response = await fetch(
        `https://api.github.com/repos/${repo}/commits?per_page=1`,
        {
          headers: {
            Authorization: `Bearer ${githubToken}`,
            Accept: "application/vnd.github+json",
          },
        }
      );

      if (!response.ok) {
        console.error(`Failed to fetch commits for ${repo}`);
        continue;
      }

      const commits = await response.json();

      if (commits.length > 0) {
        const commit = commits[0];
        latestCommits.push({
          sha: commit.sha,
          href: commit.html_url,
          repo,
          message: commit.commit.message,
          date: commit.commit.author?.date ?? "",
        });
      }
    }

    // Sort commits by most recent date
    latestCommits.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // Return sorted list
    return NextResponse.json(latestCommits);
  } catch (error) {
    console.error("Error fetching GitHub commits:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
