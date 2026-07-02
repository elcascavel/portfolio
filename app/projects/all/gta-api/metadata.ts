import type { ProjectMetadata } from "@/lib/types/common";

export const metadata = {
	title: "gta-api",
	description: "My first ever API project, built with Node.js and Express.",
	date: "2021-08-24",
	slug: "gta-api",
	image: {
		url: "https://1kbqkuz15gkrdwbb.public.blob.vercel-storage.com/assets/api-qUlf3WzYMFMQM7AqDXyPNegBK44GXU.webp",
		alt: "API graphic",
	},
	published: true,
	featured: false,
	tags: ["api", "gta", "nodejs"],
	links: [
		{
			text: "Github",
			url: "https://github.com/elcascavel/gta-api",
		},
	],
} satisfies ProjectMetadata;
