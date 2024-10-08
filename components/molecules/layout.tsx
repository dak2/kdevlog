import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Footer from '../atoms/footerBar'
import Header from './headerBar'

export const siteTitle = 'Kdevlog'

export default function Layout({ children, home }) {
  const router = useRouter()
  const currentPageId = router.query.id ? Number(router.query.id) : ''
  return (
    <div id="layout" className="max-w-4xl mx-auto">
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
      <Header />
      <main>{children}</main>
      {!home && currentPageId != 1 && (
        <div id="back-page-link" className="my-12">
          <Link href="/">
            <p className="text-gray-200 hover:underline">← Back to home</p>
          </Link>
        </div>
      )}
      <div className="mt-10"></div>
      <Footer />
    </div>
  )
}
