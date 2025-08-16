import Link from "next/link";

export default function Header() {
	return (
		<header className="border-b border-gray-800">
			<div className="container mx-auto px-4 py-4">
				<div className="flex items-center">
					<Link href="/" className="text-xl font-bold mr-8">
						kdevlog
					</Link>
				</div>
			</div>
		</header>
	);
}
