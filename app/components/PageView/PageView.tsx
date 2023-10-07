"use client";

import {
  Button,
  Content,
  Divider,
  Flex,
  Header,
  Heading,
  Image,
  SearchField,
  View,
} from "@adobe/react-spectrum";
import { Card, CardView, WaterfallLayout } from "@react-spectrum/card";
import { Size } from "@react-stately/virtualizer";
import Fuse from "fuse.js";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useMemo, useState } from "react";

import { type UiKit } from "../../getUiKits";

const UiKitDialog = dynamic(
  () => import("../UiKitDialog").then((mod) => mod.UiKitDialog),
  {
    ssr: false,
  },
);

type PageViewProps = {
  uiKits: UiKit[];
};

// const isObjKey = <T extends object>(key: PropertyKey, obj: T): key is keyof T =>
//   key in obj;

const useDebounce = <T extends any>(value: T, delay?: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const PageView = (props: PageViewProps) => {
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

  const layout = useMemo(
    () =>
      new WaterfallLayout<UiKit>({
        minSpace: new Size(24, 24),
      }),
    [],
  );

  return (
    <>
      <Header>
        <View paddingX="size-300">
          <Heading level={1}>Find UI kit</Heading>
          <View elementType="p">Explore UI kits for rapid development</View>
          <SearchField label="Search by name" onChange={setSearch} />
        </View>
      </Header>
      <CardView<UiKit> aria-label="UI kits" items={uiKits} layout={layout}>
        {(item) => (
          <Card key={item.name}>
            {item.image && <Image alt={item.name} src={item.image} />}
            <Heading>{item.name}</Heading>
            <Content>
              {item.description}
              <Divider marginY="size-200" size="S" />
              <Flex justifyContent="space-between">
                {/*<Button elementType="a" href={`#${item.key}`} variant="primary">*/}
                {/*  Details*/}
                {/*</Button>*/}
                <Button
                  elementType="a"
                  href={item.homepage}
                  style="fill"
                  target="_blank"
                  variant="primary"
                >
                  Visit
                </Button>
              </Flex>
            </Content>
          </Card>
        )}
      </CardView>
      <Suspense>
        <UiKitDialog uiKits={uiKits} />
      </Suspense>
    </>
  );
};
