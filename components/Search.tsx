'use client'

import { useState } from 'react'

export default function Search() {
  const [query, setQuery] = useState('')
  const docs = ['Introduction', 'Getting Started']

  const results = docs.filter(d =>
    d.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div>
      <input
        data-testid="search-input"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {query && results.length > 0 && (
        <div data-testid="search-results">
          {results.map(r => (
            <div key={r}>{r}</div>
          ))}
        </div>
      )}

      {query && results.length === 0 && (
        <div data-testid="search-no-results">
          No results found
        </div>
      )}
    </div>
  )
}
