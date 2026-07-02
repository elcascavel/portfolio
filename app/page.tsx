import { IconActivity, IconHeart, IconMan } from "@tabler/icons-react";
import Link from "next/link";
import IntroContent from "@/app/content/intro.mdx";
import NameTransition from "@/components/ui/name-transition";
import ProjectCard from "@/components/ui/project-card";
import SectionTitle from "@/components/ui/section-title";
import { featuredProjects } from "@/lib/config/getProjects";
import {
	getGithubStats,
	getLatestCommits,
	getWakatimeStats,
} from "@/lib/stats";
import StatsGrid from "../components/ui/stats";
import type { Stats } from "../lib/types/common";

export default async function Home() {
	const [githubStats, wakatimeStats, latestCommits] = await Promise.all([
		getGithubStats(),
		getWakatimeStats(),
		getLatestCommits(),
	]);

	const stats: Stats[] = [];

	if (githubStats) {
		stats.push({
			icon: "github",
			text: (
				<div className="flex flex-col gap-4">
					<p>
						On GitHub, I was starred{" "}
						<span className="font-bold text-drac-marcelin-200">
							{githubStats.totalStars}
						</span>{" "}
						times, and forked{" "}
						<span className="font-bold text-drac-marcelin-200">
							{githubStats.totalForks}
						</span>
						, across{" "}
						<span className="font-bold text-drac-marcelin-200">
							{githubStats.publicRepos}
						</span>{" "}
						public repos.
					</p>
					<ul className="list-none space-y-1">
						{latestCommits.map((commit) => (
							<li
								key={commit.sha}
								className="flex items-center gap-1 mb-1 overflow-hidden min-w-0"
							>
								<span className="font-bold whitespace-nowrap shrink-0">
									{commit.repo}:
								</span>{" "}
								<a
									href={commit.href}
									className="hover:text-drac-marcelin-400 transition-colors truncate"
									target="_blank"
									rel="noopener noreferrer"
									title={commit.message}
								>
									{commit.message}
								</a>
							</li>
						))}
					</ul>
					<footer className="flex flex-col gap-y-1">
						<hr className="border-drac-nosferatu-700" />
						<a
							href="https://github.com/elcascavel/"
							target="_blank"
							rel="noopener noreferrer"
						>
							<span className="mt-2 inline-block text-sm text-drac-marcelin-200 hover:bg-drac-marcelin-400 hover:text-drac-aro-50 transition-colors hover:animate-pulse underline underline-offset-2 decoration-dotted decoration-2">
								View on Github
							</span>
						</a>
					</footer>
				</div>
			),
		});
	}

	if (wakatimeStats) {
		stats.push({
			icon: "waka",
			text: (
				<div className="flex flex-col gap-1 h-full justify-between">
					<p>
						I have coded for a total of{" "}
						<span className="font-bold text-drac-marcelin-200">
							{wakatimeStats.totalTime}
						</span>{" "}
						since using WakaTime. My most used language is{" "}
						<span className="font-bold text-drac-marcelin-200">
							{wakatimeStats.mainLanguage.name}
						</span>
						, accounting for{" "}
						<span className="font-bold text-drac-marcelin-200">
							{wakatimeStats.mainLanguage.percent}%
						</span>{" "}
						of my coding time.
					</p>
					<footer className="flex flex-col gap-y-1">
						<hr className="border-drac-nosferatu-700" />
						<a
							href="https://wakatime.com/@elcascavel"
							className="mt-2"
							target="_blank"
							rel="noopener noreferrer"
						>
							<span className="mt-2 inline-block text-sm text-drac-marcelin-200 hover:bg-drac-marcelin-400 hover:text-drac-aro-50 transition-colors hover:animate-pulse underline underline-offset-2 decoration-dotted decoration-2">
								View on WakaTime
							</span>
						</a>
					</footer>
				</div>
			),
		});
	}

	return (
		<div className="flex flex-col mx-auto max-w-6xl space-y-12 px-0 py-8 md:space-y-16 md:px-4 md:py-12">
			<section>
				<SectionTitle icon={IconMan}>
					<NameTransition />
				</SectionTitle>
				<IntroContent />
			</section>

			<section>
				<div className="flex flex-row justify-between items-center">
					<SectionTitle className="m-0" icon={IconHeart}>
						Featured Projects
					</SectionTitle>
					<Link
						href="/projects"
						className="hidden sm:inline text-sm text-drac-marcelin-200 hover:text-drac-marcelin-400 transition-colors"
					>
						View all projects
					</Link>
				</div>
				<div
					className={`
    grid gap-6 mt-8
    grid-cols-1
    ${featuredProjects.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2"}
  `}
				>
					{featuredProjects.map((project) => (
						<ProjectCard key={project.slug} project={project} />
					))}
				</div>
			</section>

			<nav className="flex justify-center w-full sm:hidden">
				<Link
					href="/projects"
					className="text-sm text-drac-marcelin-200 hover:text-drac-marcelin-400 transition-colors"
				>
					View all projects
				</Link>
			</nav>

			{stats.length > 0 && (
				<section>
					<SectionTitle icon={IconActivity}>Stats</SectionTitle>
					<StatsGrid stats={stats} />
				</section>
			)}
		</div>
	);
}
