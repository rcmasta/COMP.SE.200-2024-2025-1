import { expect } from "chai"
import toNumber from "../src/toNumber.js"

describe ("toNumber tests according to testing plan", () =>
{
    describe ("Datatypes", () =>
    {
        const testCases = [
            { value: NaN, expected: NaN, scenario: "NaN"},
            { value: null, expected: NaN, scenario: "Null"},
            { value: undefined, expected: NaN, scenario: "Undefined"},
            { value: Symbol(), expected: NaN, scenario: "Symbol"},
            { value: { a:1, b:2 }, expected: NaN, scenario: "Object"},
            { value: Date("2025-12-8"), expected: NaN, scenario: "Date object"},
            { value: { valueOf() {return 3}}, expected: 3, scenario: "Valid object that returns value"},
            { value: true, expected: NaN, scenario: "Boolean"}
        ]

        testCases.forEach(({value, expected, scenario}) =>
        { test(value, expected, scenario) })
    })

    describe ("Numbers", () =>
    {
        const testCases = [
            { value: new Number(-0), expected: -0, scenario: "Valid number object"},
            { value: -Infinity, expected: -Infinity, scenario: "Negative Infinity"},
            { value: Number.MAX_VALUE, expected: Number.MAX_VALUE, scenario: "Max value"},
            { value: Number.MIN_VALUE, expected: Number.MIN_VALUE, scenario: "Min value"},
            { value: 10n, expected: 10n, scenario: "Safe Big integer"},
            { value: 10000000000000000n, expected: RangeError, scenario: "Unsafe Big integer"},
            { value: -10, expected: -10, scenario: "Valid number"}
        ]

        testCases.forEach(({value, expected, scenario}) =>
        { test(value, expected, scenario) })
    })

    describe ("String conversion", () =>
    {
        const testCases = [        
            { value: "asd", expected: NaN, scenario: "Invalid string"},
            { value: "3.O2", expected: NaN, scenario: "Invalid decimal string"},
            { value: "0xgf", expected: NaN, scenario: "Invalid hex string"},
            { value: "-0xff", expected: NaN, scenario: "Bad hex string"},
            { value: "0b20", expected: NaN, scenario: "Invalid binary string"},
            { value: "0o9ö", expected: NaN, scenario:"Invalid octal string"},
            { value: " 3.2 ", expected: 3.2, scenario: "Valid decimal string"},
            { value: "0xff", expected: 255, scenario: "Valid hex string"},
            { value: "0b10", expected: 2, scenario: "Valid binary string"},
            { value: "0o70", expected: 56, scenario: "Valid octal string"}
        ]

        testCases.forEach(({value, expected, scenario}) =>
        { test(value, expected, scenario) })
    })
        
})

function test(value, expected, scenario)
{
    if (typeof value === "symbol" || typeof value === "object")
    {
        if (typeof expected === "function")
        {
            it(scenario+": Should throw error when value is "+scenario, () =>
            { expect(() => toNumber(value)).to.throw(expected) })
        }
        else
        {
            it(scenario+": Should return "+expected+" when value is "+scenario, () =>
            { expect(toNumber(value)).to.deep.equal(expected) })
        }
    }
    else
    {
        if (typeof expected === "function")
        {
            it(scenario+": Should throw error when value is "+value, () =>
            { expect(() => toNumber(value)).to.throw(expected) })
        }
        else
        {
            it(scenario+": Should return "+expected+" when value is "+value, () =>
            { expect(toNumber(value)).to.deep.equal(expected) })
        }
    }
}

