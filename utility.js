// utils.js

// ---------------- groupBy ----------------
function groupBy(collection, keySelector) {
    if (!Array.isArray(collection)) return {};

    return collection.reduce((result, item) => {
        const key =
            typeof keySelector === "function" ?
            keySelector(item) :
            item && Object.prototype.hasOwnProperty.call(item, keySelector) ?
            item[keySelector] :
            undefined;

        const groupKey = String(key); // handle non-primitive keys

        if (!result[groupKey]) result[groupKey] = [];
        result[groupKey].push(item);

        return result;
    }, {});
}

// ---------------- chunk ----------------
function chunk(array, size) {
    if (!Array.isArray(array) || size <= 0) return [];

    const result = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
}

// ---------------- flattenDeep ----------------
function flattenDeep(value) {
    if (!Array.isArray(value)) return [value];

    return value.reduce((acc, item) => {
        return acc.concat(Array.isArray(item) ? flattenDeep(item) : item);
    }, []);
}

// ---------------- uniqueBy ----------------
function uniqueBy(array, keySelector) {
    if (!Array.isArray(array)) return [];

    const seen = new Set();

    return array.filter(item => {
        const key =
            typeof keySelector === "function" ?
            keySelector(item) :
            item && Object.prototype.hasOwnProperty.call(item, keySelector) ?
            item[keySelector] :
            undefined;

        const keyString = typeof key === "object" ?
            JSON.stringify(key) :
            String(key);

        if (seen.has(keyString)) return false;
        seen.add(keyString);
        return true;
    });
}

// ---------------- deepMerge ----------------
function deepMerge(target, source) {
    if (typeof target !== "object" || target === null) return source;
    if (typeof source !== "object" || source === null) return target;

    const result = Array.isArray(target) ? [...target] : {...target };

    for (const key in source) {
        if (
            typeof source[key] === "object" &&
            source[key] !== null &&
            !Array.isArray(source[key])
        ) {
            result[key] = deepMerge(result[key], source[key]);
        } else {
            result[key] = source[key];
        }
    }

    return result;
}

module.exports = {
    groupBy,
    chunk,
    flattenDeep,
    uniqueBy,
    deepMerge
};