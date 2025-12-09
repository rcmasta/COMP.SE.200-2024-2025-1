import { expect } from "chai"
import chunk from "../src/chunk.js"

describe ("chunk tests", () =>
{
    const testCases = [
        { array: [], size: 10, expected: [], scenario: "Empty array"},
        { array: null, size: 10, expected: [], scenario: "Null array"},
        { array: ["a","b","c","d"], size: 0, expected: [], scenario: "Length 4 array with size 0"},
        { array: ["a","b","c","d"], size: 1, expected: [["a"],["b"],["c"],["d"]], scenario: "Length 4 array with size 1"},
        { array: ["a","b","c","d"], size: 2, expected: [["a","b"],["c","d"]], scenario: "Length 4 array with size 2"},
        { array: ["a","b","c","d"], size: 1, expected: [["a","b","c"],["d"]], scenario: "Length 4 array with size 3"},
        { array: ["a","b","c","d"], size: 4, expected: [["a","b","c","d"]], scenario: "Length 4 array with size 4"},
        { array: ["a","b","c","d"], size: 5, expected: [["a","b","c","d",undefined]], scenario: "Length 4 array with size 5"}
    ]

    testCases.forEach(({array, size, expected, scenario}) =>
    {
        it(scenario+": Should return ["+expected+"] when array is ["+array+"] and chunk size is "+size, () =>
        {
            expect(chunk(array, size)).to.deep.equal(expected)
        })
    })
})