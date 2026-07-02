import type { ProjectMetadata } from "@/lib/types/common";

export const metadata = {
	title: "Grand Theft Auto: Blue & Blood",
	description:
		"Grand Theft Auto: Blue & Blood was a story mod project built for Grand Theft Auto: San Andreas, aiming to go deeper into the rabbit hole of C.R.A.S.H.'s endeavors in a new, independent narrative while staying faithful to the canonic events of the 3D era.",
	date: "2024-11-24",
	slug: "gta-bb",
	image: {
		url: "https://1kbqkuz15gkrdwbb.public.blob.vercel-storage.com/assets/gta-bb-logo-RvH7rN779HulXhr6LiHktAb6QB0OGu.webp",
		alt: "Austin Vaughn, a character from Grand Theft Auto: Blue & Blood with the logo stamped on it.",
	},
	published: true,
	featured: true,
	tags: ["javascript", "gta", "mod"],
} satisfies ProjectMetadata;
