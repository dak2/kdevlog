import { SiX, SiZenn } from "@icons-pack/react-simple-icons";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { LuNotebookPen } from "react-icons/lu";
import { getBlogPosts } from "../lib/blog";
import BlogPost from "./components/blog-post";
import Pagination from "./components/pagination";

export function generateStaticParams() {
	const { totalPages } = getBlogPosts();

	return Array.from({ length: totalPages }, (_, i) => ({
		searchParams: i === 0 ? {} : { page: (i + 1).toString() },
	}));
}

export default async function Home({ searchParams }) {
	const params = await searchParams;
	const currentPage = params.page ? Number.parseInt(params.page, 10) : 1;
	const { posts, totalPages } = getBlogPosts(currentPage);

	return (
		<div>
			<div className="flex flex-col md:flex-row">
				<div className="flex-1">
					<div>
						{posts.map((post) => (
							<BlogPost key={post.slug} post={post} />
						))}
					</div>
				</div>
				<div className="md:w-64">
					<section className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
						<div className="text-center mb-4">
							<div className="w-20 h-20 bg-gray-700 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl font-bold">
								<img
									src="images/profile_icon.jpeg"
									className="rounded-full"
									alt="Profile icon of dak2"
								/>
							</div>
							<h3 className="font-medium text-lg">dak2</h3>
							<p className="text-gray-400 text-sm mt-2">Software Engineer</p>
						</div>

						<div className="border-t border-gray-700 pt-4 mt-4">
							<div className="flex flex-col space-y-3">
								<Link
									href="https://github.com/dak2"
									className="flex items-center text-gray-300 hover:text-white transition-colors"
								>
									<FaGithub size={20} className="mr-3" />
									<span>GitHub</span>
								</Link>
								<Link
									href="https://zenn.dev/dak2"
									className="flex items-center text-gray-300 hover:text-white transition-colors"
								>
									<SiZenn size={20} className="mr-3" />
									<span>Zenn</span>
								</Link>
								<Link
									href="https://x.com/_dak2_"
									className="flex items-center text-gray-300 hover:text-white transition-colors"
								>
									<SiX size={20} className="mr-3" />
									<span>X (Twitter)</span>
								</Link>
								<Link
									href="https://scrapbox.io/dawt2h-55188069/"
									className="flex items-center text-gray-300 hover:text-white transition-colors"
								>
									<LuNotebookPen size={20} className="mr-3" />
									<span>Cosense</span>
								</Link>
							</div>
						</div>
					</section>
				</div>
			</div>
			<div className="mt-8">
				<Pagination currentPage={currentPage} totalPages={totalPages} />
			</div>
		</div>
	);
}
