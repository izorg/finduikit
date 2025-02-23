/**
 * Source https://github.com/colinhacks/zod/discussions/2125#discussioncomment-7452235
 */
export function getEnumValues<T extends Record<string, unknown>>(obj: T) {
  return Object.values(obj) as [(typeof obj)[keyof T]];
}
