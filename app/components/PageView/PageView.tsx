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
import Fuse from "fuse.js";
import dynamic from "next/dynamic";
import { Suspense, useDeferredValue, useMemo, useState } from "react";

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

export const PageView = (props: PageViewProps) => {
  // const [uiKits, setUiKits] = useState(props.uiKits);
  const [search, setSearch] = useState("");

  const fuse = useMemo(
    () =>
      new Fuse(props.uiKits, {
        keys: ["name"],
      }),
    [props.uiKits],
  );

  const deferredSearch = useDeferredValue(search);

  const uiKits = useMemo(() => {
    if (!deferredSearch) {
      return props.uiKits;
    }

    return fuse.search(deferredSearch).map(({ item }) => item);
  }, [deferredSearch, fuse, props.uiKits]);

  return (
    <>
      <Header>
        <View paddingX="size-300">
          <Heading level={1}>Find UI kit</Heading>
          <View elementType="p">Explore UI kits for rapid development</View>
          <SearchField label="Search by name" onChange={setSearch} />
        </View>
      </Header>
      <CardView<UiKit>
        aria-label="UI kits"
        items={uiKits}
        layout={WaterfallLayout}
      >
        {(item) => (
          <Card key={item.name}>
            {item.image && <Image alt={item.name} src={item.image} />}
            <Heading>{item.name}</Heading>
            <Content>
              {item.description}
              <Divider marginY="size-200" size="S" />
              <Flex justifyContent="space-between">
                <Button elementType="a" href={`#${item.key}`} variant="primary">
                  Details
                </Button>
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
