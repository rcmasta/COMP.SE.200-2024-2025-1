import { expect } from "chai"
import get from "../src/get.js"

describe ("get tests", () =>
{
    const testCases = [
        { object: null, path: "a", defaultValue: "def", expected: "def", scenario: "Null object"},
        { object: {a:1}, path: null, defaultValue: "def", expected: "def", scenario: "Null path"},
        { object: {a:1}, path: "b", defaultValue: null, expected: null, scenario: "Null default"},
        { object: {a:[{b:1}]}, path: "a[0].b", defaultValue: "def", expected: 1, scenario: "Valid object and string path"},
        { object: {a:[{b:1}]}, path: ["a","0","b"], defaultValue: "def", expected: 1, scenario: "Valid object and array path"}
    ]

    testCases.forEach(({object, path, defaultValue, expected, scenario}) =>
    {
        it(scenario+": Should return "+expected+" when object is "+JSON.stringify(object)+", path is "+JSON.stringify(path)+", default value is "+defaultValue, () =>
        {
            expect(get(object, path, defaultValue)).to.deep.equal(expected)
        })
    })
})