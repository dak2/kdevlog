import type { NextApiRequest, NextApiResponse } from "next";
import { getPosts } from "../../lib/blog";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const page = req.query.page ? Number.parseInt(req.query.page as string) : 1;
	const perPage = 4;
	const allPosts = getPosts();
	const totalPages = Math.ceil(allPosts.length / perPage);
	const posts = allPosts.slice((page - 1) * perPage, page * perPage);

	res.status(200).json({ posts, totalPages });
}
