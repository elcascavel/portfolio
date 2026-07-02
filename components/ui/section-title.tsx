import type { ElementType, ReactNode } from "react";

interface SectionTitleProps {
	icon: ElementType;
	children: ReactNode;
	className?: string;
}

const SectionTitle = ({
	icon: Icon,
	children,
	className,
}: SectionTitleProps) => {
	return (
		<h2
			className={`flex items-center gap-x-3 text-2xl md:text-3xl font-bold ${className}`}
		>
			<Icon className="h-6 w-6 text-drac-marcelin-400" />
			<span>{children}</span>
		</h2>
	);
};

export default SectionTitle;
