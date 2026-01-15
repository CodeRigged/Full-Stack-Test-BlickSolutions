export type Nullable<T> = T | null
export type DotPaths<T> = {
  [K in keyof T]: T[K] extends string
    ? `${K & string}` // Include if the value is a string
    : T[K] extends Record<string, object | string>
      ? `${K & string}.${DotPaths<T[K]>}` // Recurse if the value is an object
      : never // Exclude other types
}[keyof T]
