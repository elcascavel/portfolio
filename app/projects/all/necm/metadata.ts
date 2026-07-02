import type { ProjectMetadata } from "@/lib/types/common";

export const metadata = {
	title: "Website for NECM",
	description:
		"A modern and responsive website I designed and developed for the Student Group of Communication and Multimedia (NECM) at UTAD. The website promotes the group's activities, events, and student initiatives, and provides an accessible platform for members and the public.",
	date: "2022-06-01",
	slug: "necm",
	image: {
		url: "https://1kbqkuz15gkrdwbb.public.blob.vercel-storage.com/assets/necm-Clf8IGby45W6gKjnvlD3PsYSEKJ2FK.webp",
		alt: "Screenshot of the NECM website homepage",
	},
	published: true,
	featured: false,
	tags: ["laravel", "vue", "tailwindcss"],
	links: [
		{
			text: "Website",
			url: "https://necm.utad.pt/",
		},
	],
} satisfies ProjectMetadata;
