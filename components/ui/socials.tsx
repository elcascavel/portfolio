import { socialItems } from "@/lib/config/socialItems";

export default function Socials() {
	return (
		<ul className="list-none p-0 m-0 flex flex-row gap-x-4">
			{socialItems.map((social) => {
				const IconComponent = social.icon;
				return (
					<li key={social.name} className="flex flex-row items-center">
						<IconComponent className="mr-2 text-xl" />
						<a
							href={social.url}
							target="_blank"
							rel="noopener noreferrer"
							className="text-drac-nosferatu-50 hover:text-drac-marcelin-400 hover:underline"
						>
							{social.name}
						</a>
					</li>
				);
			})}
		</ul>
	);
}
