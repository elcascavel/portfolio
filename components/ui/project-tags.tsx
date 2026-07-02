import { IconTag } from "@tabler/icons-react";
import type React from "react";
import Tag from "./tag";

type TagProps = {
	tags: string[];
};

const ProjectsTags: React.FC<TagProps> = ({ tags }) =>
	tags?.length > 0 ? (
		<div className="flex items-center gap-x-2 pt-1 text-xs">
			<IconTag size={16} className="text-zinc-400" />
			{tags.map((tag) => (
				<Tag key={tag}>{tag}</Tag>
			))}
		</div>
	) : null;

export default ProjectsTags;
