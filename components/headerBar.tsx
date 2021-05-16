import Link from 'next/link';
import GithubIcon from './GithubIcon';
import ThemeChanger from './ThemeChanger';

const HeaderBar = () => {
  return (
    <div className="flex mb-40">
      <Link href="/">
        <h1 className="text-2xl	font-bold	mr-80 cursor-pointer">Kdevlog</h1>
      </Link>
      <div className="flex ml-60">
        <ThemeChanger />
        <a href="https://github.com/dak2">
          <GithubIcon />
        </a>
      </div>
    </div>
  );
};

export default HeaderBar;
