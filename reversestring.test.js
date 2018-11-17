const reverseString = require("./reversestring");

//Make sure the function is defined.
test("reverseString function exists", () => {
  expect(reverseString).toBeDefined();
});

//Make sure it works
test("String reverses", () => {
  expect(reverseString("hello")).toEqual("olleh");
});
