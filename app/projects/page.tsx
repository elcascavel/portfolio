import { IconTool } from "@tabler/icons-react";
import ProjectCard from "@/components/ui/project-card";
import SectionTitle from "@/components/ui/section-title";
import { getProjects } from "@/lib/config/getProjects";

export default async function Page() {
	const projects = await getProjects();

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