// Generated with Microsoft Copilot (GPT-5)
// Prompt:
// "Create a test suite that aims for 100% statement, branch, function and line coverage for attached JavaScript file.
//  Testing framework is Mocha and Chai."
describe("toNumber AI generated tests", () => {
  describe("numbers (early return)", () => {
    it("returns a finite number unchanged", () => {
      expect(toNumber(42)).to.equal(42);
    });

    it("preserves -0 (negative zero)", () => {
      const result = toNumber(-0);
      expect(result).to.equal(-0);
      // Distinguish -0 from +0
      expect(1 / result).to.equal(-Infinity);
    });

    it("returns Infinity unchanged", () => {
      expect(toNumber(Infinity)).to.equal(Infinity);
    });

    it("returns Number.MIN_VALUE unchanged", () => {
      expect(toNumber(Number.MIN_VALUE)).to.equal(Number.MIN_VALUE);
    });
  });

  describe("symbols → NaN", () => {
    it("returns NaN for a symbol primitive", () => {
      const result = toNumber(Symbol("s"));
      expect(Number.isNaN(result)).to.equal(true);
    });

    it("returns NaN for a Symbol object", () => {
      const result = toNumber(Object(Symbol("s")));
      expect(Number.isNaN(result)).to.equal(true);
    });
  });

  describe("objects", () => {
    it("uses valueOf when it returns a primitive number", () => {
      const obj = { valueOf() { return 7; } };
      expect(toNumber(obj)).to.equal(7);
    });

    it("uses valueOf when it returns a primitive string (and trims it)", () => {
      const obj = { valueOf() { return "  13  "; } };
      expect(toNumber(obj)).to.equal(13);
    });

    it("stringifies when valueOf returns an object, then coerces to NaN", () => {
      const obj = { valueOf() { return { x: 1 }; } };
      const result = toNumber(obj);
      expect(Number.isNaN(result)).to.equal(true);
    });

    it("no valueOf function (e.g., null-prototype object) → stringified then NaN", () => {
      const obj = Object.create(null); // no valueOf
      const result = toNumber(obj);
      expect(Number.isNaN(result)).to.equal(true);
    });

    it("valueOf returns BigInt → unary plus throws TypeError", () => {
      const obj = { valueOf() { return 10n; } };
      expect(() => toNumber(obj)).to.throw(TypeError);
    });
  });

  describe("non-string, non-object values", () => {
    it("coerces true to 1", () => {
      expect(toNumber(true)).to.equal(1);
    });

    it("coerces false to 0", () => {
      expect(toNumber(false)).to.equal(0);
    });

    it("returns 0 unchanged (value === 0 branch)", () => {
      expect(toNumber(0)).to.equal(0);
    });

    it("preserves -0 via (value === 0) check", () => {
      const result = toNumber(-0);
      expect(result).to.equal(-0);
      expect(1 / result).to.equal(-Infinity);
    });

    it("coercion of undefined yields NaN", () => {
      const result = toNumber(undefined);
      expect(Number.isNaN(result)).to.equal(true);
    });

    it("BigInt throws TypeError on unary plus", () => {
      expect(() => toNumber(10n)).to.throw(TypeError);
    });

    it("BigInt 0n also throws TypeError (not equal to numeric 0)", () => {
      expect(() => toNumber(0n)).to.throw(TypeError);
    });
  });

  describe("strings", () => {
    it("trims leading and trailing whitespace", () => {
      expect(toNumber("   3.2   ")).to.equal(3.2);
    });

    it("parses binary strings 0b… via parseInt(base 2)", () => {
      expect(toNumber("0b101010")).to.equal(parseInt("101010", 2));
    });

    it("parses octal strings 0o… via parseInt(base 8)", () => {
      expect(toNumber("0o17")).to.equal(parseInt("17", 8)); // 15
    });

    it("returns NaN for bad signed hex like '+0x1a' or '-0xFF'", () => {
      const a = toNumber("+0x1a");
      const b = toNumber("-0xFF");
      expect(Number.isNaN(a)).to.equal(true);
      expect(Number.isNaN(b)).to.equal(true);
    });

    it("returns numeric value for normal hex '0xFF'", () => {
      expect(toNumber("0xFF")).to.equal(255);
    });

    it("empty after trimming ('   ') becomes 0", () => {
      expect(toNumber("     ")).to.equal(0);
    });

    it("non-numeric string becomes NaN", () => {
      const result = toNumber("not-a-number");
      expect(Number.isNaN(result)).to.equal(true);
    });
  });

  describe("boxed primitives", () => {
    it("Number object → 5", () => {
      expect(toNumber(new Number(5))).to.equal(5);
    });

    it("boxed string via object valueOf → correct numeric", () => {
      const boxed = { valueOf() { return new String("  24  "); } };
      expect(toNumber(boxed)).to.equal(24);
    });
  });
});
