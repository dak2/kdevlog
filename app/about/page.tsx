import { SiX, SiZenn } from '@icons-pack/react-simple-icons'
import { FaGithub } from 'react-icons/fa'

import Link from 'next/link'

export default function About() {
  return (
    <div className="max-w-2xl">
      <section>
        <h2 className="text-xl font-semibold mb-4">SNS</h2>
        <div className="flex space-x-4">
          <Link
            href="https://github.com/dak2"
            className="flex items-center text-gray-300 hover:text-gray-400"
          >
            <FaGithub size={20} className="mr-2" />
          </Link>
          <Link
            href="https://zenn.dev/dak2"
            className="flex items-center text-gray-300 hover:text-gray-400"
          >
            <SiZenn size={20} className="mr-2" />
          </Link>
          <Link
            href="https://x.com/_dak2_"
            className="flex items-center text-gray-300 hover:text-gray-400"
          >
            <SiX size={20} className="mr-2" />
          </Link>
        </div>
      </section>
    </div>
  )
}
