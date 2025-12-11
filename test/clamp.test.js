import { expect } from "chai"
import clamp from "../src/clamp.js"

describe ("clamp tests according to testing plan", () => 
{
    const validValue = 20
    const validInBounds = 5
    const string = "asd"
    const validBound = 10

    const testCases = [
        { value: validValue, lower: -validBound, upper: validBound, expected: validBound, scenario: "Valid, over upper bound"},
        { value: -validValue, lower: -validBound, upper: validBound, expected: -validBound, scenario: "Valid, under lower bound"},
        { value: validInBounds, lower: -validBound, upper: validBound, expected: validInBounds, scenario: "In bounds" },
        { value: string, lower: -validBound, upper: validBound, expected: NaN, scenario: "Value is string" },
        { value: validValue, lower: string, upper: validBound, expected: TypeError, scenario: "Lower bound is string" },
        { value: validValue, lower: -validBound, upper: string, expected: TypeError, scenario: "Upper bound is string"},
        { value: NaN, lower: -validBound, upper: validBound, expected: NaN, scenario: "Value is NaN"},
        { value: validValue, lower: NaN, upper: validBound, expected: TypeError, scenario: "Lower bound is NaN" },
        { value: validValue, lower: -validBound, upper: NaN, expected: TypeError, scenario: "Upper bound is NaN"},
        { value: Infinity, lower: -validBound, upper: validBound, expected: validBound, scenario: "Value is infinity" },
        { value: -Infinity, lower: -validBound, upper: validBound, expected: -validBound, scenario: "Value is negative infinity" },
        { value: validValue, lower: validBound, upper: -validBound, expected: RangeError, scenario: "Lower > upper, value out of bounds" },
        { value: validInBounds, lower: validBound, upper: -validBound, expected: RangeError, scenario: "Lower > upper, value in bounds" }
    ]

    testCases.forEach(({value, lower, upper, expected, scenario}) =>
    {
        if (typeof expected === "function")
        {
            it(scenario+": Should throw error when value is "+value+" and bounds are "+lower+", "+upper, () =>
            {
                expect(clamp(value, lower, upper)).to.throw(expected)
            })
        }
        else
        {
            it(scenario+": Should return "+expected+" when value is "+value+" and bounds are "+lower+", "+upper, () =>
            {
                expect(clamp(value, lower, upper)).to.deep.equal(expected)
            })
        }
        
    })
})