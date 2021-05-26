import Head from 'next/head';

import Link from 'next/link';
import HeaderBar from './headerBar';
import Footer from '../atoms/footer';

export const siteTitle = 'Kdevlog';

export default function Layout({ children, home }) {
  return (
    <div className="max-w-4xl mx-auto">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={siteTitle} />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <HeaderBar />
      <main>{children}</main>
      {!home && (
        <div className="my-12">
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
      <Footer />
    </div>
  );
}
