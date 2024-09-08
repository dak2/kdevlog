import Link from 'next/link'
import GenericIcon from '../atoms/genericIcon'

const HeaderBar = () => {
  return (
    <div id="header" className="flex justify-start mb-32">
      <Link href="/">
        <h1 className="font-mono text-4xl font-bold text-gray-200 cursor-pointer mr-96">
          Kdevlog
        </h1>
      </Link>
      <div id="icon-container" className="flex ml-64">
        <a
          id="github-icon"
          href="https://github.com/dak2"
          className="ml-2 text-2xl"
        >
          <GenericIcon iconName="github" />
        </a>
        <a id="zenn-icon" href="https://zenn.dev/daichikk" className="ml-8">
          <GenericIcon iconName="zenn" />
        </a>
      </div>
    </div>
  )
}

export default HeaderBar
