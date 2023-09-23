// TODO: ライブラリ統一
import {
  FaGithub,
  FaAws,
  FaDocker,
  FaChevronLeft,
  FaChevronRight,
  FaRust,
  FaNodeJs,
  FaReact,
  FaLinux,
  FaBookOpen,
  FaDatabase,
} from 'react-icons/fa';
import {
  SiJavascript,
  SiRuby,
  SiRubyonrails,
  SiTypescript,
  SiDeno,
  SiMysql,
} from 'react-icons/si';
import { LuPencil } from 'react-icons/lu';
import { SiZenn } from '@icons-pack/react-simple-icons';

type Props = {
  iconName: string;
  styleName?: string;
};

const GenericIcon = (props: Props) => {
  const iconName = props.iconName;
  const styleName = props.styleName;
  const icons = {
    aws: <FaAws />,
    docker: <FaDocker />,
    github: <FaGithub />,
    javascript: <SiJavascript />,
    typescript: <SiTypescript />,
    nodejs: <FaNodeJs />,
    react: <FaReact />,
    ruby: <SiRuby />,
    rubyonrails: <SiRubyonrails />,
    rust: <FaRust />,
    deno: <SiDeno />,
    linux: <FaLinux />,
    right: <FaChevronRight />,
    left: <FaChevronLeft />,
    book: <FaBookOpen />,
    zenn: <SiZenn />,
    mysql: <SiMysql />,
    database: <FaDatabase />,
    poem: <LuPencil />,
  };

  return <div className={styleName}>{icons[iconName]}</div>;
};

export default GenericIcon;
