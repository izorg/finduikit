import { useSearchParams } from "next/navigation";

const searchKey = "search";

export const useSearch = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get(searchKey) ?? undefined;

  const setSearch = (search: string) => {
    const url = new URL(document.location.href);

    if (search) {
      url.searchParams.set(searchKey, search);
    } else {
      url.searchParams.delete(searchKey);
    }

    globalThis.history.pushState({}, "", url);
  };

  return {
    search,
    setSearch,
  };
};
