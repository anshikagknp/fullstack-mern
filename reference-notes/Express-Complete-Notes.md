# Express.js — The Complete Notes (Beginner to Advanced)

> A one-stop reference for learning Express.js — built from the official MDN "Express/Node" learning series and a real-world project (`07-express`) that demonstrates routing, middleware, authentication (JWT + cookies), file uploads (Multer), and MongoDB (Mongoose).

---

## Table of Contents

1. [Introduction to Node.js and Express](#1-introduction-to-nodejs-and-express)
2. [Setting Up the Development Environment](#2-setting-up-the-development-environment)
3. [Your First Express App (Hello World)](#3-your-first-express-app-hello-world)
4. [Node.js Modules — `require`, `exports`, `module.exports`](#4-nodejs-modules--require-exports-moduleexports)
5. [Asynchronous Programming in Node/Express](#5-asynchronous-programming-in-nodeexpress)
6. [Routing in Express](#6-routing-in-express)
7. [Middleware — The Heart of Express](#7-middleware--the-heart-of-express)
8. [The Request Object (`req`)](#8-the-request-object-req)
9. [The Response Object (`res`)](#9-the-response-object-res)
10. [Parsing Request Data (JSON, Form Data)](#10-parsing-request-data-json-form-data)
11. [Serving Static Files](#11-serving-static-files)
12. [Cookies and Sessions](#12-cookies-and-sessions)
13. [CORS (Cross-Origin Resource Sharing)](#13-cors-cross-origin-resource-sharing)
14. [Authentication & Authorization (JWT-based)](#14-authentication--authorization-jwt-based)
15. [File Uploads with Multer](#15-file-uploads-with-multer)
16. [Databases with Express — MongoDB & Mongoose](#16-databases-with-express--mongodb--mongoose)
17. [Project Structure — Building a Real MVC App](#17-project-structure--building-a-real-mvc-app)
18. [Error Handling in Express](#18-error-handling-in-express)
19. [Environment Variables with `dotenv`](#19-environment-variables-with-dotenv)
20. [Template Engines (Views)](#20-template-engines-views)
21. [The Express Application Generator](#21-the-express-application-generator)
22. [Testing Express Applications](#22-testing-express-applications)
23. [Security Best Practices](#23-security-best-practices)
24. [Performance & Production Best Practices](#24-performance--production-best-practices)
25. [Deploying an Express App](#25-deploying-an-express-app)
26. [Express 5 — What Changed](#26-express-5--what-changed)
27. [Quick Reference / Cheat Sheet](#27-quick-reference--cheat-sheet)
28. [Walkthrough of the Reference Project (`07-express`)](#28-walkthrough-of-the-reference-project-07-express)

---

## 1. Introduction to Node.js and Express

### What is Node.js?
- Node.js is **not a framework or language** — it's a cross-platform, open-source **JavaScript runtime environment** that lets you run JS *outside the browser* (on a server/computer).
- Built on Chrome's **V8 JavaScript engine**.
- Because it runs outside the browser, Node **removes browser-only APIs** (like `window`, `document`) and **adds OS-level APIs** — file system access (`fs`), networking (`http`, `net`), process control (`process`), etc.

**Why Node is popular for servers:**
- ⚡ **High performance** — non-blocking, event-driven I/O model, great for real-time apps (chat, streaming).
- 🧠 **Same language everywhere** — JavaScript on both client and server means no "context switching."
- 📦 **npm (Node Package Manager)** — access to the largest software registry in the world; hundreds of thousands of reusable packages.
- 🖥️ **Portable** — runs on Windows, macOS, Linux, and more.
- 🌍 **Massive community** — huge ecosystem, tons of help available.

**Node is single-threaded & event-driven:**
- All requests are handled on **one thread** using an **event loop**.
- This is extremely efficient *as long as* you don't run long, blocking (synchronous) code — that would freeze the entire server for every user.
- This is why Node/Express code leans heavily on **asynchronous** patterns (callbacks, Promises, `async/await`).

### A raw Node.js server (no framework)
```js
// Load HTTP module
const http = require("http");

const hostname = "127.0.0.1";
const port = 8000;

// Create HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello World\n");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```
Notice how much manual work this is — no routing helpers, no easy way to distinguish `GET` vs `POST`, no built-in way to serve static files. This is exactly the gap **web frameworks** fill.

### What is Express?
- Express is the **most popular Node.js web framework** — a thin layer of features on top of Node's `http` module.
- It is the **underlying library** for many other Node frameworks (NestJS builds on similar ideas, and many "batteries-included" frameworks use Express internally).
- Express gives you:
  - Easy ways to define **routes** (URL + HTTP verb → handler function).
  - A **middleware pipeline** to process every request (auth, logging, parsing, etc.).
  - Integration with **view/template engines** to generate dynamic HTML.
  - Simple ways to configure app-wide settings.

### Is Express "opinionated"?
- **Unopinionated**: Express does *not* force a "correct" way to structure your app, which database to use, or which template engine to pick.
- ✅ Pros: total flexibility, mix-and-match any middleware/library you like.
- ❌ Cons: more decisions fall on you; there's no single "official" project structure (though common patterns like MVC have emerged, and this note's reference project follows one).

### History & Popularity (context)
- Node.js: first released **2009** (Linux only); npm released 2010; native Windows support in 2012.
- Express: released **November 2010**; now on **major version 5**.
- Both are backed by huge communities, adopted by major companies, and are considered "safe" long-term choices for backend JavaScript development.

---

## 2. Setting Up the Development Environment

### Prerequisites
- Install **Node.js** (which bundles **npm**) from [nodejs.org](https://nodejs.org). Prefer the **LTS** version for production stability.
- Verify installation:
```bash
node -v
npm -v
```

### Creating a New Project
```bash
mkdir my-express-app
cd my-express-app
npm init -y          # creates package.json with default values
```
- `package.json` is the **manifest** of your project: name, version, scripts, dependencies.

### Installing Express
```bash
npm install express
```
This:
- Downloads Express (and its dependencies) into `node_modules/`.
- Adds an entry under `"dependencies"` in `package.json`.
- Creates/updates `package-lock.json` (locks exact dependency versions for reproducible installs).

### Useful Dev Dependency: `nodemon`
Restarts your server automatically whenever you save a file (huge productivity boost).
```bash
npm install --save-dev nodemon
```
Add a script in `package.json`:
```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```
Run with:
```bash
npm run dev
```

### Typical Minimal Folder Structure
```
my-express-app/
├── node_modules/
├── package.json
├── package-lock.json
├── .env                 # environment variables (never commit this!)
├── .gitignore
└── index.js             # entry point (a.k.a app.js / server.js)
```
As the app grows, this evolves into an **MVC-style** structure (routes/controllers/models/middlewares) — covered in [Section 17](#17-project-structure--building-a-real-mvc-app).

### `.gitignore` essentials for a Node project
```
node_modules/
.env
uploads/
```

---

## 3. Your First Express App (Hello World)

```js
const express = require("express");

const app = express();     // calling express() returns an "app" object
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
```

**Breaking it down, line by line:**
- `require("express")` → imports the Express module (a function).
- `express()` → calling that function returns an **application object** (`app`), which has methods for routing, middleware, settings, view rendering, etc.
- `app.get(path, handler)` → registers a **route handler** that runs whenever an HTTP `GET` request hits `path`.
  - The handler always receives `(req, res)` (and optionally `next`) — **request** and **response** objects.
  - `res.send(...)` ends the request-response cycle by sending data back to the client.
- `app.listen(port, callback)` → starts the HTTP server and begins listening for connections on that port.

Run it:
```bash
node index.js
# or, with nodemon:
npx nodemon index.js
```
Visit `http://localhost:3000` in the browser.

### From the reference project (`index.js`)
```js
require("dotenv").config();
const express = require('express');
const app = express();

// http://localhost:8000
app.get("/", (req, res) => {
  res.send("Hellowwww Mrs Monika")     // send data as a string
});

// http://localhost:8000/home
app.get("/home", (req, res) => {
  res.send("<h1 align='center'>My home page</h1>")   // send raw HTML
});

app.post("/", (req, res) => {
  res.send("Response from Post....")
});

app.get("/emp", (req, res) => {
  const userData = { userName: "Sachin", userAge: 45, userProfession: "Cricket" };
  res.json(userData);      // send data as JSON
});

app.listen(PORT, HOST, (error) => {
  if (error) console.log("Error Occured : " + error);
  else console.log(`Server Running at http://${HOST}:${PORT}`);
});
```
- `res.send()` → sends a string/HTML/Buffer response; Express sets the `Content-Type` automatically.
- `res.json()` → sends a JSON response and sets `Content-Type: application/json`.
- The **same path** (`"/"`) can have **different handlers per HTTP verb** (`GET` vs `POST`) — Express dispatches based on method + path.

---

## 4. Node.js Modules — `require`, `exports`, `module.exports`

- A **module** is just a JS file whose code is isolated; you choose what to expose using `exports`/`module.exports`, and pull it into another file with `require()`.
- This keeps a codebase **organized** (small, focused files) and avoids **global namespace pollution** — only what you explicitly export becomes visible elsewhere.

### Exporting multiple named things
```js
// square.js
exports.area = function (width) {
  return width * width;
};
exports.perimeter = function (width) {
  return 4 * width;
};
```
```js
// app.js
const square = require("./square");  // no need for the .js extension
console.log(`Area: ${square.area(4)}`);
```

### Exporting a single object/class (overwrite `module.exports`)
```js
module.exports = {
  area(width) { return width * width; },
  perimeter(width) { return 4 * width; },
};
```
> `exports` is just a shortcut reference to `module.exports`. If you **reassign** `exports` directly (`exports = {...}`), it breaks the link to `module.exports` and nothing gets exported — always reassign `module.exports` itself when replacing the whole object.

### Real example from the project
```js
// utils/responseHelpers.js
const sendSuccess = (res, statusCode, message, data) => { /* ... */ };
const sendError = (res, statusCode, message, error) => { /* ... */ };

module.exports = { sendSuccess, sendError };
```
```js
// used elsewhere
const { sendSuccess, sendError } = require("../utils/responseHelpers");
```

### CommonJS vs ES Modules
- The examples above use **CommonJS** (`require`/`module.exports`) — the default in Node unless configured otherwise. This matches `"type": "commonjs"` in the project's `package.json`.
- Node also supports **ES Modules** (`import`/`export`) if you either:
  - Name files `.mjs`, or
  - Set `"type": "module"` in `package.json`.
- Don't mix the two syntaxes in the same file.

---

## 5. Asynchronous Programming in Node/Express

Because Node is single-threaded, **blocking (synchronous) operations freeze the whole server** for all users. Almost everything I/O-related in Node (reading files, querying a database, network calls) is designed to be **asynchronous**.

### Synchronous vs Asynchronous
```js
// Synchronous — runs top to bottom, in order
console.log("First");
console.log("Second");
// Output: First, Second
```
```js
// Asynchronous — schedules work and moves on immediately
setTimeout(() => console.log("First"), 3000);
console.log("Second");
// Output: Second, First
```

### Three styles you'll encounter
1. **Callbacks** (oldest style) — pass a function to be called later.
   - Convention: **error-first callbacks** → `callback(err, data)`. Check `err` first.
   - Downside: deeply nested callbacks → "**callback hell**."
2. **Promises** — an object representing a future value; chainable with `.then()/.catch()`.
3. **`async`/`await`** (modern, preferred) — write async code that *reads* like synchronous code.

### `async/await` pattern used throughout the reference project
```js
const adminAddUser = async (req, res, next) => {
  try {
    const { unm, pwd, mailId } = req.body;
    if (!unm || !pwd || !mailId)
      return sendError(res, STATUS_CODES.BAD_REQUEST, MESSAGES.AUTH.MISSING_VALUES);

    const hashedPwd = await bcrypt.hash(pwd, 10);   // async op #1
    let newUser = new UserModel({ userName: unm, userPwd: hashedPwd, userEmail: mailId });
    newUser = await newUser.save();                  // async op #2 (DB write)

    return sendSuccess(res, STATUS_CODES.CREATED, MESSAGES.USER.CREATED, newUser);
  } catch (err) {
    next(err);   // pass any error to Express's error-handling middleware
  }
};
```
**Key rule for Express route handlers:** always wrap `await` calls in `try/catch` and forward errors with `next(err)` — Express does **not** automatically catch rejected promises inside async route handlers in Express 4 (Express 5 fixes this — see [Section 26](#26-express-5--what-changed)).

---

## 6. Routing in Express

**Routing** = deciding what code runs for a given combination of **HTTP method** (verb) + **URL path**.

### Basic route syntax
```js
app.METHOD(PATH, HANDLER);
```
- `METHOD` — `get`, `post`, `put`, `delete`, `patch`, etc. (any HTTP verb; also `app.all()` for *any* verb).
- `PATH` — a string, string pattern, or regular expression.
- `HANDLER` — one or more functions `(req, res, next) => {...}` executed when the route matches.

```js
app.get("/", (req, res) => res.send("GET request to homepage"));
app.post("/", (req, res) => res.send("POST request to homepage"));
app.put("/user", (req, res) => res.send("PUT to /user"));
app.delete("/user", (req, res) => res.send("DELETE /user"));

// Matches ALL HTTP verbs for this path — great for logging/auth middleware
app.all("/secret", (req, res, next) => {
  console.log("Accessing the secret section…");
  next();
});
```

### Route Parameters (`:param`)
Capture dynamic segments of the URL — available on `req.params`.
```js
// http://localhost:8000/admin/user/1  → req.params.id === "1"
router.get("/user/:id", (req, res) => {
  res.json({ id: req.params.id });
});
```
From the reference project:
```js
router.get("/user/:id", adminFindUser);
router.delete("/user/:id", adminDeleteUser);
router.put("/user/:id", adminUpdateUser);
```
```js
const adminFindUser = async (req, res, next) => {
  const user = await UserModel.findById(req.params.id);   // read the URL param
  // ...
};
```

### Query Parameters (`?key=value`)
Available on `req.query` (does **not** need special middleware).
```js
// GET /search?term=express&page=2
app.get("/search", (req, res) => {
  const { term, page } = req.query;   // { term: "express", page: "2" }
});
```

### Route patterns
- Exact string: `"/about"`
- String pattern (wildcards, Express 4 style — note Express 5 tightened these, see Section 26): `"/ab*cd"`
- Regular expression: `app.get(/.*fly$/, ...)` — matches anything ending in "fly".

### Multiple handlers / handler chaining for one route
```js
app.get("/example",
  (req, res, next) => { console.log("first handler"); next(); },
  (req, res) => { res.send("second handler responds"); }
);
```

### `app.route()` — chain multiple verbs on one path
```js
app.route("/book")
  .get((req, res) => res.send("Get a book"))
  .post((req, res) => res.send("Add a book"))
  .put((req, res) => res.send("Update a book"));
```

### `express.Router()` — modular, mountable route handlers
Instead of cramming every route into one file, group related routes into their own **Router** module.

```js
// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { userDefault, userHome, userAbout } = require("../controllers/userControllers");

router.get("/", userDefault);      // http://localhost:8000/user/
router.get("/home", userHome);     // http://localhost:8000/user/home
router.get("/about", userAbout);   // http://localhost:8000/user/about

module.exports = router;
```
```js
// index.js — mounting the router with a path prefix
const userRoutes = require('./routes/userRoutes');
app.use("/user", authenticate, authorize("user"), userRoutes);
```
> Everything inside `userRoutes` is now automatically prefixed with `/user`, and **both `authenticate` and `authorize("user")` middleware run first**, before any route inside the router.

### Route-level middleware inside a Router
```js
// routes/adminRoutes.js
const router = express.Router();

const middleware3 = (req, res, next) => {
  console.log("Admin Route Middleware......");
  next();
};
router.use(middleware3);   // runs for every request that hits this router

router.get("/", adminDefault);
router.get("/home", adminHome);
// ...
module.exports = router;
```

### Routing summary table

| Concept | Example | Notes |
|---|---|---|
| Static route | `app.get("/about", ...)` | Exact match |
| Route param | `app.get("/user/:id", ...)` | `req.params.id` |
| Optional param (Express 4 style `?`) | `app.get("/user/:id?", ...)` | Use with care — Express 5 changed the syntax, use `{}` groups instead |
| Query string | `?key=value` | Always available at `req.query`, no route syntax needed |
| Router | `express.Router()` | Mountable mini-app, keeps routes modular |
| Catch-all / any verb | `app.all("/path", ...)` | Runs for every HTTP method |

---

## 7. Middleware — The Heart of Express

**Middleware** is a function with the signature:
```js
(req, res, next) => { /* ... */ }
```
It sits **in the pipeline** between the incoming request and the final route handler. Each middleware can:
- Run any code.
- Modify `req` and `res`.
- End the request-response cycle (e.g., `res.send()`), **or**
- Call `next()` to pass control to the next function in the stack.

> ⚠️ If a middleware neither ends the cycle nor calls `next()`, the request **hangs forever**.

### Visualizing the pipeline
```
Incoming Request
      │
      ▼
 ┌───────────────┐
 │ Middleware 1  │ (e.g. cookieParser)
 └──────┬────────┘
        │ next()
        ▼
 ┌───────────────┐
 │ Middleware 2  │ (e.g. express.json())
 └──────┬────────┘
        │ next()
        ▼
 ┌───────────────┐
 │ Middleware 3  │ (e.g. authenticate)
 └──────┬────────┘
        │ next()
        ▼
 ┌───────────────┐
 │ Route Handler │ → res.send() / res.json()  (ends the cycle)
 └───────────────┘
        │  (if next(err) was called anywhere above)
        ▼
 ┌───────────────┐
 │ Error Handler │ (err, req, res, next) — 4 args
 └───────────────┘
```

### Types of Middleware

| Type | How it's added | Example |
|---|---|---|
| **Application-level** | `app.use()` / `app.get()` etc. | Runs for all or matching routes on the whole app |
| **Router-level** | `router.use()` | Same idea, scoped to one Router |
| **Built-in** | Ships with Express | `express.json()`, `express.urlencoded()`, `express.static()` |
| **Third-party** | Installed via npm | `cors`, `cookie-parser`, `morgan`, `multer` |
| **Error-handling** | 4 parameters `(err, req, res, next)` | Must be defined **last** |

### Application-level middleware (from the project)
```js
// Runs for EVERY request, in the order declared
const middleware1 = (req, res, next) => {
  console.log("Middleware 1 Calling....");
  req.userData = { uid: 1001, unm: "Rahul" };   // attach custom data to req
  next();
};

const middleware2 = (req, res, next) => {
  console.log("Middleware 2 Calling....");
  req.userData.unm = req.userData.unm.toUpperCase();
  next();
};

app.use(middleware1, middleware2);   // you can register multiple functions at once
```
Any route handler defined *after* this line can now read `req.userData`.

### Built-in & third-party middleware setup (from the project)
```js
const cookieParser = require('cookie-parser');
app.use(cookieParser());              // parses Cookie header → req.cookies

const cors = require('cors');
app.use(cors({
    origin: "http://localhost:5173",   // only allow this frontend origin
    credentials: true                  // allow cookies to be sent cross-origin
}));

app.use(express.json());              // parses JSON body → req.body
```

### Route-specific middleware
```js
app.get("/me", authenticate, async (req, res, next) => {
  // `authenticate` runs first; only if it calls next() do we reach this handler
});

app.use("/admin", authenticate, authorize("admin"), adminRoutes);
```
This is an extremely common and powerful pattern: **stack middleware right in the route definition** to guard specific paths (auth-protected routes, role-based routes, file upload routes, etc.)

### Order matters!
- Middleware executes in the exact order it is declared.
- Body-parsers (`express.json()`) must run **before** any route handler that reads `req.body`.
- Auth middleware must run **before** the protected route handler.
- The error-handling middleware must be registered **last**, after all `app.use()`/routes.

### Writing your own reusable middleware factory
A **middleware factory** is a function that *returns* a middleware function — useful when the middleware needs configuration (like a required role):
```js
// middlewares/AuthorizeMiddleware.js
function authorize(role) {
  return (req, res, next) => {
    if (req.user.role !== role)
      return sendError(res, STATUS_CODES.FORBIDDEN, MESSAGES.AUTH.UNAUTHORIZED);
    next();
  };
}
module.exports = authorize;
```
```js
app.use("/admin", authenticate, authorize("admin"), adminRoutes);
app.use("/user", authenticate, authorize("user"), userRoutes);
```

---

## 8. The Request Object (`req`)

`req` represents the **incoming HTTP request**. Common properties/methods:

| Property/Method | Description | Example |
|---|---|---|
| `req.params` | Named route parameters | `/user/:id` → `req.params.id` |
| `req.query` | Parsed query-string | `/search?q=x` → `req.query.q` |
| `req.body` | Parsed request body (needs `express.json()`/`express.urlencoded()`/`multer`) | `req.body.mailId` |
| `req.cookies` | Parsed cookies (needs `cookie-parser`) | `req.cookies.jwtToken` |
| `req.headers` | All HTTP headers (object) | `req.headers["authorization"]` |
| `req.method` | HTTP verb of the request | `"GET"`, `"POST"` |
| `req.path` / `req.originalUrl` | URL path | `/admin/user/1` |
| `req.ip` | Client IP address | |
| `req.get(headerName)` | Get one header, case-insensitive | `req.get("Content-Type")` |
| `req.file` / `req.files` | Uploaded file(s) — added by Multer | `req.file.filename` |
| *(custom)* | You can attach anything you want to `req` in middleware | `req.user = decoded;` |

### Example — combining several `req` properties
```js
router.put("/user/:id", async (req, res, next) => {
  const { mailId } = req.body;      // from parsed JSON body
  const userId = req.params.id;     // from the URL
  // ...
});
```

---

## 9. The Response Object (`res`)

`res` represents the **outgoing HTTP response**. Common methods:

| Method | Description |
|---|---|
| `res.send(data)` | Send a string, HTML, Buffer, or object (auto-detects `Content-Type`) |
| `res.json(obj)` | Send JSON, sets `Content-Type: application/json` |
| `res.status(code)` | Set the HTTP status code (chainable: `res.status(404).json(...)`) |
| `res.sendFile(path)` | Send a file as the response |
| `res.download(path)` | Prompt a file download |
| `res.redirect(url)` | HTTP redirect |
| `res.render(view, data)` | Render a template/view engine file |
| `res.cookie(name, value, options)` | Set a cookie on the client |
| `res.clearCookie(name, options)` | Remove a cookie |
| `res.set(header, value)` | Set a response header |
| `res.end()` | End the response with no data |

### Example — status codes + JSON, chained
```js
const sendSuccess = (res, statusCode, message, data = null) =>
  res.status(statusCode).json({ success: true, statusCode, message, data });

const sendError = (res, statusCode, message, error = null) =>
  res.status(statusCode).json({ success: false, statusCode, message, error });
```
This "response helper" pattern (used throughout the reference project) keeps **all API responses consistent** in shape:
```json
{ "success": true, "statusCode": 200, "message": "User fetched Successfully", "data": { "...": "..." } }
```

### Setting a cookie (from the project's login route)
```js
res.cookie("jwtToken", token, {
  httpOnly: true,     // JS on the client can't read this cookie (mitigates XSS theft)
  secure: false,       // set to true in production (HTTPS only)
  sameSite: "lax",     // CSRF protection setting
  maxAge: 60 * 60 * 1000 * 24   // 1 day, in ms
});
```
```js
res.clearCookie("jwtToken", { httpOnly: true, secure: false, sameSite: "lax" });
```
> The options passed to `clearCookie` should match the ones used in `cookie` (path, domain, sameSite, secure) or the browser may not remove it correctly.

---

## 10. Parsing Request Data (JSON, Form Data)

By default, Express does **not** parse the request body — you opt in with built-in middleware:

```js
app.use(express.json());                          // parses application/json bodies → req.body
app.use(express.urlencoded({ extended: true }));   // parses HTML form submissions (x-www-form-urlencoded)
```
- `express.json()` — for JSON payloads (typical for APIs consumed by JS frontends / Postman).
- `express.urlencoded()` — for classic HTML `<form>` submissions.
  - `extended: true` allows nested objects/arrays using the `qs` library; `extended: false` uses the simpler `querystring` library.
- For **multipart/form-data** (file uploads), neither of the above works — you need **Multer** (see [Section 15](#15-file-uploads-with-multer)).

### Example login handler reading a JSON body
```js
app.post("/login", async (req, res, next) => {
  const { mailId, pwd } = req.body;   // only works because express.json() ran earlier
  if (!pwd || !mailId)
    return sendError(res, STATUS_CODES.BAD_REQUEST, MESSAGES.AUTH.MISSING_VALUES);
  // ...
});
```

---

## 11. Serving Static Files

Use the **built-in** `express.static()` middleware — the *only* middleware that ships as part of core Express itself.

```js
app.use(express.static("public"));
```
Any file placed in `public/` is now served directly using its relative path:
```
public/images/dog.jpg   → http://localhost:3000/images/dog.jpg
public/css/style.css    → http://localhost:3000/css/style.css
public/js/app.js        → http://localhost:3000/js/app.js
```

### Multiple static directories
```js
app.use(express.static("public"));
app.use(express.static("media"));
// Express checks each in declaration order until a file is found
```

### Virtual URL prefix
```js
app.use("/media", express.static("public"));
// Now: http://localhost:3000/media/images/dog.jpg
```

### Real-world use: serving uploaded files
The reference project stores uploaded profile pictures in `uploads/profilePic/`. To let the frontend actually *display* them, you'd add:
```js
app.use("/uploads", express.static("uploads"));
// A saved file "uploads/profilePic/Pic_123.png" becomes reachable at:
// http://localhost:8000/uploads/profilePic/Pic_123.png
```

---

## 12. Cookies and Sessions

### Cookies (`cookie-parser`)
```bash
npm install cookie-parser
```
```js
const cookieParser = require('cookie-parser');
app.use(cookieParser());
```
- After this, incoming cookies are parsed into `req.cookies` (a plain object).
- Set cookies with `res.cookie(name, value, options)`; remove with `res.clearCookie(name, options)`.
- Important cookie options:
  - `httpOnly` — blocks client-side JS access (protects against XSS token theft).
  - `secure` — cookie only sent over HTTPS.
  - `sameSite` — `"strict" | "lax" | "none"` — controls cross-site sending (CSRF defense).
  - `maxAge` / `expires` — cookie lifetime.
  - `signed: true` (pass a secret to `cookieParser(secret)`) — tamper-proofs the cookie value.

### Sessions (`express-session`) — for stateful auth
Not used in the reference project (which uses stateless JWT instead), but common enough to know:
```bash
npm install express-session
```
```js
const session = require('express-session');
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
}));

app.get("/login", (req, res) => {
  req.session.userId = "abc123";   // server stores this session data
  res.send("logged in");
});
```
- **Session-based auth**: server keeps state (in memory, Redis, DB, etc.) and gives the client only a session ID cookie.
- **JWT-based auth** (used in the project): server stays **stateless** — all the needed info is *encoded inside the token itself*, verified with a secret key on each request.

| | Sessions | JWT |
|---|---|---|
| Server state | Stateful (session store needed) | Stateless |
| Scaling | Needs shared session store across servers | Scales easily (no shared store needed) |
| Revocation | Easy (delete session) | Harder (needs blocklist/short expiry) |
| Payload | Just an ID | Can carry claims (role, id, etc.) |

---

## 13. CORS (Cross-Origin Resource Sharing)

- Browsers block frontend JS from calling an API on a **different origin** (protocol + domain + port) unless the server explicitly allows it — this is CORS.
- Example: frontend on `http://localhost:5173` (Vite dev server) calling an API on `http://localhost:8000` → **different origins** → blocked by default.

```bash
npm install cors
```
```js
const cors = require('cors');
app.use(cors({
  origin: "http://localhost:5173",   // exact frontend origin allowed
  credentials: true                   // allow cookies / Authorization headers to be sent
}));
```
- `origin` — can be a string, an array of allowed origins, a function for dynamic checking, or `"*"` (allow all — **avoid this** if `credentials: true`, browsers disallow wildcard + credentials together).
- `credentials: true` — required if your frontend sends cookies (e.g., `fetch(url, { credentials: "include" })`) or the `Authorization` header cross-origin.
- Without correct CORS config, cookie-based JWT auth (like this project uses) simply **won't work** from a separately hosted frontend.

---

## 14. Authentication & Authorization (JWT-based)

This is one of the most valuable real-world patterns in the reference project. Full flow:

```
┌──────────┐   1. POST /login {mailId, pwd}     ┌──────────┐
│  Client  │ ───────────────────────────────────▶│  Server  │
└──────────┘                                      └────┬─────┘
                                                        │ 2. verify user + bcrypt.compare(pwd, hash)
                                                        │ 3. JWT.sign({id, role}, SECRET, {expiresIn})
     ◀── 4. res.cookie("jwtToken", token, {httpOnly}) ─┘
┌──────────┐
│  Client  │   5. Browser auto-attaches the cookie on every request
└────┬─────┘
     │  6. GET /me  (cookie sent automatically)
     ▼
┌──────────┐   7. authenticate middleware:
│  Server  │      - reads req.cookies.jwtToken
│          │      - JWT.verify(token, SECRET) → decoded payload
│          │      - req.user = decoded
└──────────┘      - next()
```

### Password hashing with `bcrypt`
**Never** store plain-text passwords.
```bash
npm install bcrypt
```
```js
const bcrypt = require('bcrypt');

// Registration
const hashedPwd = await bcrypt.hash(pwd, 10);   // 10 = salt rounds (cost factor)

// Login
const isMatched = await bcrypt.compare(pwd, user.userPwd);   // true/false
```
- `bcrypt.hash()` is intentionally slow (tunable via salt rounds) to resist brute-force attacks.
- Never try to "decrypt" a bcrypt hash — always **compare** a fresh hash of the attempt against the stored hash.

### Creating & verifying tokens with `jsonwebtoken`
```bash
npm install jsonwebtoken
```
```js
const JWT = require('jsonwebtoken');

// Sign (create) a token after successful login
const token = JWT.sign(
  { id: user.id, role: user.userRole },   // payload (claims)
  process.env.JWT_SECRET_KEY,              // secret used to sign & later verify
  { expiresIn: "1d" }                      // token expiry
);

// Verify a token (in middleware)
const decoded = JWT.verify(token, process.env.JWT_SECRET_KEY);   // throws if invalid/expired
```
> A JWT has 3 parts: `header.payload.signature`. Anyone can **decode** and read the payload (it's just Base64, NOT encrypted) — never put secrets like passwords inside a JWT payload. The **signature** is what proves the token hasn't been tampered with.

### `authenticate` middleware (verifies identity)
```js
// middlewares/AuthMiddleware.js
function authenticate(req, res, next) {
  try {
    const token = req.cookies.jwtToken;
    if (!token)
      return sendError(res, STATUS_CODES.UNAUTHORIZED, MESSAGES.AUTH.UNAUTHORIZED);

    const decoded = JWT.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;   // now every downstream handler can read req.user.id / req.user.role
    next();
  } catch (err) {
    next(err);            // invalid/expired token → goes to the error handler
  }
}
module.exports = authenticate;
```

### `authorize` middleware (verifies permission / role)
```js
// middlewares/AuthorizeMiddleware.js
function authorize(role) {
  return (req, res, next) => {
    if (req.user.role !== role)
      return sendError(res, STATUS_CODES.FORBIDDEN, MESSAGES.AUTH.UNAUTHORIZED);
    next();
  };
}
module.exports = authorize;
```
- `authenticate` answers: **"Who are you?"**
- `authorize(role)` answers: **"Are you allowed to do this?"**
- They are deliberately **separate, composable** middlewares — chain them in the route:
```js
app.use("/admin", authenticate, authorize("admin"), adminRoutes);
app.use("/user", authenticate, authorize("user"), userRoutes);
```

### Login / Logout / "who am I" routes
```js
app.post("/login", async (req, res, next) => {
  try {
    const { mailId, pwd } = req.body;
    if (!pwd || !mailId) return sendError(res, STATUS_CODES.BAD_REQUEST, MESSAGES.AUTH.MISSING_VALUES);

    const user = await UserModel.findOne({ userEmail: mailId });
    if (!user) return sendError(res, STATUS_CODES.NOT_FOUND, MESSAGES.USER.NOT_FOUND);

    const isMatched = await bcrypt.compare(pwd, user.userPwd);
    if (!isMatched) return sendError(res, STATUS_CODES.UNAUTHORIZED, MESSAGES.AUTH.INVALID_CREDENTIALS);

    const token = JWT.sign({ id: user.id, role: user.userRole }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
    res.cookie("jwtToken", token, { httpOnly: true, secure: false, sameSite: "lax", maxAge: 86400000 });

    return sendSuccess(res, STATUS_CODES.OK, MESSAGES.AUTH.LOGIN_SUCCESS, sanitizeUser(user));
  } catch (err) { next(err); }
});

app.post("/logout", async (req, res, next) => {
  res.clearCookie("jwtToken", { httpOnly: true, secure: false, sameSite: "lax" });
  return sendSuccess(res, STATUS_CODES.OK, MESSAGES.AUTH.LOG_OUT);
});

app.get("/me", authenticate, async (req, res, next) => {
  const user = await UserModel.findById(req.user.id);
  if (!user) return sendError(res, STATUS_CODES.NOT_FOUND, MESSAGES.USER.NOT_FOUND);
  return sendSuccess(res, STATUS_CODES.OK, MESSAGES.AUTH.LOGIN_SUCCESS, sanitizeUser(user));
});
```

### Never leak the password hash
```js
const sanitizeUser = (user) => {
  user = user.toObject ? user.toObject() : { ...user };  // Mongoose docs need .toObject()
  delete user["userPwd"];
  return user;
};
```
Always strip sensitive fields (password hashes, tokens, internal flags) before sending user data back to the client.

### JWT vs sessions vs OAuth (context)
- **JWT (this project)** — stateless, good for APIs/SPAs/mobile.
- **Sessions** — stateful, simpler revocation, needs a shared store when scaling horizontally.
- **OAuth 2.0 / OpenID Connect** — delegated auth ("Sign in with Google") — a separate, bigger topic; libraries like `passport.js` help implement these strategies in Express.

---

## 15. File Uploads with Multer

**Multer** is the standard middleware for handling `multipart/form-data` (needed for file uploads — `express.json()`/`express.urlencoded()` cannot parse this format).

```bash
npm install multer
```

### Configuring storage (from the project)
```js
// middlewares/uploadProfilePic.js
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/profilePic");         // folder to save into
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname);   // e.g. ".jpg"
    const filename = "Pic_" + req.user.id + extension;    // custom, collision-safe name
    cb(null, filename);
  }
});

const fileFilter = function (req, file, cb) {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Only JPEG, PNG, JPG, WEBP images are allowed"));
};

const uploadProfilePic = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }   // 2 MB max
});

module.exports = uploadProfilePic;
```

### Wiring it into a route
```js
// routes/adminRoutes.js
const uploadProfilePic = require("../middlewares/uploadProfilePic");
const uploadProfilePicController = require("../controllers/uploadProfilePicController");

// "profilePicCtrl" MUST match the field name used in the frontend form/FormData
router.post("/profileUpload", uploadProfilePic.single("profilePicCtrl"), uploadProfilePicController);
```
- `.single(fieldName)` — expects exactly **one** file under that form field → populates `req.file`.
- `.array(fieldName, maxCount)` — multiple files under one field → `req.files` (array).
- `.fields([{ name: "avatar" }, { name: "gallery", maxCount: 5 }])` — multiple named fields.
- `.none()` — expects a `multipart/form-data` request with **no files** (only text fields).

### Using the uploaded file in a controller
```js
// controllers/uploadProfilePicController.js
const uploadProfilePicController = async (req, res, next) => {
  try {
    if (!req.file)
      return sendError(res, STATUS_CODES.BAD_REQUEST, MESSAGES.COMMON.UPLOAD_ERROR);

    const user = await UserModel.findById(req.user.id);
    if (!user) return sendError(res, STATUS_CODES.NOT_FOUND, MESSAGES.USER.NOT_FOUND);

    user.profilePic = req.file.filename;   // save just the filename in the DB
    await user.save();

    return sendSuccess(res, STATUS_CODES.OK, MESSAGES.USER.UPDATED);
  } catch (err) { next(err); }
};
```

### `req.file` object shape (disk storage)
```js
{
  fieldname: 'profilePicCtrl',
  originalname: 'me.png',
  encoding: '7bit',
  mimetype: 'image/png',
  destination: 'uploads/profilePic',
  filename: 'Pic_64f1c2.png',
  path: 'uploads/profilePic/Pic_64f1c2.png',
  size: 102400
}
```

### Other useful storage engines
- `multer.memoryStorage()` — keeps the file as a `Buffer` in memory (`req.file.buffer`) — useful when uploading straight to cloud storage (S3, Cloudinary) instead of local disk.

### Handling Multer errors gracefully
Multer throws a `MulterError` for things like exceeding `fileSize`. Catch it in your error-handling middleware:
```js
const multer = require('multer');
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ success: false, message: err.message });
  }
  next(err);
});
```

---

## 16. Databases with Express — MongoDB & Mongoose

Express itself has **no opinion** about databases — you can use PostgreSQL, MySQL, SQLite, Redis, MongoDB, etc. This project uses **MongoDB** via **Mongoose** (an ODM — Object Data/Document Mapper).

### Why an ODM/ORM?
- Lets you work with **JavaScript objects/classes ("models")** instead of writing raw queries.
- Gives you a natural place to define **schema validation** rules.
- Handles connection pooling and query building for you.

### Installing & connecting
```bash
npm install mongoose
```
```js
// db_conn.js
const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected :) "))
  .catch((error) => console.log("Error : " + error));

module.exports = mongoose;
```
```js
// index.js
const db = require('./db_conn');   // triggers the connection when required
```
> Keep the connection string in an environment variable (`MONGO_URI` in `.env`) — never hard-code credentials.

### Defining a Schema & Model
```js
// models/userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName:   { type: String,  required: true },
  userPwd:    { type: String,  required: true },
  userEmail:  { type: String,  required: true, unique: true },
  isActive:   { type: Boolean, required: true, default: true },
  createdAt:  { type: Date,    required: true, default: Date.now },
  userRole:   { type: String,  enum: ["admin", "user"], required: true, default: "user" },
  profilePic: { type: String }
});

const UserModel = mongoose.model("AppUsers", userSchema);
module.exports = UserModel;
```
**Schema field options explained:**
- `type` — data type (`String`, `Number`, `Boolean`, `Date`, `ObjectId`, `Array`, nested schema, etc.)
- `required: true` — validation fails if missing.
- `unique: true` — creates a unique index (prevents duplicate emails).
- `default` — value used when none is provided (`Date.now` for timestamps).
- `enum` — restricts a String/Number field to a fixed set of values.
- `mongoose.model("AppUsers", userSchema)` — the first argument becomes the (pluralized, lowercased) MongoDB collection name (`appusers`).

### CRUD operations with Mongoose

**Create**
```js
let newUser = new UserModel({ userName: unm, userPwd: hashedPwd, userEmail: mailId });
newUser = await newUser.save();
// or in one step:
const newUser = await UserModel.create({ userName: unm, userPwd: hashedPwd, userEmail: mailId });
```

**Read**
```js
const user = await UserModel.findOne({ userEmail: mailId });
const user = await UserModel.findById(id);
const allUsers = await UserModel.find();                 // all documents
const someFields = await UserModel.find().select("userName userEmail");  // projection (include)
const hidePwd = await UserModel.find().select("-userPwd");               // projection (exclude)
```

**Update**
```js
const user = await UserModel.findByIdAndUpdate(
  req.params.id,
  { userEmail: mailId },
  { new: true, runValidators: true }   // return the UPDATED doc + re-run schema validation
);
```

**Delete**
```js
const user = await UserModel.findByIdAndDelete(req.params.id);
```

### Full example — the Admin controller's CRUD (from the project)
```js
// Show all users (each one sanitized to remove the password)
const adminShowUsers = async (req, res, next) => {
  try {
    const allUsers = await UserModel.find();
    return sendSuccess(res, STATUS_CODES.OK, MESSAGES.USER.FETCHED_ALL, allUsers.map(sanitizeUser));
  } catch (err) { next(err); }
};

// Find by ID
const adminFindUser = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) return sendError(res, STATUS_CODES.NOT_FOUND, MESSAGES.USER.NOT_FOUND);
    return sendSuccess(res, STATUS_CODES.OK, MESSAGES.USER.FETCHED, sanitizeUser(user));
  } catch (error) { next(error); }
};

// Delete by ID
const adminDeleteUser = async (req, res, next) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user) return sendError(res, STATUS_CODES.NOT_FOUND, MESSAGES.USER.NOT_FOUND);
    return sendSuccess(res, STATUS_CODES.OK, MESSAGES.USER.DELETED);
  } catch (err) { next(err); }
};
```

### Mongoose validation errors
When `required`, `enum`, `unique`, or custom validators fail, Mongoose throws a `ValidationError` — catch it in your global error handler and turn it into a clean `400 Bad Request` response instead of leaking a raw stack trace.

### Alternative: the native MongoDB driver (no ODM)
```bash
npm install mongodb
```
```js
const { MongoClient } = require("mongodb");
const client = new MongoClient("mongodb://localhost:27017");

async function run() {
  await client.connect();
  const db = client.db("animals");
  const mammals = await db.collection("mammals").find().toArray();
  console.log(mammals);
}
```
Use this when you want full control over queries without schema abstraction — more verbose, but no "magic."

### Relational databases (SQL) with Express
- Common choices: **PostgreSQL/MySQL** via `pg`/`mysql2`, or an ORM like **Sequelize** or **Prisma**.
- The Express-side patterns (routes → controllers → models) stay the same regardless of which database you pick — Express doesn't care.

---

## 17. Project Structure — Building a Real MVC App

Express doesn't dictate structure, but a very common, scalable pattern (used by the reference project) is a lightweight **MVC (Model–View–Controller)** style, adapted for APIs (no "View" since it returns JSON, not HTML):

```
07-express/
├── index.js                    # app entry point: middleware setup, top-level routes, server start
├── db_conn.js                  # database connection logic
├── .env                        # secrets & config (never commit)
├── package.json
│
├── routes/                     # URL → controller mapping (the "traffic director")
│   ├── adminRoutes.js
│   └── userRoutes.js
│
├── controllers/                # business logic for each route
│   ├── adminControllers.js
│   ├── userControllers.js
│   └── uploadProfilePicController.js
│
├── models/                     # Mongoose schemas/models (the "M" in MVC)
│   └── userModel.js
│
├── middlewares/                # reusable request-processing functions
│   ├── AuthMiddleware.js
│   ├── AuthorizeMiddleware.js
│   ├── errorMiddleware.js
│   └── uploadProfilePic.js
│
├── constants/                  # fixed values used across the app
│   ├── statusCodes.js
│   └── messages.js
│
├── utils/                      # small reusable helper functions
│   └── responseHelpers.js
│
└── uploads/                    # runtime-generated file storage
    └── profilePic/
```

### Why split it this way?
- **`routes/`** — stays thin; only maps `HTTP verb + path → controller function` (+ any route-specific middleware).
- **`controllers/`** — contains the actual logic: validating input, calling the model, shaping the response.
- **`models/`** — the single source of truth for what your data looks like and how it's validated.
- **`middlewares/`** — cross-cutting concerns (auth, error handling, uploads) that many routes share.
- **`constants/`** — centralizes "magic strings/numbers" (status codes, messages) so you change them in **one place**.
- **`utils/`** — small, pure helper functions reused everywhere (e.g., standardized API responses).

### Constants pattern (avoids magic numbers/strings)
```js
// constants/statusCodes.js
module.exports = {
  OK: 200, CREATED: 201, BAD_REQUEST: 400,
  UNAUTHORIZED: 401, FORBIDDEN: 403, NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};
```
```js
// constants/messages.js
module.exports = {
  AUTH: {
    MISSING_VALUES: "UserID(Email) and Password are Required",
    INVALID_CREDENTIALS: "Invalid UserID(Email) and Password",
    LOGIN_SUCCESS: "Login Successful",
    LOG_OUT: "Logout Successful",
    UNAUTHORIZED: "Unauthorized Access",
  },
  USER: {
    CREATED: "User Created Successfully",
    FETCHED: "User fetched Successfully",
    FETCHED_ALL: "All Users fetched Successfully",
    UPDATED: "Users Updated Successfully",
    DELETED: "Users Deleted Successfully",
    NOT_FOUND: "User not found",
  },
  COMMON: {
    INTERNAL_ERROR: "Something went wrong, please try again later",
    GENERAL: "Success", ERROR: "Error", UPLOAD_ERROR: "File not Present",
  },
};
```
Using them:
```js
return sendError(res, STATUS_CODES.NOT_FOUND, MESSAGES.USER.NOT_FOUND);
```
This is far more maintainable than scattering `res.status(404).json({message:"User not found"})` across dozens of files.

### Standardized response shape (`utils/responseHelpers.js`)
```js
const sendSuccess = (res, statusCode = STATUS_CODES.OK, message = MESSAGES.COMMON.GENERAL, data = null) =>
  res.status(statusCode).json({ success: true, statusCode, message, data });

const sendError = (res, statusCode = STATUS_CODES.INTERNAL_SERVER_ERROR, message = MESSAGES.COMMON.ERROR, error = null) =>
  res.status(statusCode).json({ success: false, statusCode, message, error });

module.exports = { sendSuccess, sendError };
```
Every endpoint in the app now returns a **predictable JSON envelope** — this makes frontend integration and debugging much easier:
```json
{ "success": false, "statusCode": 404, "message": "User not found", "error": null }
```

---

## 18. Error Handling in Express

### The golden rule
Error-handling middleware is identified purely by having **4 parameters**: `(err, req, res, next)`. It must be registered **last**, after all other `app.use()`/route calls.

```js
// middlewares/errorMiddleware.js
const errorHandler = (err, req, res, next) => {
  return sendError(res, err.statusCode, err.message, err.stack);
};
module.exports = errorHandler;
```
```js
// index.js — registered LAST, right before app.listen()
app.use(errorHandler);
app.listen(PORT, HOST, ...);
```

### How errors get there: `next(err)`
Any route/middleware can hand off an error by calling `next(err)` — Express then **skips all remaining normal middleware/routes** and jumps straight to the nearest error-handling middleware.
```js
app.put("/", (req, res, next) => {
  const err = new Error("Something Went Wrong.....");
  return next(err);   // routed straight to errorHandler
});
```
```js
try {
  // ...
} catch (err) {
  next(err);   // the standard pattern for async route handlers
}
```

### Express's built-in default error handler
If you never add your own error middleware, Express has a built-in one that:
- Sends a 500 response with the stack trace, **in development**.
- Hides the stack trace when `NODE_ENV=production`.
- Does **not** treat 404s as "errors" automatically — you handle "not found" yourself (either per-resource, as in the project's `NOT_FOUND` responses, or with a catch-all 404 middleware).

### A catch-all 404 handler (add before the error handler)
```js
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});
app.use(errorHandler);   // still last
```

### Creating custom, meaningful error objects
```js
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

// usage
if (!user) return next(new AppError("User not found", 404));
```
This pairs nicely with the `errorHandler` above, which reads `err.statusCode` and `err.message`.

### Avoiding repetitive try/catch — the "async wrapper" pattern
```js
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// usage — no try/catch needed!
router.get("/user/:id", asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.params.id);
  if (!user) throw new AppError("User not found", 404);
  res.json(user);
}));
```
> In **Express 5**, this wrapper is largely unnecessary — rejected promises from async route handlers are automatically forwarded to `next()`. See [Section 26](#26-express-5--what-changed).

---

## 19. Environment Variables with `dotenv`

Keep configuration (ports, secrets, DB URLs) **out of source code**.

```bash
npm install dotenv
```
```
# .env
HOST=localhost
PORT=8000
MONGO_URI=mongodb://127.0.0.1:27017/mydb
JWT_SECRET_KEY=some-long-random-secret
```
```js
require("dotenv").config();   // MUST be called before you read process.env.* values

console.log(process.env.PORT);
const PORT = process.env.PORT || 8000;   // fallback if not set
```
**Best practices:**
- Always add `.env` to `.gitignore` — never commit secrets.
- Provide a `.env.example` (with dummy values) so teammates know what variables are required.
- Load `dotenv.config()` as the **very first line** of your entry file, before any other `require()` that might need those variables.
- In production, environment variables are usually injected by the hosting platform instead of a `.env` file (Docker, PaaS dashboards, CI/CD secrets, etc.)

---

## 20. Template Engines (Views)

The reference project is a pure **JSON API** (no template engine), but many Express apps render server-side HTML. Knowing this is essential for "full Express" coverage.

- A **template/view engine** lets you write HTML with placeholders that get filled with real data at request time.
- Popular choices: **EJS**, **Pug** (formerly "Jade" — the Express generator's historical default), **Handlebars/Mustache**.

### Basic setup
```js
const express = require("express");
const path = require("path");
const app = express();

app.set("views", path.join(__dirname, "views"));   // where template files live
app.set("view engine", "ejs");                       // which engine to use
```
```bash
npm install ejs
```

### Rendering a view
```js
app.get("/", (req, res) => {
  res.render("index", { title: "About dogs", message: "Dogs rock!" });
});
```
```html
<!-- views/index.ejs -->
<h1><%= title %></h1>
<p><%= message %></p>
```

### EJS quick syntax reference
| Syntax | Meaning |
|---|---|
| `<%= value %>` | Output, HTML-escaped |
| `<%- value %>` | Output, **not** escaped (raw HTML) |
| `<% if (x) { %> ... <% } %>` | Control flow (no output) |
| `<% for (...) { %> ... <% } %>` | Loops |
| `<%- include('partial') %>` | Include another template file |

### When to use a template engine vs. a separate frontend
- **Template engine** — simpler full-stack apps, server-rendered pages, minimal JS needed, good for SEO out of the box.
- **Separate frontend (React/Vue) + Express as pure API** — the pattern the reference project uses (note the `cors` config allowing `http://localhost:5173`, a typical Vite/React dev server port). Express only returns JSON; the frontend renders the UI.

---

## 21. The Express Application Generator

`express-generator` scaffolds a starter app with a conventional structure (views, routes, `bin/www`, Jade/Pug by default).

```bash
npx express-generator my-app
cd my-app
npm install
npm start
```
Common flags:
```bash
npx express-generator --view=ejs my-app     # choose a different view engine
npx express-generator --no-view my-app      # API-only, no view engine
npx express-generator --git my-app          # generate a .gitignore
```
Generated structure (roughly):
```
my-app/
├── app.js
├── bin/www              # actual server startup script (wraps http.createServer)
├── public/               # static assets
├── routes/
│   ├── index.js
│   └── users.js
└── views/
```
> Many real-world teams (including the style used in the reference project) prefer a **hand-rolled** structure over the generator's default, especially for API-only backends — the generator is most useful as a fast starting point or a learning reference.

---

## 22. Testing Express Applications

Not present in the reference project, but essential for production-quality Express apps.

### Common toolchain
- **Test runner**: Jest or Mocha
- **HTTP assertions**: `supertest` — lets you test routes without actually starting a server on a port.

```bash
npm install --save-dev jest supertest
```

### Example test
```js
// app.test.js
const request = require('supertest');
const app = require('../app');   // export your `app` (don't call .listen() in the same file for testability)

describe("GET /", () => {
  it("responds with Hello World!", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain("Hello World");
  });
});
```
**Tip:** structure your entry point so `app.listen()` is only called when the file is run directly, not when imported for tests:
```js
if (require.main === module) {
  app.listen(PORT, () => console.log(`Running on ${PORT}`));
}
module.exports = app;
```

### Types of tests worth having
- **Unit tests** — pure functions (e.g., `sanitizeUser`, validators) in isolation.
- **Integration tests** — full route behavior via `supertest`, often against a test database (or an in-memory MongoDB like `mongodb-memory-server`).
- **End-to-end (E2E)** — the whole stack including a real frontend (tools like Playwright/Cypress) — usually outside Express's own test suite.

---

## 23. Security Best Practices

Express itself is minimal, so security is largely **your** responsibility (plus battle-tested middleware).

| Concern | Mitigation |
|---|---|
| **Common HTTP header vulnerabilities** | Use [`helmet`](https://www.npmjs.com/package/helmet) → `app.use(helmet())` sets safer defaults (CSP, X-Frame-Options, etc.) |
| **Brute-force / DoS on endpoints** | Rate limiting via `express-rate-limit` |
| **NoSQL injection** (malicious query operators in `req.body`) | Sanitize input; validate types strictly; libraries like `express-mongo-sanitize` |
| **XSS (Cross-Site Scripting)** | Escape output in templates; set `httpOnly` cookies (done in this project); use a CSP |
| **CSRF (Cross-Site Request Forgery)** | `sameSite` cookie attribute (used here as `"lax"`); CSRF tokens for cookie-based sessions on state-changing routes |
| **Plain-text passwords** | Always hash with `bcrypt`/`argon2` (done in this project) |
| **Leaking stack traces in prod** | Don't send `err.stack` to clients when `NODE_ENV=production` |
| **Weak secrets** | Long, random `JWT_SECRET_KEY`/session secrets, stored only in env vars |
| **Outdated dependencies** | `npm audit`, keep packages updated |
| **Missing HTTPS** | Terminate TLS at a reverse proxy (Nginx) or platform-level HTTPS in production; set cookie `secure: true` there |
| **Overly permissive CORS** | Restrict `origin` to known frontends, don't blanket-allow `"*"` with credentials |

### Adding `helmet` and rate limiting
```bash
npm install helmet express-rate-limit
```
```js
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,   // 15 minutes
  max: 100,                    // limit each IP to 100 requests per window
});
app.use(limiter);
// Or scope it just to sensitive routes:
app.use("/login", limiter);
```

### Production-safe error middleware
```js
const errorHandler = (err, req, res, next) => {
  const isProd = process.env.NODE_ENV === "production";
  return sendError(
    res,
    err.statusCode || 500,
    err.message || "Something went wrong",
    isProd ? undefined : err.stack   // never expose stack traces in production
  );
};
```

---

## 24. Performance & Production Best Practices

- **Set `NODE_ENV=production`** — Express itself uses this to enable view caching and less verbose error output; many libraries also branch on it.
- **Compression** — reduce response size:
  ```bash
  npm install compression
  ```
  ```js
  const compression = require('compression');
  app.use(compression());
  ```
- **Use a process manager** (PM2, or platform equivalent) to auto-restart on crashes and enable **clustering** (one Node process per CPU core, since Node is single-threaded per process):
  ```bash
  npm install -g pm2
  pm2 start index.js -i max     # -i max spawns one worker per CPU core
  ```
- **Cache expensive responses** where appropriate (in-memory, Redis) instead of recomputing/re-querying every request.
- **Avoid synchronous, CPU-heavy work** in request handlers — it blocks the event loop for *every* concurrent user. Offload heavy computation to worker threads or a separate service/queue.
- **Connection pooling** — Mongoose/DB drivers handle this, but be mindful of pool size settings for high-traffic apps.
- **Log properly** — `morgan` for HTTP request logs in dev; structured logging (`pino`/`winston`) in production instead of scattered `console.log`.
- **Graceful shutdown** — close DB connections and let in-flight requests finish on `SIGTERM`:
  ```js
  process.on('SIGTERM', () => {
    server.close(() => {
      mongoose.connection.close(false, () => process.exit(0));
    });
  });
  ```

---

## 25. Deploying an Express App

### General deployment checklist
1. Set `NODE_ENV=production`.
2. Move all secrets to the hosting platform's environment variable settings (not a committed `.env`).
3. Use a real, managed database (MongoDB Atlas, managed Postgres, etc.) instead of `localhost`.
4. Put a **reverse proxy** (Nginx, or the platform's built-in one) in front of Node to handle HTTPS/TLS termination, gzip, and load balancing.
5. Set cookies with `secure: true` and appropriate `sameSite` once served over HTTPS.
6. Run with a process manager (PM2) or let the platform manage restarts/clustering.
7. Set up centralized logging/monitoring (platform logs, or an APM tool).

### Common hosting options
| Platform | Notes |
|---|---|
| **Render / Railway / Fly.io** | Simple git-push deploys, free/low-cost tiers, good for learning + small apps |
| **Heroku** | Classic PaaS choice, `Procfile` (`web: node index.js`) |
| **AWS (EC2 / Elastic Beanstalk / ECS)** | Full control, more setup |
| **DigitalOcean App Platform / Droplets** | VM (Droplet) gives full server control; App Platform is more managed |
| **Vercel** | Great for serverless functions, less ideal for long-running stateful servers |
| **Docker + any cloud** | Containerize with a `Dockerfile`, deploy anywhere that runs containers |

### Minimal `Dockerfile` example
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 8000
CMD ["node", "index.js"]
```

### Reverse proxy note (Nginx example, conceptual)
```nginx
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```
If your app is behind a proxy and needs the real client IP/protocol (e.g., to correctly set `secure` cookies), enable:
```js
app.set('trust proxy', 1);
```

---

## 26. Express 5 — What Changed

The reference project uses Express `^5.2.1`, so these differences from Express 4 matter in practice:

- **Node.js version requirement** — Express 5 dropped support for Node.js versions older than v18.
- **Automatic async error forwarding** — middleware and route handlers can now return a rejected promise, and Express's router automatically catches it and treats it as an error — so a plain:
  ```js
  app.get("/", async (req, res) => {
    const user = await UserModel.findById("bad-id");   // if this throws...
    res.json(user);
  });
  ```
  ...no longer needs a manual `try/catch` + `next(err)` just to avoid an unhandled rejection — Express 5 forwards the error for you. (The reference project still uses explicit `try/catch` — a safe, explicit habit that also works fine in Express 5.)
- **Stricter routing syntax (`path-to-regexp` upgrade)** — Express 5 upgraded its routing engine to path-to-regexp@8.x, which removed sub-expression regex patterns from route strings for security reasons (this prevents a class of ReDoS attacks). Practical impact:
  - The old bare wildcard `app.all('*', ...)` **no longer works** and throws a routing error in Express 5.
  - You must now name the wildcard segment: `app.all('/*splat', ...)` or `app.all('/{*splat}', ...)`.
  - Optional-parameter syntax like `:id?` and certain regex-in-path patterns are also affected — prefer the newer, explicit group syntax `{}` documented by Express 5.
- **Removed deprecated APIs** — old method signatures deprecated since Express 3/4 have been fully removed; if migrating an old app, run it against the official Express 5 migration guide.
- **`body-parser` defaults changed** — `extended` now defaults to `false` for `express.urlencoded()`, and you can customize the parsing depth for nested objects.

> **Practical takeaway:** if you copy old Express 4 tutorials/StackOverflow snippets involving `'*'` wildcard routes or complex regex paths, expect to need small syntax tweaks on Express 5.

---

## 27. Quick Reference / Cheat Sheet

### App-level methods
| Method | Purpose |
|---|---|
| `express()` | Create an app instance |
| `app.use([path], fn)` | Register middleware (optionally scoped to a path) |
| `app.get/post/put/delete/patch(path, ...handlers)` | Register a route for a specific verb |
| `app.all(path, fn)` | Register middleware/handler for **all** verbs |
| `app.route(path)` | Chainable route definition for multiple verbs on one path |
| `app.set(name, value)` | Configure an app setting (e.g., `"view engine"`) |
| `app.listen(port, [host], [cb])` | Start the HTTP server |
| `express.static(root)` | Built-in static file server middleware |
| `express.json()` | Built-in JSON body parser |
| `express.urlencoded({extended})` | Built-in form body parser |
| `express.Router()` | Create a modular, mountable route handler |

### Request object (`req`) cheat sheet
| Property | Meaning |
|---|---|
| `req.params` | Route parameters (`/:id`) |
| `req.query` | Query-string parameters (`?a=b`) |
| `req.body` | Parsed request body |
| `req.cookies` | Parsed cookies (needs `cookie-parser`) |
| `req.headers` | Raw headers object |
| `req.method`, `req.path`, `req.originalUrl` | Request metadata |
| `req.file` / `req.files` | Uploaded file(s) (needs Multer) |

### Response object (`res`) cheat sheet
| Method | Meaning |
|---|---|
| `res.send()` | Send string/HTML/Buffer |
| `res.json()` | Send JSON |
| `res.status(code)` | Set status code (chainable) |
| `res.cookie()` / `res.clearCookie()` | Set/remove a cookie |
| `res.redirect(url)` | Redirect |
| `res.render(view, data)` | Render a template |
| `res.sendFile(path)` | Send a file |

### Common HTTP status codes used in APIs
| Code | Meaning |
|---|---|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request (validation failure) |
| 401 | Unauthorized (not authenticated) |
| 403 | Forbidden (authenticated but not allowed) |
| 404 | Not Found |
| 500 | Internal Server Error |

### Middleware signature reminder
```js
// Normal middleware — 3 args
(req, res, next) => { ... }

// Error-handling middleware — 4 args (order/arity matters to Express!)
(err, req, res, next) => { ... }
```

### Must-have `npm install` list for a typical auth + DB + upload API
```bash
npm install express mongoose dotenv cookie-parser cors bcrypt jsonwebtoken multer
npm install --save-dev nodemon
```

---

## 28. Walkthrough of the Reference Project (`07-express`)

A complete map of how every concept above comes together in the uploaded project.

### High-level architecture
```
Client (e.g. React app on :5173)
        │  fetch(..., { credentials: "include" })
        ▼
┌─────────────────────────────────────────────────────────┐
│  index.js  (Express app, listens on HOST:PORT)           │
│                                                            │
│  Global middleware chain:                                 │
│   cookieParser → cors → express.json() → middleware1/2    │
│                                                            │
│  Public routes:   POST /login, POST /logout, GET /me      │
│  Protected mounts:                                         │
│    /admin  → authenticate → authorize("admin") → adminRoutes│
│    /user   → authenticate → authorize("user")  → userRoutes │
│                                                            │
│  errorHandler (4-arg middleware, registered last)          │
└───────────────────────┬────────────────────────────────────┘
                         │
              ┌──────────┴───────────┐
              ▼                      ▼
        adminRoutes.js          userRoutes.js
      (Router + middleware3)   (simple Router)
              │
              ▼
      adminControllers.js  ──▶ userModel.js (Mongoose) ──▶ MongoDB
              │
              ▼
    uploadProfilePic.js (Multer) ──▶ uploads/profilePic/
```

### File-by-file summary

| File | Concept demonstrated |
|---|---|
| `index.js` | App bootstrap, global middleware, login/logout/me routes, mounting routers with guard middleware, starting the server |
| `db_conn.js` | Mongoose connection setup |
| `Demo1.js` | Standalone script showing how `dotenv` exposes `process.env.*` (not part of the running server) |
| `.env` | `HOST`, `PORT`, `MONGO_URI`, `JWT_SECRET_KEY` — all externalized config |
| `models/userModel.js` | Mongoose schema: required fields, `unique`, `enum`, `default` |
| `routes/adminRoutes.js` | `express.Router()`, router-level middleware, full CRUD routes, file-upload route |
| `routes/userRoutes.js` | Simple Router with basic GET routes |
| `controllers/adminControllers.js` | Full CRUD business logic, password hashing, sanitizing sensitive fields |
| `controllers/userControllers.js` | Minimal HTML-returning handlers |
| `controllers/uploadProfilePicController.js` | Using `req.file` after Multer parses the upload |
| `middlewares/AuthMiddleware.js` | JWT verification, attaching `req.user` |
| `middlewares/AuthorizeMiddleware.js` | Role-based access control (middleware factory) |
| `middlewares/errorMiddleware.js` | Centralized error-handling middleware |
| `middlewares/uploadProfilePic.js` | Multer disk storage config, file type/size validation |
| `constants/statusCodes.js`, `constants/messages.js` | Centralized magic values |
| `utils/responseHelpers.js` | Standardized success/error JSON response shape |

### Things you could add to extend this project further
- `app.use(express.static("uploads"))` so uploaded profile pictures are actually viewable by URL.
- Input validation library (e.g., `zod` or `joi`) on request bodies instead of manual `if (!field)` checks.
- Refresh tokens (short-lived access token + long-lived refresh token) to improve the JWT auth flow.
- Rate limiting on `/login` to slow down brute-force attempts.
- Pagination on `adminShowUsers` (`?page=&limit=`) instead of returning every user at once.
- Automated tests (`supertest`) for the auth flow and CRUD endpoints.
- `helmet` and `express-rate-limit` for hardened security defaults.
- Swap `console.log` for structured logging (`morgan` + `winston`/`pino`).

---

## Summary

You now have an end-to-end picture of Express — from a raw Node HTTP server, up through routing, middleware, request/response handling, file uploads, authentication with JWT and cookies, MongoDB via Mongoose, clean MVC-style project structure, error handling, environment configuration, template engines, testing, security, performance, and deployment — anchored throughout by real code from a working authentication + CRUD + file-upload API. Use the reference project's file structure as a template for your own Express apps, and the cheat sheet in [Section 27](#27-quick-reference--cheat-sheet) as a quick lookup while coding.

**Further reading:**
- Official Express docs: https://expressjs.com/
- MDN Express/Node learning module: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs
- Mongoose docs: https://mongoosejs.com/
- JWT introduction: https://jwt.io/introduction
