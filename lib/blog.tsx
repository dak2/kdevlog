import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import matter from "gray-matter";
import type { Post } from "./type";

export const getPosts = (perPage?: number) => {
	const postDirectory = join(process.cwd(), "app", "posts");
	const fileNames = readdirSync(postDirectory);
	const posts: Post[] = fileNames.map((fileName) => {
		const fullPath = join(postDirectory, fileName);
		const fileContents = readFileSync(fullPath, "utf8");
		const { data, content } = matter(fileContents);

		return {
			slug: fileName.replace(/\.md$/, ""),
			title: data.title,
			date: data.date,
			excerpt: data.excerpt,
			categories: (data.categories || "").split(","),
			content,
		};
	});

	const sortedPosts = posts.sort((a, b) => {
		return a.date < b.date ? 1 : -1;
	});

	return perPage ? sortedPosts.slice(0, perPage) : sortedPosts;
};

export function getBlogPosts(
	page = 1,
	perPage = 4,
): { posts: Post[]; totalPages: number } {
	const blogPosts = getPosts();
	const startIndex = (page - 1) * perPage;
	const endIndex = startIndex + perPage;
	const paginatedPosts = blogPosts.slice(startIndex, endIndex);
	const totalPages = Math.ceil(blogPosts.length / perPage);

	return {
		posts: paginatedPosts,
		totalPages,
	};
}

export function getBlogPostBySlug(slug: string): Post | undefined {
	const blogPosts = getPosts();
	return blogPosts.find((post) => post.slug === slug);
}
