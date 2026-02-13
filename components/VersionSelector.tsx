'use client'
import { useRouter, usePathname } from 'next/navigation'

export default function VersionSelector() {
  const router = useRouter()
  const pathname = usePathname()

  const versions = ['v1', 'v2', 'v3']

  const changeVersion = (version: string) => {
    const parts = pathname.split('/')
    parts[3] = version
    router.push(parts.join('/'))
  }

  return (
    <div>
      <select
        data-testid="version-selector"
        onChange={(e) => changeVersion(e.target.value)}
      >
        {versions.map(v => (
          <option
            key={v}
            value={v}
            data-testid={`version-option-${v}`}
          >
            {v}
          </option>
        ))}
      </select>
    </div>
  )
}
