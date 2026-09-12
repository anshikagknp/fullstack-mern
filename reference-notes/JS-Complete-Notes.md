# JavaScript — Complete Notes (Basics to Advanced)

> A one-stop reference built from the `05-javascript` practice repo + the official [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide). Every concept is explained in plain language, with pointers, descriptive notes, and runnable code examples.

## Table of Contents

1. [Introduction to JavaScript](#1-introduction-to-javascript)
2. [Setting Up & Running JS](#2-setting-up--running-js)
3. [Variables (`var`, `let`, `const`)](#3-variables-var-let-const)
4. [Data Types](#4-data-types)
5. [Type Conversion & Coercion](#5-type-conversion--coercion)
6. [Operators](#6-operators)
7. [Control Flow (Conditionals)](#7-control-flow-conditionals)
8. [Loops](#8-loops)
9. [Functions](#9-functions)
10. [Scope & Hoisting](#10-scope--hoisting)
11. [Closures](#11-closures)
12. [The `this` Keyword](#12-the-this-keyword)
13. [Arrays — Full Method Reference](#13-arrays--full-method-reference)
14. [Strings — Full Method Reference](#14-strings--full-method-reference)
15. [Objects](#15-objects)
16. [Destructuring](#16-destructuring)
17. [Spread & Rest Operators](#17-spread--rest-operators)
18. [Template Literals](#18-template-literals)
19. [Classes & OOP](#19-classes--oop)
20. [Prototypes & Inheritance](#20-prototypes--inheritance)
21. [Error Handling](#21-error-handling)
22. [Iterators & Generators](#22-iterators--generators)
23. [Map, Set, WeakMap, WeakSet](#23-map-set-weakmap-weakset)
24. [Symbols](#24-symbols)
25. [Numbers & Math](#25-numbers--math)
26. [Dates](#26-dates)
27. [Regular Expressions](#27-regular-expressions)
28. [JSON](#28-json)
29. [Modules (import/export)](#29-modules-importexport)
30. [Asynchronous JavaScript](#30-asynchronous-javascript)
31. [The Event Loop](#31-the-event-loop)
32. [The DOM — Selecting & Modifying Elements](#32-the-dom--selecting--modifying-elements)
33. [DOM — Creating, Inserting, Removing Elements](#33-dom--creating-inserting-removing-elements)
34. [Events, Bubbling & Delegation](#34-events-bubbling--delegation)
35. [Browser APIs (fetch, storage, timers)](#35-browser-apis-fetch-storage-timers)
36. [Advanced Function Patterns](#36-advanced-function-patterns)
37. [ES6+ Feature Cheat-Sheet](#37-es6-feature-cheat-sheet)
38. [Best Practices & Common Pitfalls](#38-best-practices--common-pitfalls)

---

## 1. Introduction to JavaScript

- JavaScript (JS) is a **high-level, interpreted (JIT-compiled), multi-paradigm** programming language. It supports procedural, object-oriented (prototype-based), and functional programming styles.
- It is **single-threaded** but handles concurrency through an **event loop** and asynchronous callbacks (explained in detail later).
- JS is **dynamically typed** — variable types are determined at runtime, not declared in advance.
- Originally built to make web pages interactive ("client-side scripting"), it now also runs:
  - **In the browser** — to manipulate the DOM, handle events, call APIs.
  - **On the server** — via runtimes like **Node.js**, **Deno**, **Bun**.
  - In mobile apps (React Native), desktop apps (Electron), IoT, etc.
- JavaScript follows the **ECMAScript (ES)** specification. Major milestones:
  - ES5 (2009) — the "old" standard (`var`, function expressions).
  - **ES6 / ES2015** — huge update: `let`/`const`, arrow functions, classes, promises, template literals, destructuring, modules.
  - ES2016+ — yearly incremental releases (`async/await` in ES2017, spread for objects in ES2018, optional chaining in ES2020, etc.)
- JS is **case-sensitive** and mostly ignores whitespace; statements are typically ended with a semicolon `;` (JS has **Automatic Semicolon Insertion**, but relying on it is discouraged).

---

## 2. Setting Up & Running JS

- **In the browser**: write JS inside a `<script>` tag or link an external file `<script src="app.js"></script>`. The browser's console (`F12` → Console tab) is used to run and debug code directly.
- **On the server**: install [Node.js](https://nodejs.org), then run a file with `node filename.js`.
- **`console.log()`** is the primary way to print output for debugging — think of it as the "print statement" of JS.
  ```js
  console.log("Hi from node...."); // prints text to the console
  console.table(arrayOfObjects);   // prints array of objects as a table — great for arrays of records
  console.error("Something broke");
  console.warn("Careful here");
  ```
- Comments:
  ```js
  // single-line comment
  /* multi-line
     comment */
  ```

---

## 3. Variables (`var`, `let`, `const`)

A variable is a **named container for a value**. JS gives us three ways to declare one, and choosing the right one matters a lot.

| Keyword | Reassignable | Re-declarable | Scope | Hoisting behavior |
|---|---|---|---|---|
| `var` | ✅ Yes | ✅ Yes | Function-scoped | Hoisted & initialized as `undefined` |
| `let` | ✅ Yes | ❌ No | Block-scoped `{}` | Hoisted but in "Temporal Dead Zone" until declaration |
| `const` | ❌ No (binding is fixed) | ❌ No | Block-scoped `{}` | Hoisted, in TDZ until declaration |

```js
// Declaration and Initialisation
let userName = "Alex";      // mutable, block-scoped — the modern default
const totalDaysInWeek = 7;  // must not change — use for values that shouldn't be reassigned
var legacyScore = 100;      // legacy keyword — avoid in modern code

let userScore;               // declared without value → defaults to `undefined`
console.log(userScore);      // undefined

// Reassignment
userName = "Taylor";         // fine, since declared with let
console.log(userName);       // "Taylor"

// totalDaysInWeek = 8;      // ❌ TypeError: Assignment to constant variable.
```

- **Block scope demo** — `let`/`const` only exist inside the `{ }` they are declared in:
  ```js
  {
      let blockVariable = "I am hidden inside this block!";
      console.log(blockVariable); // works fine
  }
  // console.log(blockVariable); // ❌ ReferenceError: blockVariable is not defined
  ```
- **Important nuance about `const`**: it does **not** make the *value* immutable — it makes the *binding* (the variable name) immutable. You can still mutate the contents of an object or array declared with `const`:
  ```js
  const person = { name: "Sam" };
  person.name = "Alex"; // ✅ allowed — we're mutating the object, not reassigning `person`
  // person = {};        // ❌ TypeError
  ```
- **Naming rules**: must start with a letter, `_`, or `$`; case-sensitive; cannot be a reserved keyword (`let`, `class`, etc.). Convention: `camelCase` for variables/functions, `PascalCase` for classes, `UPPER_SNAKE_CASE` for true constants.
- **Best practice**: default to `const`. Use `let` only when you know the value will change. Avoid `var` entirely in modern code (function-scoping + hoisting quirks cause bugs).

---

## 4. Data Types

JavaScript has two categories of types:

### Primitive types (immutable, compared by value)
1. **`Number`** — both integers and floats share one type (`5`, `5.5`, `-3`). Includes special values `Infinity`, `-Infinity`, and `NaN`.
2. **`String`** — text, written in `'single'`, `"double"`, or `` `backticks` `` (template literals).
3. **`Boolean`** — `true` / `false`.
4. **`undefined`** — a variable that has been declared but not assigned a value.
5. **`null`** — represents an intentional "no value" (must be assigned explicitly).
6. **`BigInt`** — for integers larger than `Number` can safely represent, written as `123n`.
7. **`Symbol`** — a unique, immutable identifier (used mostly for object property keys — see [Section 24](#24-symbols)).

### Reference type
8. **`Object`** — everything else: plain objects `{}`, arrays `[]`, functions, dates, maps, sets, etc. Stored/compared **by reference**, not by value.

```js
typeof 42            // "number"
typeof "hello"        // "string"
typeof true           // "boolean"
typeof undefined      // "undefined"
typeof null           // "object"  ⚠️ famous historical JS bug — null is NOT actually an object
typeof 10n             // "bigint"
typeof Symbol("id")    // "symbol"
typeof {}               // "object"
typeof []               // "object" (arrays are objects; use Array.isArray() to check for arrays)
typeof function(){}     // "function"
```

- **`null` vs `undefined`**: `undefined` means "nobody has set this yet" (JS's default); `null` means "this was deliberately set to represent nothing." `null == undefined` is `true` (loose equality), but `null === undefined` is `false` (strict equality, different types).
- Primitives are **passed by value** (copied); objects/arrays are **passed by reference** (both variables point to the same underlying data).
  ```js
  let a = 5;
  let b = a;
  b = 10;
  console.log(a); // 5 — untouched, because primitives copy

  let obj1 = { val: 5 };
  let obj2 = obj1;
  obj2.val = 10;
  console.log(obj1.val); // 10 — both point to the same object in memory
  ```

---

## 5. Type Conversion & Coercion

- **Explicit conversion** — you deliberately convert a value:
  ```js
  String(123);      // "123"
  Number("123");    // 123
  Number("abc");    // NaN
  Boolean(0);       // false
  Boolean("");      // false
  Boolean("hi");    // true
  ```
- **Implicit coercion** — JS automatically converts types when operators are used across types, and this is a major source of bugs:
  ```js
  let a = 5;
  let b = 10;
  console.log(a * b);        // 50
  console.log(a * "abc");    // NaN — can't multiply a number by a non-numeric string

  console.log((a * "abc") === NaN); // false ⚠️ — NaN is never equal to anything, even itself
  console.log(NaN === NaN);          // false

  console.log(isNaN(a * "abc"));     // true  — the correct way to check for NaN
  console.log(isNaN(a * "5"));       // false — "5" coerces cleanly to a number

  console.log("5" + 3);   // "53"  — string concatenation wins when a string is involved with +
  console.log("5" - 3);   // 2      — minus forces numeric coercion (only + is overloaded for strings)
  console.log(1 + true);  // 2      — true coerces to 1
  console.log("" + null); // "null"
  ```
- **Falsy values** (the only 8 values that behave as `false` in a boolean context): `false`, `0`, `-0`, `""` (empty string), `null`, `undefined`, `NaN`, `0n`. Everything else — including `"0"`, `[]`, and `{}` — is **truthy**.
- **`Number.isNaN()` vs global `isNaN()`**: the global `isNaN()` first coerces its argument to a number before checking (`isNaN("abc")` → `true`), while `Number.isNaN()` does **no coercion** and is safer (`Number.isNaN("abc")` → `false`, `Number.isNaN(NaN)` → `true`).

---

## 6. Operators

| Category | Operators | Notes |
|---|---|---|
| Arithmetic | `+ - * / % **` | `%` = modulus (remainder), `**` = exponent |
| Assignment | `= += -= *= /= %= **=` | shorthand combine operation + assignment |
| Comparison | `== != === !== > < >= <=` | prefer `===`/`!==` (strict — no type coercion) over `==`/`!=` |
| Logical | `&& \|\| !` | `&&` = AND, `\|\|` = OR, `!` = NOT |
| Logical assignment (ES2021) | `&&= \|\|= ??=` | conditional assignment shorthand |
| Ternary | `condition ? a : b` | inline if/else, returns a value |
| Nullish coalescing | `??` | returns right side only if left is `null`/`undefined` (unlike `\|\|`, which also triggers on `0`, `""`, `false`) |
| Optional chaining | `?.` | safely access nested properties without throwing if a link is missing |
| Bitwise | `& \| ^ ~ << >> >>>` | operate on the binary representation of numbers |
| typeof / instanceof | `typeof x`, `x instanceof Y` | type-checking operators |
| Spread / rest | `...` | expand or collect values (Section 17) |
| Comma | `a, b` | evaluates both, returns last |

```js
console.log(10 % 3);     // 1  (remainder)
console.log(2 ** 5);     // 32 (exponent, same as Math.pow(2,5))

console.log(5 == "5");   // true  — loose equality coerces types
console.log(5 === "5");  // false — strict equality checks type + value

let count = null;
console.log(count ?? 10);   // 10  — null/undefined → fallback
console.log(0 ?? 10);       // 0   — 0 is NOT null/undefined, so it's kept
console.log(0 || 10);       // 10  — || treats 0 as falsy, very different from ??

let user = { profile: { name: "Sam" } };
console.log(user?.profile?.age);      // undefined, no error
console.log(user?.settings?.theme);   // undefined, no error (settings doesn't exist)
```

---

## 7. Control Flow (Conditionals)

```js
function myfun(num) {
    console.log("Hi from myfun.... :) ");

    if (num == 0)
        return "Number is zero";
    else if (num > 0)
        return "Number is positive";
    else
        return "Number is Negative";

    // return statement exits the function immediately —
    // anything written after it in the same block never executes
    console.log("Bye from myfun..... :) "); // unreachable code
}

console.log(myfun(5)); // "Number is positive"
```

- **`if / else if / else`** — branch based on a boolean condition.
- **`switch`** — cleaner alternative when checking one variable against many exact values:
  ```js
  switch (fruit) {
      case "apple":
          console.log("Apple selected");
          break;              // without break, execution "falls through" to the next case
      case "banana":
          console.log("Banana selected");
          break;
      default:
          console.log("Unknown fruit");
  }
  ```
- **Ternary operator** — a compact one-line if/else that *returns a value*:
  ```js
  let status = (age >= 18) ? "Adult" : "Minor";
  ```
- **Truthy/falsy** evaluation applies inside every condition (`if`, `while`, ternary, `&&`, `||`) — see Section 5.

---

## 8. Loops

```js
let arr = [10, 20, 30, 40, 50];

// for...of — iterates over VALUES. Works on arrays, strings, maps, sets — anything "iterable".
for (let ele of arr) {
    console.log(ele);
}

let userData = { unm: "Sachin", age: 45, email: "sachin@gmail.com" };

// for...in — iterates over KEYS.
// On objects: gives property names. On arrays: gives indexes (as strings) — generally avoid for arrays.
for (let key in userData) {
    console.log(key, userData[key]);
}
```

- **Classic `for` loop** — full control over the counter:
  ```js
  for (let i = 0; i < 5; i++) {
      console.log(i);
  }
  ```
- **`while`** — repeats as long as a condition is true (checked *before* each iteration):
  ```js
  let i = 0;
  while (i < 5) {
      console.log(i);
      i++;
  }
  ```
- **`do...while`** — same as `while`, but the body runs **at least once** because the condition is checked *after*:
  ```js
  let i = 0;
  do {
      console.log(i);
      i++;
  } while (i < 5);
  ```
- **`break`** — exits the loop entirely. **`continue`** — skips to the next iteration.
- **`for...of` vs `for...in`** — the single most-confused pair in JS:
  - `for...of` → iterates **values** of an iterable (arrays, strings, Maps, Sets). Cannot be used directly on plain objects (they aren't iterable) unless you use `Object.entries()`/`Object.keys()`/`Object.values()`.
  - `for...in` → iterates **enumerable property keys** — meant for objects; using it on arrays is discouraged (it also picks up inherited/enumerable properties and doesn't guarantee numeric order).
- Array iteration methods (`forEach`, `map`, `filter`, etc. — Section 13) are usually preferred over manual loops for arrays because they are more declarative/readable.

---

## 9. Functions

A function is a **reusable block of code**. JS treats functions as **first-class citizens** — they can be stored in variables, passed as arguments, and returned from other functions.

### 9.1 Function Declaration
```js
function myfun() {                 // function definition
    console.log("My fun calling... ");
}

myfun();                            // calling it — JS goes to the function's memory address and runs it

console.log(myfun);   // logs the function's source/reference — myfun is essentially
                        // a pointer/variable holding the function's memory address

let fn = myfun;         // functions can be assigned to other variables (first-class citizens)
console.log(fn);
fn();                    // calling through the new reference works identically
```
- **Hoisted**: function declarations are moved to the top of their scope, so you can call them *before* they appear in the code.

### 9.2 Function Expression
```js
let fn = function() {
    console.log("Anonymous Function...");
};
fn();
```
- **Not hoisted** the same way — the variable exists (if `var`) but is `undefined` until the assignment line runs; with `let`/`const` it's in the Temporal Dead Zone.

### 9.3 Arrow Functions (ES6)
A shorter syntax for writing function expressions — and they **don't have their own `this`** (see Section 12).
```js
let fn = () => {
    console.log("Arrow Function...");
};
fn();

fn = (num) => {              // single parameter — parens optional: `num =>`
    console.log(num);
    console.log(num ** 3);
};
fn(5);

fn = (num) => {
    return num ** 3;          // explicit return with a block body
};
console.log(fn(5));

fn = (num) => num ** 3;       // implicit return — no braces, no `return` keyword needed
console.log(fn(5));

fn = num => num ** 3;         // parens around a single param are optional
console.log(fn(5));

fn = (a, b) => a ** b;        // multiple params always need parens
console.log(fn(5, 3));

// default parameter + implicit return, real-world style
let interest = (amt, rate, time = 1) => (amt * rate * time) / 100;
console.log("SI : " + interest(5000, 2, 2));
```

### 9.4 Callback Functions
A callback is simply **a function passed as an argument to another function**, to be invoked later.
```js
function myAdd(a, b) { return a + b; }
function mySub(a, b) { return a - b; }

function calculate(x, y, fn) {
    return fn(x, y);      // `fn` is called here — the "callback"
}

console.log(calculate(5, 7, myAdd)); // 12
console.log(calculate(5, 7, mySub)); // -2
```
Callbacks power `setTimeout`, array methods (`map`/`filter`/`forEach`), event listeners, and — historically — all async code (see Section 30).

### 9.5 Rest Parameters
Collects any number of extra arguments into a **real array**.
```js
function myAdd(a, b) { return a + b; }
console.log(myAdd(5)); // NaN — `b` is undefined, undefined + 5 = NaN

function myAdd2(a, b, ...c) {   // rest parameter — must be the LAST parameter
    console.log(a);              // 5
    console.log(b);              // 6
    console.log(c);              // [7, 8]  → an actual array
}
console.log(myAdd2(5, 6, 7, 8));
```

### 9.6 Default Parameters
```js
function calc_int(rate, amt = 5000, time = 1) {   // default-value arguments
    return (amt * rate * time) / 100;
}
console.log(calc_int(5000, 5, 1));   // uses all 3 args
console.log(calc_int(5000, 5));      // time defaults to 1
console.log(calc_int(5));            // amt defaults to 5000, time defaults to 1
```
- Defaults are evaluated **at call time**, left-to-right, and can even reference earlier parameters (`function f(a, b = a + 1) {...}`).

### 9.7 IIFE (Immediately Invoked Function Expression)
A function that runs **the instant it's defined**, without needing a separate call. Used to create an isolated scope (a common pre-ES6 module pattern).
```js
(function () {
    console.log("IIFE Function Calling...");
})();

let sum = (function (a, b) {
    return a + b;
})(5, 6);
console.log(sum); // 11
```

### 9.8 Parameters vs Arguments
- **Parameters** are the named placeholders in the function definition (`function f(a, b)`).
- **Arguments** are the actual values passed in when calling (`f(1, 2)`).
- Inside a regular `function` (not arrow), the special `arguments` object holds all passed values array-like — rest parameters are the modern replacement.

### 9.9 Pure Functions vs Side Effects
- A **pure function** always returns the same output for the same input and does not modify anything outside itself (no mutating external variables, no I/O). Pure functions are easier to test and reason about — a cornerstone of functional programming.
- A function has a **side effect** if it changes something outside its own scope (mutating a global variable, logging, modifying an object passed by reference, making a network call).


## 10. Scope & Hoisting

- **Scope** = the region of code where a variable is accessible.
  - **Global scope** — declared outside any function/block, accessible everywhere.
  - **Function scope** — `var` is visible anywhere inside the function it's declared in, regardless of blocks.
  - **Block scope** — `let`/`const` are visible only inside the nearest `{ }`.
- **Lexical scoping**: a function's access to outer variables is determined by *where it is written in the code*, not where it is called from. Inner functions can access variables from their outer (enclosing) functions.
- **Hoisting**: JS moves variable/function *declarations* to the top of their scope during compilation (before execution).
  ```js
  console.log(a);  // undefined (not an error) — `var` is hoisted and initialized to undefined
  var a = 5;

  console.log(b);  // ❌ ReferenceError — `let`/`const` are hoisted but stay in the
  let b = 5;        //    "Temporal Dead Zone" (TDZ) until their declaration line runs

  hoistedFn();       // ✅ works — function declarations are fully hoisted (name + body)
  function hoistedFn() { console.log("I work before my definition!"); }
  ```
- **Temporal Dead Zone (TDZ)**: the time between entering a scope and the actual `let`/`const` declaration line, during which the variable exists but cannot be accessed.

---

## 11. Closures

> A **closure** is formed when an inner function "remembers" and keeps access to variables from its outer (enclosing) function's scope, even after the outer function has finished executing.

```js
function outerfun() {
    let msg = "Welcome";
    console.log("Outer fun ...");

    function innerfun(name) {
        console.log("inner fun is calling....");
        console.log(msg + name);   // `innerfun` still has access to `msg`,
    }                                // even though `outerfun` already returned!

    return innerfun;
}

let fn = outerfun();   // outerfun() runs, returns innerfun (but doesn't call it)
console.log(fn);
fn("Sachin");            // "WelcomeSachin" — the closure over `msg` is still alive
```
- **Why closures matter**: they let you create **private state**. Every call to `outerfun()` produces a brand-new, isolated `msg` variable that only the returned `innerfun` can touch.
- **Classic use case — counters / private data**:
  ```js
  function createCounter() {
      let count = 0;               // private — cannot be accessed directly from outside
      return function () {
          count++;
          return count;
      };
  }
  const counter = createCounter();
  console.log(counter());  // 1
  console.log(counter());  // 2
  console.log(counter());  // 3 — `count` persisted between calls, and no outside code can touch it
  ```
- **Closures in loops (a classic gotcha)**:
  ```js
  for (var i = 0; i < 3; i++) {
      setTimeout(() => console.log(i), 100); // prints 3, 3, 3 — `var` is function-scoped,
  }                                            // all callbacks share the SAME `i`

  for (let j = 0; j < 3; j++) {
      setTimeout(() => console.log(j), 100); // prints 0, 1, 2 — `let` creates a NEW binding
  }                                            // per iteration, so each closure captures its own `j`
  ```

---

## 12. The `this` Keyword

`this` refers to the **object that is currently executing the function** — but its value depends entirely on *how* the function is called, not where it's defined (with one big exception: arrow functions).

```js
const person = {
    name: "Sam",
    greet() {
        console.log(this.name); // "this" = person, because greet() was called as person.greet()
    }
};
person.greet(); // "Sam"

function standalone() {
    console.log(this); // in non-strict mode: the global object (window); in strict mode/modules: undefined
}
standalone();

const arrowGreet = () => {
    console.log(this); // arrow functions have NO own `this` —
};                        // they inherit `this` from their surrounding (lexical) scope
```

| Call style | `this` refers to |
|---|---|
| `obj.method()` | `obj` (the object before the dot) |
| plain function call `fn()` | `undefined` (strict mode) or global object |
| arrow function | whatever `this` was in the enclosing scope (lexical) |
| `new Fn()` (constructor) | the newly created instance |
| `fn.call(obj)` / `fn.apply(obj)` | `obj`, explicitly |
| `fn.bind(obj)` | returns a new function permanently bound to `obj` |
| event handler (`el.addEventListener`) | the DOM element the listener is attached to |

- **`call`, `apply`, `bind`** let you explicitly control `this`:
  ```js
  function introduce(greeting) { console.log(`${greeting}, I'm ${this.name}`); }
  const user = { name: "Priya" };

  introduce.call(user, "Hi");        // "Hi, I'm Priya"  — args passed individually
  introduce.apply(user, ["Hello"]); // "Hello, I'm Priya" — args passed as an array
  const bound = introduce.bind(user);
  bound("Hey");                       // "Hey, I'm Priya" — returns a new function, `this` locked forever
  ```
- Because arrow functions don't rebind `this`, they're extremely useful for callbacks inside methods where you want to keep the outer `this` (e.g., inside array methods within a class method).

---

## 13. Arrays — Full Method Reference

An **array** is an ordered, index-based (zero-indexed) collection that can hold mixed types.

### 13.1 Basics
```js
let arr = [1, 2, 3, 4, 5];
console.log(arr);

let a = arr.slice(2, 4);   // slice(start, end) — returns a NEW array, does NOT mutate original.
console.log(a);              // `end` index is exclusive → [3, 4]

arr.push(100);                // adds one element to the end — mutates original
arr.push(200, 300, 400);      // push accepts multiple elements at once

arr.unshift(900);             // adds to the BEGINNING — mutates original
arr.unshift(200, 300, 400);   // multiple elements added to the beginning, in that order

let r1 = arr.pop();     // removes & RETURNS the last element
let r2 = arr.shift();   // removes & RETURNS the first element

console.log(arr);
```

### 13.2 `splice()` — the swiss-army-knife for insert/update/delete
```js
let arr = [1, 2, 3, 4, 5];

// splice(startIndex, deleteCount, ...itemsToInsert)
arr.splice(2, 0, 10, 20, 30);   // insert at index 2, delete 0 → [1,2,10,20,30,3,4,5]
console.log(arr);

arr.splice(0, 1, 1000);         // replace 1 element at index 0 with 1000
console.log(arr);

arr.splice(2, 1);               // delete 1 element starting at index 2 (no insertion)
console.log(arr);

console.log(arr.indexOf(4));    // returns index of first match, or -1 if not found
console.log(arr.indexOf(12));   // -1
console.log(arr.includes(12));  // false — boolean check
console.log(arr.includes(2));   // true

// spread operator — expand array elements individually (see Section 17)
let arr2 = [...arr, 7, 8, 9];
console.log(arr2);
```
> ⚠️ `slice()` (non-mutating, "s" for "safe copy") vs `splice()` (mutating, changes the original array) — one of the most commonly confused method pairs in JS.

### 13.3 Iteration methods

```js
let fruits = ["Apple", "Mango", "Banana"];

// forEach — runs a callback for every element, returns undefined (used for side-effects, not transformation)
fruits.forEach(function (ele) { console.log(ele); });
fruits.forEach((ele) => console.log(ele));
```

```js
const productDetails = [
    { proID: 1012, proName: "iMac", proPrice: 899 },
    { proID: 1112, proName: "Macbook", proPrice: 1199 },
    { proID: 3012, proName: "iPad", proPrice: 699 },
    { proID: 2012, proName: "Earpods", proPrice: 599 },
    { proID: 1412, proName: "Charger", proPrice: 199 },
];

// forEach for accumulation (works, but reduce is more idiomatic for this)
let sum = 0;
productDetails.forEach((product) => { sum = sum + product.proPrice; });
console.log("Total Price : " + sum);

// filter — returns a NEW array with only the elements that pass the test (does not mutate)
const expensive = productDetails.filter((product) => product.proPrice > 700);
console.table(expensive);

// map — returns a NEW array of the SAME LENGTH, with each element transformed
let inINR = productDetails.map((product) => {
    return { ...product, proPriceINR: product.proPrice * 96 }; // spread to copy + add a field
});
console.table(inINR);

// find — returns the FIRST element matching the condition (or undefined), not an array
const found = productDetails.find((product) => product.proName === "iMac");
console.log(found);

// sort — SORTS IN PLACE (mutates!), and by default compares elements as STRINGS
let nums = [23, 46, 55, 67, 58, 55, 83, 101];
// nums.sort();                         // ❌ wrong output — "101" sorts before "46" as strings
let ascending = [...nums].sort((a, b) => a - b);   // spread first to avoid mutating original
console.log(ascending);

let names = ["Sachin", "Yuvraj", "Virendra", "Rahul"];
let sortedNames = [...names].sort((a, b) => a.localeCompare(b)); // proper alphabetical sort
console.log(sortedNames);

let byPrice = [...productDetails].sort((a, b) => a.proPrice - b.proPrice);
console.log(byPrice);

// reduce — boils an array down to a SINGLE value (sum, object, string, anything)
const cart = [
    { proID: 1012, proQty: 5, proPrice: 899 },
    { proID: 1112, proQty: 2, proPrice: 1199 },
];
let total = cart.reduce((sum, prod) => sum + prod.proPrice * prod.proQty, 0);
//                        ^accumulator  ^current item                     ^initial value of accumulator
console.log("Final Amount : " + total);
```

### 13.4 Quick reference table

| Method | Mutates original? | Returns |
|---|---|---|
| `push()` / `unshift()` | ✅ | new length |
| `pop()` / `shift()` | ✅ | removed element |
| `splice()` | ✅ | array of removed elements |
| `sort()` / `reverse()` | ✅ | the (same) sorted array |
| `slice()` | ❌ | new sub-array |
| `concat()` | ❌ | new merged array |
| `map()` | ❌ | new transformed array |
| `filter()` | ❌ | new filtered array |
| `find()` / `findIndex()` | ❌ | element / index (or `undefined`/`-1`) |
| `some()` / `every()` | ❌ | boolean |
| `reduce()` / `reduceRight()` | ❌ | single accumulated value |
| `forEach()` | ❌ (but callback might mutate elements) | `undefined` |
| `includes()` / `indexOf()` | ❌ | boolean / index |
| `join()` | ❌ | string |
| `flat()` / `flatMap()` | ❌ | new flattened array |
| `Array.isArray(x)` | — | boolean, static method to check if `x` is an array |

Other useful ones not in the repo but essential:
```js
[1, [2, [3, 4]]].flat(2);              // [1, 2, 3, 4] — flattens nested arrays to given depth
[1, 2, 3].flatMap(x => [x, x * 2]);    // [1,2, 2,4, 3,6] — map then flatten by 1 level
[1, 2, 3].some(x => x > 2);             // true — at least one element passes
[1, 2, 3].every(x => x > 0);            // true — all elements pass
Array.from({ length: 5 }, (_, i) => i); // [0,1,2,3,4] — build an array from an array-like/iterable
Array.of(7);                             // [7] (unlike `Array(7)`, which creates 7 empty slots)
[1, 2, 3].join("-");                     // "1-2-3"
```


## 14. Strings — Full Method Reference

Strings are **primitive and immutable** — every "modifying" string method actually returns a brand-new string.

```js
let firstname = "Anshika";
let lastname = "Gupta";

console.log(firstname + lastname);      // "AnshikaGupta" — plain concatenation

let str = "Welcome ";
console.log(str + firstname);

// Template literals (backticks) — allow variable interpolation with ${...}
str = `Welcome ${firstname} , LastName : ${lastname}`;
console.log(str);

let s = "A quick brown fox jumps over the lazy dog";

console.log(s.indexOf("fox"));     // 10 — index of first occurrence, -1 if not found
console.log(s.indexOf("cat"));     // -1
console.log(s.lastIndexOf("o"));   // index of LAST occurrence

console.log(s.includes("dog"));    // true — boolean check for substring

console.log(s.startsWith("The"));  // false
console.log(s.startsWith("A"));    // true

console.log(s.endsWith("dog"));    // true
console.log(s.endsWith("Dog"));    // false — case-sensitive

let s1 = " Practise makes a man perfect ";
console.log(s1.trim());             // removes leading & trailing whitespace only (not internal)

// split — delimiter itself is NOT included in the output array
console.log(s1.split(" "));         // ["", "Practise", "makes", "a", "man", "perfect", ""]
console.log(s1.split(" ", 3));      // limit param — only first 3 pieces: ["", "Practise", "makes"]

console.log(s1.replace("Practise", "Consistency"));  // replaces FIRST match only
console.log(s1.replaceAll("a", "@"));                 // replaces ALL matches (ES2021)

console.log(s1.charAt(2));          // character at index 2
```

### Additional essential string methods:

```js
"Hello".toUpperCase();     // "HELLO"
"Hello".toLowerCase();     // "hello"
"Hello"[0];                  // "H" — strings support bracket indexing (read-only)
"Hello".charCodeAt(0);      // 72 — Unicode code point
String.fromCharCode(72);    // "H"
"  hi  ".trimStart();        // "hi  " — trim only from the left
"  hi  ".trimEnd();          // "  hi" — trim only from the right
"5".padStart(3, "0");        // "005" — pad to a target length
"5".padEnd(3, "0");          // "500"
"Hello World".slice(0, 5);   // "Hello" — like array slice, supports negative indices
"Hello World".substring(0, 5); // "Hello" — similar to slice but doesn't support negative indices the same way
"abc".repeat(3);              // "abcabcabc"
"a,b,,c".split(",");           // ["a","b","","c"]
[..."hello"];                  // ["h","e","l","l","o"] — strings are iterable, spreadable into an array
```
- Strings can be compared with `<`/`>` (lexicographic/dictionary order) but for locale-aware sorting always use `.localeCompare()` (see array sort example above).

---

## 15. Objects

An **object** is an unordered collection of **key–value pairs** (properties). Keys are strings (or Symbols); values can be anything, including functions (called "methods" when they belong to an object).

```js
const productDetails = [
    { proID: 1012, proQty: 5, proName: "iMac", proPrice: 899 },
    { proID: 1112, proQty: 2, proName: "Macbook", proPrice: 1199 },
];

let userData = {
    unm: "Sachin",
    age: 45,
    email: "sachin@gmail.com",
    greet() {                       // method shorthand (ES6)
        console.log("Hi " + this.unm);
    }
};

// Access
console.log(userData.unm);          // dot notation — key must be a valid identifier
console.log(userData["email"]);     // bracket notation — required for dynamic keys or keys with spaces

// Add / update / delete
userData.city = "Kanpur";           // adding a new property
userData.age = 46;                   // updating
delete userData.city;                // removing a property

// Iterate
for (let key in userData) console.log(key, userData[key]);

Object.keys(userData);       // array of keys
Object.values(userData);     // array of values
Object.entries(userData);    // array of [key, value] pairs — great with for...of
Object.entries(userData).forEach(([key, value]) => console.log(key, value));

// Merge / copy
const merged = Object.assign({}, userData, { role: "admin" });   // shallow merge
const merged2 = { ...userData, role: "admin" };                    // spread — modern equivalent

Object.freeze(userData);      // makes the object fully immutable (no add/edit/delete)
Object.isFrozen(userData);    // true

userData.hasOwnProperty("age");         // true — checks own (not inherited) properties
"age" in userData;                        // true — checks own + inherited properties
```
- **Shorthand property names**: `{ name, age }` is shorthand for `{ name: name, age: age }` when the variable name matches the key.
- **Computed property names**: `{ [dynamicKey]: value }` lets you use a variable's value as the key.
- **Optional chaining + nullish coalescing** are commonly combined with objects: `user?.address?.city ?? "Unknown"`.

---

## 16. Destructuring

Destructuring lets you **unpack** values from arrays or properties from objects into individual variables in one line.

```js
let fruits = ["Apple", "Mango", "Banana"];

// WITHOUT destructuring: let f1, f2, f3 = fruits  → f3 would wrongly become the whole array!

// Array destructuring — position-based
let [f1, f2, f3] = fruits;
console.log(f1); // "Apple"
console.log(f2); // "Mango"
console.log(f3); // "Banana"
```

```js
// Object destructuring — name-based (key names must match, order doesn't matter)
const user = { name: "Priya", age: 25, city: "Kanpur" };
const { name, age } = user;
console.log(name, age);

// Renaming while destructuring
const { name: userName } = user;

// Default values if the property is missing
const { country = "India" } = user;

// Nested destructuring
const { address: { pincode } = {} } = user; // safe even if `address` is undefined, thanks to `= {}`

// Skipping elements in array destructuring
const [, second, , fourth] = [1, 2, 3, 4];

// Swapping variables — a classic destructuring trick
let a = 1, b = 2;
[a, b] = [b, a];

// Destructuring function parameters directly (very common in React/Node code)
function printUser({ name, age }) {
    console.log(`${name} is ${age}`);
}
printUser(user);
```

---

## 17. Spread & Rest Operators

Both use the **same `...` syntax**, but do opposite jobs depending on context.

- **Spread** — *expands* an iterable (array/object/string) into individual elements. Used where multiple values are expected.
- **Rest** — *collects* multiple individual values into a single array. Used in function parameters or destructuring, on the left side.

```js
// SPREAD in arrays
let arr = [1, 2, 3];
let arr2 = [...arr, 7, 8, 9];      // [1,2,3,7,8,9] — copies + appends
let copy = [...arr];                 // shallow clone of an array

// SPREAD in objects
let obj = { a: 1, b: 2 };
let objCopy = { ...obj, c: 3 };     // shallow clone + extra field

// SPREAD as function arguments
function add3(a, b, c) { return a + b + c; }
console.log(add3(...[1, 2, 3]));    // spreads array into 3 separate arguments

// REST in function parameters — collects remaining args into a real array
function myAdd(a, b, ...c) {
    console.log(a, b, c);            // c = [7, 8] when called myAdd(5,6,7,8)
}

// REST in destructuring
const [first, ...rest] = [1, 2, 3, 4];   // first = 1, rest = [2,3,4]
const { x, ...others } = { x: 1, y: 2, z: 3 }; // x = 1, others = {y:2, z:3}
```
- ⚠️ Both spread and the shallow clones above are **shallow** — nested objects/arrays inside are still shared by reference. For a true deep copy use `structuredClone(obj)` (modern browsers/Node) or `JSON.parse(JSON.stringify(obj))` (loses functions/`undefined`/dates).

---

## 18. Template Literals

Introduced in ES6, written with backticks `` ` ``, they support:
1. **Interpolation** — embed expressions with `${...}`.
2. **Multi-line strings** — no need for `\n` or string concatenation.
3. **Tagged templates** (advanced) — a function can process the literal before it's used.

```js
let name = "Anshika";
let age = 22;

console.log(`My name is ${name} and I am ${age} years old.`); // interpolation
console.log(`Next year I will be ${age + 1}.`);                  // any expression works inside ${}

const multiLine = `Line one
Line two
Line three`;                                                       // real newlines preserved

// Tagged template (advanced)
function highlight(strings, ...values) {
    return strings.reduce((acc, str, i) => `${acc}${str}${values[i] ? `**${values[i]}**` : ""}`, "");
}
console.log(highlight`Hello ${name}, you are ${age} years old`);
```


## 19. Classes & OOP

Classes (ES6) are **syntactic sugar over JS's existing prototype-based inheritance** (Section 20) — they don't introduce a new object model, just a cleaner syntax for it.

```js
class Person {
    // class field (modern syntax)
    species = "Human";

    constructor(name, age) {          // runs automatically when you `new Person(...)`
        this.name = name;
        this.age = age;
    }

    greet() {                          // instance method — shared by ALL instances via the prototype
        console.log(`Hi, I'm ${this.name}`);
    }

    get info() {                        // getter — accessed like a property, not called like a method
        return `${this.name} (${this.age})`;
    }

    set info(value) {                   // setter
        [this.name, this.age] = value.split(",");
    }

    static create(name) {                // static method — called on the CLASS itself, not instances
        return new Person(name, 0);
    }

    #secret = "hidden";                  // private field (# prefix, ES2022) — inaccessible from outside
    revealSecret() { return this.#secret; }
}

const p1 = new Person("Sam", 30);
p1.greet();                              // "Hi, I'm Sam"
console.log(p1.info);                     // uses the getter
p1.info = "Alex,28";                       // uses the setter
console.log(Person.create("Auto"));         // static method usage
```

### Inheritance with `extends` / `super`
```js
class Employee extends Person {
    constructor(name, age, salary) {
        super(name, age);        // MUST call super() before using `this` in a derived class —
        this.salary = salary;      // it runs the parent constructor
    }

    greet() {                     // method overriding
        super.greet();             // call the parent's version too
        console.log(`I earn ${this.salary}`);
    }
}

const e1 = new Employee("Riya", 26, 50000);
e1.greet();
console.log(e1 instanceof Person);   // true — Employee inherits from Person
```
- `class` bodies are always executed in **strict mode**.
- Class declarations are **not hoisted** the way function declarations are (they're in the TDZ, like `let`/`const`).

---

## 20. Prototypes & Inheritance

Every JS object has an internal link to another object called its **prototype**, from which it can inherit properties/methods — this chain is called the **prototype chain**.

```js
function Animal(name) {
    this.name = name;
}
Animal.prototype.speak = function () {          // adding a method to ALL instances via the prototype
    console.log(`${this.name} makes a noise.`);
};

const dog = new Animal("Rex");
dog.speak();                                       // "Rex makes a noise." — found via the prototype chain

console.log(dog.__proto__ === Animal.prototype);   // true
console.log(Object.getPrototypeOf(dog) === Animal.prototype); // true — the modern, preferred way

// Prototypal inheritance without `class`
function Dog(name, breed) {
    Animal.call(this, name);        // borrow the parent constructor's logic
    this.breed = breed;
}
Dog.prototype = Object.create(Animal.prototype);   // link Dog's prototype to Animal's
Dog.prototype.constructor = Dog;

const d = new Dog("Buddy", "Labrador");
d.speak();     // inherited method still works
```
- When you access `obj.property`, JS looks at `obj` itself first; if not found, it walks up the **prototype chain** (`obj.__proto__ → __proto__.__proto__ → ...`) until it finds the property or reaches `null`.
- `class`/`extends` in Section 19 is just a cleaner syntax that does exactly this under the hood.

---

## 21. Error Handling

```js
try {
    let result = riskyOperation();          // code that might throw
} catch (error) {
    console.log("Something went wrong:", error.message);   // runs only if an error was thrown
} finally {
    console.log("This always runs — cleanup code goes here.");
}

// Throwing custom errors
function divide(a, b) {
    if (b === 0) {
        throw new Error("Cannot divide by zero");   // stops execution, jumps to nearest catch
    }
    return a / b;
}

try {
    divide(5, 0);
} catch (e) {
    console.log(e.message);   // "Cannot divide by zero"
    console.log(e.name);       // "Error"
}

// Custom error classes
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}
try {
    throw new ValidationError("Invalid email");
} catch (e) {
    if (e instanceof ValidationError) console.log("Validation failed:", e.message);
}
```
- Built-in error types: `Error`, `TypeError` (wrong type used), `RangeError` (value out of allowed range), `SyntaxError`, `ReferenceError` (using an undeclared variable).
- `try/catch` only catches errors in **synchronous** code (or inside an `async` function using `await` — see Section 30). It does **not** catch errors thrown inside a raw `setTimeout` callback or a `.then()` without a `.catch()`.

---

## 22. Iterators & Generators

- An object is **iterable** if it implements the `Symbol.iterator` method, which is what makes `for...of`, spread, and destructuring work on it (arrays, strings, Maps, Sets are all iterable by default; plain objects are not).
```js
function makeRangeIterator(start, end) {
    let current = start;
    return {
        next() {
            if (current < end) return { value: current++, done: false };
            return { value: undefined, done: true };
        },
        [Symbol.iterator]() { return this; }   // makes it usable in for...of
    };
}
for (const num of makeRangeIterator(1, 4)) console.log(num); // 1, 2, 3
```
- **Generator functions** (`function*`) are a simpler way to write iterators — they can **pause and resume** execution using `yield`.
```js
function* countUpTo(max) {
    let i = 1;
    while (i <= max) {
        yield i;     // pauses here, returns `i`, and remembers where it left off
        i++;
    }
}
const gen = countUpTo(3);
console.log(gen.next());  // { value: 1, done: false }
console.log(gen.next());  // { value: 2, done: false }
console.log(gen.next());  // { value: 3, done: false }
console.log(gen.next());  // { value: undefined, done: true }

for (const num of countUpTo(3)) console.log(num);  // generators are iterable — works with for...of directly
```
- Generators are the foundation behind async iteration patterns and libraries like Redux-Saga.

---

## 23. Map, Set, WeakMap, WeakSet

### `Map` — key-value pairs, but **keys can be ANY type** (unlike plain objects, whose keys are always strings/symbols)
```js
const map = new Map();
map.set("name", "Sam");
map.set(1, "one");
map.set({}, "object as key");     // objects, functions, anything can be a key

console.log(map.get("name"));      // "Sam"
console.log(map.has(1));            // true
map.delete(1);
console.log(map.size);              // number of entries

for (const [key, value] of map) console.log(key, value); // Maps are iterable & preserve insertion order
```

### `Set` — a collection of **unique values** (no duplicates allowed)
```js
const set = new Set([1, 2, 2, 3, 3, 3]);
console.log(set);            // Set(3) {1, 2, 3} — duplicates auto-removed
set.add(4);
set.has(2);                    // true
set.delete(1);
console.log([...set]);        // convert back to array easily via spread

// A common real-world use: de-duplicate an array in one line
const unique = [...new Set([1, 1, 2, 2, 3])];  // [1, 2, 3]
```

### `WeakMap` / `WeakSet`
- Same idea as `Map`/`Set`, but keys (WeakMap) or values (WeakSet) **must be objects**, and are held with a *weak reference* — meaning if there's no other reference to that object anywhere, it can be garbage-collected automatically. Used for attaching private/metadata to objects without causing memory leaks. They are **not iterable** and have no `.size`.

---

## 24. Symbols

`Symbol` is a primitive type that creates a **guaranteed-unique identifier** — even two symbols created with the exact same description are never equal.
```js
const sym1 = Symbol("id");
const sym2 = Symbol("id");
console.log(sym1 === sym2);   // false — always unique

const user = {
    name: "Sam",
    [sym1]: "hidden metadata"   // symbol-keyed properties are NOT enumerated by for...in / Object.keys
};
console.log(user[sym1]);
```
- Common use: defining well-known behaviors (like `Symbol.iterator` above) without risking collisions with normal string property names.

---

## 25. Numbers & Math

```js
Number.isInteger(5);         // true
Number.isFinite(10 / 0);     // false (Infinity)
Number.parseInt("42px");     // 42 — parses leading digits, ignores the rest
Number.parseFloat("3.14m");   // 3.14
(5.6789).toFixed(2);          // "5.68" — rounds to N decimals, returns a STRING
(1234.5).toLocaleString();     // "1,234.5" — locale-aware formatting

Math.max(1, 5, 3);      // 5
Math.min(1, 5, 3);      // 1
Math.round(4.5);         // 5
Math.floor(4.9);         // 4 — always rounds down
Math.ceil(4.1);           // 5 — always rounds up
Math.abs(-7);              // 7
Math.pow(2, 5);            // 32 — same as 2 ** 5
Math.sqrt(16);              // 4
Math.random();               // random float between 0 (inclusive) and 1 (exclusive)

// common pattern: random integer in a range [min, max]
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
```
- ⚠️ JS numbers are **floating-point (IEEE 754 double)**, so decimal math can be imprecise: `0.1 + 0.2 === 0.3` is `false` (it equals `0.30000000000000004`). Compare with a small tolerance (`Math.abs(a - b) < Number.EPSILON`) when exact decimal equality matters.

---

## 26. Dates

```js
const now = new Date();                          // current date & time
const specific = new Date(2026, 7, 29);            // year, MONTH (0-indexed!, so 7 = August), day
const fromString = new Date("2026-08-29");

console.log(now.getFullYear());   // e.g. 2026
console.log(now.getMonth());       // 0-11 (⚠️ zero-indexed — a very common bug source)
console.log(now.getDate());        // day of month, 1-31
console.log(now.getDay());          // day of WEEK, 0 (Sun) - 6 (Sat)
console.log(now.getHours(), now.getMinutes(), now.getSeconds());
console.log(now.getTime());          // milliseconds since Jan 1 1970 (Unix epoch) — good for comparisons

const later = new Date(now.getTime() + 60000);   // add 60,000 ms = 1 minute

console.log(now.toISOString());    // standardized string format, good for storage/APIs
console.log(now.toLocaleDateString()); // locale-formatted, good for display
```
- For heavy date manipulation (timezones, formatting, diffs), libraries like `date-fns` or the newer built-in `Temporal` API (still stabilizing) are preferred over manual `Date` math.

---

## 27. Regular Expressions

Regex (`RegExp`) describes a **pattern** used to match, test, or replace parts of a string.
```js
const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;  // simple email pattern

pattern.test("user@example.com");         // true — boolean check
"user@example.com".match(pattern);          // returns match details or null

const str = "Order #1023, Order #1044";
str.match(/#\d+/g);                          // ["#1023", "#1044"] — `g` flag = match ALL occurrences
str.replace(/Order/g, "Ref");                 // "Ref #1023, Ref #1044"

// Common flags: g (global), i (case-insensitive), m (multi-line)
/hello/i.test("HELLO WORLD");                  // true
```
- Common metacharacters: `\d` digit, `\w` word char, `\s` whitespace, `.` any char, `*` zero-or-more, `+` one-or-more, `?` optional, `{n,m}` range of repeats, `^`/`$` start/end anchors, `[...]` character class.

---

## 28. JSON

**JSON (JavaScript Object Notation)** is a lightweight, text-based data format used everywhere for APIs and storage. It looks like JS object/array syntax but with stricter rules (keys must be double-quoted strings, no functions, no `undefined`, no trailing commas).

```js
const user = { name: "Sam", age: 30, hobbies: ["chess", "reading"] };

const jsonString = JSON.stringify(user);          // JS object → JSON string (for sending/storing)
console.log(jsonString);   // '{"name":"Sam","age":30,"hobbies":["chess","reading"]}'

JSON.stringify(user, null, 2);                      // pretty-printed with 2-space indentation

const parsedBack = JSON.parse(jsonString);          // JSON string → JS object again
console.log(parsedBack.name);                        // "Sam"
```
- `JSON.stringify()` silently **drops** functions, `undefined` values, and Symbols; `Date` objects become ISO strings.

---

## 29. Modules (import/export)

ES Modules let you split code across files, exporting what should be public and importing only what's needed elsewhere. In the browser, load with `<script type="module" src="app.js"></script>`; in Node, use `.mjs` files or `"type": "module"` in `package.json`.

```js
// mathUtils.js
export function add(a, b) { return a + b; }        // named export
export const PI = 3.14159;
export default function multiply(a, b) { return a * b; }  // default export — one per file

// app.js
import multiply, { add, PI } from "./mathUtils.js";  // default + named imports together
import * as MathUtils from "./mathUtils.js";           // import everything as a namespace object

console.log(add(2, 3), PI, multiply(2, 3));
```
- **Named exports** must be imported with matching names (can be renamed with `as`: `import { add as sum }`).
- **Default exports** can be imported under any name you choose.
- Modules are **automatically in strict mode** and each module has its own scope (no accidental global pollution).
- Node.js also has an older module system, **CommonJS** (`require()` / `module.exports`), still widely used in existing Node codebases:
  ```js
  // CommonJS (older Node style)
  module.exports = { add, multiply };
  const { add } = require("./mathUtils");
  ```

---

## 30. Asynchronous JavaScript

JS is single-threaded — it can only do one thing at a time. Asynchronous patterns let long-running tasks (timers, network calls, file reads) happen **without blocking** the rest of the program.

### 30.1 `setTimeout` — the foundation
```js
function myfun(milliseconds) {
    let start = new Date().getTime();
    console.log("Process start....");
    setTimeout(() => {
        console.log("Process Done");
    }, milliseconds);                 // scheduled to run LATER, doesn't block anything below it
    console.log("Process end....");    // this runs IMMEDIATELY, before the timeout fires
}

console.log("Task Started....");
myfun(5000);
console.log("Task Completed...");
// Actual output order: "Task Started...." → "Process start...." → "Process end...." →
//                       "Task Completed..." → (5 seconds later) "Process Done"
```
- A blocking `while` loop (busy-waiting) freezes the entire page/thread — `setTimeout` is the non-blocking alternative that hands control back immediately and runs the callback later.

### 30.2 Callbacks + Closures
```js
function myfun(callback) {
    console.log("Process Start ...");
    setTimeout(callback, 0);     // even a 0ms delay still goes through the event loop/task queue,
    console.log("Process End ..."); //   so this synchronous line always runs FIRST
}
myfun(() => {
    console.log(name);            // closures let the callback still "see" `name` even though
});                                  //   it's declared AFTER the function call, thanks to hoisting
let name = "Sachin";
```

### 30.3 Callback Hell
Nesting callback after callback for sequential async steps becomes deeply indented and hard to maintain — nicknamed the **"pyramid of doom"**:
```js
findProduct(1002, () => {
    findProduct(1003, () => {
        findProduct(1004, () => {
            // ...and it keeps growing sideways with every new step
        });
    });
});
```

### 30.4 Promises
A **Promise** is an object representing the eventual result of an async operation. It has 3 states: **pending** → **fulfilled** (`resolve`) or **rejected** (`reject`).
```js
let promise = new Promise((resolve, reject) => {
    console.log("Inside Promise ...");
    let isValid = true;
    if (isValid) resolve("Promise Fulfilled");
    else reject("Promise Rejected");
});

promise
    .then((data) => console.log(data))     // runs on success (resolve)
    .catch((err) => console.log(err))      // runs on failure (reject)
    .finally(() => console.log("Finally Block"));  // always runs, success or failure
```
- Refactoring a callback-based function into a Promise-based one:
  ```js
  function findProduct(productId) {
      console.log("Fetching Product Details, ID :" + productId);
      return new Promise((resolve, reject) => {
          setTimeout(() => {
              const product = productDetails.find((p) => p.proID === productId);
              product ? resolve(product) : reject("Product not found");
          }, 3000);
      });
  }
  ```
- **Nested `.then()`** still works but re-creates the pyramid problem:
  ```js
  findProduct(1001).then((p1) => {
      findProduct(1002).then((p2) => {
          findProduct(1003).then((p3) => { console.log(p1, p2, p3); })
              .catch((e) => console.log(e));
      }).catch((e) => console.log(e));
  }).catch((e) => console.log(e));
  ```
- **Promise chaining** — the proper fix: `return` a promise from inside `.then()` to flatten the pyramid into a linear, readable chain:
  ```js
  findProduct(1001)
      .then((product) => { console.log(product); return findProduct(1002); })
      .then((product) => { console.log(product); return findProduct(1003); })
      .then((product) => console.log(product))
      .catch((error) => console.log(error));   // ONE catch handles errors from ANY step in the chain
  ```
- **Promise combinators** — for running multiple promises together:
  ```js
  Promise.all([p1, p2, p3]);        // waits for ALL to resolve; rejects immediately if ANY one rejects
  Promise.allSettled([p1, p2, p3]); // waits for ALL, never rejects — gives status of each individually
  Promise.race([p1, p2, p3]);        // resolves/rejects as soon as the FIRST one settles
  Promise.any([p1, p2, p3]);         // resolves as soon as the FIRST one fulfills, ignores rejections
  ```

### 30.5 `async` / `await`
Syntactic sugar over Promises that lets asynchronous code **read like synchronous code** — the biggest readability win in modern JS.
```js
async function myfun() {                  // `async` makes the function always return a Promise
    let pro = await findProduct(1001);      // `await` PAUSES here until the promise settles,
    console.log(pro);                         //  without blocking the rest of the program

    pro = await findProduct(1002);
    console.log(pro);

    pro = await findProduct(1003);
    console.log(pro);
}
myfun();
```
- Error handling with async/await uses regular `try/catch`:
  ```js
  async function safeFetch() {
      try {
          const pro = await findProduct(9999);
          console.log(pro);
      } catch (err) {
          console.log("Caught:", err);
      }
  }
  ```
- **Real-world example — Fetch API + async/await** (from the repo, fetching random users and rendering a table):
  ```js
  async function fetchUsers() {
      const spinner = document.getElementById("mySpinner");
      spinner.style.display = "block";              // show a loading spinner

      const res = await fetch("https://randomuser.me/api/?results=10");  // network request
      const data = await res.json();                  // parse the JSON body (also async!)
      createTable(data.results);

      spinner.style.display = "none";                 // hide spinner once done
  }
  fetchUsers();
  ```
- `await` can only be used **inside an `async` function** (or at the top level of a module, in modern environments).
- Running independent async calls in *parallel* instead of sequentially (much faster when steps don't depend on each other):
  ```js
  // ❌ Sequential — slow, each waits for the previous
  const p1 = await findProduct(1001);
  const p2 = await findProduct(1002);

  // ✅ Parallel — both start at once
  const [r1, r2] = await Promise.all([findProduct(1001), findProduct(1002)]);
  ```

---

## 31. The Event Loop

This is **how** JS achieves non-blocking async behavior despite being single-threaded.

- **Call Stack** — where synchronous code executes, one frame at a time (LIFO).
- **Web APIs / Node APIs** — the browser/runtime (not JS itself) handles things like `setTimeout`, DOM events, and `fetch` in the background.
- **Callback Queue (Macrotask Queue)** — where completed `setTimeout`/`setInterval`/event callbacks wait their turn.
- **Microtask Queue** — where completed Promise `.then`/`.catch`/`.finally` callbacks (and `async/await` continuations) wait; it has **higher priority** than the macrotask queue.
- **Event Loop** — continuously checks: *"Is the call stack empty?"* If yes, it first drains the **entire microtask queue**, then takes **one** task from the macrotask queue, and repeats.

```js
console.log("1");                                 // synchronous — call stack

setTimeout(() => console.log("2"), 0);              // macrotask — queued, even with 0ms delay

Promise.resolve().then(() => console.log("3"));    // microtask — queued

console.log("4");                                   // synchronous — call stack

// Output: 1, 4, 3, 2
// Reasoning: sync code (1, 4) always runs first; then ALL microtasks (3);
// only then does the event loop pick up the next macrotask (2).
```
- This is why a `0ms` `setTimeout` never actually runs "immediately" — it always waits for the current synchronous code AND all pending microtasks to finish first.

---

## 32. The DOM — Selecting & Modifying Elements

The **DOM (Document Object Model)** is the browser's live, tree-structured representation of an HTML page, which JS can read and manipulate.

### 32.1 Selecting elements
```js
document.getElementById("myP");            // single element by id — fastest, most specific
document.getElementsByClassName("cls1");    // live HTMLCollection of all elements with that class
document.getElementsByTagName("p");         // live HTMLCollection of all elements with that tag
document.querySelector(".cls1");            // FIRST element matching any CSS selector
document.querySelectorAll(".cls1");         // static NodeList of ALL elements matching a CSS selector
document.querySelectorAll("div>h1:nth-child(odd)"); // full CSS selector power — combinators, pseudo-classes
```
- `getElementsBy...` methods return **live** collections (auto-update as the DOM changes); `querySelectorAll` returns a **static** NodeList (a snapshot).
- `querySelector`/`querySelectorAll` are the most flexible — they accept **any valid CSS selector**.

### 32.2 Reading & changing content/style
```js
let p = document.getElementById("myP");
console.log(p);
p.textContent = "Bye World";     // sets/reads plain text (safe, doesn't parse HTML)
p.innerHTML = "<b>Bold</b>";      // sets/reads HTML markup — parses tags (⚠️ risk of XSS with untrusted input)

p.style.backgroundColor = "navy";  // inline styles use camelCase JS property names
p.style.color = "white";
p.style.lineHeight = "100px";
p.style.textAlign = "center";
p.style.border = "2px solid skyblue";
```

### 32.3 Reading/setting element properties & attributes
```js
let inpEle = document.getElementById("unm");
console.log(inpEle.value);         // current value typed into an input
console.log(inpEle.type);
console.log(inpEle.placeholder);
console.log(inpEle.name);
inpEle.disabled = true;              // JS property — reflects the live DOM state

// Password show/hide toggle pattern
inpEle.type = (inpEle.type === "password") ? "text" : "password";

// Radio buttons — getElementsByName + loop to find the checked one
let radioList = document.getElementsByName("gender");
for (let radio of radioList) {
    if (radio.checked) console.log(radio.value);
}

// Checkbox — toggle all at once
let checkList = document.getElementsByName("hobbies");
checkList.forEach((checkbox) => { checkbox.checked = true; });
```
- `getAttribute()`/`setAttribute()` work with raw HTML attribute strings; direct properties (`.value`, `.checked`, `.disabled`) reflect the **live** state and are usually preferred for form elements.

---

## 33. DOM — Creating, Inserting, Removing Elements

```js
// Create + configure + attach an element from scratch
let btn = document.createElement("button");
btn.textContent = "Submit";
btn.setAttribute("type", "submit");
btn.addEventListener("click", () => { alert("Your form has been submitted.."); });

let d = document.getElementById("myDiv");
d.append(btn);          // adds INSIDE, as the last child
// d.prepend(btn);       // adds INSIDE, as the first child
// d.before(btn);        // adds OUTSIDE, immediately before d as a sibling
// d.after(btn);         // adds OUTSIDE, immediately after d as a sibling
```

### Building a table dynamically (a very common real-world DOM task)
```js
let table = document.createElement("table");
table.setAttribute("border", "5px");

for (let i = 1; i <= 5; i++) {
    let row = table.insertRow();          // creates + appends a <tr>
    let col1 = row.insertCell();           // creates + appends a <td>
    col1.textContent = "Column 1";
    let col2 = row.insertCell();
    let inp2 = document.createElement("input");
    col2.append(inp2);
    let col3 = row.insertCell();
    col3.textContent = "Column 3";
}
document.body.append(table);
```
### Building a table header + body from an array of objects
```js
const productDetails = [
    { proID: 1012, proQty: 5, proName: "iMac", proPrice: 899 },
    { proID: 1112, proQty: 2, proName: "Macbook", proPrice: 1199 },
];

let table = document.createElement("table");
let thead = table.createTHead();
let hrow = thead.insertRow();

for (let key in productDetails[0]) {          // build header cells from object KEYS
    let hcol = hrow.insertCell();
    hcol.textContent = key;
    hcol.style.fontWeight = "bold";
    hcol.style.cursor = "pointer";
    hcol.addEventListener("click", () => { alert(key); }); // clickable, sortable-style headers
}

productDetails.forEach((product) => {           // build a data row per object
    let row = table.insertRow();
    for (let key in product) {
        let col = row.insertCell();
        col.textContent = product[key];
    }
});
document.body.append(table);
```

### Replacing / removing / traversing elements
```js
let ul = document.getElementById("userNames");
let newPara = document.createElement("p");
newPara.textContent = "My Paragraph";

ul.replaceWith(newPara);   // swaps ul out entirely for newPara
// ul.before(newPara);      // insert newPara just before ul, as a sibling
// ul.after(newPara);        // insert newPara just after ul, as a sibling
// ul.remove();               // deletes ul from the DOM entirely

// DOM traversal — moving around the tree from a known node
ul.parentElement;             // the parent element
ul.children;                    // live collection of ELEMENT children only (skips text nodes)
ul.childNodes;                  // ALL child nodes, including whitespace/text nodes
ul.firstElementChild;           // first child element
ul.lastElementChild;             // last child element
ul.previousElementSibling;       // element right before it at the same level
ul.nextElementSibling;            // element right after it at the same level
```
- `classList` API for managing CSS classes without string-manipulating `className` manually:
  ```js
  let classList = table.classList;
  classList.add("table", "table-bordered", "table-striped");
  classList.remove("table-striped");
  classList.toggle("hidden");        // adds if absent, removes if present
  classList.contains("table");        // boolean check
  ```

---

## 34. Events, Bubbling & Delegation

```js
let btn = document.getElementById("btn");
btn.addEventListener("click", () => { console.log("Button Clicked"); }); // modern, preferred way
// (older style, avoid mixing HTML and JS: <button onclick="myfun()">)

btn.removeEventListener("click", handlerFn);  // must reference the SAME named function to remove it
```
- Common events: `click`, `dblclick`, `mouseover`/`mouseout`, `keydown`/`keyup`, `submit`, `change`, `input`, `focus`/`blur`, `load`, `DOMContentLoaded`.

### Event Bubbling
When you click a nested element, the click event fires on that element first, then **"bubbles up"** through every ancestor in turn.
```js
// Structure: #parent > #child > #btn
document.getElementById("parent").addEventListener("click", () => console.log("Parent Clicked"));
document.getElementById("child").addEventListener("click", () => console.log("Child Clicked"));
document.getElementById("btn").addEventListener("click", () => console.log("Button Clicked"));

// Clicking the button logs, in order:
// "Button Clicked" → "Child Clicked" → "Parent Clicked"   (inner to outer — bubbling)
```
- `event.stopPropagation()` inside a handler stops the bubbling from continuing further up.

### Event Delegation
Instead of attaching a listener to *every* child element, attach **one listener to a common parent** and use `event.target` to identify which child was actually clicked. This scales well (works even for elements added later) and uses far less memory.
```js
let d = document.querySelector(".parent");   // one <div> containing many <button>s
d.addEventListener("click", (event) => {
    console.log(event.target);               // the EXACT element that was actually clicked
    console.log(event.target.textContent);
});
```
- `event.target` = the element that triggered the event; `event.currentTarget` = the element the listener is attached to (they differ during bubbling).

---

## 35. Browser APIs (fetch, storage, timers)

### `fetch()` — making HTTP requests
```js
async function fetchUsers() {
    let res = await fetch("https://randomuser.me/api/?results=10"); // returns a Response object
    let data = await res.json();          // parses the JSON body — this step is ALSO async
    console.log(data.results);
}

// POST request with a JSON body
async function createUser(payload) {
    let res = await fetch("https://api.example.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);   // fetch does NOT reject on 4xx/5xx!
    return res.json();
}
```
- ⚠️ Important gotcha: `fetch()` only rejects its promise on **network failure** — a `404` or `500` response is still a "successful" fetch as far as the promise is concerned. Always check `res.ok` / `res.status` manually.

### Timers
```js
let timeoutId = setTimeout(() => console.log("Runs once, later"), 1000);
clearTimeout(timeoutId);              // cancel before it fires

let intervalId = setInterval(() => console.log("Runs repeatedly"), 1000);
clearInterval(intervalId);            // stop the repetition
```

### Web Storage — `localStorage` / `sessionStorage`
Both store simple key-value **string** data in the browser (not for use inside Claude artifacts, but standard for regular web apps).
```js
localStorage.setItem("theme", "dark");     // persists even after closing the browser
localStorage.getItem("theme");                // "dark"
localStorage.removeItem("theme");
localStorage.clear();                          // wipes everything

sessionStorage.setItem("draft", "hello");     // cleared when the tab/browser is closed

// Storing objects requires manual JSON conversion — storage only holds strings
localStorage.setItem("user", JSON.stringify({ name: "Sam" }));
const user = JSON.parse(localStorage.getItem("user"));
```

---

## 36. Advanced Function Patterns

### Currying
Transforming a function that takes multiple arguments into a sequence of functions that each take one argument.
```js
const add = (a) => (b) => (c) => a + b + c;
console.log(add(1)(2)(3));   // 6
const add5 = add(5);            // partially applied — "remembers" a=5 via closure
console.log(add5(2)(3));        // 10
```

### Debounce
Delays running a function until a certain time has passed **without it being called again** — useful for search-as-you-type inputs, resize handlers.
```js
function debounce(fn, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}
const debouncedSearch = debounce((query) => console.log("Searching:", query), 300);
```

### Throttle
Ensures a function runs **at most once** every fixed interval — useful for scroll handlers, infinite scroll.
```js
function throttle(fn, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            fn.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}
```

### Memoization
Caches the results of expensive function calls so repeated calls with the same input are instant.
```js
function memoize(fn) {
    const cache = new Map();
    return function (...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) return cache.get(key);
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
}
```

### Function Composition & Currying-friendly style
```js
const compose = (...fns) => (x) => fns.reduceRight((acc, fn) => fn(acc), x);
const pipe = (...fns) => (x) => fns.reduce((acc, fn) => fn(acc), x);

const double = (x) => x * 2;
const increment = (x) => x + 1;
pipe(double, increment)(5);   // (5*2)+1 = 11
```

---

## 37. ES6+ Feature Cheat-Sheet

Quick reference of what each modern JS version introduced (already covered in detail above — this is a compact index):

| Version | Key Features |
|---|---|
| **ES6 / ES2015** | `let`/`const`, arrow functions, classes, template literals, destructuring, default/rest/spread params, Promises, `for...of`, Map/Set, modules (`import`/`export`), generators, Symbols |
| **ES2016** | `Array.prototype.includes()`, exponent operator `**` |
| **ES2017** | `async`/`await`, `Object.entries()`/`Object.values()`, string padding (`padStart`/`padEnd`) |
| **ES2018** | Object spread/rest (`{...obj}`), `Promise.finally()`, async iteration |
| **ES2019** | `Array.flat()`/`flatMap()`, `Object.fromEntries()`, optional `catch` binding |
| **ES2020** | Optional chaining `?.`, nullish coalescing `??`, `BigInt`, `Promise.allSettled()`, dynamic `import()` |
| **ES2021** | `replaceAll()`, logical assignment (`&&=`, `\|\|=`, `??=`), `Promise.any()`, numeric separators (`1_000_000`) |
| **ES2022** | Class private fields (`#field`), top-level `await`, `Array.at()` (negative indexing), `Object.hasOwn()` |
| **ES2023+** | `Array.toSorted()`/`toReversed()`/`with()` (non-mutating array methods), `Array.findLast()`/`findLastIndex()` |

```js
[1,2,3].at(-1);                     // 3 — last element, cleaner than arr[arr.length-1]
Object.fromEntries([["a",1],["b",2]]); // { a: 1, b: 2 } — reverse of Object.entries()
1_000_000;                           // 1000000 — numeric separators for readability
```

---

## 38. Best Practices & Common Pitfalls

- ✅ Prefer `const` by default, `let` when reassignment is needed, and avoid `var` entirely.
- ✅ Use `===`/`!==` instead of `==`/`!=` to avoid unexpected type coercion bugs.
- ✅ Always handle Promise rejections — a hanging `.then()` without `.catch()`, or an `await` without `try/catch`, causes silent/unhandled errors.
- ✅ Use `slice()` (non-mutating) when you don't want to change the original array; be deliberate when reaching for mutating methods like `splice()`, `sort()`, `push()`.
- ✅ Prefer array methods (`map`/`filter`/`reduce`) over manual loops for transformations — more declarative and less error-prone.
- ✅ Use event delegation for lists/dynamic content instead of attaching a listener to every single item.
- ✅ Use `textContent` instead of `innerHTML` unless you specifically need to insert HTML markup — `innerHTML` with untrusted input is an XSS risk.
- ⚠️ Remember `NaN !== NaN` — always check with `isNaN()`/`Number.isNaN()`, never `=== NaN`.
- ⚠️ Remember floating-point imprecision (`0.1 + 0.2 !== 0.3`) — don't compare decimals with `===` directly.
- ⚠️ Remember arrow functions don't have their own `this` — don't use them as object methods when you need `this` to refer to the object.
- ⚠️ Remember closures inside `var`-based loops share one variable — use `let` to get a fresh binding per iteration.
- ⚠️ Remember `fetch()` doesn't reject on HTTP error status codes — always check `response.ok`.
- ⚠️ Avoid deeply nested callbacks/`.then()` chains — refactor into Promise chains or `async`/`await`.

---

### How to use this file
- Treat each numbered section as a standalone reference — jump straight to what you need via the [Table of Contents](#table-of-contents).
- Every code block is runnable as-is in a browser console or via `node file.js` (DOM/browser-only sections — 32 to 35 — need a browser environment or a DOM library like `jsdom` in Node).
- Cross-reference: the original hands-on practice files this guide was built from live in the `05-javascript` folder (`01-variables.js` through `22-strings.js`, plus the `23-dom/` and `24-async/` sub-folders).
