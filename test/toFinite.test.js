import { expect } from "chai"
import toFinite from "../src/toFinite.js"

const MAX_INTEGER = 1.7976931348623157e+308

describe ("toFinite tests", () => 
{
    const testCases = [
        { value: -Infinity, expected: -MAX_INTEGER, scenario: "negative infinity"},
        { value: Infinity, expected: MAX_INTEGER, scenario: "positive infinity"},
        { value: NaN, expected: 0, scenario: "NaN"},
        { value: "3.14159", expected: 3.14159, scenario: "string containing 3.14159"},
        { value: -0, expected: -0, scenario: "negative 0"},
        { value: "asd", expected: 0, scenario: "string"}
    ]

    testCases.forEach(({value, expected, scenario}) =>
    {
        it("Should return "+expected+" when value is "+scenario, () =>
        {
            expect(toFinite(value)).to.equal(expected)
        })
    })
})