import fs from "node:fs/promises";
import path from "node:path";
import type { BlogMetadata } from "@/lib/types/common";

const BLOG_DIR = path.join(process.cwd(), "app", "blog");

export async function getPosts(): Promise<BlogMetadata[]> {
	const entries = await fs.readdir(BLOG_DIR, { withFileTypes: true });
	const slugs = entries
		.filter((entry) => entry.isDirectory())
		.map((entry) => entry.name);

	const modules = await Promise.all(
		slugs.map((slug) => import(`@/app/blog/${slug}/metadata`)),
	);

	return modules
		.map((mod) => mod.metadata)
		.filter((post) => post.published)
		.sort((a, b) => b.date.localeCompare(a.date));
}
