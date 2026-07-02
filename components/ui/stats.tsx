import {
	IconBrandGithub,
	IconCode,
	IconGitCommit,
	IconStar,
} from "@tabler/icons-react";
import type React from "react";
import type { Stats } from "@/lib/types/common";

const iconMap: Record<string, React.ElementType> = {
	github: IconBrandGithub,
	waka: IconCode,
	commits: IconGitCommit,
	website: IconStar,
	default: IconStar,
};

const getIconForKey = (key: string) => {
	const IconComponent = iconMap[key.toLowerCase()] || iconMap.default;
	return <IconComponent size={24} />;
};

const StatBox = ({ icon, text }: Stats) => (
	<div className="flex flex-col items-center rounded-lg shadow-lg p-4 min-h-32 h-full w-full overflow-hidden border border-drac-nosferatu-700 bg-drac-nosferatu-800">
		{getIconForKey(icon)}
		<div className="text-sm mt-4 h-full w-full">{text}</div>
	</div>
);

const StatsGrid = ({ stats }: { stats: Stats[] }) => (
	<div className="grid gap-11 grid-cols-1 md:grid-cols-2 mx-auto mt-8">
		{stats.map((stat) => (
			<StatBox key={stat.icon} icon={stat.icon} text={stat.text} />
		))}
	</div>
);

export default StatsGrid;
