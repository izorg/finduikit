import { useSearchParams } from "next/navigation";

const searchKey = "search";

export const useSearch = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get(searchKey) ?? undefined;

  const setSearch = (search: string) => {
    const nextSearchParams = new URLSearchParams(searchParams);

    if (search) {
      nextSearchParams.set(searchKey, search);
    } else {
      nextSearchParams.delete(searchKey);
    }

    globalThis.history.pushState({}, "", `?${nextSearchParams.toString()}`);
  };

  return {
    search,
    setSearch,
  };
};
