export type DynamicRouteParams<
  T extends object = Partial<Record<string, string | string[]>>,
> = Promise<T>;
