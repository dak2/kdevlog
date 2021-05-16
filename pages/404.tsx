import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="grid justify-items-center pt-64">
      <h1 className="text-5xl mb-10 font-bold">404 - Page Not Found</h1>
      <Link href="/">
        <a className="text-2xl">→ Go back home</a>
      </Link>
    </div>
  );
}
