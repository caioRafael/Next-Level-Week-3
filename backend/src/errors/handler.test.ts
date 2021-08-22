import * as handler from "./handler"
// @ponicode
describe("handler.default", () => {
    test("0", () => {
        let callFunction: any = () => {
            handler.default("too many arguments", "POST", 429, true)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            handler.default("error\n", 400, 400, true)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            handler.default("multiple errors occurred", "DELETE", 400, false)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            handler.default("error", true, 200, true)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            handler.default(500, 500, true, 164)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            handler.default("", -Infinity, -Infinity, -Infinity)
        }
    
        expect(callFunction).not.toThrow()
    })
})
