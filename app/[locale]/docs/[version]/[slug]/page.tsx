export const revalidate = 60;

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";

interface Params {
  locale: string;
  version: string;
  slug: string;
}

export default async function DocPage({
  params,
}: {
  params: Promise<Params>;
}) {
  // ✅ IMPORTANT FIX
  const { locale, version, slug } = await params;

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
      </main>
    );
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { content } = matter(fileContent);
//   console.log("MARKDOWN CONTENT ↓↓↓");
// console.log(content);


  const processedContent = await remark()
    .use(remarkGfm) 
    .use(html)
    .process(content);

  const contentHtml = processedContent.toString();

  return (
    <main
      data-testid="doc-content"
      className="prose max-w-none p-6"
    >
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </main>
  );
}
