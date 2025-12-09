import { expect } from "chai"
import toString from "../src/toString.js"

describe ("toString tests", () =>
{
    const testCases = [
        { value: null, expected: "", scenario: "Null"},
        { value: -0, expected: "-0", scenario: "Negative zero"},
        { value: 10000000000000000n, expected: "10000000000000000", scenario: "BigInt"},
        { value: Infinity, expected: "Infinity", scenario: "Infinity"},
        { value: [1,2,3], expected: "1,2,3", scenario: "Array" },
        { value: [null], expected: "", scenario: "Null array" },
        { value: "Asd", expected: "Asd", scenario: "String"},
        { value: Symbol("Das"), expected: "Symbol(Das)", scenario: "Symbol"},
        { value: {a:1}, expected: "[object Object]", scenario: "Object" }
    ]

    testCases.forEach(({value, expected, scenario}) =>
    {
        if (typeof value === "symbol")
        {
            it(scenario+": Should return '"+expected+"' when value is symbol", () =>
            {
                expect(toString(value)).to.deep.equal(expected)
            })
        }
        else
        {
            it(scenario+": Should return '"+expected+"' when value is "+value, () =>
            {
                expect(toString(value)).to.deep.equal(expected)
            })
        }
    })
})