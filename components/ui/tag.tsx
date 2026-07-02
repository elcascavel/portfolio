import type React from "react";

type TagProps = {
	children: React.ReactNode;
};

const Tag: React.FC<TagProps> = ({ children }) => {
	return (
		<span
			className={
				"inline-flex items-center gap-1 px-2 py-1 rounded bg-drac-darker-900 text-sm font-semibold border border-drac-nosferatu-700"
			}
		>
			{children}
		</span>
	);
};

export default Tag;
