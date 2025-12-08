import { expect } from "chai"
import toInteger from "../src/toInteger.js"

const MAX_INTEGER = 1.7976931348623157e+308

describe ("toInteger tests", () =>
{
    const testCases = [
        { value: -32.256, expected: -32, scenario: "Negative valid number"},
        { value: 32.256, expected: 32, scenario: "Positive valid number"},
        { value: 0.0, expected: 0, scenario: "Positive zero as decimal"},
        { value: -0.0, expected: -0, scenario: "Negative zero as decimal"},
        { value: NaN, expected: 0, scenario: "Not a number"},
        { value: null, expected: 0, scenario: "Null"},
        { value: Infinity, expected: MAX_INTEGER, scenario: "Positive infinity"},
        { value: -Infinity, expected: -MAX_INTEGER, scenario: "Negative infinity"},
        { value: "3.14159", expected: 3, scenario: "Positive valid number as string"},
        { value: "-3.14159", expected: -3, scenario: "Negative valid number as string"},
        { value: "", expected: 0, scenario: "Empty string"},
        { value: "Asd", expected: 0, scenario: "Invalid string"}
    ]

    testCases.forEach(({value, expected, scenario}) =>
    {
        it(scenario+": Should return "+expected+" when value is "+value, () =>
        {
            expect(toInteger(value)).to.deep.equal(expected)
        })
    })
})