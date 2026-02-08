import fs from "fs";
import path from "path";
import matter from "gray-matter";

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

  return (
    <div data-testid="doc-content" className="p-8">
      <pre>{content}</pre>
    </div>
  );
}
