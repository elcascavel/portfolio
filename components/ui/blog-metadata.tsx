import { IconCalendar } from "@tabler/icons-react";
import Image from "next/image";
import type React from "react";

type MetadataDisplayProps = {
	data: {
		title: string;
		image: { url: string; alt: string };
		date: string;
		links: { url: string; text: string }[];
	};
};

const BlogMetadataDisplay: React.FC<MetadataDisplayProps> = ({ data }) => {
	const { title, date, image } = data;

	const formattedDate = new Intl.DateTimeFormat("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
	}).format(new Date(date));

	return (
		<div className="flex flex-col gap-4 mt-2">
			{image?.url && (
				<Image
					src={image.url}
					alt={image.alt}
					width={1280}
					height={720}
					className="max-w-5xl w-full h-auto object-cover rounded-lg"
				/>
			)}
			<div className="flex flex-col gap-2 text-sm">
				<h1 className="text-4xl font-bold text-drac-marcelin-400">{title}</h1>
				<div className="flex items-center gap-2">
					{date && (
						<>
							<IconCalendar size={16} />
							<span>{formattedDate}</span>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default BlogMetadataDisplay;
