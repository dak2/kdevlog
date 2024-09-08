import { SiZenn } from '@icons-pack/react-simple-icons'
// TODO: ライブラリ統一
import {
  FaAws,
  FaBookOpen,
  FaChevronLeft,
  FaChevronRight,
  FaDatabase,
  FaDocker,
  FaGithub,
  FaLinux,
  FaNodeJs,
  FaReact,
  FaRust,
} from 'react-icons/fa'
import { LuPencil } from 'react-icons/lu'
import {
  SiDeno,
  SiJavascript,
  SiMysql,
  SiRuby,
  SiRubyonrails,
  SiTypescript,
} from 'react-icons/si'

type Props = {
  iconName: string
}

const GenericIcon = (props: Props) => {
  const iconName = props.iconName
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
  }

  return <div className={iconName}>{icons[iconName]}</div>
}

export default GenericIcon
