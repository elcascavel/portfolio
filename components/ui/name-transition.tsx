"use client";

export default function NameTransition() {
	const fullName = "Simão";
	const shortName = "Cascavel";

	const maxName = fullName.length >= shortName.length ? fullName : shortName;

	return (
		<h1 className="font-medium m-0 p-0 leading-none transition-element">
			<span className="sr-only">{fullName}</span>
			<span
				aria-hidden="true"
				className="inline-block overflow-hidden group relative leading-none"
			>
				<span className="invisible block">{maxName}</span>

				<span className="absolute left-0 top-0 block transition-transform duration-300 ease-in-out group-hover:-translate-y-full text-left w-full">
					{fullName}
				</span>
				<span className="absolute left-0 top-0 block transition-transform duration-300 ease-in-out translate-y-full group-hover:translate-y-0 text-left w-full">
					{shortName}
				</span>
			</span>
		</h1>
	);
}
