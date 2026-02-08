type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">
        📘 Documentation Portal
      </h1>
      <p className="mt-4 text-gray-600">
        Language: {locale}
      </p>
    </main>
  );
}
