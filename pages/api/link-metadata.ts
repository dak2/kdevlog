import type { NextApiRequest, NextApiResponse } from 'next';

interface LinkMetadata {
  title?: string;
  description?: string;
  image?: string;
  siteName?: string;
  url: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LinkMetadata | { error: string }>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.query;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  try {
    // Validate URL
    new URL(url);

    // Try different user agents for better compatibility
    const userAgents = [
      'Mozilla/5.0 (compatible; facebookexternalhit/1.1; +http://www.facebook.com/externalhit_uatext.php)',
      'Mozilla/5.0 (compatible; Twitterbot/1.0)',
      'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
      'Mozilla/5.0 (compatible; LinkedInBot/1.0 (compatible; Mozilla/5.0; +https://www.linkedin.com/help/linkedin/answer/1061))',
    ];

    let response;
    let html = '';

    // Try different user agents until we get content
    for (const userAgent of userAgents) {
      try {
        response = await fetch(url, {
          headers: {
            'User-Agent': userAgent,
          },
        });

        if (response.ok) {
          html = await response.text();
          // Check if we got meaningful content (not just a loading page)
          if (html.includes('og:title') || html.includes('twitter:title') || html.includes('<title>')) {
            break;
          }
        }
      } catch (error) {
        continue; // Try next user agent
      }
    }

    if (!response || !response.ok) {
      throw new Error(`HTTP ${response?.status || 'Network Error'}`);
    }

    // Extract metadata from HTML
    let metadata: LinkMetadata = {
      url,
      title: extractMetaTag(html, ['og:title', 'twitter:title', 'title']),
      description: extractMetaTag(html, ['og:description', 'twitter:description', 'description']),
      image: extractMetaTag(html, ['og:image', 'twitter:image']),
      siteName: extractMetaTag(html, ['og:site_name']),
    };

    // Special handling for Twitter/X links
    const urlObj = new URL(url);
    if (urlObj.hostname === 'x.com' || urlObj.hostname === 'twitter.com') {
      const pathParts = urlObj.pathname.split('/');
      if (pathParts.length >= 4 && pathParts[2] === 'status') {
        const username = pathParts[1];

        // If we don't have a description but have a title, provide a better fallback
        if (!metadata.description && metadata.title) {
          metadata.description = `View this post on X`;
        }

        // If we still don't have a title, use fallback
        if (!metadata.title) {
          metadata.title = `Post by @${username}`;
        }

        // If we don't have a specific post image, use the generic one
        if (!metadata.image || metadata.image === 'https://abs.twimg.com/rweb/ssr/default/v2/og/image.png') {
          // Try to find the post-specific image in the HTML
          const postImageMatch = html.match(/https:\/\/jf\.x\.com\/images\/post\/\d+\.png/);
          if (postImageMatch) {
            metadata.image = postImageMatch[0];
          } else {
            metadata.image = 'https://abs.twimg.com/responsive-web/client-web/icon-ios.77d25eba.png';
          }
        }

        // Ensure we have a siteName
        if (!metadata.siteName) {
          metadata.siteName = 'X (formerly Twitter)';
        }
      }
    }

    // Set cache headers
    res.setHeader('Cache-Control', 'public, s-max-age=3600, stale-while-revalidate=86400');

    return res.status(200).json(metadata);
  } catch (error) {
    console.error('Error fetching metadata:', error);
    return res.status(500).json({ error: 'Failed to fetch metadata' });
  }
}

function extractMetaTag(html: string, tags: string[]): string | undefined {
  for (const tag of tags) {
    // Try different attribute orders for Open Graph tags
    const ogPattern1 = new RegExp(`<meta\\s+property=["\']${tag}["\']\\s+content=["\']([^"']*)["\']`, 'i');
    const ogPattern2 = new RegExp(`<meta\\s+content=["\']([^"']*)["\']\\s+property=["\']${tag}["\']`, 'i');

    // Try different attribute orders for Twitter and other name-based tags
    const namePattern1 = new RegExp(`<meta\\s+name=["\']${tag}["\']\\s+content=["\']([^"']*)["\']`, 'i');
    const namePattern2 = new RegExp(`<meta\\s+content=["\']([^"']*)["\']\\s+name=["\']${tag}["\']`, 'i');

    let match = html.match(ogPattern1) || html.match(ogPattern2) || html.match(namePattern1) || html.match(namePattern2);

    if (match && match[1]) {
      return match[1].trim();
    }

    // Try title tag specifically
    if (tag === 'title') {
      const titlePattern = /<title[^>]*>([^<]+)<\/title>/i;
      match = html.match(titlePattern);
      if (match && match[1]) {
        return match[1].trim();
      }
    }
  }

  return undefined;
}
