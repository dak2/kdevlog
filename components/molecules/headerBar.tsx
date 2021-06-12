import Link from 'next/link';
import GithubIcon from '../atoms/icons/Github';
import ThemeChanger from '../atoms/ThemeChanger';

const HeaderBar = () => {
  return (
    <div className="flex mb-32 justify-start">
      <Link href="/">
        <h1 className="text-4xl	font-mono	font-bold	mr-96 cursor-pointer">Kdevlog</h1>
      </Link>
      <div className="flex ml-64">
        <ThemeChanger />
        <a href="https://github.com/dak2">
          <GithubIcon />
        </a>
      </div>
    </div>
  );
};

export default HeaderBar;
