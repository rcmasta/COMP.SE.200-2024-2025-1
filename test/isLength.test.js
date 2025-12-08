import { expect } from "chai"
import isLength from "../src/isLength.js"

describe("isLength tests", () =>
{
    const testCases = [
        { value: -1, expected: false, scenario: "Negative number"},
        { value: "asd", expected: false, scenario: "String"},
        { value: NaN, expected: false, scenario: "NaN"},
        { value: Infinity, expected: false, scenario: "Infinity"},
        { value: Number.MIN_VALUE, expected: false, scenario: "Minimum value"},
        { value: 0, expected: true, scenario: "Length 0"},
        { value: 1, expected: true, scenario: "Length 1"},
        { value: Number.MAX_SAFE_INTEGER, expected: true, scenario: "Maximum length"}
    ]

    testCases.forEach(({value, expected, scenario}) =>
    {
        it("Should return "+expected+" when value is "+scenario, () =>
        {
            expect(isLength(value)).to.deep.equal(expected)
        })
    })
})