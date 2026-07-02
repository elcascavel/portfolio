export default function BlogLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <article className="prose mx-auto mb-6 max-w-4xl">{children}</article>;
}
