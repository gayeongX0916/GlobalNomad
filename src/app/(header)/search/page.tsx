import SearchClient from "@/components/search/SearchClient";

type SearchParams = { query?: string };

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { query = "" } = await searchParams;
  return <SearchClient initialQuery={query} />;
}
