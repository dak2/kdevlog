import '../styles/global.scss'

export default function App({ Component, pageProps }) {
  return (
    <div
      id="_app"
      className="py-10 font-sans text-gray-200 bg-zinc-800 min-h-fit"
    >
      <Component {...pageProps} />
    </div>
  )
}
