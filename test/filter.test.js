import { expect } from "chai"
import filter from "../src/filter.js"

const testArray = [{"a": 1, "is":"no"},
                   {"b": 2, "is":"no"},
                   {"c": 3, "is":"yes"}]

const testPredicate = ({is}) => { return is === "yes" }
const testPredicateString = "({is}) => { return is === \"yes\" }"

const expectedValid = [{"c": 3, "is":"yes"}]


describe ("filter tests", () =>
{

    const testCases = [
        { array: testArray, predicate: testPredicate, expected: expectedValid, scenario: "Valid test" },
        { array: [], predicate: testPredicate, expected: [[]], scenario: "Empty array" },
        { array: null, predicate: testPredicate, expected: [[]], scenario: "Null array" },
        { array: testArray, predicate: () => {}, expected: [[]], scenario: "Empty predicate" },
        { array: testArray, predicate: null, expected: [[]], scenario: "Null predicate" }
    ]

    testCases.forEach(({array, predicate, expected, scenario}) =>
    {
        if (predicate === null)
        {
            it(scenario+": Should throw TypeError when predicate is null", () =>
            {
                expect(() => filter(array, predicate)).to.throw(TypeError)
            })
        }
        else
        {
            it(scenario+": Should return "+JSON.stringify(expected)+" when array is "+JSON.stringify(array)+", and predicate is "+testPredicateString, () =>
            {
                expect(filter(array, predicate)).to.deep.equal(expected)
            })
        }
        
    })
})