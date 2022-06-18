import { FaGithub, FaAws, FaDocker, FaChevronLeft, FaChevronRight, FaRust, FaNodeJs, FaReact } from 'react-icons/fa';
import { SiJavascript, SiRuby, SiRubyonrails, SiTypescript, SiDeno } from 'react-icons/si';

type Props = {
  iconName: string;
}

const GenericIcon = (props: Props) => {
  const iconName = props.iconName;

  const icons = {
    'aws': <FaAws/>,
    'docker': <FaDocker/>,
    'github': <FaGithub/>,
    'javascript': <SiJavascript/>,
    'typescript': <SiTypescript/>,
    'nodejs': <FaNodeJs/>,
    'react': <FaReact/>,
    'ruby': <SiRuby/>,
    'ruby-on-rails': <SiRubyonrails/>,
    'rust': <FaRust/>,
    'deno': <SiDeno/>,
    'right': <FaChevronRight/>,
    'left': <FaChevronLeft/>,
  }

  return icons[iconName]
}

export default GenericIcon;
