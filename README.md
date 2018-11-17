#This is my personal notes for me to use at work for unit testing.
**Notes are based on [TraversyMedia's video on Jest](https://www.youtube.com/watch?v=7r4xVDI2vho)**

**[Jest Github](https://jestjs.io/)**
**[Documentation](https://jestjs.io/docs/en/getting-started)**

1. Start off with npm install -D jest
2. Go to package.json and change "test" under scripts to "jest".
3. Create two .js files. Two files have to have the same name, with one of them with .test.js.
   EX: function.js, then another file called function.test.js; Jest will pick up the .test.js file by itself.

---

###First Example:

in functions.js:

```javascript
const functions = {
  add: (num1, num2) => num1 + num2
};

module.exports = functions;
```

in functions.test.js:

```javascript
const functions = require("./functions");

test("Adds 2 to 2 equals 4", () => {
  expect(functions.add(2, 2)).toBe(4);
});
```

Basically, test takes in two parameters. A string of description of what you are testing, and a function.
We write expect(some function(arguments)).toBe(value of what we expect it to be);

We access the functions.js with the dot notation to access the functions we added inside the object.
EX: functions.add(2,2)

Then we simply run npm test in the terminal. We should see:

PASS ./functions.test.js
✓ Adds 2 to 2 equals 4 (3ms)

Test Suites: 1 passed, 1 total
Tests: 1 passed, 1 total
Snapshots: 0 total
Time: 0.734s
Ran all test suites.

--

###Example of test failing:
in functions.js:
Lets try adding 1 at end of the function like so:

```javascript
const functions = {
  add: (num1, num2) => num1 + num2 + 1
};

module.exports = functions;
```

then we npm test once again.

FAIL ./functions.test.js
✕ Adds 2 to 2 equals 4 (9ms)

● Adds 2 to 2 equals 4

    expect(received).toBe(expected) // Object.is equality

    Expected: 4
    Received: 5

      2 |
      3 | test("Adds 2 to 2 equals 4", () => {
    > 4 |   expect(functions.add(2, 2)).toBe(4);
        |                               ^
      5 | });
      6 |

      at Object.toBe (functions.test.js:4:31)

Test Suites: 1 failed, 1 total
Tests: 1 failed, 1 total
Snapshots: 0 total
Time: 0.716s, estimated 1s
Ran all test suites.
npm ERR! Test failed. See above for more details.

This is what we see if we fail. Note Expected: 4, and Received: 5

---

###Use of NOT:
In functions.test.js

```javascript
test("Adds 2 to 2 NOT equals 4", () => {
  expect(functions.add(2, 2)).not.toBe(5);
});
```

Should pass the test

---

###Use of .toBeNull():

In functions.js:

```javascript
const functions = {
  isNull: () => null
};
```

In functions.test.js:

```javascript
test("Should be null", () => {
  expect(functions.isNull()).toBeNull();
});
```

Should pass the test.

---

###Use of .toBeFalsy():

In functions.js:

```javascript
const functions = {
  checkValue: value => value
};
```

In functions.test.js:

```javascript
test("Should be Falsy", () => {
  expect(functions.checkValue(null)).toBeFalsy();
});
```

Should pass the test

---

###Use of .toEqual():

toBe.() is used for primitives. It is a very strict comparing function.

For Example,

In functions.js:

```javascript
const functions = {
  createUser: () => {
    const user = { firstName: "Young" };
    user.lastName = "Moon";
    return user;
  }
};
```

In functions.test.js:

```javascript
test("User should be Young Moon object", () => {
  expect(functions.createUser()).toBe({
    firstName: "Young",
    lastName: "Moon"
  });
});
```

This will give an error of:

User should be Young Moon object

    expect(received).toBe(expected) // Object.is equality

    Expected: {"firstName": "Young", "lastName": "Moon"}
    Received: {"firstName": "Young", "lastName": "Moon"}

    Difference:

    Compared values have no visual difference. Note that you are testing for equality with the stricter `toBe` matcher using `Object.is`. For deep equality only, use `toEqual` instead.

      31 |
      32 | test("User should be Young Moon object", () => {
    > 33 |   expect(functions.createUser()).toBe({
         |                                  ^
      34 |     firstName: "Young",
      35 |     lastName: "Moon"
      36 |   });

      at Object.toBe (functions.test.js:33:34)

Test Suites: 1 failed, 1 total
Tests: 1 failed, 4 passed, 5 total
Snapshots: 0 total
Time: 0.748s, estimated 1s
Ran all test suites.
npm ERR! Test failed. See above for more details.

**Note this line **
User should be Young Moon object

    expect(received).toBe(expected) // Object.is equality

    Expected: {"firstName": "Young", "lastName": "Moon"}
    Received: {"firstName": "Young", "lastName": "Moon"}

    Difference:

    **Compared values have no visual difference. Note that you are testing for equality with the stricter `toBe` matcher using `Object.is`. For deep equality only, use `toEqual` instead. **

It expected and received the same exact object, yet we failed the test.

So instead of toBe() we can use toEqual() in functions.test.js as such:

```javascript
test("User should be Young Moon object", () => {
  expect(functions.createUser()).toEqual({
    firstName: "Young",
    lastName: "Moon"
  });
});
```

This should pass the test.

---

###Use of toBeLessThan/GreaterThan

Here, I demonstrate how you dont necessarily need functions.js. Instead, you can do the testing in just the functions.test.js file.
I also demonstrate how to use toBeLessThan, which works the same way as toBeGreaterThan

```javascript
test("Should be under 1600", () => {
  const load1 = 800;
  const load2 = 700;
  expect(load1 + load2).toBeLessThan(1600);
});
```

---

###Use of toMatch():

In functions.test.js:

```javascript
test("There is no I in team", () => {
  expect("team").not.toMatch(/I/);
});
```

Should pass.

---

###Use of toContain() in arrays:

In functions.test.js:

```javascript
test("admin should be in usernames", () => {
  const usernames = ["john", "Karen", "admin"];
  expect(usernames).toContain("admin");
});
```

Should pass, as the array has "admin" string in it.

---

###Use of assertion and Data Fetching

### Promise

After installing Axios
In functions.js:

```javascript
const axios = require("axios");

const functions = {
  fetchUser: () =>
    axios
      .get("https://jsonplaceholder.typicode.com/users/1")
      .then(res => res.data)
      .catch(err => "error")
};
```

Then in functions.test.js:

```javascript
test("User fetched name should me Leanne Graham", () => {
  expect.assertions(1);
  return functions.fetchUser().then(data => {
    expect(data.name).toEqual("Leanne Graham");
  });
});
```

this will pass the test.

assertions is the length of the array of the call. If you called only ONE object, then assertions should be 1.
If you made a fetch call that received an array of 10 objects, then assertions should be 10.

**If you remove assertions, and remove the return statement, then Leanne Graham111 will still pass the test. It isnt as accurate, so make sure you return the last statement here **

---

### Use of multiple .test.js files and use of toBeDefined

You can create multiple .test.js files and Jest will test both.

#####Use of toBeDefined
Lets create a file called reversestring.js and reversestring.test.js

In reversestring.js:

```javascript
const reverseString = str =>
  str
    .split("")
    .reverse()
    .join("");

module.exports = reverseString;
```

In reversestring.test.js:

```javascript
const reverseString = require("./reversestring");

//Make sure the function is defined.
test("reverseString function exists", () => {
  expect(reverseString).toBeDefined();
});

//Make sure it works
test("String reverses", () => {
  expect(reverseString("hello")).toEqual("olleh");
});
```

and once I run npm test, it tests BOTH functions.test.js and reversestring.test.js.
