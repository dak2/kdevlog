import '../styles/global.scss'
import { Inter } from 'next/font/google'
import Header from './components/header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Kdevlog',
  description: 'A personal tech blog',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900 text-gray-100`}>
        <Header />
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="text-center py-4 text-sm text-gray-400">
          © {new Date().getFullYear()} Kdevlog. All rights reserved.
        </footer>
      </body>
    </html>
  )
}

