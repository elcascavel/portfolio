import fs from "node:fs/promises";
import path from "node:path";
import type { ProjectMetadata } from "@/lib/types/common";

const PROJECTS_DIR = path.join(process.cwd(), "app", "projects", "all");

export async function getProjects(): Promise<ProjectMetadata[]> {
	const entries = await fs.readdir(PROJECTS_DIR, { withFileTypes: true });
	const slugs = entries
		.filter((entry) => entry.isDirectory())
		.map((entry) => entry.name);

	const modules = await Promise.all(
		slugs.map((slug) => import(`@/app/projects/all/${slug}/metadata`)),
	);

	return modules
		.map((mod, i) => ({ ...mod.metadata, slug: `all/${slugs[i]}` }))
		.filter((project) => project.published)
		.sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}
