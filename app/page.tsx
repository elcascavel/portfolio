"use client";

import { useEffect, useState } from "react";
import StatsGrid from "../components/ui/stats";
import { IconActivity, IconHeart, IconMan } from "@tabler/icons-react";
import type { Stats } from "../lib/types/common";
import SectionTitle from "@/components/ui/section-title";
import { featuredProjects } from "@/lib/config/getProjects";
import ProjectCard from "@/components/ui/project-card";
import IntroContent from "@/app/content/intro.mdx";
import NameTransition from "@/components/ui/name-transition";
import Link from "next/link";

export default function GitHubStats() {
  const [stats, setStats] = useState<Stats[]>([]);
  const [loading, setLoading] = useState(true);

  const skeletonStats = Array(2).fill({ icon: "", text: "" });

  useEffect(() => {
    async function fetchStats() {
      try {
        const [githubResponse, wakatimeResponse, commitsResponse] =
          await Promise.all([
            fetch("/api/github-stats"),
            fetch("/api/wakatime"),
            fetch("/api/commits"),
          ]);

        if (!githubResponse.ok) throw new Error("Failed to fetch GitHub stats");
        if (!wakatimeResponse.ok)
          throw new Error("Failed to fetch WakaTime stats");
        if (!commitsResponse.ok) throw new Error("Failed to fetch commits");

        const [githubData, wakatimeData, latestCommits] = await Promise.all([
          githubResponse.json(),
          wakatimeResponse.json(),
          commitsResponse.json(),
        ]);

        const mainLang = wakatimeData.data.languages?.[0] || {
          name: "N/A",
          percent: "0",
        };

        const combinedStats = [
          {
            icon: "github",
            text: (
              <div className="flex flex-col gap-4">
                <p>
                  On GitHub, I was starred{" "}
                  <span className="font-bold text-drac-marcelin-200">
                    {githubData.totalStars}
                  </span>{" "}
                  times, and forked{" "}
                  <span className="font-bold text-drac-marcelin-200">
                    {githubData.totalForks}
                  </span>
                  , across{" "}
                  <span className="font-bold text-drac-marcelin-200">
                    {githubData.publicRepos}
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
          },
          {
            icon: "waka",
            text: (
              <div className="flex flex-col gap-1 h-full justify-between">
                <p>
                  I have coded for a total of{" "}
                  <span className="font-bold text-drac-marcelin-200">
                    {wakatimeData.data.human_readable_total}
                  </span>{" "}
                  since using WakaTime. My most used language is{" "}
                  <span className="font-bold text-drac-marcelin-200">
                    {mainLang.name}
                  </span>
                  , accounting for{" "}
                  <span className="font-bold text-drac-marcelin-200">
                    {mainLang.percent}%
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
          },
        ];

        setStats(combinedStats);
      } catch (err: unknown) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

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

      <section>
        <SectionTitle icon={IconActivity}>Stats</SectionTitle>
        <StatsGrid stats={loading ? skeletonStats : stats} loading={loading} />
      </section>
    </div>
  );
}
