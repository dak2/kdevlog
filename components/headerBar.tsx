import Link from 'next/link';
import ThemeChanger from './ThemeChanger';

const HeaderBar = () => {
  return (
    <div className="flex mb-40">
      <Link href="/">
        <h1 className="text-2xl	font-bold	mr-80 cursor-pointer">Kdevlog</h1>
      </Link>
      <div className="flex ml-60">
        <ThemeChanger />
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
