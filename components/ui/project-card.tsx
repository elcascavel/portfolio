import { IconPhoto } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import type { ProjectMetadata } from "@/lib/types/common";
import Tag from "./tag";

export default function ProjectCard({ project }: { project: ProjectMetadata }) {
	return (
		<Link
			href={`/projects/${project.slug}`}
			className="border border-drac-nosferatu-700 bg-drac-nosferatu-800 hover:border-drac-marcelin-400 focus-visible:border-drac-marcelin-400 group block overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl focus:outline-none"
		>
			{project.image ? (
				<div className="relative aspect-video overflow-hidden">
					<Image
						src={project.image.url}
						alt=""
						fill
						aria-hidden="true"
						sizes="(max-width: 768px) 90vw, 30vw"
						className="object-cover blur-lg scale-110"
					/>
					<span
						aria-hidden="true"
						className="pointer-events-none absolute inset-0 z-10 block bg-gradient-to-b from-black/40 via-transparent to-black/40"
					/>
					<Image
						src={project.image.url}
						alt={project.image.alt ?? ""}
						fill
						sizes="(max-width: 768px) 90vw, 30vw"
						className="object-contain z-10"
					/>
				</div>
			) : (
				<div className="aspect-video w-full bg-drac-nosferatu-700 flex items-center justify-center text-drac-aro-50">
					<IconPhoto
						className="h-12 w-12 text-drac-aro-400"
						aria-label="No image available"
					/>
				</div>
			)}

			<div className="space-y-3 p-5">
				<h3 className="flex justify-between items-center text-drac-aro-50 group-hover:text-drac-marcelin-400 text-xl font-semibold transition-colors">
					{project.title}
				</h3>
				<p className="text-drac-aro-50 line-clamp-2 text-sm">
					{project.description}
				</p>

				{project.tags && project.tags.length > 0 && (
					<div className="flex items-center gap-x-2 pt-1 text-xs">
						{project.tags.map((tag) => (
							<Tag key={tag}>{tag}</Tag>
						))}
					</div>
				)}
			</div>
		</Link>
	);
}
