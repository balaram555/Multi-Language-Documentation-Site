import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export const revalidate = 60;

type Props = {
  params: Promise<{
    locale: string;
    version: string;
    slug: string;
  }>;
};

export default async function DocPage({ params }: Props) {
  const { locale, version, slug } = await params;

  const filePath = path.join(
    process.cwd(),
    "_docs",
    version,
    locale,
    `${slug}.md`
  );

  const file = fs.readFileSync(filePath, "utf-8");
  const { content } = matter(file);

  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();

  return (
    <article
      data-testid="doc-content"
      className="prose max-w-none p-8"
      dangerouslySetInnerHTML={{ __html: contentHtml }}
    />
  );
}
