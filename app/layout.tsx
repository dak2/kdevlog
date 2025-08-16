import "../styles/global.scss";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import Header from "./components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	openGraph: {
		title: "kdevlog",
		description: "Technology, development, and more.",
		url: "https://kdevlog.com",
		siteName: "kdevlog",
		images: [
			{
				url: "https://img.icons8.com/ios/250/000000/edit.png",
				width: 100,
				height: 50,
			},
		],
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={`${inter.className} bg-gray-900 text-gray-100`}>
				<Header />
				<main className="container mx-auto px-4 pt-5 pb-3">{children}</main>
				<footer className="text-center pb-5 text-sm text-gray-400">
					© {new Date().getFullYear()} kdevlog. All rights reserved.
				</footer>
				<Analytics />
			</body>
		</html>
	);
}
