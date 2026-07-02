import type React from "react";
import {
  IconBrandGithub,
  IconGitCommit,
  IconStar,
  IconCode,
} from "@tabler/icons-react";
import { Skeleton } from "./skeleton";

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

type StatBoxProps = {
  icon: React.ReactNode;
  text: string;
};

const StatBox: React.FC<StatBoxProps & { loading?: boolean }> = ({
  icon,
  text,
  loading,
}) => (
  <div className="flex flex-col items-center rounded-lg shadow-lg p-4 min-h-32 h-full w-full overflow-hidden border border-drac-nosferatu-700 bg-drac-nosferatu-800">
    {icon}
    <div className="text-sm mt-4 h-full w-full">
      {loading ? <Skeleton className="h-4 w-full" /> : text}
    </div>
  </div>
);

type StatsGridProps = {
  stats: { icon: string; text: string }[];
};

const StatsGrid: React.FC<StatsGridProps & { loading?: boolean }> = ({
  stats,
  loading,
}) => (
  <div className="grid gap-11 grid-cols-1 md:grid-cols-2 mx-auto mt-8">
    {stats.map((stat, idx) => (
      <StatBox
        key={idx}
        icon={getIconForKey(stat.icon)}
        text={stat.text}
        loading={loading}
      />
    ))}
  </div>
);

export default StatsGrid;
