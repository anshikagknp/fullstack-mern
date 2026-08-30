# React — Complete Notes (Basics to Advanced)

> A one-stop reference built from the `06-react/myFirstApp` practice project (Vite + React 19 + React Router) and the official [react.dev](https://react.dev/) documentation. Every concept explained in plain language, with pointers, descriptive notes, and runnable code examples.

## Table of Contents

1. [Introduction to React](#1-introduction-to-react)
2. [Project Setup (Vite)](#2-project-setup-vite)
3. [JSX](#3-jsx)
4. [Fragments](#4-fragments)
5. [Rendering Expressions & Data in JSX](#5-rendering-expressions--data-in-jsx)
6. [Inline Styling & className](#6-inline-styling--classname)
7. [Event Handling](#7-event-handling)
8. [Conditional Rendering](#8-conditional-rendering)
9. [Lists & Keys](#9-lists--keys)
10. [Components & Props](#10-components--props)
11. [children Prop](#11-children-prop)
12. [Component Composition — Building a Product Grid](#12-component-composition--building-a-product-grid)
13. [React Router — Client-Side Routing](#13-react-router--client-side-routing)
14. [State — useState](#14-state--usestate)
15. [Handling Async Data & Loading States](#15-handling-async-data--loading-states)
16. [Forms & Controlled Components](#16-forms--controlled-components)
17. [useEffect — Side Effects](#17-useeffect--side-effects)
18. [Props Drilling](#18-props-drilling)
19. [Context API — useContext](#19-context-api--usecontext)
20. [Global State Pattern (Context Provider Wrapping App)](#20-global-state-pattern-context-provider-wrapping-app)
21. [Component Rendering & Reconciliation](#21-component-rendering--reconciliation)
22. [Other Built-in Hooks](#22-other-built-in-hooks)
23. [Custom Hooks](#23-custom-hooks)
24. [Refs — useRef & forwardRef](#24-refs--useref--forwardref)
25. [Performance — memo, useMemo, useCallback](#25-performance--memo-usememo-usecallback)
26. [Error Boundaries](#26-error-boundaries)
27. [Portals](#27-portals)
28. [Suspense & Lazy Loading](#28-suspense--lazy-loading)
29. [Styling Approaches in React](#29-styling-approaches-in-react)
30. [Project Structure & Best Practices](#30-project-structure--best-practices)
31. [React 19 Highlights](#31-react-19-highlights)
32. [Common Pitfalls & Debugging Tips](#32-common-pitfalls--debugging-tips)

---

## 1. Introduction to React

- React is a **JavaScript library for building user interfaces**, created and maintained by Meta. It is **declarative** — you describe *what* the UI should look like for a given state, and React figures out *how* to update the actual DOM to match.
- React is **component-based**: a UI is broken into small, independent, reusable pieces called **components**, each responsible for its own piece of the UI and its own logic.
- React uses a **Virtual DOM** — an in-memory, lightweight representation of the real DOM. When state changes, React computes the difference (a process called **reconciliation** / "diffing") between the previous and new virtual DOM trees, and applies only the minimal necessary updates to the real DOM. This makes UI updates fast.
- React itself only handles the "view" layer — routing, global state management, and data fetching are typically handled by companion libraries (React Router, Redux/Zustand, TanStack Query, etc.), several of which are used in this guide.
- **React vs a plain JS/DOM approach**: instead of manually calling `document.createElement`, `appendChild`, and tracking which DOM nodes to update by hand (as in vanilla JS DOM manipulation), you write components that return a description of the UI, and React handles the DOM updates itself.

---

## 2. Project Setup (Vite)

Modern React apps are commonly scaffolded with **Vite** — a fast build tool and dev server — rather than the older, now-deprecated Create React App.

```bash
npm create vite@latest myFirstApp -- --template react
cd myFirstApp
npm install
npm run dev        # starts the local dev server with hot module reload
npm run build       # produces an optimized production build in dist/
npm run preview     # locally preview the production build
npm run lint         # runs ESLint over the project
```

### Anatomy of a Vite React project (from the repo's `package.json`)
```json
{
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.2.8",
    "react-dom": "^19.2.8",
    "react-router-dom": "^7.18.2"
  }
}
```
- `react` — the core library: component logic, hooks, state, JSX handling.
- `react-dom` — the renderer that knows how to mount React components into the actual browser DOM (React itself is renderer-agnostic — `react-native` uses the same `react` core to render to mobile views instead).
- `react-router-dom` — the most popular client-side routing library for browser-based React apps (installed separately: `npm install react-router-dom`).

### The entry point — `main.jsx`
```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ApplicationContext } from './Contexts/AppContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApplicationContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApplicationContext>
  </StrictMode>,
)
```
- **`createRoot(domNode)`** — the React 18+/19 API that creates a "root" React tree attached to a real DOM element (usually a `<div id="root">` in `index.html`), replacing the older `ReactDOM.render()`.
- **`<StrictMode>`** — a development-only wrapper that helps catch bugs early: it intentionally double-invokes certain functions (like component bodies and some effects) in development to surface side effects that aren't pure. It renders nothing visible and has no effect in production builds.
- **`<BrowserRouter>`** — enables client-side routing for the whole app using the browser's History API (covered in Section 13).
- The nesting order matters: whatever wraps `<App />` here provides context/functionality to every component inside it — in this example, both routing and the custom global context are available app-wide.

### `vite.config.js`
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```
The `@vitejs/plugin-react` plugin gives Vite the ability to transform JSX syntax and enables **Fast Refresh** (instant UI updates on save, without losing component state).

---

## 3. JSX

**JSX (JavaScript XML)** is a syntax extension that lets you write HTML-like markup directly inside JavaScript. It is **not** valid JavaScript on its own — it's compiled (via Babel/the Vite React plugin) into plain `React.createElement()` calls before it reaches the browser.

```jsx
function Comp1() {
    return <h1 align="center">Hello World</h1>;
}
```
compiles roughly to:
```js
function Comp1() {
    return React.createElement("h1", { align: "center" }, "Hello World");
}
```

### JSX rules
- **A component must return a single root element.** Multiple sibling elements must be wrapped in one parent (a `<div>` or, better, a Fragment — see Section 4).
- **Every tag must be closed.** Self-closing for elements with no children: `<img />`, `<br/>`, `<input />`.
- **`className` instead of `class`**, because `class` is a reserved JS keyword: `<p className="alert alert-danger">`.
- **`camelCase` for most attributes** that would be lowercase in HTML: `onClick`, `onChange`, `tabIndex`, `readOnly`.
- **JavaScript expressions go inside curly braces `{ }`** — variables, function calls, ternaries, but NOT statements like `if`/`for` directly (use expressions like the ternary operator or `&&` instead — see Section 8).
- Comments inside JSX must be wrapped in braces: `{/* this is a comment */}`.
- Any valid JS expression can go inside `{}` — including other JSX, since JSX itself is just an expression.

```jsx
function Comp4() {
    let myCss = {
        backgroundColor: 'navy',
        color: 'skyblue',
        textAlign: 'center',
        lineHeight: '80px',
        boxShadow: '0 5px 8px grey'
    };

    return (
        <>
        <h1 style={myCss} align='center'>Component 4</h1>
        <p className="alert alert-danger">
            Lorem ipsum dolor sit, amet consectetur.
        </p>
        </>
    );
}
```

---

## 4. Fragments

A **Fragment** (`<>...</>` or `<React.Fragment>...</React.Fragment>`) lets a component return multiple sibling elements **without adding an extra wrapper node to the actual DOM**.

```jsx
function Comp2() {
    return (
        <>
        <h1 align='center'>Component2</h1>
        <p>Lorem ipsum dolor sit amet.</p>
        </>
    );
}
export default Comp2;
```
- Without a Fragment, you'd have to wrap both elements in an unnecessary `<div>`, which can break CSS layouts (like flex/grid) that depend on direct parent-child relationships, and adds pointless nodes to the DOM tree.
- The shorthand `<>...</>` cannot take a `key` prop; use the explicit `<React.Fragment key={...}>` form when a Fragment needs a key (e.g. inside a `.map()`).

---

## 5. Rendering Expressions & Data in JSX

Anything inside `{ }` in JSX is evaluated as a JavaScript expression and its *result* is rendered.

```jsx
function Comp3() {
    let name = "Anshika";
    let surname = "Gupta";

    // an array renders each item concatenated in sequence — React renders every element of an array child
    let arr = ["Apple", "Banana", "Orange"];

    // ⚠️ plain objects are NOT valid as a React child — rendering {userData} directly throws an error
    let userData = { uid: 1001, unm: "Virat" };

    // building an array of JSX elements manually (map is the idiomatic way — see Section 9)
    let a = [];
    arr.forEach((ele) => {
        a.push(<li>{ele}</li>);
    });

    return (
        <>
        <h1 align='center'>Component3</h1>
        <p>
            {name}
            {surname}
            {arr}          {/* renders: AppleBananaOrange (each element concatenated) */}
            {arr[0]}        {/* renders just "Apple" */}
            {userData.uid}   {/* fine — accessing a PROPERTY (a primitive) is renderable */}
            <ul>{a}</ul>
        </p>
        </>
    );
}
```
- **Renderable as JSX children**: strings, numbers, arrays of renderable items, JSX elements, `null`/`undefined`/`false`/`true` (these render as nothing — useful for conditional rendering).
- **NOT renderable directly**: plain JavaScript objects (`{uid: 1001}`) — React throws `Objects are not valid as a React child`. You must access a specific property, or `JSON.stringify()` it for debugging display.

---

## 6. Inline Styling & className

React supports two main ways to style elements:

### Inline styles — a JS object, not a CSS string
```jsx
let myCss = {
    backgroundColor: 'navy',     // CSS properties are camelCase, not kebab-case
    color: 'skyblue',
    textAlign: 'center',
    lineHeight: '80px',
    boxShadow: '0 5px 8px grey'
};

<h1 style={myCss} align='center'>Component 4</h1>

// or defined inline directly — note the DOUBLE curly braces:
// outer {} = "this is a JS expression"; inner {} = "this is an object literal"
<p style={{
    backgroundColor: "red",
    color: "white",
    fontSize: "30px",
    padding: "20px"
}}>
    Some text
</p>
```
- CSS property names that are normally hyphenated in CSS (`background-color`) become `camelCase` in the JS object (`backgroundColor`), because hyphens aren't valid in JS identifiers.
- Numeric values without units default to `px` for most properties (e.g. `{ fontSize: 30 }` → `30px`), but strings with explicit units (`"30px"`, `"2rem"`) work too.

### className — for external/utility CSS classes (e.g. Bootstrap)
```jsx
<p className="alert alert-danger">
    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
</p>
```
`className` maps to the DOM's real `class` attribute; `class` itself can't be used as a JSX prop name since it's a reserved JavaScript keyword.

---

## 7. Event Handling

React wraps native browser events in a cross-browser **SyntheticEvent** system, but the usage feels almost identical to plain DOM event handling — attributes are camelCase and you pass a **function reference**, not a string.

```jsx
function Comp5() {
    function myfun() {
        alert("Hello...");
    }
    function myfun2(name) {
        alert("Welcome " + name);
    }
    return (
        <>
            <button onClick={myfun} className="btn btn-warning">
                Click
            </button>

            {/* passing an argument: wrap in an arrow function so it's not called immediately on render */}
            <button onClick={() => { myfun2("Anshika"); }} className="btn btn-danger">
                try me
            </button>
        </>
    );
}
```
- ⚠️ **Common mistake**: `onClick={myfun2("Anshika")}` would call `myfun2` immediately during render (not on click) because `()` invokes the function right away. Always wrap calls-with-arguments in an arrow function: `onClick={() => myfun2("Anshika")}`.
- Common event props: `onClick`, `onChange` (fires on every keystroke for inputs — the React equivalent of `input`, not `change`), `onSubmit`, `onMouseEnter`/`onMouseLeave`, `onFocus`/`onBlur`, `onKeyDown`/`onKeyUp`.
- The event object is passed automatically as the first argument to the handler: `function inputHandler(event) { console.log(event.target.value); }`.
- `event.preventDefault()` stops a form's default full-page-reload submission behavior — essential for React-controlled forms (Section 16).

---

## 8. Conditional Rendering

JSX has no `if` statement inside `{ }` (it only accepts expressions), so conditional rendering uses JS expressions instead.

### `if / else` OUTSIDE the return (building a variable first)
```jsx
function Comp6() {
    let user = "User";
    let dashboard;
    if (user === "Admin") dashboard = <AdminDashboard />;
    else if (user === "Manager") dashboard = <ManagerDashboard />;
    else if (user === "User") dashboard = <UserDashboard />;

    return (
        <>
            <h1 align='center'>Component 6</h1>
            <p>{dashboard}</p>
        </>
    );
}
```

### Ternary operator — inline if/else that returns a value
```jsx
{ isLoggedIn ? <h3>Welcome User</h3> : <h3>Please Login</h3> }
{ isLoggedIn ? <button>Logout</button> : <button>Login</button> }
```

### Logical `&&` — render something only if a condition is true
```jsx
{arr.length > 0 && arr.map((ele) => <p>{ele}</p>)}
```
- If the left side of `&&` is falsy, React renders nothing (it treats `false`/`null`/`undefined` as "nothing to render"). If it's truthy, React renders the right side.
- ⚠️ A classic gotcha: `{count && <p>Items: {count}</p>}` — if `count` is `0`, React renders the literal `0` on the page (since `0` is falsy but not `null`/`undefined`/`false`, and JSX still renders numbers). Fix with an explicit boolean: `{count > 0 && ...}` or `{Boolean(count) && ...}`.

---

## 9. Lists & Keys

Rendering an array of data as a list of elements uses `.map()`, and each generated element needs a unique **`key`** prop.

```jsx
function Comp7() {
    let arr = ["Anshika", "Awasthi", "Virat", "Abhay"];
    return (
        <>
        {arr.length > 0 && arr.map((ele) => <p key={ele}>{ele}</p>)}
        </>
    );
}
```
- **Why keys matter**: React uses `key` to identify which items changed, were added, or were removed between re-renders, so it can update the DOM efficiently and preserve component state correctly across re-orders — without keys (or with unstable keys like array index when the list can reorder), React may re-render, lose input focus, or mix up internal state between items.
- Keys must be **unique among siblings**, not globally. A stable, unique field from the data (like an ID) is the best key — the array index is a fallback only for lists that are static and never reordered/filtered.
- The `key` prop is special — it is not accessible inside the component via `props.key`; it's consumed by React itself.

### Real-world table example (from the repo)
```jsx
function Comp8() {
    const productDetails = [
        { proID: 1012, proQty: 5, proName: "iMac", proPrice: 899 },
        { proID: 1112, proQty: 2, proName: "Macbook", proPrice: 1199 },
    ];

    return (
        <div className="container">
            {productDetails.length > 0 && (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Product ID</th><th>Product Name</th><th>Product Price</th><th>Product Qty</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productDetails.map((product) => (
                            <tr key={product.proID}>
                                <td>{product.proID}</td>
                                <td>{product.proName}</td>
                                <td>{product.proPrice}</td>
                                <td>{product.proQty}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
```

---

## 10. Components & Props

A **component** is a reusable, independent JS function (or, historically, a class — see note below) that returns JSX. **Props** ("properties") are how data flows *into* a component from its parent — read-only, one-directional (top-down) data flow.

```jsx
function ChildComponent({ name, age, children })   // destructuring props directly in the parameter list
{
    return (
        <>
        <h1 align="center">Child Component</h1>
        {name}
        {age}
        {children}
        </>
    );
}

function Comp9() {
    return (
        <>
            <h1 align="center">Component 9</h1>
            <ChildComponent age={34} name={"Virat"}>
                <p>Lorem ipsum dolor sit amet.</p>
                <button>Button</button>
            </ChildComponent>
        </>
    );
}
```
- Props can also be received as a single object, conventionally named `props`: `function ChildComponent(props) { return <>{props.name}</>; }` — destructuring in the parameter list (as above) is the more modern, common style.
- **Props are read-only** — a component must never modify its own props directly (this is a core React rule, similar to a pure function not mutating its inputs). If a child needs to change data, the parent passes down a *function* (a callback) as a prop that the child calls, and the actual state update happens in the parent (see the `setUserName` pattern in the Context section).
- **Component naming**: component names MUST start with a capital letter (`ChildComponent`, not `childComponent`) — this is how JSX distinguishes a custom component (`<MyComp />`) from a built-in HTML tag (`<div>`), which is lowercase.
- **Function components vs. class components**: modern React (React 16.8+ with Hooks, and especially React 18/19) almost exclusively uses **function components** with Hooks (`useState`, `useEffect`, etc.) rather than the older ES6 class-based components (`extends React.Component`) that used `this.state` and lifecycle methods (`componentDidMount`, etc.). Function components are shorter, avoid `this`-binding confusion, and are what all official docs now teach first.

---

## 11. children Prop

`children` is a special, automatically-passed prop containing whatever JSX was nested *between* a component's opening and closing tags.

```jsx
<ChildComponent age={34} name={"Virat"}>
    <p>Lorem ipsum dolor sit amet.</p>
    <button>Button</button>
</ChildComponent>
```
Inside `ChildComponent`, `children` equals the `<p>` and `<button>` elements together — the component decides where in its own JSX to place `{children}`, enabling **composition**: wrapper/layout components (cards, modals, layout shells) that don't know in advance what content they'll contain.

---

## 12. Component Composition — Building a Product Grid

Combining lists, props, and children into a realistic UI pattern: a reusable `MyCard` component rendered once per item in an array.

```jsx
import { Link } from "react-router-dom";

function MyCard({ product }) {
    return (
        <div className="card">
            <div className="card-header">{product.proName}</div>
            <img src={"./github.jpg"} />
            <div className="card-body">
                <p className="alert alert-info">
                    Product ID: {product.proID} <br />
                    Product Price: {product.proPrice} <br />
                    Product Quantity: {product.proQty} <br />
                </p>
            </div>
            <div className="card-footer">
                <Link to={`/details/${product.proID}`} className="btn btn-danger btn-block">
                    View Details
                </Link>
            </div>
        </div>
    );
}

function Comp10() {
    const productDetails = [
        { proID: 1012, proQty: 5, proName: "iMac", proPrice: 899 },
        { proID: 1112, proQty: 2, proName: "Macbook", proPrice: 1199 },
    ];

    return (
        <div className="container">
            {productDetails.length > 0 && (
                <div className="row">
                    {productDetails.map((product) => (
                        <div className="col-lg-3 col-md-4 col-sm-6" key={product.proID}>
                            <MyCard product={product} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
```
- Passing a whole object as a single prop (`product={product}`) is a common, cleaner alternative to passing each field individually (`proID={product.proID} proName={product.proName} ...`).
- `<Link to={...}>` (from `react-router-dom`) is React Router's replacement for `<a href="...">` — it navigates client-side without a full page reload (Section 13).

---

## 13. React Router — Client-Side Routing

`react-router-dom` (installed with `npm install react-router-dom`) enables **Single Page Application (SPA)** navigation — swapping which component renders based on the URL, without a full browser page reload.

```jsx
import { Routes, Route, Link } from 'react-router-dom';
import Comp1 from './01-BasicHeading';
import Comp2 from './02-FragmentDemo';
import ShowDetails from './12-ShowDetails';
import Comp10 from './10-ProductCards';

function Comp11() {
    return (
        <>
            <h1 align="center">Component 11</h1>

            <Link to="/home">Home</Link>
            <Link to="/details/1001">Product</Link>
            <Link to="/products">View All Products</Link>

            <Routes>
                <Route path="/" element={<Comp1 />} />
                <Route path="/home" element={<Comp2 />} />
                <Route path="/products" element={<Comp10 />} />
                <Route path="/details/:id" element={<ShowDetails />} />
            </Routes>
        </>
    );
}
```
- **`<BrowserRouter>`** (wrapped around the whole app in `main.jsx`) enables the URL-matching machinery using the browser's History API — it must wrap anything using `<Routes>`, `<Route>`, or `<Link>`.
- **`<Routes>`** looks at the current URL and renders the single best-matching `<Route>` inside it.
- **`<Route path="..." element={<Comp/>} />`** maps a URL pattern to a component. `:id` in a path (`/details/:id`) is a **route parameter** — a dynamic, named segment.
- **`<Link to="...">`** is the React Router navigation component — clicking it changes the URL and re-renders the matching route **without** reloading the page (unlike a plain `<a href>`, which triggers a full page reload and loses all React state).

### Reading route parameters — `useParams`
```jsx
import { useParams } from "react-router-dom";

function ShowDetails() {
    const { id } = useParams();   // extracts the dynamic segment from the matched URL, e.g. "1001"

    return (
        <>
        <h1 align="center">Product Details</h1>
        {id}
        </>
    );
}
```
### Other essentials not in the repo but core to React Router
```jsx
import { useNavigate, useSearchParams, Outlet, NavLink } from 'react-router-dom';

const navigate = useNavigate();
navigate('/products');            // programmatic navigation, e.g. after a form submits successfully
navigate(-1);                       // go back one entry in browser history

const [searchParams] = useSearchParams();
searchParams.get('sort');            // reads ?sort=price from the URL query string

// <NavLink> is like <Link> but adds an "active" class automatically when its route matches
<NavLink to="/products" className={({isActive}) => isActive ? "active-link" : ""}>Products</NavLink>

// Nested routes: parent route renders <Outlet/> where its matched child route's element appears
<Route path="/dashboard" element={<DashboardLayout/>}>
    <Route path="stats" element={<Stats/>} />   {/* renders at /dashboard/stats */}
</Route>
```

---

## 14. State — useState

**State** is data that a component owns and that can change over time, causing the component to **re-render** when it's updated. `useState` is the fundamental Hook for adding state to a function component.

```jsx
import { useState } from 'react';

function UseStateCounter() {
    // let count = 0;                          // ❌ a plain variable wouldn't trigger a re-render on change
    let [count, setCount] = useState(0);         // [currentValue, updaterFunction] = useState(initialValue)
    let [userName, setUserName] = useState("");
    let [age, setAge] = useState(18);

    function btnClick() {
        // count = count + 1;    // ❌ mutating the variable directly does NOT re-render the UI
        setCount(count + 1);      // ✅ calling the setter schedules a re-render with the new value
    }

    return (
        <>
        <h1 align="center">Component 13</h1>
        count : {count} <br />
        <button onClick={btnClick}>Count</button> <br />
        age : {age}
        </>
    );
}
```
- **`useState(initialValue)`** returns an array with exactly two elements: the current state value, and a function to update it — conventionally destructured as `[value, setValue]`.
- **State updates are asynchronous and batched** — calling `setCount` doesn't change `count` immediately in the same line of code; it schedules a re-render, and the component function runs again with the new value.
- **Never mutate state directly.** For objects/arrays in state, always create a new copy (using spread `...`) rather than mutating in place — React detects changes by comparing references, not deep-inspecting values:
  ```js
  const [formData, setFormData] = useState({});
  setFormData({ ...formData, name: "Sam" });   // ✅ new object, triggers re-render
  // formData.name = "Sam";                     // ❌ mutates in place — React won't detect the change
  ```
- **Functional updates** — when the new state depends on the previous state, pass a function to the setter instead of a value, to avoid stale-state bugs (especially with rapid updates or inside closures):
  ```js
  setCount((prevCount) => prevCount + 1);   // ✅ always uses the latest value, safe even in loops/effects
  ```
- Each `useState` call is independent — a component can (and often does) call it many times for different pieces of state, as shown with `count`, `userName`, and `age` above.

---

## 15. Handling Async Data & Loading States

A very common pattern: track a `isLoading` boolean alongside the actual data, so the UI can show a spinner/disabled state while an async operation (API call, timer) is in progress.

```jsx
import { useState } from "react";

function ProductLoader() {
    const [productsData, setProductsData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    function loadProducts() {
        setIsLoading(true);
        setTimeout(() => {                        // simulating a network delay
            setProductsData([
                { proID: 1012, proQty: 5, proName: "iMac", proPrice: 899 },
                { proID: 1112, proQty: 2, proName: "Macbook", proPrice: 1199 },
            ]);
            setIsLoading(false);
        }, 3000);
    }

    return (
        <>
        <h1 align="center">Component 14</h1>
        <button onClick={loadProducts} disabled={isLoading}>
            {isLoading ? <span className="spinner-border text-info"></span> : "Load Products"}
        </button>

        <div className="container">
            {productsData.length > 0 && (
                <table className="table table-bordered">
                    <thead className="table table-primary">
                        <tr><th>Product ID</th><th>Product Name</th><th>Product Price</th><th>Product Qty</th></tr>
                    </thead>
                    <tbody>
                        {productsData.map((product) => (
                            <tr key={product.proID}>
                                <td>{product.proID}</td>
                                <td>{product.proName}</td>
                                <td>{product.proPrice}</td>
                                <td>{product.proQty}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
        </>
    );
}
```
- In a real app, `setTimeout` would be replaced by an actual `fetch()` call, typically inside a `useEffect` (Section 17) if it should run automatically when the component mounts, or inside an event handler (as above) if it's triggered by a user action.
- `disabled={isLoading}` demonstrates that **any** JSX attribute can be bound to state — not just visible content.

---

## 16. Forms & Controlled Components

A **controlled component** is a form input whose value is driven entirely by React state — the input's displayed value always equals a piece of state, and every keystroke updates that state via `onChange`.

```jsx
import { useState } from "react";

function FormHandling() {
    const [formData, setFormData] = useState({});

    function inputHandler(event) {
        // computed property name [event.target.name] lets ONE handler work for every field,
        // by reading which input fired the event from its `name` attribute
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    function formHandler(event) {
        event.preventDefault();   // stops the browser's default full-page-reload form submission
        // formData now holds all field values — ready to send to an API
    }

    return (
        <form onSubmit={(event) => formHandler(event)}>
            <table className="table table-bordered w-50 mx-auto">
                <tbody>
                    <tr>
                        <td>UserName</td>
                        <td><input type="text" name="unm" onChange={(event) => inputHandler(event)} /></td>
                    </tr>
                    <tr>
                        <td>Password</td>
                        <td><input type="password" name="pwd" onChange={(event) => inputHandler(event)} /></td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td><input type="email" name="mailID" onChange={(event) => inputHandler(event)} /></td>
                    </tr>
                    <tr>
                        <td colSpan={2} align="center"><button align="center">Submit</button></td>
                    </tr>
                </tbody>
            </table>
        </form>
    );
}
```
- **Controlled vs. uncontrolled**: the inputs above are technically "semi-controlled" (they read from `onChange` but don't set a `value` prop back on the `<input>`, so the DOM manages the visible text itself). A **fully controlled** input also binds `value` explicitly:
  ```jsx
  <input type="text" name="unm" value={formData.unm || ""} onChange={inputHandler} />
  ```
  Fully controlled inputs guarantee the displayed value always exactly matches state (useful for validation, formatting, or resetting the form programmatically). **Uncontrolled** inputs instead read their value on demand via a `ref` (Section 24) rather than tracking every keystroke in state — simpler for basic forms, less real-time control.
- Always call `event.preventDefault()` in a submit handler, or the browser will attempt its native form submission (a full page navigation/reload), discarding all React state.

---

## 17. useEffect — Side Effects

`useEffect` lets a component run code in response to rendering — for **side effects**: things that reach outside the pure "compute UI from props/state" model, like data fetching, subscriptions, timers, or manually interacting with the DOM.

```jsx
import { useState, useEffect } from "react";

function Comp16() {
    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(500);

    useEffect(() => {
        console.log("Use Effect...");
    }, []);   // empty dependency array = runs ONCE, after the initial render only

    return (
        <>
            <h1 align="center">Component 16</h1>
            <div style={{ border: "2px solid red", padding: "20px", marginBottom: "30px" }}>
                <h3>Count-1 : {count1}</h3>
                <button onClick={() => setCount1(count1 + 1)}>Button 1</button>
            </div>
            <div style={{ border: "2px solid red", padding: "20px", marginBottom: "30px" }}>
                <h3>Count-2 : {count2}</h3>
                <button onClick={() => setCount2(count2 + 100)}>Button 1</button>
            </div>
        </>
    );
}
```

### The dependency array controls WHEN the effect re-runs
```js
useEffect(() => { /* ... */ });               // no array — runs after EVERY render (rarely what you want)
useEffect(() => { /* ... */ }, []);            // empty array — runs ONCE, after the first render only
useEffect(() => { /* ... */ }, [count1]);      // runs after the first render, AND whenever count1 changes
```
### Cleanup function — for subscriptions, timers, event listeners
If the function passed to `useEffect` returns another function, React calls that returned function to **clean up** before the effect runs again, and when the component unmounts — critical for avoiding memory leaks:
```js
useEffect(() => {
    const timerId = setInterval(() => console.log("tick"), 1000);
    return () => clearInterval(timerId);   // cleanup: stops the interval when the component unmounts
}, []);

useEffect(() => {
    function handleResize() { console.log(window.innerWidth); }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);   // prevents duplicate listeners
}, []);
```
### Fetching data in useEffect (common real-world pattern)
```jsx
useEffect(() => {
    async function fetchData() {
        const res = await fetch("https://api.example.com/products");
        const data = await res.json();
        setProductsData(data);
    }
    fetchData();
}, []);   // fetch once, when the component first mounts
```
- ⚠️ `useEffect`'s callback itself cannot be `async` directly (`useEffect(async () => {...})` is invalid, since it would make the effect return a Promise instead of a valid cleanup function/undefined) — define an inner `async` function and call it, as shown above.
- **Effects run AFTER the DOM has been updated**, not during rendering — this matters because effects can safely read the real, up-to-date DOM.
- Under React 18/19 `<StrictMode>` in development, effects with an empty `[]` array intentionally run, clean up, and run again once, to help surface effects that aren't properly cleaned up — this doesn't happen in production.

---

## 18. Props Drilling

**Props drilling** is the pattern (and pain point) of passing a prop down through several layers of components that don't need the value themselves, just to get it to a deeply nested component that does.

```jsx
function Comp17() {
    const userName = "Anshika";
    return (
        <>
            <h1 align="center">Component 17</h1>
            <CompA userName={userName} />
        </>
    );
}
function CompA({ userName }) {
    return (
        <>
            <h1 align="center">Component A</h1>
            <CompB userName={userName} />   {/* CompA doesn't use userName itself, just passes it along */}
        </>
    );
}
function CompB({ userName }) {
    return (
        <>
            <h1 align="center">Component B</h1>
            <CompC userName={userName} />   {/* same here — just a pass-through */}
        </>
    );
}
function CompC({ userName }) {
    return (
        <>
            <h1 align="center">Component C</h1>
            {userName}   {/* only CompC actually needs userName */}
        </>
    );
}
```
- This works, but becomes unwieldy as the component tree grows deeper or the number of drilled props increases — every intermediate component has to know about and forward props it never actually uses.
- The standard fix for deeply-shared data is the **Context API** (Section 19), which lets any descendant read a value directly without every level in between having to pass it manually.

---

## 19. Context API — useContext

**Context** provides a way to share values (state, functions) across a component tree **without manually passing props at every level** — solving the props-drilling problem above.

### Step 1 — create a context
```jsx
import { createContext } from "react";
const MyContext = createContext();   // optionally: createContext(defaultValue)
```
### Step 2 — provide a value with `<Context.Provider>`
```jsx
function Comp18() {
    const userName = "Anshika";
    const age = 23;
    return (
        <>
            <h1 align="center">Component 18</h1>
            <MyContext.Provider value={{ userName, age }}>
                <CompA />
            </MyContext.Provider>
        </>
    );
}
```
### Step 3 — consume the context anywhere inside the Provider, at any depth
```jsx
import { useContext } from "react";

function CompC() {
    const { userName, age } = useContext(MyContext);   // reads directly — NO props passed through CompA/CompB!
    return (
        <>
            <h1 align="center">Component C</h1>
            {userName}
            <br />
            {age}
        </>
    );
}
```
Comparing this to Section 18: `CompA` and `CompB` no longer need to know about `userName` at all — they're not touched by this change, unlike props drilling where every intermediate level had to be edited.

- **When to use Context**: data that's genuinely "global" to a subtree — theme, authenticated user info, language/locale, or (as below) shared app state. Overusing Context for everything can make data flow harder to trace and cause unnecessary re-renders of everything that consumes it; for complex, frequently-changing app-wide state, dedicated state-management libraries (Redux, Zustand, Jotai) are often a better fit.
- `useContext(SomeContext)` must be called inside a component that is a descendant of `<SomeContext.Provider>` — if there's no Provider above it, it falls back to the `defaultValue` passed to `createContext()`.

---

## 20. Global State Pattern (Context Provider Wrapping App)

A very common real production pattern: create a dedicated Context file that bundles state + updater functions, then wrap the whole app with it in `main.jsx` so any component, anywhere, can read or update the shared state.

```jsx
// src/Contexts/AppContext.jsx
import { createContext, useState } from "react";

export const GlobalContext = createContext();

export function ApplicationContext({ children }) {
    const [userName, setUserName] = useState("Anshika");
    const age = 23;
    return (
        <GlobalContext.Provider value={{ userName, age, setUserName }}>
            {children}
        </GlobalContext.Provider>
    );
}
```
```jsx
// src/main.jsx
import { ApplicationContext } from './Contexts/AppContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApplicationContext>          {/* wraps the ENTIRE app — every component can now access GlobalContext */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApplicationContext>
  </StrictMode>,
)
```
```jsx
// any component, anywhere in the tree
import { useContext } from "react";
import { GlobalContext } from "./Contexts/AppContext";

function Comp1() {
    const { userName, age, setUserName } = useContext(GlobalContext);
    return (
        <>
        <h1 align='center'>Component1 <br /> {userName} <br /> {age} </h1>
        <button onClick={() => setUserName("Abhay")}>Update Name</button>
        </>
    );
}
```
- Notice the state (`userName`) AND its setter (`setUserName`) are both exposed through the context value — this is the standard way to let a distant descendant component update shared state: the state itself still "lives" in the Provider component (`ApplicationContext`), but any consumer can trigger an update to it, and every consuming component re-renders when the value changes.
- This wrap-the-whole-app-in-a-Provider pattern is the foundation that global state libraries (Redux's `<Provider>`, React Query's `<QueryClientProvider>`, etc.) are all built on top of.

---

## 21. Component Rendering & Reconciliation

- A component **re-renders** whenever its own state changes, its parent re-renders (causing it to re-render too, by default — see `memo` in Section 25 for opting out of this), or a Context value it consumes changes.
- **Re-rendering does not mean "re-creating the whole DOM."** React re-runs the component function to get the new JSX, then **diffs** it against the previous render's JSX tree (this is the "Virtual DOM" comparison mentioned in Section 1), and applies only the minimal set of real DOM mutations needed.
- Component state is preserved across re-renders **as long as the component stays in the same position in the tree** — if a component of a different type renders in that position, or the component unmounts, its state is lost and reset on the next mount.
- **Unidirectional data flow**: data flows down through props; to send information back up, a child calls a function passed down to it as a prop (never a direct child-to-parent "reaching up").

---

## 22. Other Built-in Hooks

Beyond `useState`, `useEffect`, and `useContext` (used throughout the repo), these are essential, documented React hooks:

| Hook | Purpose |
|---|---|
| `useReducer` | An alternative to `useState` for more complex state logic — dispatches "actions" to a reducer function, similar to Redux, useful when state transitions are numerous or interdependent |
| `useRef` | Persists a mutable value across renders WITHOUT causing a re-render when it changes; also used to get a direct reference to a DOM node (Section 24) |
| `useMemo` | Memoizes (caches) an expensive computed value so it's only recalculated when its dependencies change (Section 25) |
| `useCallback` | Memoizes a function definition itself, so it isn't recreated on every render (Section 25) |
| `useLayoutEffect` | Like `useEffect`, but fires synchronously BEFORE the browser paints — used rarely, for DOM measurements that must happen before the user sees a flicker |
| `useId` | Generates a stable, unique ID string — useful for linking form labels (`htmlFor`) to inputs without hardcoding IDs, safe for server-rendered apps |
| `useTransition` | Marks a state update as low-priority ("non-urgent"), keeping the UI responsive during expensive updates |
| `useDeferredValue` | Defers re-rendering part of the UI until more urgent updates finish — useful for laggy search-as-you-type filtering |

```jsx
// useReducer example
function reducer(state, action) {
    switch (action.type) {
        case "increment": return { count: state.count + 1 };
        case "decrement": return { count: state.count - 1 };
        default: return state;
    }
}
const [state, dispatch] = useReducer(reducer, { count: 0 });
dispatch({ type: "increment" });
```

---

## 23. Custom Hooks

A **custom Hook** is just a regular JavaScript function whose name starts with `use` and that calls other Hooks inside it — a way to extract and reuse stateful logic across multiple components.

```jsx
// a reusable hook for the load-with-spinner pattern seen in Section 15
function useAsyncData(fetchFn) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    function load() {
        setIsLoading(true);
        fetchFn().then((result) => {
            setData(result);
            setIsLoading(false);
        });
    }

    return { data, isLoading, load };
}

// usage in any component:
function ProductLoader() {
    const { data, isLoading, load } = useAsyncData(() => fetch("/api/products").then(r => r.json()));
    return (
        <button onClick={load} disabled={isLoading}>
            {isLoading ? "Loading..." : "Load Products"}
        </button>
    );
}
```
- Custom hooks don't share state between the components that use them — each call to a custom hook gets its own independent state, just like calling `useState` directly in each component would.
- **Rules of Hooks** (apply to both built-in and custom hooks):
  1. Only call Hooks at the **top level** of a component or another custom hook — never inside loops, conditions, or nested functions.
  2. Only call Hooks from **React function components** or **custom hooks** — never from plain regular JS functions.

---

## 24. Refs — useRef & forwardRef

A **ref** provides a way to access/hold a value that persists across renders but, unlike state, **updating a ref does NOT trigger a re-render**. Refs are also the standard way to get a direct handle on a real DOM node.

```jsx
import { useRef, useEffect } from "react";

function TextInputFocus() {
    const inputRef = useRef(null);            // starts as null until attached to a DOM element

    useEffect(() => {
        inputRef.current.focus();               // .current holds the actual DOM node after mount
    }, []);

    return <input ref={inputRef} type="text" />;
}
```
```jsx
// useRef for a mutable value that shouldn't cause re-renders (e.g. a timer ID, a previous value, a render count)
function Timer() {
    const intervalRef = useRef(null);
    function start() {
        intervalRef.current = setInterval(() => console.log("tick"), 1000);
    }
    function stop() {
        clearInterval(intervalRef.current);
    }
    return (<><button onClick={start}>Start</button><button onClick={stop}>Stop</button></>);
}
```
- `ref.current` is the mutable box holding the value — reading/writing it does not schedule a re-render, unlike `useState`'s setter.
- **Forwarding refs**: by default, a `ref` passed to a custom component doesn't automatically attach to an inner DOM node — a component must explicitly forward it (via `forwardRef` in React < 19, or directly as a prop in React 19+ since refs are now regular props for function components):
  ```jsx
  // React 19+ — ref works as a normal prop directly
  function FancyInput({ ref, ...props }) {
      return <input ref={ref} {...props} />;
  }
  ```

---

## 25. Performance — memo, useMemo, useCallback

By default, when a parent component re-renders, **every child re-renders too**, regardless of whether its own props actually changed. For most apps this is fast enough and not worth worrying about — these tools exist for the specific cases where re-rendering is measurably expensive.

### `React.memo` — skip re-rendering a component if its props haven't changed
```jsx
const ProductCard = React.memo(function ProductCard({ product }) {
    console.log("Rendering:", product.proName);
    return <div>{product.proName}</div>;
});
```
`memo` does a shallow comparison of props between renders; if they're all `===` equal to the previous render, React skips re-rendering that component and reuses the last result.

### `useMemo` — memoize an expensive CALCULATED VALUE
```jsx
const sortedProducts = useMemo(() => {
    console.log("Sorting..."); // only logs when productDetails or sortKey actually changes
    return [...productDetails].sort((a, b) => a[sortKey] - b[sortKey]);
}, [productDetails, sortKey]);   // recompute only when one of these dependencies changes
```

### `useCallback` — memoize a FUNCTION DEFINITION itself
```jsx
// Without useCallback, handleClick is a brand-new function on every render of Parent,
// which would defeat React.memo on Child (since a "new" function prop !== the old one)
const handleClick = useCallback(() => {
    console.log("clicked", id);
}, [id]);

<MemoizedChild onClick={handleClick} />
```
- **Rule of thumb**: don't reach for `memo`/`useMemo`/`useCallback` by default — they add their own overhead (the comparison itself has a cost) and complexity. Use them when profiling (e.g. via React DevTools' Profiler) actually shows a re-render is slow and worth avoiding, typically with large lists, expensive computations (sorting/filtering big datasets), or components wrapping costly child renders.

---

## 26. Error Boundaries

An **Error Boundary** is a component that catches JavaScript errors thrown anywhere in its child component tree during rendering, and displays a fallback UI instead of crashing the whole app. As of current React, error boundaries must still be written as a **class component** (there's no Hook equivalent yet) — usually written once and reused.

```jsx
import { Component } from "react";

class ErrorBoundary extends Component {
    state = { hasError: false };

    static getDerivedStateFromError(error) {
        return { hasError: true };   // update state so the next render shows the fallback UI
    }

    componentDidCatch(error, info) {
        console.error("Caught by ErrorBoundary:", error, info);   // log to an error-reporting service
    }

    render() {
        if (this.state.hasError) {
            return <h2>Something went wrong.</h2>;
        }
        return this.props.children;
    }
}

// usage — wrap any part of the tree that might throw
<ErrorBoundary>
    <ProductList />
</ErrorBoundary>
```
- Error boundaries only catch errors during **rendering**, in lifecycle methods, and in constructors of the tree below them — they do NOT catch errors inside event handlers (use a normal `try/catch` there instead), async code, or server-side rendering.

---

## 27. Portals

`createPortal` lets a component render its children into a **different part of the actual DOM tree**, outside its parent's DOM hierarchy — while still behaving like a normal child in the React tree (context, event bubbling still work as expected).

```jsx
import { createPortal } from "react-dom";

function Modal({ children }) {
    return createPortal(
        <div className="modal-overlay">
            <div className="modal-content">{children}</div>
        </div>,
        document.getElementById("modal-root")   // a DOM node outside the main #root, e.g. in index.html
    );
}
```
- The classic use case: modals, tooltips, and dropdowns that need to visually escape a parent's `overflow: hidden` or `z-index` stacking context, while still logically being part of the React component that rendered them.

---

## 28. Suspense & Lazy Loading

**Code-splitting** — loading parts of the app's JS bundle only when needed — is done with `React.lazy()` combined with `<Suspense>` to show a fallback while the code chunk downloads.

```jsx
import { lazy, Suspense } from "react";

const HeavyDashboard = lazy(() => import("./HeavyDashboard"));   // not downloaded until first rendered

function App() {
    return (
        <Suspense fallback={<p>Loading dashboard...</p>}>
            <HeavyDashboard />
        </Suspense>
    );
}
```
- `<Suspense>` shows its `fallback` prop while any lazily-loaded descendant component (or, in newer React versions, a component that "suspends" while fetching data) is still loading, then swaps to the real content once ready.
- Splitting large route-level components (like each page in a multi-page app) with `lazy()` is one of the most effective and common ways to reduce a React app's initial bundle size and improve load time.

---

## 29. Styling Approaches in React

The repo project uses **Bootstrap classes** (`className="btn btn-danger"`, `className="table table-bordered"`) and **inline style objects** (Section 6). Beyond those, common approaches in the wider React ecosystem:

| Approach | How it works |
|---|---|
| Inline styles | JS object passed to `style={{...}}` — scoped to one element, no pseudo-classes/media queries |
| Plain CSS files | Import a `.css` file (`import './App.css'`) — global scope, class names can collide across files |
| CSS Modules | `import styles from './Button.module.css'` then `className={styles.button}` — class names are auto-scoped/hashed per file, avoiding collisions |
| CSS-in-JS (styled-components, Emotion) | Write actual CSS inside JS template literals, scoped automatically to the component |
| Utility-first CSS (Tailwind) | Compose styling from many small utility classes directly in `className` |
| Component libraries | Bootstrap (as in this repo, via CDN or `react-bootstrap`), Material UI, Chakra UI, shadcn/ui — pre-built styled components |

---

## 30. Project Structure & Best Practices

A typical scalable structure (the repo's flat `src/` layout is fine for a learning project; production apps usually group by feature):

```
src/
  main.jsx              # entry point — mounts <App/> with providers (Router, Context, etc.)
  App.jsx                # top-level component, often holds routing
  Contexts/               # Context providers (as in this repo's AppContext.jsx)
  components/               # shared, reusable UI components (Button, Card, Modal...)
  pages/                      # one component per route/page
  hooks/                        # custom hooks
  assets/                         # images, fonts, static files (as in this repo's assets/)
  App.css / index.css              # global styles
```
- **One component per file**, file name matching the component name, is the most common convention.
- **Keep components small and focused** — a component doing too many unrelated things is a sign it should be split.
- **Lift state up** to the closest common parent of the components that need it; only reach for Context (Section 19) when prop-passing becomes genuinely painful across many levels.
- **Derive, don't duplicate, state** — if a value can be computed from existing state/props during render, compute it directly rather than storing it in its own `useState` and trying to keep both in sync.
- Keep side effects (`useEffect`) minimal and give each one a single clear purpose, rather than one large effect handling several unrelated things.

---

## 31. React 19 Highlights

The repo uses **React 19.2** (per its `package.json`). Key changes/additions since React 18 worth knowing:
- **`ref` as a regular prop** on function components — no more mandatory `forwardRef` wrapper to accept a `ref` (see Section 24).
- **Actions** — functions passed to `<form action={...}>` that can be `async`, with built-in pending/error state handling via new hooks like `useActionState` and `useFormStatus`.
- **`use()`** — a new API that lets a component read the value of a Promise or Context directly during render (can be called conditionally, unlike other Hooks).
- **Automatic memoization considerations** — the experimental **React Compiler** (a separate build-time tool) can automatically apply memoization similar to manual `useMemo`/`useCallback`, reducing the need to hand-optimize (relevant since the repo's `devDependencies` include compiler-related packages).
- Improved built-in support for **document metadata** (rendering `<title>`, `<meta>` tags directly from components) and **stylesheet/script loading** management.

---

## 32. Common Pitfalls & Debugging Tips

- ✅ Always give list items a stable, unique `key` — never omit it, and avoid array index as a key for lists that can reorder, filter, or have items inserted/removed.
- ✅ Never mutate state directly — always create new arrays/objects (`[...arr]`, `{...obj}`) when updating.
- ⚠️ Objects can't be rendered directly as JSX children — access a specific property, or `JSON.stringify()` for debugging.
- ⚠️ `onClick={fn(arg)}` calls `fn` immediately during render — wrap in an arrow function: `onClick={() => fn(arg)}`.
- ⚠️ Forgetting `event.preventDefault()` in a form submit handler causes an unwanted full-page reload.
- ⚠️ An empty `useEffect` dependency array (`[]`) means "run once on mount" — omitting the array entirely means "run after every render," which is rarely intended and can cause infinite loops if the effect itself updates state that's also a dependency.
- ⚠️ State updates don't happen synchronously — reading the state variable immediately after calling its setter still shows the OLD value within that same function call.
- ⚠️ Component names must be capitalized, or JSX treats them as an unknown lowercase HTML tag instead of your component.
- 🔧 **React DevTools** (browser extension) is the primary tool for inspecting the component tree, props, state, and profiling re-renders in development.
- 🔧 `<StrictMode>` double-invoking functions in development is expected behavior meant to catch impure code — it does not indicate a bug by itself, and does not happen in production builds.

---

### How to use this file
- Jump to any section via the [Table of Contents](#table-of-contents).
- Every code example mirrors real patterns from the `06-react/myFirstApp` practice project (components numbered `01` through `18`, `AppContext.jsx`, `main.jsx`, `App.jsx`), supplemented with official React documentation concepts not present in the repo (Error Boundaries, Portals, Suspense, custom hooks, performance hooks, React 19 features) so this file covers React end-to-end.
- Run any of the JSX examples inside a Vite React project (`npm create vite@latest -- --template react`) to see them live.
