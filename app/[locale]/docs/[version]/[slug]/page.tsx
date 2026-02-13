export const revalidate = 60;

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import CodeBlock from "../../../../../components/CodeBlock";

interface Params {
  locale?: string;
  version?: string;
  slug?: string | string[];
}

const markdownComponents: Components = {
  code({ className, children }) {
    const isInline = !className;
    const code = String(children).replace(/\n$/, "");

    if (isInline) {
      return (
        <code className="bg-gray-200 px-1 rounded">
          {children}
        </code>
      );
    }

    return <CodeBlock code={code} />;
  },
};

export default async function DocPage({
  params,
}: {
  params: Params | Promise<Params>;
}) {
  // 🔥 IMPORTANT: Await params (Next 16 compatibility)
  const resolvedParams = await params;

  const locale = resolvedParams?.locale;
  const version = resolvedParams?.version;

  const slugParam = resolvedParams?.slug;
  const slug = Array.isArray(slugParam)
    ? slugParam[0]
    : slugParam;

  if (!locale || !version || !slug) {
    return (
      <main className="p-6">
        <h1>Invalid route parameters</h1>
        <pre>{JSON.stringify(resolvedParams, null, 2)}</pre>
      </main>
    );
  }

  const filePath = path.join(
    process.cwd(),
    "_docs",
    locale,
    version,
    `${slug}.md`
  );

  if (!fs.existsSync(filePath)) {
    return (
      <main className="p-6">
        <h1>Document not found</h1>
        <p>{filePath}</p>
      </main>
    );
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { content } = matter(fileContent);

  return (
    <main
      data-testid="doc-content"
      className="prose max-w-none p-6"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={markdownComponents}
      >
        {content}
      </ReactMarkdown>
    </main>
  );
}
