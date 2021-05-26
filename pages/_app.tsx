import '../styles/global.css';

export default function App({ Component, pageProps }) {
  return (
    <div className="min-h-screen py-10 bg-white text-black dark:bg-gray-900 dark:text-gray-200">
      <Component {...pageProps} />
    </div>
  );
}
