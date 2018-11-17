const functions = require("./functions");

beforeAll(() => initDatabase());
afterAll(() => closeDatabase());

const initDatabase = () => console.log("Database Initialized");
const closeDatabase = () => console.log("Database Closed...");
test("Adds 2 to 2 equals 4", () => {
  expect(functions.add(2, 2)).toBe(4);
});

// We can also use NOT

test("Adds 2 to 2 NOT equals 4", () => {
  expect(functions.add(2, 2)).not.toBe(5);
});

// there is also a testing function called toBeNull

test("Should be null", () => {
  expect(functions.isNull()).toBeNull();
});

// Use of toBeFalsy

test("Should be Falsy", () => {
  expect(functions.checkValue(null)).toBeFalsy();
});

// Use of toEqual.

// test("User should be Young Moon object", () => {
//   expect(functions.createUser()).toBe({ firstName: "Young", lastName: "Moon" });
// });
// This FAILS the test. toBe is STRICT values for like primitives or numbers.

test("User should be Young Moon object", () => {
  expect(functions.createUser()).toEqual({
    firstName: "Young",
    lastName: "Moon"
  });
});

//Less than and Greater Than
test("Should be under 1600", () => {
  const load1 = 800;
  const load2 = 700;
  expect(load1 + load2).toBeLessThan(1600);
});

//Regex
test("There is no I in team", () => {
  expect("team").not.toMatch(/I/);
});

//Arrays
test("admin should be in usernames", () => {
  const usernames = ["john", "Karen", "admin"];
  expect(usernames).toContain("admin");
});

//Data fetching or Async data

// Promise
//Assertion verifies the amount of given number is called.
//note: if you don't use return statement, and no assertions, it will pass the test even if its not exact.
// For Ex: if it should be equal to Leanne Graham, but its Leanne Graham111, it will still pass.
// to avoid this, make sure you return the function
test("User fetched name should me Leanne Graham", () => {
  expect.assertions(1);
  return functions.fetchUser().then(data => {
    expect(data.name).toEqual("Leanne Graham");
  });
});

// Async Await
test("User fetched name should me Leanne Graham", async () => {
  expect.assertions(1);
  const data = await functions.fetchUser();
  expect(data.name).toEqual("Leanne Graham");
});
