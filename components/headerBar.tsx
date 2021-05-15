import Link from 'next/link';
import User from './User';
import Contact from './Contact';
import ThemeChanger from './ThemeChanger';

const HeaderBar = () => {
  return (
    <div className="flex mb-40">
      <Link href="/">
        <h1 className="text-2xl	font-bold	mr-80 cursor-pointer">Kdevlog</h1>
      </Link>
      <div className="flex ml-60">
        <ThemeChanger />
        {/* <Link href="/profile">
          <a className="ml-3">
            <User />
          </a>
        </Link>
        <Link href="/contact">
          <a className="ml-3">
            <Contact />
          </a>
        </Link> */}
      </div>
    </div>
  );
};

export default HeaderBar;
