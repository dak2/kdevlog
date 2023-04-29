import '../styles/global.scss';

export default function App({ Component, pageProps }) {
  return (
    <div id="_app" className="bg-zinc-800 min-h-fit font-sans py-10 text-gray-200">
      <Component {...pageProps} />
    </div>
  );
}
