import {
	IconBrandGithub,
	IconCode,
	IconGitCommit,
	IconStar,
} from "@tabler/icons-react";
import type React from "react";
import type { StatIcon, Stats } from "@/lib/types/common";

const iconMap: Record<StatIcon, React.ElementType> = {
	github: IconBrandGithub,
	waka: IconCode,
	commits: IconGitCommit,
	website: IconStar,
};

const StatBox = ({ icon, text }: Stats) => {
	const Icon = iconMap[icon];

	return (
		<div className="flex flex-col items-center rounded-lg shadow-lg p-4 min-h-32 h-full w-full overflow-hidden border border-drac-nosferatu-700 bg-drac-nosferatu-800">
			<Icon size={24} />
			<div className="text-sm mt-4 h-full w-full">{text}</div>
		</div>
	);
};

const StatsGrid = ({ stats }: { stats: Stats[] }) => (
	<div className="grid gap-11 grid-cols-1 md:grid-cols-2 mx-auto mt-8">
		{stats.map((stat) => (
			<StatBox key={stat.icon} icon={stat.icon} text={stat.text} />
		))}
	</div>
);

export default StatsGrid;
