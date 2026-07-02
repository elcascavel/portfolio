"use client";

import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { useEffect, useState } from "react";
import { navItems } from "@/lib/config/navItems";

const Header: React.FC = () => {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 0);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<header
			className={`header top-0 z-20 flex h-24 items-center rounded-b-lg justify-between p-5 select-none transition-all duration-300 md:sticky ${
				isScrolled
					? "backdrop-blur-md bg-drac-nosferatu-800/30 "
					: "bg-drac-nosferatu-800 shadow-lg"
			}`}
		>
			<div className="flex items-center gap-5">
				<Link
					href="/"
					className="flex items-center gap-2 text-drac-aro-50 hover:text-drac-marcelin-400 transition-colors"
				>
					<Image
						src="https://1kbqkuz15gkrdwbb.public.blob.vercel-storage.com/assets/cascavel-IR9oUxffIY8s3EdcMpNGelGmk2a1Ja.webp"
						alt="holt logo"
						width={250}
						height={250}
						className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
					/>
				</Link>
				<p className="font-bold text-drac-aro-50 hidden md:block">
					Simão /{" "}
					<span className="bg-drac-marcelin-400 text-drac-nosferatu-900 py-1 px-2 rounded-lg">
						Cascavel
					</span>
				</p>
			</div>
			<nav className="flex items-center gap-x-5">
				{navItems.map((item) => {
					const isExternal = item.href.endsWith(".pdf");

					if (isExternal) {
						return (
							<a
								key={item.href}
								href={item.href}
								target="_blank"
								rel="noopener noreferrer"
								className="text-drac-aro-50 hover:text-drac-marcelin-200 transition-colors text-sm md:text-base"
							>
								{item.title}
							</a>
						);
					}

					return (
						<Link
							key={item.href}
							href={item.href}
							className="text-drac-aro-50 hover:text-drac-marcelin-200 transition-colors text-sm md:text-base"
						>
							{item.title}
						</Link>
					);
				})}
			</nav>
		</header>
	);
};

export default Header;
