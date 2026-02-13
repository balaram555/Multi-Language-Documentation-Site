'use client'

export default function CodeBlock({ code }: { code: string }) {
  return (
    <div data-testid="code-block" className="relative">
      <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto">
        <code>{code}</code>
      </pre>
      <button
        data-testid="copy-code-button"
        onClick={() => navigator.clipboard.writeText(code)}
        className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 text-xs rounded"
      >
        Copy
      </button>
    </div>
  )
}
