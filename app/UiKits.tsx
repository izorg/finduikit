"use client";

import Fuse from "fuse.js";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { type UiKit } from "./getUiKits";
import { useDebounce } from "./useDebounce";

type PageViewProps = {
  uiKits: UiKit[];
};

export const UiKits = (props: PageViewProps) => {
  const [search, setSearch] = useState("");

  const fuse = useMemo(
    () =>
      new Fuse(props.uiKits, {
        keys: ["name"],
      }),
    [props.uiKits],
  );

  const debouncedSearch = useDebounce(search, 200);

  const uiKits = useMemo(() => {
    if (!debouncedSearch) {
      return props.uiKits;
    }

    return fuse.search(debouncedSearch).map(({ item }) => item);
  }, [debouncedSearch, fuse, props.uiKits]);

  return (
    <>
      <input
        aria-label="Search by name"
        className="mx-auto h-[3.5rem] self-start rounded border border-outline p-[0.25rem_0rem_0.25rem_1rem]"
        onChange={(event) => {
          setSearch(event.currentTarget.value);
        }}
        placeholder="Search by name"
      />
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(15rem,_1fr))] gap-4 supports-[grid-template-rows:masonry]:grid-rows-[masonry]">
        {uiKits.map((item) => (
          <div
            className="relative rounded-[0.75rem] border border-outline-variant"
            key={item.name}
          >
            <div className="p-[0.75rem_0.25rem_0.75rem_1rem]">
              <Link
                className="text-title-medium after:absolute after:inset-0"
                href={item.homepage}
                target="_blank"
              >
                {item.name}
              </Link>
            </div>
            {item.image && (
              <div className="relative -z-10 aspect-[2/1] overflow-hidden">
                <Image
                  alt={item.name}
                  className="object-cover"
                  fill
                  src={item.image}
                />
              </div>
            )}
            <div className="p-4 text-body-medium">{item.description}</div>
          </div>
        ))}
      </div>
    </>
  );
};
