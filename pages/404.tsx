import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="not-found-container">
      <div className="pt-64 grid justify-items-center">
        <h1 className="mb-10 text-5xl font-bold">404 - Page Not Found</h1>
        <Link href="/" className="text-2xl">
          → Go back home
        </Link>
      </div>
    </div>
  );
}
