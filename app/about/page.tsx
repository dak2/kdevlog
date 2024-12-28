import { FaGithub } from "react-icons/fa";
import { SiZenn, SiX } from '@icons-pack/react-simple-icons'

import Link from 'next/link'

export default function About() {
  return (
    <div className="max-w-2xl mx-auto">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
        <div className="flex space-x-4">
          <Link href="https://github.com/dak2" className="flex items-center text-gray-300 hover:text-gray-100">
            <FaGithub size={20} className="mr-2" />
          </Link>
          <Link href="https://zenn.dev/dak2" className="flex items-center text-gray-300 hover:text-gray-100">
            <SiZenn size={20} className="mr-2" />
          </Link>
          <Link href="https://x.com/_dak2_" className="flex items-center text-gray-300 hover:text-gray-100">
            <SiX size={20} className="mr-2" />
          </Link>
        </div>
      </section>
    </div>
  )
}

