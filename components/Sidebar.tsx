'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
  const pathname = usePathname()
  const parts = pathname.split('/')
  const locale = parts[1]
  const version = parts[3]

  const pages = ['introduction', 'getting-started']

  return (
    <aside data-testid="sidebar" className="w-60 p-4 border-r">
      {pages.map((slug) => (
        <div key={slug}>
          <Link
            href={`/${locale}/docs/${version}/${slug}`}
            data-testid={`sidebar-nav-link-${slug}`}
            className="block py-1"
          >
            {slug}
          </Link>
        </div>
      ))}
    </aside>
  )
}
