import '../styles/global.css';

export default function App({ Component, pageProps }) {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-800 dark:text-gray-200">
      <Component {...pageProps} />
    </div>
  );
}
