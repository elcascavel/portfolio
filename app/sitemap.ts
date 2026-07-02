import { promises as fs } from "node:fs";
import path from "node:path";
import type { MetadataRoute } from "next";

export const SITE_URL = "https://samaral.dev";

async function getMdxSlugs(dir: string) {
	const entries = await fs.readdir(dir, {
		recursive: true,
		withFileTypes: true,
	});
	return entries
		.filter((entry) => entry.isFile() && entry.name === "page.mdx")
		.map((entry) => {
			const fullPath = path.join(entry.parentPath, entry.name);
			const relativePath = path.relative(dir, fullPath);
			return {
				slug: path.dirname(relativePath).replace(/\\/g, "/"),
				fullPath,
			};
		});
}

async function getMdxRoutes(section: string): Promise<MetadataRoute.Sitemap> {
	const dir = path.join(process.cwd(), "app", section);
	const slugs = await getMdxSlugs(dir);
	return Promise.all(
		slugs.map(async ({ slug, fullPath }) => {
			const stat = await fs.stat(fullPath);
			return {
				url: `${SITE_URL}/${section}/${slug}`,
				lastModified: stat.mtime,
			};
		}),
	);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const [projects, posts] = await Promise.all([
		getMdxRoutes("projects"),
		getMdxRoutes("blog"),
	]);

	const routes = ["", "/about", "/blog", "/projects"].map((route) => ({
		url: `${SITE_URL}${route}`,
	}));

	return [...routes, ...projects, ...posts];
}
