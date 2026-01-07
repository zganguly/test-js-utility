"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Showing the output of the utility functions");
const utility_1 = require("./utility");
console.log("\n ---------------- groupBy ----------------");
const users = [
    { name: "Amar", role: "admin" },
    { name: "Bhushan", role: "user" },
    { name: "Chandan", role: "admin" },
    { name: "Dinesh", role: "user" },
    { name: "Ekta", role: "admin" },
    { name: "Faisal", role: "user" },
    { name: "Gaurav", role: "admin" },
    { name: "Hari", role: "user" },
    { name: "Ishan", role: "admin" },
    { name: "Jai", role: "user" },
    { name: "Karan", role: "admin" },
    { name: "Lakshman", role: "customer" },
    { name: "Manoj", role: "customer" },
];
console.log((0, utility_1.groupBy)(users, "role"));
console.log("\n ---------------- chunk ----------------");
console.log((0, utility_1.chunk)([1, 2, 3, 4, 5, 6, 7], 2));
console.log("\n ---------------- flattenDeep ----------------");
console.log((0, utility_1.flattenDeep)([1, [2, [3, [4]], 5]]));
console.log("\n ---------------- uniqueBy ----------------");
const products = [
    { id: 1, name: "Pen" },
    { id: 2, name: "Book" },
    { id: 1, name: "Pen Duplicate" }
];
console.log((0, utility_1.uniqueBy)(products, "id"));
console.log("\n ---------------- deepMerge ----------------");
const obj1 = {
    name: "Desk",
    config: {
        color: "white",
        size: "large"
    }
};
const obj2 = {
    config: {
        size: "small",
        weight: "heavy"
    }
};
console.log((0, utility_1.deepMerge)(obj1, obj2));
