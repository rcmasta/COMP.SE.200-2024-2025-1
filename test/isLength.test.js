import { expect } from "chai"
import isLength from "../src/isLength.js"

describe("isLength tests", () =>
{
    it("should return 'false' with value as -1", () =>
    {
        expect(isLength(-1)).to.equal(false)
    })
})