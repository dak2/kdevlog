import Link from 'next/link';
import GithubIcon from '../atoms/icons/github';
import Toggle from '../atoms/ThemeChanger';

const HeaderBar = () => {
  return (
    <div className="flex mb-32 justify-start">
      <Link href="/">
        <h1 className="text-4xl font-bold	mr-96 cursor-pointer text-gray-500 dark:text-gray-200">
          Kdevlog
        </h1>
      </Link>
      <div className="flex ml-64">
        <Toggle />
        <a href="https://github.com/dak2">
          <GithubIcon />
        </a>
      </div>
    </div>
  );
};

export default HeaderBar;
