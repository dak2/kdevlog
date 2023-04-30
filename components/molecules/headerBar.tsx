import Link from 'next/link';
import GenericIcon from '../atoms/genericIcon';

const HeaderBar = () => {
  return (
    <div id="header" className="flex mb-32 justify-start">
      <Link href="/">
        <h1 className="text-4xl font-bold	font-mono mr-96 cursor-pointer text-gray-200">
          Kdevlog
        </h1>
      </Link>
      <div id="github-icon-container" className="flex ml-64">
        <a id="github-icon" href="https://github.com/dak2" className="text-2xl ml-2">
          <GenericIcon iconName="github" />
        </a>
      </div>
    </div>
  );
};

export default HeaderBar;
