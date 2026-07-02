import { IconTool } from "@tabler/icons-react";
import SectionTitle from "@/components/ui/section-title";
import { projects } from "@/lib/config/getProjects";
import ProjectCard from "../../components/ui/project-card";

export default async function Page() {
	return (
		<div className="p-5">
			<SectionTitle icon={IconTool}>Projects</SectionTitle>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
				{projects.map((project) => (
					<ProjectCard key={project.slug} project={project} />
				))}
			</div>
		</div>
	);
}
