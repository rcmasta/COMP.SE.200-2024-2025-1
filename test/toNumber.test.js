import { expect } from "chai"
import FUNCTION_HERE from "../src/toNumber.js"

describe ("toNumber tests", () =>
{
    const testCases = [
        { value: Infinity, expected: Infinity, scenario: "Infinity"},
        { value: NaN, expected: NaN, scenario: "NaN"},
        { value: Symbol(), expected: NaN, scenario: "Symbol"},
        { value: { toString() {return "asd"} }, expected: NaN, scenario: "Invalid object"},
        { value: Object.create(null), expected: NaN, scenario: "Null object"},
        { value: Date("2025-12-8"), expected: NaN, scenario: "Date object"},
        { value: new Number(-0), expected: -0, scenario: "Valid number object"},
        { value: { valueOf() {return 3}}, expected: 3, scenario: "Valid object that returns value"},
        { value: "asd", expected: NaN, scenario: "Invalid string"},
        { value: "3.o2", expected: NaN, scenario: "Invalid decimal string"},
        { value: "0xgf", expected: NaN, scenario: "Invalid hex string"},
        { value: "-0xff", expected: NaN, scenario: "Bad hex string"},
        { value: "0b20", expected: NaN, scenario: "Invalid binary string"},
        { value: "0o9ö", expected: NaN, scenario:"Invalid octal string"},
        { value: " 3.2 ", expected: 3.2, scenario: "Valid decimal string"},
        { value: "0xff", expected: 255, scenario: "Valid hex string"},
        { value: "0b10", expected: 2, scenario: "Valid binary string"},
        { value: "0o70", expected: 56, scenario: "Valid octal string"},
        { value: Number.MAX_VALUE, expected: Number.MAX_VALUE, scenario: "Max value"},
        { value: Number.MIN_VALUE, expected: Number.MIN_VALUE, scenario: "Min value"},
        { value: 10n, expected: 10n, scenario: "Big integer"},
        { value: -10, expected: -10, scenario: "Valid number"}
    ]

    testCases.forEach(({value, expected, scenario}) =>
    {
        if (typeof value === "symbol" || typeof value === "object")
        {
            it(scenario+": Should return "+expected+" when value is "+scenario, () =>
            {
                expect(FUNCTION_HERE(value)).to.deep.equal(expected)
            })
        }
        else
        {
            it(scenario+": Should return "+expected+" when value is "+value, () =>
            {
                expect(FUNCTION_HERE(value)).to.deep.equal(expected)
            })
        }
        
    })
})