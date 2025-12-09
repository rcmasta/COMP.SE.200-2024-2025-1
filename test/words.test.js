import { expect } from "chai"
import words from "../src/words.js"

describe ("words tests", () =>
{
    const testCases = [
        {
            value: "fred, barney, & pebbles",
            pattern: undefined,
            expected: ['fred', 'barney', 'pebbles'],
            scenario: "String with no pattern"
        },
        {
            value: "www.example.com",
            pattern: /[^\.]+/g,
            expected: ['www', 'example', 'com'],
            scenario: "String with pattern"
        },
        {
            value: "",
            pattern: undefined,
            expected: [],
            scenario: "Empty string with no pattern"
        },
        {
            value: "",
            pattern: /[^\.]+/g,
            expected: [],
            scenario: "Empty string with pattern"
        },
        {
            value: "Dads sad ads",
            pattern: null,
            expected: [],
            scenario: "String with null pattern"
        },
        {
            value: null,
            pattern: /[^\.]+/g,
            expected: [],
            scenario: "Null string with pattern"
        }
    ]

    testCases.forEach(({value, pattern, expected, scenario}) =>
    {
        it(scenario+": Should return ["+expected+"] when value is '"+value+ "' and pattern is '"+pattern+"'", () =>
        {
            expect(words(value, pattern)).to.deep.equal(expected)
        })
    })
})