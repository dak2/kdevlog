import Link from 'next/link';

const HeaderBar = () => {
  return (
    <div className="flex mb-20">
      <h1 className="mr-56">Kdevlog</h1>
      <div className="flex ml-40">
        <Link href="/">
          <a className="mr-10">{'Home'}</a>
        </Link>
        <Link href="/profile">
          <a className="mr-10">{'Profile'}</a>
        </Link>
        <Link href="/contact">
          <a className="mr-10">{'contact'}</a>
        </Link>
      </div>
    </div>
  );
};

export default HeaderBar;
