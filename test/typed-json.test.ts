import { assert } from "chai";
import "mocha";
import sinon = require("sinon");

import { TypedJSON } from "../src/typed-json";

describe("typed-json.ts", function () {

    afterEach(function () {
        sinon.restore();
    });

    describe("TypedJSON", function () {

        it("should exist", function () {
            assert.exists(TypedJSON);
        });

        describe("constructor", function () {

            it("should construct a `TypedJSON` object, regardless of its argument", function () {
                assert.instanceOf(new TypedJSON({}), TypedJSON);
                assert.instanceOf(new TypedJSON([]), TypedJSON);
                assert.instanceOf(new TypedJSON(0), TypedJSON);
                assert.instanceOf(new TypedJSON(""), TypedJSON);
                assert.instanceOf(new TypedJSON(true), TypedJSON);
                assert.instanceOf(new TypedJSON(undefined), TypedJSON);
                assert.instanceOf(new TypedJSON(null), TypedJSON);
            });

        });

        describe(".value", function () {

            it("should contain the value with which it was constructed", function () {
                function assertForValue(value: any) {
                    assert.strictEqual(new TypedJSON(value).value, value);
                }
                assertForValue({});
                assertForValue([]);
                assertForValue(0);
                assertForValue("");
                assertForValue(true);
                assertForValue(undefined);
                assertForValue(null);
            });

        });

        describe(".isString", function () {

            it("should be true only if `.value` is a `string`", function () {
                assert.isTrue(new TypedJSON("any string").isString());
                assert.isFalse(new TypedJSON(9000).isString());
                assert.isFalse(new TypedJSON(NaN).isString());
                assert.isFalse(new TypedJSON(0).isString());
                assert.isFalse(new TypedJSON(true).isString());
                assert.isFalse(new TypedJSON(false).isString());
                assert.isFalse(new TypedJSON(null).isString());
                assert.isFalse(new TypedJSON(undefined).isString());
                assert.isFalse(new TypedJSON({ string: "stringy" }).isString());
                assert.isFalse(new TypedJSON(["string"]).isString());
            });

        });

        describe(".string", function () {

            it("should be `.value` if it is a `string`", function () {
                const anyString = "any string";
                assert.strictEqual(new TypedJSON(anyString).string(), anyString);
            });

            it("should be `undefined` if it is not a `string`", function () {
                assert.isUndefined(new TypedJSON({}).string());
            });

        });

        describe(".isNumber", function () {

            it("should be true only if `.value` is a `number`", function () {
                assert.isFalse(new TypedJSON("number").isNumber());
                assert.isFalse(new TypedJSON("9000").isNumber());
                assert.isTrue(new TypedJSON(9000).isNumber());
                assert.isTrue(new TypedJSON(NaN).isNumber());
                assert.isTrue(new TypedJSON(0).isNumber());
                assert.isFalse(new TypedJSON(true).isNumber());
                assert.isFalse(new TypedJSON(false).isNumber());
                assert.isFalse(new TypedJSON(null).isNumber());
                assert.isFalse(new TypedJSON(undefined).isNumber());
                assert.isFalse(new TypedJSON({ number: 9000 }).isNumber());
                assert.isFalse(new TypedJSON([9000]).isNumber());
            });

        });

        describe(".number", function () {

            it("should be `.value` if it is a `number`", function () {
                const anyNumber = 9000;
                assert.strictEqual(new TypedJSON(anyNumber).number(), anyNumber);
            });

            it("should be `.undefined` if it is not a `string`", function () {
                assert.isUndefined(new TypedJSON({}).number());
            });

        });

        describe(".isBoolean", function () {

            it("should be true only if `.value` is a `number`", function () {
                assert.isFalse(new TypedJSON("number").isBoolean());
                assert.isFalse(new TypedJSON(9000).isBoolean());
                assert.isFalse(new TypedJSON(NaN).isBoolean());
                assert.isFalse(new TypedJSON(0).isBoolean());
                assert.isTrue(new TypedJSON(true).isBoolean());
                assert.isTrue(new TypedJSON(false).isBoolean());
                assert.isFalse(new TypedJSON(null).isBoolean());
                assert.isFalse(new TypedJSON(undefined).isBoolean());
                assert.isFalse(new TypedJSON({ boolean: true }).isBoolean());
                assert.isFalse(new TypedJSON([true]).isBoolean());
            });

        });

        describe(".boolean", function () {

            it("should be `.value` if it is a `boolean`", function () {
                const anyBoolean = true;
                assert.strictEqual(new TypedJSON(anyBoolean).boolean(), anyBoolean);
            });

            it("should be `.undefined` if it is not a `boolean`", function () {
                assert.isUndefined(new TypedJSON({}).boolean());
            });

        });

        describe(".isNull", function () {

            it("should be true only if `.value` is `null`", function () {
                assert.isFalse(new TypedJSON("null").isNull());
                assert.isFalse(new TypedJSON(9000).isNull());
                assert.isFalse(new TypedJSON(NaN).isNull());
                assert.isFalse(new TypedJSON(0).isNull());
                assert.isFalse(new TypedJSON(true).isNull());
                assert.isFalse(new TypedJSON(false).isNull());
                assert.isTrue(new TypedJSON(null).isNull());
                assert.isFalse(new TypedJSON(undefined).isNull());
                assert.isFalse(new TypedJSON({}).isNull());
                assert.isFalse(new TypedJSON([null]).isNull());
                assert.isFalse(new TypedJSON([]).isNull());
            });

        });

        describe(".isUndefined", function () {

            it("should be true only if `.value` is `undefined`", function () {
                assert.isFalse(new TypedJSON("undefined").isUndefined());
                assert.isFalse(new TypedJSON(9000).isUndefined());
                assert.isFalse(new TypedJSON(NaN).isUndefined());
                assert.isFalse(new TypedJSON(0).isUndefined());
                assert.isFalse(new TypedJSON(true).isUndefined());
                assert.isFalse(new TypedJSON(false).isUndefined());
                assert.isFalse(new TypedJSON(null).isUndefined());
                assert.isTrue(new TypedJSON(undefined).isUndefined());
                assert.isFalse(new TypedJSON({}).isUndefined());
                assert.isFalse(new TypedJSON([undefined]).isUndefined());
                assert.isFalse(new TypedJSON([]).isUndefined());
            });

        });

        describe(".isObject", function () {

            it("should be true only if `.value` is an object", function () {
                assert.isFalse(new TypedJSON("[object Object]").isObject());
                assert.isFalse(new TypedJSON(9000).isObject());
                assert.isFalse(new TypedJSON(NaN).isObject());
                assert.isFalse(new TypedJSON(0).isObject());
                assert.isFalse(new TypedJSON(true).isObject());
                assert.isFalse(new TypedJSON(false).isObject());
                assert.isFalse(new TypedJSON(null).isObject());
                assert.isFalse(new TypedJSON(undefined).isObject());
                assert.isFalse(new TypedJSON([{}, {}]).isObject());
                assert.isFalse(new TypedJSON([]).isObject());
                assert.isTrue(new TypedJSON({}).isObject());
                assert.isTrue(new TypedJSON({ 0: 0, 1: 1, 2: 2, length: 3 }).isObject());
            });

        });

        describe(".object", function () {

            it("should be `.value` if it is an `object`", function () {
                const anyObject = {};
                assert.strictEqual(new TypedJSON(anyObject).object(), anyObject);
            });

            it("should be `.undefined` if it is not an `object`", function () {
                assert.isUndefined(new TypedJSON([]).object());
            });

        });

        describe(".isArray", function () {

            it("should be true only if `.value` is an array", function () {
                assert.isFalse(new TypedJSON("[]").isArray());
                assert.isFalse(new TypedJSON(9000).isArray());
                assert.isFalse(new TypedJSON(NaN).isArray());
                assert.isFalse(new TypedJSON(0).isArray());
                assert.isFalse(new TypedJSON(true).isArray());
                assert.isFalse(new TypedJSON(false).isArray());
                assert.isFalse(new TypedJSON(null).isArray());
                assert.isFalse(new TypedJSON(undefined).isArray());
                assert.isTrue(new TypedJSON([{}, []]).isArray());
                assert.isTrue(new TypedJSON([]).isArray());
                assert.isFalse(new TypedJSON({}).isArray());
                assert.isFalse(new TypedJSON({ 0: 0, 1: 1, 2: 2, length: 3 }).isArray());
            });

        });

        describe(".array", function () {

            it("should be `.value` if it is an `array`", function () {
                const anyArray = [9000];
                assert.strictEqual(new TypedJSON(anyArray).array(), anyArray);
            });

            it("should be `.undefined` if it is not an `array`", function () {
                assert.isUndefined(new TypedJSON({}).array());
            });

        });

        describe(".get", function () {

            const array: [number, number, number[]] = [0, 1, [0, 1, 2]];
            const jsonArray = new TypedJSON(array);
            const object = {
                a: "a",
                array: [{ a: "a", 1: "1" }, 9, true],
                object: { a: "a" },
                0: "0",
            };
            const jsonObject = new TypedJSON(object);

            it("should return itself for no arguments", function () {
                assert.strictEqual(jsonArray.get(), jsonArray);
            });

            it("should return the correct value for a single `number` argument", function () {
                assert.strictEqual(jsonArray.get(1).number(), 1);
            });

            it("should return the correct value for a single `string` argument", function () {
                assert.strictEqual(jsonObject.get("a").string(), "a");
            });

            it("should return the correct value for a single number `string` argument", function () {
                assert.strictEqual(jsonObject.get("0").string(), "0");
            });

            it("should return the correct value for multiple `number` arguments", function () {
                assert.strictEqual(jsonArray.get(2, 1).number(), 1);
            });

            it("should return the correct value for multiple `string` arguments", function () {
                assert.strictEqual(jsonObject.get("object", "a").string(), "a");
            });

            it("should return the correct value for multiple `string` and `number` arguments", function () {
                assert.strictEqual(jsonObject.get("array", 0, "a").string(), "a");
            });

            it("should allow chaining", function () {
                assert.strictEqual(jsonObject.get("array", 0).get("a").string(), "a");
                assert.strictEqual(jsonObject.get("array").get(0, "a").string(), "a");
                assert.strictEqual(jsonObject.get("array").get(0).get("a").string(), "a");
            });

            it("should return an undefined `TypedJSON` for a single `number` argument", function () {
                assert.isTrue(jsonArray.get(3).isUndefined());
            });

            it("should return an undefined `TypedJSON` for a single `string` argument", function () {
                assert.isTrue(jsonObject.get("b").isUndefined());
            });

            it("should return an undefined `TypedJSON` for a single `number` argument on an object", function () {
                assert.isTrue(jsonObject.get(0).isUndefined());
            });

            it("should return an undefined `TypedJSON` for a single number `string` argument", function () {
                assert.isTrue(jsonArray.get("1").isUndefined());
            });

            it("should return an undefined `TypedJSON` for multiple arguments where the last does not exist", function () {
                assert.isTrue(jsonArray.get("array", 1, "b").isUndefined());
            });

            it("should return an undefined `TypedJSON` for multiple arguments where the last goes too far", function () {
                assert.isTrue(jsonArray.get("array", 1, "a", 3).isUndefined());
            });

            it("should return an undefined `TypedJSON` for multiple arguments where the first does not exist", function () {
                assert.isTrue(jsonArray.get("d", 1, "a", 3).isUndefined());
            });

        });

        describe(".keys", function () {

            it("should return the correct `array` of `strings` for a `TypedJSON` containing an `object`", function () {
                const typedJSON = new TypedJSON({
                    1: "any value",
                    // This test is testing strange objects, so it requires strange code.
                    // tslint:disable-next-line:object-literal-key-quotes
                    "2": "any value",
                    someOtherKey: "any value",
                });
                assert.deepEqual(typedJSON.keys().sort(), ["1", "2", "someOtherKey"].sort());
            });

            it("should return the correct `array` of `numbers` for a `TypedJSON` containing an `array`", function () {
                const typedJSON = new TypedJSON([7, "any value", {}]);
                assert.deepEqual(typedJSON.keys().sort(), [0, 1, 2].sort());
            });

            it("should ignore non-numeric keys in an `array`", function () {
                const array: any = [7, "any value", {}];
                array["someOtherKey"] = "any value";
                array[100] = "any value";
                const typedJSON = new TypedJSON(array);
                assert.deepEqual(typedJSON.keys().sort(), [0, 1, 2, 100].sort());
            });

            it("should return an empty array for a `TypedJSON` containing neither an `array` nor an `object`", function () {
                assert.isEmpty(new TypedJSON(0).keys());
                assert.isEmpty(new TypedJSON(true).keys());
                assert.isEmpty(new TypedJSON(false).keys());
                assert.isEmpty(new TypedJSON(null).keys());
                assert.isEmpty(new TypedJSON(undefined).keys());
            });

            it("should return an empty array for a `TypedJSON` containing an empty `array` or `object`", function () {
                assert.isEmpty(new TypedJSON([]).keys());
                assert.isEmpty(new TypedJSON({}).keys());
            });

            it("should be in order for a `TypedJSON` containing an `array`", function () {
                const array: any = [0, 1, 2];
                array[10] = 10;
                array[1] = 1;
                array[5] = 5;
                array["string"] = "string";
                array[-1] = -1;

                assert.deepEqual(new TypedJSON(array).keys(), [0, 1, 2, 5, 10]);
            });

        });

        describe(".values", function () {

            it("should return the correct array of `TypedJSON` objects for a `TypedJSON` containing an `object`", function () {
                const typedJSON = new TypedJSON({
                    1: "some value",
                    // This test is testing strange objects, so it requires strange code.
                    // tslint:disable-next-line:object-literal-key-quotes
                    "2": 123,
                    someOtherKey: undefined,
                });
                assert.deepEqual(typedJSON.values().map((typedJSON) => typedJSON.value).sort(), ["some value", 123, undefined].sort());
            });

            it("should return the correct array of `TypedJSON` objects for a `TypedJSON` containing an `array`", function () {
                const typedJSON = new TypedJSON([7, "any value", {}]);
                assert.deepEqual(typedJSON.values().map((typedJSON) => typedJSON.value), [7, "any value", {}]);
            });

            it("should ignore non-numeric keys in an `array`", function () {
                const array: any = [7, "any value", {}];
                array["someOtherKey"] = "any other value";
                array[100] = "any third value";
                const typedJSON = new TypedJSON(array);
                assert.deepEqual(typedJSON.values().map((typedJSON) => typedJSON.value), [7, "any value", {}, "any third value"]);
            });

            it("should return an empty array for a `TypedJSON` containing neither an `array` nor an `object`", function () {
                assert.isEmpty(new TypedJSON(0).values());
                assert.isEmpty(new TypedJSON(true).values());
                assert.isEmpty(new TypedJSON(false).values());
                assert.isEmpty(new TypedJSON(null).values());
                assert.isEmpty(new TypedJSON(undefined).values());
            });

            it("should return an empty array for a `TypedJSON` containing an empty `array` or `object`", function () {
                assert.isEmpty(new TypedJSON({}).values());
                assert.isEmpty(new TypedJSON({}).values());
            });

            it("should be in order for a `TypedJSON` containing an `array`", function () {
                const array: any = [0, 1, 2];
                array[10] = 10;
                array[1] = 1;
                array[5] = 5;
                array["string"] = "string";
                array[-1] = -1;

                assert.deepEqual(new TypedJSON(array).values().map((typedJSON) => typedJSON.value), [0, 1, 2, 5, 10]);
            });

        });

        describe(".stringify", function () {

            it("should return a `string` representing the `TypedJSON`", function () {
                const json = new TypedJSON({
                    array: [1, "a", 3],
                    b: "b",
                    c: true,
                    d: null,
                    e: undefined,
                    1: 1,
                });
                const jsonString = `{"1":1,"array":[1,"a",3],"b":"b","c":true,"d":null}`;

                assert.strictEqual(json.stringify(), jsonString);
            });

            it("should return `undefined` if the `TypedJSON` contains a circular reference", function () {
                const object = { a: {} };
                object.a = object;

                assert.strictEqual(new TypedJSON(object).stringify(), undefined);
            });

        });

        describe(".parse", function () {

            it("should return a `TypedJSON`", function () {
                assert.instanceOf(TypedJSON.parse(`"any valid JSON"`), TypedJSON);
            });

            it("should return a `TypedJSON` object containing a `string", function () {
                assert.strictEqual(TypedJSON.parse(`"any string"`).string(), "any string");
            });

            it("should return a `TypedJSON` object containing a `number`", function () {
                assert.strictEqual(TypedJSON.parse("9000").number(), 9000);
            });

            it("should return a `TypedJSON` object containing a `boolean`", function () {
                assert.strictEqual(TypedJSON.parse("true").boolean(), true);
            });

            it("should return a `TypedJSON` object containing `null`", function () {
                assert.isTrue(TypedJSON.parse("null").isNull());
            });

            it("should return a `TypedJSON` object containing an `array`", function () {
                assert.deepEqual(TypedJSON.parse("[1, 2, 3]").array(), [1, 2, 3]);
            });

            it("should return a `TypedJSON` object containing an `object`", function () {
                assert.deepEqual(TypedJSON.parse(`{"a":"a"}`).object(), { a: "a" });
            });

            it("should return a `TypedJSON` object containing `undefined` for unparsable JSON", function () {
                assert.isTrue(TypedJSON.parse("nope").isUndefined());
            });

        });

        describe(".toString()", function () {

            it("should return a string describing the TypedJSON object", function () {
                assert.strictEqual((new TypedJSON(7)).toString(), `TypedJSON <7>`);
                assert.strictEqual((new TypedJSON("any value")).toString(), `TypedJSON <"any value">`);
                assert.strictEqual(
                    (new TypedJSON({ someKey: "someValue", someOtherKey: [1, 2, {}]})).toString(),
                    `TypedJSON <{"someKey":"someValue","someOtherKey":[1,2,{}]}>`);
            });

        });

    });

});
