import type { BlogMetadata } from "@/lib/types/common";

export const metadata = {
	title: "Hello, world!",
	description: "Hello",
	image: {
		url: "https://images.unsplash.com/photo-1644794472051-36d154dfe487?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		alt: "Hello world image",
	},
	date: "2025-06-10",
	slug: "hello-world",
	published: true,
} satisfies BlogMetadata;
