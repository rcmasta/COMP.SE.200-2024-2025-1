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

describe ("clamp AI generated tests", () => 
{
    describe('clamp(number, lower, upper)', () => {
    describe('basic behavior (lower >= upper)', () => {
        it('returns number unchanged when number is within [upper, lower]', () => {
        // number in range: upper=5, lower=10, number=7
        // branches: (>= upper) true, (<= lower) true
        expect(clamp(7, 10, 5)).to.equal(7);
        });

        it('returns upper when number < upper', () => {
        // branches: (>= upper) false -> number=upper, then (<= lower) true
        expect(clamp(3, 10, 5)).to.equal(5);
        });

        it('returns lower when number > lower', () => {
        // branches: (>= upper) true, then (<= lower) false -> number=lower
        expect(clamp(11, 10, 5)).to.equal(10);
        });
    });

    describe('behavior when lower < upper (current implementation)', () => {
        it('returns lower even if number < upper', () => {
        // number=2, lower=-5, upper=5
        // (>= upper) false -> number=5; (<= lower) false -> number=lower (-5)
        expect(clamp(2, -5, 5)).to.equal(-5);
        });

        it('returns lower even if number > upper', () => {
        // number=10, lower=-5, upper=5
        // (>= upper) true -> number=10; (<= lower) false -> number=lower (-5)
        expect(clamp(10, -5, 5)).to.equal(-5);
        });
    });

    describe('type coercion', () => {
        it('coerces numeric strings', () => {
        expect(clamp('3', '10', '5')).to.equal(5);
        });

        it('coerces booleans', () => {
        // +true => 1, upper=1, lower=0
        // (>= upper) true; (<= lower) false -> number=lower (0)
        expect(clamp(true, 0, 1)).to.equal(0);
        });
    });

    describe('NaN handling', () => {
        it('treats NaN lower as 0', () => {
        // lower becomes 0
        // number=1, upper=5 => (>= upper) false -> number=5; (<= lower=0) false -> 0
        expect(clamp(1, NaN, 5)).to.equal(0);
        });

        it('treats NaN upper as 0', () => {
        // upper becomes 0
        // number=1 => (>= upper=0) true; (<= lower=10) true -> 1
        expect(clamp(1, 10, NaN)).to.equal(1);
        });

        it('returns NaN when number is NaN', () => {
        const result = clamp(NaN, 1, 2);
        expect(Number.isNaN(result)).to.equal(true);
        });

        it('returns NaN when number cannot be coerced', () => {
        const result = clamp('not-a-number', 1, 2);
        expect(Number.isNaN(result)).to.equal(true);
        });
    });
    });
})