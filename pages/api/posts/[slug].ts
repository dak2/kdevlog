import type { NextApiRequest, NextApiResponse } from "next";
import { getBlogPostBySlug } from "../../../lib/blog";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const { slug } = req.query;
	const post = getBlogPostBySlug(slug as string);

	if (!post) {
		return res.status(404).json({ message: "Post not found" });
	}

	res.status(200).json(post);
}
