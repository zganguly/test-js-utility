// utils.ts

// ---------------- groupBy ----------------
export function groupBy<T, K extends PropertyKey>(
    collection: T[] | null | undefined,
    keySelector: ((item: T) => K) | keyof T
  ): Record<K, T[]> {
    if (!Array.isArray(collection)) return {} as Record<K, T[]>;
  
    return collection.reduce((result, item) => {
      const key =
        typeof keySelector === "function"
          ? keySelector(item)
          : (item as any)?.[keySelector];
  
      const groupKey = key as K;
  
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
  
      result[groupKey].push(item);
      return result;
    }, {} as Record<K, T[]>);
  }
  
  // ---------------- chunk ----------------
  export function chunk<T>(
    array: readonly T[] | null | undefined,
    size: number
  ): T[][] {
    if (!Array.isArray(array) || size <= 0) return [];
  
    const result: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }
  
  // ---------------- flattenDeep ----------------
  export type NestedArray<T> = T | NestedArray<T>[];
  
  export function flattenDeep<T>(
    value: NestedArray<T> | null | undefined
  ): T[] {
    if (value == null) return [];
  
    if (!Array.isArray(value)) return [value];
  
    return value.reduce<T[]>((acc, item) => {
      return acc.concat(flattenDeep(item));
    }, []);
  }
  
  // ---------------- uniqueBy ----------------
  export function uniqueBy<T, K extends PropertyKey>(
    array: T[] | null | undefined,
    keySelector: ((item: T) => K) | keyof T
  ): T[] {
    if (!Array.isArray(array)) return [];
  
    const seen = new Set<K>();
  
    return array.filter(item => {
      const key =
        typeof keySelector === "function"
          ? keySelector(item)
          : (item as any)?.[keySelector];
  
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }
  
  // ---------------- deepMerge ----------------
  export function deepMerge<T extends object, U extends object>(
    target: T | null | undefined,
    source: U | null | undefined
  ): T & U {
    if (typeof target !== "object" || target === null) {
      return source as T & U;
    }
  
    if (typeof source !== "object" || source === null) {
      return target as T & U;
    }
  
    const result: any = Array.isArray(target)
      ? [...target]
      : { ...target };
  
    for (const key in source) {
      const sourceValue = (source as any)[key];
      const targetValue = (result as any)[key];
  
      if (
        typeof sourceValue === "object" &&
        sourceValue !== null &&
        !Array.isArray(sourceValue)
      ) {
        result[key] = deepMerge(targetValue, sourceValue);
      } else {
        result[key] = sourceValue;
      }
    }
  
    return result;
  }
  