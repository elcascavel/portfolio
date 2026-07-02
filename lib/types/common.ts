export interface ProjectMetadata {
	title: string;
	description: string;
	date?: string;
	image: {
		url: string;
		alt?: string;
	};
	slug?: string;
	published: boolean;
	featured?: boolean;
	tags?: string[];
	links?: ProjectLink[];
}

export interface BlogMetadata {
	title: string;
	description: string;
	date: string;
	slug: string;
	image?: Image;
	published: boolean;
}

export interface NavItem {
	title: string;
	href: string;
	tooltip?: string;
}

export interface Image {
	url: string;
	alt: string;
}

export interface ProjectLink {
	text: string;
	url: string;
}

export interface Stats {
	icon: string;
	text: React.ReactNode;
}
