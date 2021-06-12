import Head from 'next/head';
import Link from 'next/link';
import HeaderBar from './HeaderBar';
import Footer from '../atoms/Footer';
import { useRouter } from 'next/router';

export const siteTitle = 'Kdevlog';

export default function Layout({ children, home }) {
  const router = useRouter();
  const currentPageId = router.query.id ? Number(router.query.id) : '';
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
      {!home && currentPageId != 1 && (
        <div className="my-12">
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
      <div className="border-b-2 mt-10"></div>
      <Footer />
    </div>
  );
}
