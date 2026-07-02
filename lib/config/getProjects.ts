import { metadata as achievementsSaMetadata } from "@/app/projects/all/achievements-sa/metadata";
import { metadata as altvRpMetadata } from "@/app/projects/all/altv-rp/metadata";
import { metadata as gtaApiMetadata } from "@/app/projects/all/gta-api/metadata";
import { metadata as gtaBbMetadata } from "@/app/projects/all/gta-bb/metadata";
import { metadata as necmMetadata } from "@/app/projects/all/necm/metadata";

export const projects = [
	achievementsSaMetadata,
	gtaBbMetadata,
	altvRpMetadata,
	gtaApiMetadata,
	necmMetadata,
]
	.filter((p) => p.published)
	.map((p) => ({
		...p,
		slug: `all/${p.slug}`,
	}));

export const featuredProjects = projects.filter((p) => p.featured);
