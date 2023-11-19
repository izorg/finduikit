"use client";

import Fuse from "fuse.js";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { type UiKit } from "./getUiKits";
import { useSearch } from "./SearchProvider";

type PageViewProps = {
  uiKits: UiKit[];
};

export const UiKits = (props: PageViewProps) => {
  const { search } = useSearch();

  const fuse = useMemo(
    () =>
      new Fuse(props.uiKits, {
        keys: ["name"],
      }),
    [props.uiKits],
  );

  const uiKits = useMemo(() => {
    if (!search) {
      return props.uiKits;
    }

    return fuse.search(search).map(({ item }) => item);
  }, [search, fuse, props.uiKits]);

  return (
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
  );
};
