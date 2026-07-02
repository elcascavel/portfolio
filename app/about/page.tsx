import { IconUser } from "@tabler/icons-react";
import Image from "next/image";
import AboutContent from "@/app/content/about.mdx";
import SectionTitle from "@/components/ui/section-title";
import Socials from "@/components/ui/socials";

export default function Page() {
	return (
		<div className="flex flex-col max-w-2xl md:max-w-5xl mx-auto px-4 py-8">
			<SectionTitle icon={IconUser}>About Me</SectionTitle>
			<div className="flex flex-col md:flex-row items-center gap-8 mt-8">
				<Image
					src="https://1kbqkuz15gkrdwbb.public.blob.vercel-storage.com/assets/cascavel-IR9oUxffIY8s3EdcMpNGelGmk2a1Ja.webp"
					alt="Me in GTA style"
					width={500}
					height={300}
					className="rounded-lg shadow-lg w-md"
				/>
				<aside className="flex-1">
					<AboutContent />
				</aside>
			</div>
			<Socials />
		</div>
	);
}
