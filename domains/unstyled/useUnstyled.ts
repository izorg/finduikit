import { useSearchParams } from "next/navigation";

const unstyledKey = "unstyled";

export const useUnstyled = () => {
  const searchParams = useSearchParams();
  const searchUnstyled = searchParams.get(unstyledKey);

  const unstyled = searchUnstyled === "true";

  const setUnstyled = (unstyled: boolean) => {
    const nextSearchParams = new URLSearchParams(searchParams);

    nextSearchParams.set(unstyledKey, String(unstyled));

    globalThis.history.pushState({}, "", `?${nextSearchParams.toString()}`);
  };

  return {
    setUnstyled,
    unstyled,
  };
};
