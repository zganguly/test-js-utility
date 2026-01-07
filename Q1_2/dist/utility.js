"use strict";
// utils.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupBy = groupBy;
exports.chunk = chunk;
exports.flattenDeep = flattenDeep;
exports.uniqueBy = uniqueBy;
exports.deepMerge = deepMerge;
// ---------------- groupBy ----------------
function groupBy(collection, keySelector) {
    if (!Array.isArray(collection))
        return {};
    return collection.reduce((result, item) => {
        const key = typeof keySelector === "function"
            ? keySelector(item)
            : item?.[keySelector];
        const groupKey = key;
        if (!result[groupKey]) {
            result[groupKey] = [];
        }
        result[groupKey].push(item);
        return result;
    }, {});
}
// ---------------- chunk ----------------
function chunk(array, size) {
    if (!Array.isArray(array) || size <= 0)
        return [];
    const result = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
}
function flattenDeep(value) {
    if (value == null)
        return [];
    if (!Array.isArray(value))
        return [value];
    return value.reduce((acc, item) => {
        return acc.concat(flattenDeep(item));
    }, []);
}
// ---------------- uniqueBy ----------------
function uniqueBy(array, keySelector) {
    if (!Array.isArray(array))
        return [];
    const seen = new Set();
    return array.filter(item => {
        const key = typeof keySelector === "function"
            ? keySelector(item)
            : item?.[keySelector];
        if (seen.has(key))
            return false;
        seen.add(key);
        return true;
    });
}
// ---------------- deepMerge ----------------
function deepMerge(target, source) {
    if (typeof target !== "object" || target === null) {
        return source;
    }
    if (typeof source !== "object" || source === null) {
        return target;
    }
    const result = Array.isArray(target)
        ? [...target]
        : { ...target };
    for (const key in source) {
        const sourceValue = source[key];
        const targetValue = result[key];
        if (typeof sourceValue === "object" &&
            sourceValue !== null &&
            !Array.isArray(sourceValue)) {
            result[key] = deepMerge(targetValue, sourceValue);
        }
        else {
            result[key] = sourceValue;
        }
    }
    return result;
}
