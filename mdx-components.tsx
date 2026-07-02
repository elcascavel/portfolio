import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { highlight } from "sugar-high";

type HeadingProps = ComponentPropsWithoutRef<"h1">;
type ParagraphProps = ComponentPropsWithoutRef<"p">;
type ListProps = ComponentPropsWithoutRef<"ul">;
type ListItemProps = ComponentPropsWithoutRef<"li">;
type AnchorProps = ComponentPropsWithoutRef<"a">;
type BlockquoteProps = ComponentPropsWithoutRef<"blockquote">;

const components = {
	h1: (props: HeadingProps) => (
		<h1 className="font-medium text-drac-marcelin-400 mb-0" {...props} />
	),
	h2: (props: HeadingProps) => (
		<h2 className="text-drac-marcelin-400 font-medium mt-8 mb-3" {...props} />
	),
	h3: (props: HeadingProps) => (
		<h3
			className="text-gray-800 dark:text-zinc-200 font-medium mt-8 mb-3"
			{...props}
		/>
	),
	h4: (props: HeadingProps) => <h4 className="font-medium" {...props} />,
	p: (props: ParagraphProps) => (
		<p className="text-drac-aro-50 leading-snug my-5" {...props} />
	),
	ol: (props: ListProps) => (
		<ol className="text-drac-aro-50  list-decimal pl-5 space-y-2" {...props} />
	),
	ul: (props: ListProps) => (
		<ul className="text-drac-aro-50  list-disc pl-5 space-y-1" {...props} />
	),
	li: (props: ListItemProps) => <li className="pl-1" {...props} />,
	em: (props: ComponentPropsWithoutRef<"em">) => (
		<em className="font-medium" {...props} />
	),
	strong: (props: ComponentPropsWithoutRef<"strong">) => (
		<strong className="font-medium" {...props} />
	),
	a: ({ href, children, ...props }: AnchorProps) => {
		const className =
			"text-drac-marcelin-200 hover:text-drac-marcelin-400 underline underline-offset-2 decoration-dotted decoration-2";
		if (href?.startsWith("/")) {
			return (
				<Link href={href} className={className} {...props}>
					{children}
				</Link>
			);
		}
		if (href?.startsWith("#")) {
			return (
				<a href={href} className={className} {...props}>
					{children}
				</a>
			);
		}
		return (
			<a
				href={href}
				target="_blank"
				rel="noopener noreferrer"
				className={className}
				{...props}
			>
				{children}
			</a>
		);
	},
	code: ({ children, ...props }: ComponentPropsWithoutRef<"code">) => {
		const codeHTML = highlight(children as string);
		// biome-ignore lint/security/noDangerouslySetInnerHtml: sugar-high returns sanitized highlighted HTML
		return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
	},
	Table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
		<table>
			<thead>
				<tr>
					{data.headers.map((header, index) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: static MDX tables have no reordering
						<th key={index}>{header}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{data.rows.map((row, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: static MDX tables have no reordering
					<tr key={index}>
						{row.map((cell, cellIndex) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: static MDX tables have no reordering
							<td key={cellIndex}>{cell}</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	),
	blockquote: (props: BlockquoteProps) => (
		<blockquote
			className="ml-[0.075em] border-l-3 border-gray-300 pl-4 text-gray-700 dark:border-zinc-600 dark:text-zinc-300"
			{...props}
		/>
	),
};

declare global {
	type MDXProvidedComponents = typeof components;
}

export function useMDXComponents(): MDXProvidedComponents {
	return components;
}
