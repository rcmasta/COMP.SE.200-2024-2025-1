import { expect } from "chai"
import clamp from "../src/clamp.js"

describe ("clamp tests", () => 
{
    const testCases = [
        { value: NaN, lower: 0, upper: 10, expected: NaN, scenario: "Value is NaN"},
        { value: Infinity, lower: 0, upper: 10, expected: 10, scenario: "Value is infinity" },
        { value: -Infinity, lower: 0, upper: 10, expected: 0, scenario: "Value is negative infinity" },
        { value: "asd", lower: 0, upper: 10, expected: NaN, scenario: "Value is string" },
        { value: -5, lower: NaN, upper: 10, expected: 0, scenario: "Lower bound is NaN" },
        { value: 5, lower: -10, upper: NaN, expected: 0, scenario: "Upper bound is NaN"},
        { value: 20, lower: 10, upper: 0, expected: 10, scenario: "Lower > upper, value out of bounds" },
        { value: 5, lower: 10, upper: 0, expected: 5, scenario: "Lower > upper, value in bounds" },
        { value: 5, lower: 2, upper: 8, expected: 5, scenario: "In bounds" },
        { value: -5, lower: 2, upper: 8, expected: 2, scenario: "Under lower bound"},
        { value: 10, lower: -8, upper: -2, expected: -2, scenario: "Over upper bound"}
    ]

    testCases.forEach(({value, lower, upper, expected, scenario}) =>
    {
        it(scenario+": Should return "+expected+" when value is "+value+" and bounds are "+lower+", "+upper, () =>
        {
            expect(clamp(value, lower, upper)).to.deep.equal(expected)
        })
    })
})