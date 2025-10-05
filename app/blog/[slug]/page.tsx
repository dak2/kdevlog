import type { Metadata } from "next";
import { CiCalendar } from "react-icons/ci";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";
import { getBlogPostBySlug, getPosts } from "../../../lib/blog";
import LinkCard from "../../components/link-card";

export const dynamic = "force-static";
export const revalidate = false;

export async function generateStaticParams() {
	const posts = getPosts();

	return posts.map((post) => ({
		slug: post.slug,
	}));
}

export async function generateMetadata({ params }): Promise<Metadata> {
	const pageParams = await params;
	const post = getBlogPostBySlug(pageParams.slug);

	return {
		openGraph: {
			title: post?.title || "Default Title",
			description: post?.excerpt || "Default Description",
		},
	};
}

export default async function BlogPostPage({ params }) {
	const pageParams = await params;
	const post = getBlogPostBySlug(pageParams.slug);

	if (!post) {
		return <div>Page Not Found</div>;
	}

	return (
		<article className="max-w-3xl mx-auto">
			<h1 className="text-4xl font-bold mb-4">{post.title}</h1>
			<div className="flex items-center text-sm text-gray-500 mb-4">
				<CiCalendar size={16} className="mr-2" />
				<time dateTime={post.date}>{post.date}</time>
			</div>
			<ReactMarkdown
				remarkPlugins={[remarkGfm]}
				components={{
					code({ className, children, ...props }) {
						const match = /language-(\w+)/.exec(className || "");
						return match ? (
							<SyntaxHighlighter
								{...props}
								style={vscDarkPlus}
								language={match[1]}
								PreTag="div"
								showLineNumbers={true}
								wrapLongLines={true}
							>
								{String(children).replace(/\n$/, "")}
							</SyntaxHighlighter>
						) : (
							<code {...props} className={className}>
								{children}
							</code>
						);
					},
					p({ children }) {
						// Check if the paragraph contains only a standalone link
						// Handle both direct React element and array cases
						let linkElement: React.ReactElement | null = null;

						if (children && typeof children === 'object') {
							// Case 1: Direct React element
							if (React.isValidElement(children) && children.props && typeof children.props === 'object' && children.props !== null && 'href' in children.props && 'children' in children.props) {
								linkElement = children;
							}
							// Case 2: Array with single React element
							else if (Array.isArray(children) && children.length === 1 && React.isValidElement(children[0]) && children[0].props && typeof children[0].props === 'object' && children[0].props !== null && 'href' in children[0].props) {
								linkElement = children[0];
							}
						}

						// If we found a standalone link element, render as LinkCard
						if (linkElement && React.isValidElement(linkElement) && linkElement.props && typeof linkElement.props === 'object' && linkElement.props !== null && 'href' in linkElement.props && 'children' in linkElement.props && linkElement.props.href === linkElement.props.children) {
							return <LinkCard url={linkElement.props.href as string} />;
						}

						// Regular paragraph
						return <p>{children}</p>;
					},
					a({ href, children }) {
						// Regular link
						return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
					},
				}}
				className="markdown"
			>
				{post.content}
			</ReactMarkdown>
		</article>
	);
}
