import '../styles/global.scss';

export default function App({ Component, pageProps }) {
  return (
    <div className="min-h-screen font-mono py-10 bg-white text-black dark:bg-darknavy dark:text-gray-200">
      <Component {...pageProps} />
    </div>
  );
}
