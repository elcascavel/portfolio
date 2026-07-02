import type { ProjectMetadata } from "@/lib/types/common";

export const metadata = {
	title: "Achievements.SA",
	description:
		"GTA SA (1.0) PC mod that seeks to recreate the achievements found on RetroAchievements and Steam.",
	date: "2026-06-19",
	slug: "achievements-sa",
	image: {
		url: "https://1kbqkuz15gkrdwbb.public.blob.vercel-storage.com/assets/achievements2.png",
		alt: "AchievementsSA logo with the GTA San Andreas 'SA' emblem and the blonde beach girl from the game's loading screens.",
	},
	links: [
		{
			text: "Github",
			url: "https://github.com/Members-Only-GTA/Achievements.SA",
		},
	],
	published: true,
	featured: true,
	tags: ["c++", "gta", "mod"],
} satisfies ProjectMetadata;
