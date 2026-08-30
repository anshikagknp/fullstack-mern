# CSS — Complete Notes (Basics to Advanced)

> A one-stop reference built from the `02-css` practice repo and the official [MDN CSS documentation](https://developer.mozilla.org/en-US/docs/Web/CSS). Every concept explained in plain language, with pointers, descriptive notes, and runnable code examples.

## Table of Contents

1. [Introduction to CSS](#1-introduction-to-css)
2. [Ways to Apply CSS — Inline, Internal, External](#2-ways-to-apply-css--inline-internal-external)
3. [Selectors — Basics](#3-selectors--basics)
4. [ID & Class Selectors](#4-id--class-selectors)
5. [Combinators & Selector Structure](#5-combinators--selector-structure)
6. [The Cascade & Specificity](#6-the-cascade--specificity)
7. [Colors & Backgrounds](#7-colors--backgrounds)
8. [Text Styling](#8-text-styling)
9. [Fonts](#9-fonts)
10. [The Box Model](#10-the-box-model)
11. [Borders, Border-Radius & Shadows](#11-borders-border-radius--shadows)
12. [Display Property](#12-display-property)
13. [Position Property](#13-position-property)
14. [Pseudo-Classes](#14-pseudo-classes)
15. [Structural & Form-State Pseudo-Classes](#15-structural--form-state-pseudo-classes)
16. [Pseudo-Elements](#16-pseudo-elements)
17. [Attribute Selectors](#17-attribute-selectors)
18. [Media Queries & Responsive Design](#18-media-queries--responsive-design)
19. [Flexbox — Complete Guide](#19-flexbox--complete-guide)
20. [CSS Grid](#20-css-grid)
21. [Transforms](#21-transforms)
22. [Transitions & Animations](#22-transitions--animations)
23. [Practical Patterns from the Repo](#23-practical-patterns-from-the-repo)
24. [Units in CSS](#24-units-in-css)
25. [CSS Variables (Custom Properties)](#25-css-variables-custom-properties)
26. [Overflow, Visibility & z-index](#26-overflow-visibility--z-index)
27. [Best Practices & Common Pitfalls](#27-best-practices--common-pitfalls)

---

## 1. Introduction to CSS

- **CSS (Cascading Style Sheets)** is the language used to describe the *presentation* of an HTML document — colors, fonts, spacing, layout, animation — separating visual styling from the structural/semantic markup (HTML).
- A CSS **rule** consists of a **selector** (what to style) and a **declaration block** (how to style it), made of one or more `property: value;` declarations:
  ```css
  h1 {
      background-color: navy;
      color: white;
  }
  ```
- **"Cascading"** refers to how CSS resolves conflicts when multiple rules target the same element — determined by a combination of **specificity**, **source order**, and **importance** (Section 6).
- The current standard isn't one single monolithic spec — CSS today is split into many independent **modules** (Flexbox, Grid, Animations, Selectors Level 4, etc.), each evolving somewhat independently, which is why MDN documents CSS module-by-module.

---

## 2. Ways to Apply CSS — Inline, Internal, External

Three ways to attach CSS to HTML, demonstrated directly in the repo's first file:

```html
<head>
    <!-- EXTERNAL — linked from a separate .css file -->
    <link href="./myStyle.css" rel="stylesheet" />

    <!-- INTERNAL — inside a <style> block in the document's <head> -->
    <style>
        h1 {
            background-color: navy;
            color: white;
        }
    </style>
</head>
<body>
    <h1>Hi</h1>

    <!-- INLINE — directly on the element via the style attribute -->
    <p style="background-color: bisque; color: brown;">
        Some paragraph text...
    </p>
</body>
```

| Method | Where it lives | Scope | When to use |
|---|---|---|---|
| **Inline** (`style="..."`) | Directly on one HTML element | That single element only | Rare — one-off overrides, dynamically-set styles from JS. Hardest to maintain/override (highest specificity — Section 6) |
| **Internal** (`<style>` in `<head>`) | Inside the HTML document itself | The whole document | Small single-page demos/prototypes; not reusable across pages |
| **External** (`<link rel="stylesheet">`) | A separate `.css` file | Any page that links it | **The standard, best-practice approach** — reusable across multiple pages, cacheable by the browser, keeps markup and styling cleanly separated |

- When multiple methods apply conflicting styles to the same element, **inline styles win over internal/external** regardless of selector specificity (inline styles have an extremely high specificity weight — see Section 6) — this is exactly why it's used sparingly in real projects.
- The `myStyle.css` file in the repo is a minimal external stylesheet:
  ```css
  body {
      background-color: rgb(123, 183, 235);
  }
  ```

---

## 3. Selectors — Basics

A **selector** determines which HTML element(s) a rule applies to.

```css
/* Type/element selector — targets ALL elements of that tag */
h1 { color: navy; }

/* Universal selector — targets EVERY element on the page */
* { margin: 0; padding: 0; }

/* Grouping selector — apply the same rule to multiple selectors, comma-separated */
h1, h2, h3 { font-family: Georgia, serif; }
```
- **Type selector** (`h1`, `p`, `div`) — matches every instance of that HTML tag.
- **Universal selector** (`*`) — matches everything; commonly used for CSS resets (`* { margin: 0; box-sizing: border-box; }`).
- **Grouping** — a comma-separated list of selectors sharing one declaration block avoids repeating the same rule multiple times.

---

## 4. ID & Class Selectors

The two most important selectors for targeting *specific* elements rather than every element of a type.

```css
/* ID selector — prefixed with #, targets the ONE element with that id */
#H3 {
    background-color: navy;
    color: white;
}

/* Class selector — prefixed with ., targets ALL elements with that class */
.btn {
    background: linear-gradient(to left, antiquewhite, rgb(144, 144, 245));
}
```
```html
<button class="btn">button 1</button>
<button>button 2</button>
<button class="btn">button 4</button>

<h1 id="H3">Heading 3</h1>
```
- **`id`** — must be **unique per page** (only one element should ever have a given `id`); matched in CSS with `#idName`. Also usable as a JS hook (`document.getElementById`) and an internal hyperlink target (`<a href="#idName">`).
- **`class`** — can be applied to **many elements**, and a single element can have **multiple classes** (space-separated: `class="btn btn-primary large"`), each independently targetable.
- **Rule of thumb**: use classes for anything reusable/styling-related (the vast majority of styling); reserve IDs for unique, one-of-a-kind elements or JS/anchor hooks — IDs carry much higher specificity (Section 6), which can make later overrides harder.

---

## 5. Combinators & Selector Structure

Combinators express **relationships** between elements in the HTML tree, letting a selector target elements based on their position relative to another element.

```html
<h1>Heading 1</h1>
<h1>Heading 2</h1>
<div>
    <h1>Inside Div, Heading 3</h1>
    <h1>Inside Div, Heading 4</h1>
    <span>
        <h1>Inside span, heading 5</h1>
    </span>
</div>
```
```css
div h1 { color: red; }        /* DESCENDANT combinator (space) — any h1 anywhere inside a div, at any depth (matches h3, h4, AND h5) */
div > h1 { color: blue; }      /* CHILD combinator (>) — only h1 elements that are DIRECT children of a div (matches h3, h4 — NOT h5, which is nested inside span) */
h1 + p { color: green; }        /* ADJACENT SIBLING (+) — a <p> immediately following an <h1> at the same level */
h1 ~ p { color: purple; }        /* GENERAL SIBLING (~) — ANY <p> that comes after an <h1> at the same level, not just the first */
```

### Real example from the repo — icon reveals text on hover, using `+`
```html
<style>
    #title { display: none; }
    #icon:hover + #title {
        display: block;
        color: navy;
    }
</style>
<div>
    <span id="icon">🏠</span>
    <span id="title">Home</span>
</div>
```
`#icon:hover + #title` reads as: "when the element with id `icon` is hovered, style the element with id `title` that comes immediately after it as a sibling." This is the CSS-only technique behind many hover reveal/tooltip effects, with no JavaScript needed.

- **Descendant (` `)** — the loosest relationship: "anywhere inside."
- **Child (`>`)** — the tightest parent-child relationship: "immediately inside."
- **Adjacent sibling (`+`)** — "the very next element at the same level."
- **General sibling (`~`)** — "any later element at the same level."

---

## 6. The Cascade & Specificity

When multiple CSS rules target the same element with conflicting property values, the browser must decide which one "wins" — this is the **cascade**, resolved by three factors, in order:

### 1. Importance
`!important` overrides everything else (use extremely sparingly — it breaks the normal cascade and makes future overrides painful):
```css
p { color: red !important; }
```

### 2. Specificity
A weighted score calculated from the selector itself — higher specificity wins regardless of source order:

| Selector type | Specificity weight |
|---|---|
| Inline style (`style="..."`) | 1000 |
| ID selector (`#id`) | 100 |
| Class, attribute, pseudo-class (`.class`, `[type]`, `:hover`) | 10 |
| Type selector, pseudo-element (`div`, `::before`) | 1 |
| Universal selector (`*`) | 0 |

```css
p { color: blue; }              /* specificity: 1 */
.intro { color: green; }         /* specificity: 10 — wins over the type selector above */
#main-intro { color: red; }       /* specificity: 100 — wins over the class above */
```
Combined selectors add their weights: `div.intro#main-intro` = 1 (type) + 10 (class) + 100 (id) = 111.

### 3. Source order
If two rules have **identical specificity**, the one that appears **later** in the stylesheet (or in a later linked stylesheet) wins:
```css
p { color: blue; }
p { color: green; }   /* this wins — same specificity, comes later */
```

### Inheritance
Some CSS properties (mostly text-related: `color`, `font-family`, `font-size`, `line-height`) are **inherited** by default — a child element automatically takes on its parent's computed value unless overridden. Layout/box properties (`margin`, `padding`, `border`, `width`) are **not** inherited by default. The `inherit` keyword can force inheritance explicitly for any property: `border: inherit;`.

---

## 7. Colors & Backgrounds

### Color formats
```css
p { color: red; }                        /* named color — ~140 predefined keywords */
p { color: #ff0000; }                      /* hexadecimal — #RRGGBB (each pair 00-ff) */
p { color: rgb(255, 0, 0); }                 /* RGB — each channel 0-255 */
p { color: rgba(255, 0, 0, 0.6); }            /* RGBA — with alpha (0=transparent, 1=opaque) */
p { color: hsl(0, 100%, 50%); }                /* HSL — Hue (0-360°), Saturation %, Lightness % */
```
- `rgba()`/HSL with alpha are especially useful for semi-transparent overlays, as seen in the repo's card overlay example: `background-color: rgba(0, 0, 0, 0.6);`.

### Background properties (from the repo's `02-background-image.html`)
```css
body {
    background-color: rgb(166, 187, 187);
    background-image: url(../images/background.jpg);
    background-repeat: no-repeat;             /* repeat (default) | no-repeat | repeat-x | repeat-y */
    background-attachment: fixed;                /* fixed = image stays put while page scrolls; scroll (default) = image scrolls with content */
    background-position: center center;            /* horizontal + vertical position — keywords, %, or px */
    /* background-position: 400px 200px; */          /* explicit px offsets from top-left */
    /* background-position: 50% 50%; */               /* percentage — same effect as "center center" here */
    background-size: 100vw 100vh;                       /* explicit size — here, fills the full viewport */
}
```
- **`background-image`** — layered UNDER `background-color` (color shows through any transparent parts of the image, or if the image fails to load).
- **`background-size`** — besides explicit lengths, two very common keywords: `cover` (scales the image to fully cover the element, cropping if needed, no gaps) and `contain` (scales to fit entirely within the element, may leave gaps).
- **`background-attachment: fixed`** creates a classic "parallax-lite" effect where the background stays still as the page content scrolls over it.
- **Shorthand**: all of the above can be combined into one `background` property: `background: rgb(166,187,187) url(bg.jpg) no-repeat fixed center / 100vw 100vh;` (the `/` separates position from size).
- **Gradients** (seen in the repo's button styling) — a gradient is a special value usable anywhere a `background-image` is expected:
  ```css
  .btn {
      background: linear-gradient(to left, antiquewhite, rgb(144, 144, 245));  /* direction, color stops */
  }
  /* other gradient functions: */
  background: radial-gradient(circle, yellow, orange);   /* radiates outward from a center point */
  background: conic-gradient(red, yellow, green, blue);   /* sweeps around a center point like a color wheel */
  ```

---

## 8. Text Styling

```css
p {
    color: rgb(71, 71, 222);
    line-height: 20px;                                   /* vertical spacing between lines of text */
    text-align: justify;                                  /* left | right | center | justify */
    text-decoration: overline dotted;                       /* line position(s) + style, combinable */
    text-transform: capitalize;                               /* uppercase | lowercase | capitalize | none */
    text-indent: 50px;                                          /* indents only the FIRST line of a text block */
}
a {
    text-decoration: none;                 /* removes the default underline on links */
}
h1 {
    text-align: center;
    text-shadow: 1px 1px 4px red, 1px 1px 3px rgb(125, 208, 125);  /* multiple shadows: x-offset y-offset blur color, comma-separated */
}
```
- **`text-decoration`** — shorthand for `text-decoration-line` (`underline`/`overline`/`line-through`/`none`), `text-decoration-style` (`solid`/`dotted`/`dashed`/`wavy`), and `text-decoration-color`, all combinable in one declaration.
- **`text-shadow`** — `horizontal-offset vertical-offset blur-radius color`; multiple shadows can be layered by comma-separating several shadow definitions (as in the repo's two-color glow effect).
- **`letter-spacing`** / **`word-spacing`** (not in repo, but standard) — control spacing between individual characters/words: `letter-spacing: 2px;`.
- **`white-space`** (not in repo) — controls how whitespace/wrapping is handled: `nowrap` prevents text from wrapping to a new line, `pre` preserves whitespace exactly like `<pre>`.

---

## 9. Fonts

```css
p {
    font-family: Georgia, 'Times New Roman', Times, serif;   /* a PRIORITY LIST — browser uses the first available font */
    font-size: 25px;
    font-style: italic;                                        /* normal | italic | oblique */
    font-weight: bold;                                           /* normal(400) | bold(700) | 100-900 in steps of 100 */
}
```
- **`font-family`** is always a **fallback list**: the browser tries each font left to right and uses the first one installed/available on the user's device, ending in a **generic family** (`serif`, `sans-serif`, `monospace`, `cursive`, `fantasy`) as a final guaranteed fallback.
- **`font-weight`** accepts both keywords (`normal`, `bold`, `lighter`, `bolder`) and numeric values (`100`–`900` in steps of 100) — numeric values require the specific font file/family to actually support that weight (many custom web fonts only ship a few specific weights).
- **Web fonts** (not in the repo, but essential for real projects) — custom fonts not pre-installed on the user's device are loaded via `@font-face` or a service like Google Fonts:
  ```css
  @font-face {
      font-family: 'MyCustomFont';
      src: url('myfont.woff2') format('woff2');
  }
  body { font-family: 'MyCustomFont', sans-serif; }
  ```
- **Shorthand**: `font: italic bold 25px/1.5 Georgia, serif;` combines style, weight, size, line-height (after the `/`), and family in one declaration.

---

## 10. The Box Model

Every HTML element is rendered as a rectangular box, made of four concentric layers — understanding this is fundamental to all CSS layout work.

```
┌─────────────────────────────────────┐
│              margin                   │  ← transparent, space OUTSIDE the border
│   ┌───────────────────────────────┐   │
│   │            border               │   │  ← a visible (or invisible) line around padding+content
│   │   ┌─────────────────────────┐   │   │
│   │   │        padding            │   │   │  ← transparent, space INSIDE the border, around content
│   │   │   ┌───────────────────┐   │   │   │
│   │   │   │      content       │   │   │   │  ← the actual text/image/element content
│   │   │   └───────────────────┘   │   │   │
│   │   └─────────────────────────┘   │   │
│   └───────────────────────────────┘   │
└─────────────────────────────────────┘
```

```css
div {
    width: 400px;               /* content box width */
    height: 200px;                /* content box height */
    padding: 20px;                  /* space between content and border */
    border: 1px red solid;            /* the border itself */
    margin: 10px;                       /* space outside the border, between this element and its neighbors */
}
```
- **`padding`** and **`margin`** shorthand accepts 1 to 4 values:
  ```css
  padding: 10px;                 /* all four sides */
  padding: 10px 20px;             /* vertical(top/bottom) horizontal(left/right) */
  padding: 10px 20px 5px;          /* top, horizontal(left/right), bottom */
  padding: 10px 20px 5px 15px;      /* top, right, bottom, left — clockwise from top */
  ```
  Or individually: `margin-top`, `margin-right`, `margin-bottom`, `margin-left` (and the `padding-*` equivalents).
- **`box-sizing`** — a critical property controlling HOW width/height are calculated:
  ```css
  * {
      box-sizing: border-box;   /* width/height INCLUDE padding+border — the box stays the declared size */
  }
  /* box-sizing: content-box (the CSS default) — width/height apply ONLY to content;
     padding+border are ADDED on top, making the final rendered box bigger than the declared width/height */
  ```
  `border-box` is overwhelmingly preferred in modern CSS (and applied via a near-universal reset: `*, *::before, *::after { box-sizing: border-box; }`) because it makes sizing calculations far more predictable.
- **`margin: 0 auto;`** — a classic centering technique for a block-level element with a fixed `width`: `auto` distributes the remaining horizontal space equally on both sides.
- **Margin collapsing** — vertical margins between adjacent block elements can "collapse" into a single margin equal to the larger of the two (rather than adding together) — a frequent source of unexpected spacing that catches beginners off guard.

---

## 11. Borders, Border-Radius & Shadows

```css
p {
    /* longhand: */
    /* border-width: 2px;
    border-style: solid;
    border-color: burlywood; */

    /* shorthand — width, style, color, any order: */
    border: 2px rgb(209, 59, 59) solid;
    border-radius: 5px 10px;      /* rounds corners — 1 to 4 values, same pattern as padding/margin */
}
img {
    width: 500px;
    height: 500px;
    border-radius: 50%;            /* 50% on a square element = a perfect circle */
}
```
- **`border-style`** required values: `solid`, `dashed`, `dotted`, `double`, `none` (default) — without a style, width/color alone render no visible border at all.
- **`border-radius`** — rounds the corners of the box; a single value rounds all four corners equally, `50%` on an exactly square box produces a perfect circle (a very common avatar/profile-picture technique, used in the repo's `Mouse.jpg` example).
- **`box-shadow`** — casts a shadow around the element's box (not the text — that's `text-shadow`, Section 8):
  ```css
  div {
      box-shadow: 2px 2px 8px 2px black;
      /*           x    y   blur spread color */
      box-shadow: 1px 1px 5px 2px rgba(239, 51, 51, 0.6);  /* semi-transparent colored shadow, from the repo's card example */
      box-shadow: inset 2px 2px 5px black;                   /* `inset` casts the shadow INSIDE the box instead of outside */
  }
  ```
  Values in order: horizontal offset, vertical offset, blur radius (optional), spread radius (optional), color. Multiple shadows can be comma-separated, layered like `text-shadow`.

---

## 12. Display Property

`display` fundamentally controls how an element participates in page layout — arguably the single most important layout property.

```css
span { display: inline; }     /* default for span/a/strong — flows within text, ignores width/height, no line break before/after */
div  { display: block; }        /* default for div/p/h1-h6 — starts on a new line, takes full available width, respects width/height */
img  { display: inline-block; }   /* hybrid: flows inline like text, BUT respects width/height/margin/padding like a block */
div  { display: flex; }             /* turns the element into a FLEX CONTAINER — Section 19 */
div  { display: grid; }               /* turns the element into a GRID CONTAINER — Section 20 */
div  { display: none; }                 /* removes the element ENTIRELY — takes up no space, as if it doesn't exist */
```
- **`inline`** — width/height/vertical margin have no effect; the element only takes as much horizontal space as its content needs, and multiple inline elements sit side by side on the same line.
- **`block`** — always starts on a new line and stretches to fill its parent's full width by default; width/height/margin/padding all apply normally.
- **`inline-block`** — the "best of both": flows inline with surrounding content (no forced line break) but still respects `width`/`height`/vertical `margin`/`padding` like a block element. Commonly used for nav links, buttons, image galleries.
- **`display: none`** vs. **`visibility: hidden`** (Section 26) — `none` removes the element from the layout flow entirely (surrounding elements shift to fill the gap); `visibility: hidden` hides it visually but the element still occupies its normal space.
- Repo example — a media-query-driven show/hide pattern using `display: none`/`block`:
  ```css
  h1 { display: none; }
  @media all and (min-width: 768px) {
      #h1 { display: block; color: white; }
  }
  ```

---

## 13. Position Property

`position` removes an element from (or changes) the normal document flow, letting you place it precisely — one of CSS's most powerful and most confusing properties.

### `static` (default)
Every element starts as `position: static` — it sits in the normal document flow, and `top`/`right`/`bottom`/`left`/`z-index` have **no effect** on it.

### `relative`
```css
div {
    border: 1px red solid;
    height: 200px;
    width: 400px;
    position: relative;
    top: 100px;      /* moves the element 100px DOWN from where it would normally sit */
    left: 100px;      /* moves the element 100px RIGHT from where it would normally sit */
}
```
- The element is still positioned relative to **its own normal position** — offsetting it does NOT remove it from the document flow, so it still reserves its original space (other elements don't shift into the "gap" it left behind).
- Critically, **`position: relative` also establishes a new positioning context for any absolutely-positioned descendants** — this is its most important practical use, even more than offsetting the element itself (see the parent-child example below).

### `absolute`
```css
/* Parent-child positioning pattern — from the repo */
.parent { border: 1px solid red; height: 300px; position: relative; }
.child  { border: 1px solid blue; width: 100px; height: 100px; position: absolute; left: 0; bottom: 0; }
```
```html
<div style="border: 1px solid red; height:300px; position:relative">
    <h2 align="center">Parent Division</h2>
    <div style="border: 1px solid blue; width: 100px; height: 100px; position:absolute; left:0; bottom:0;">
        Child Division
    </div>
</div>
```
- An absolutely-positioned element is **removed from the normal document flow entirely** (other elements act as if it doesn't exist) and positioned relative to its **nearest ancestor that has a `position` other than `static`** (relative/absolute/fixed/sticky) — if no such ancestor exists, it positions relative to the whole page (the initial containing block).
- This is why `position: relative` on the parent + `position: absolute` on the child (with no offset on the parent itself) is such a common, essential pairing — it "traps" the absolute child inside the parent's bounding box.
- Real-world use: badges, tooltips, image overlay captions (see the repo's card overlay example in Section 23), dropdown menus.

### `fixed`
```css
img {
    width: 100%;
    height: 200px;
    position: fixed;
    top: 0;
    left: 0;
}
```
- Positioned relative to the **browser viewport** (the visible window), and stays in that exact same screen position even as the page is scrolled — used for the repo's fixed header image example. Also removed from normal document flow, so content below it needs manual `margin-top` to avoid being hidden underneath.

### `sticky`
```css
nav {
    background-color: navy;
    color: white;
    position: sticky;
    top: 0;
    left: 0;
}
```
- A hybrid: behaves like `position: static`/normal flow **until** the page is scrolled to the point where it would go off-screen, at which point it "sticks" at the specified offset (`top: 0` here) and behaves like `fixed` for as long as its parent container is still in view. Extremely common for sticky navigation bars, section headers in long pages, and table headers.
- Requires at least one of `top`/`right`/`bottom`/`left` to be set, or it has no effect.

### Comparison summary

| Value | In normal flow? | Positioned relative to | Scrolls with page? |
|---|---|---|---|
| `static` (default) | ✅ Yes | — (no offset effect) | ✅ Yes |
| `relative` | ✅ Yes (reserves original space) | Its own normal position | ✅ Yes |
| `absolute` | ❌ No | Nearest non-static ancestor | ✅ Yes (with that ancestor) |
| `fixed` | ❌ No | The browser viewport | ❌ No — stays put |
| `sticky` | ✅ Yes (until threshold) | Its normal position, then the viewport | Partially — sticks after a scroll point |

---

## 14. Pseudo-Classes

A **pseudo-class** selects elements based on a **state or condition** that isn't reflected as a plain HTML attribute — written with a single colon `:`.

### `:hover` — the mouse is over the element
```css
h1 {
    background-color: navy;
    color: white;
}
h1:hover {
    background-color: rgb(144, 144, 245);
    color: antiquewhite;
}
```

### `:focus` — the element currently has keyboard/input focus
```css
input:focus {
    background-color: antiquewhite;
    color: navy;
    outline: 1px solid navy;
}
```
Applies while a form field is actively selected/being typed into — essential for both UX feedback and accessibility (never remove the focus outline without providing a clear visual alternative).

### `:not()` — the negation pseudo-class
```css
input:not(#subBtn) {
    border: 1px solid navy;
    padding: 8px;
    margin-bottom: 10px;
}
input:focus:not(#subBtn) {
    background-color: antiquewhite;
    outline: 1px solid navy;
    box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.3);
}
```
`:not(selector)` matches any element that does NOT match the given selector — here, styling every input except the submit button. Pseudo-classes can be chained together (`:focus:not(#subBtn)`) to combine multiple conditions.

### Other essential pseudo-classes (not in the repo, but standard)
```css
a:link { color: blue; }        /* an unvisited link */
a:visited { color: purple; }     /* a link the user has already visited */
a:active { color: red; }          /* the moment a link is being clicked */
button:disabled { opacity: 0.5; }  /* a disabled form control */
input:checked { outline: 2px solid green; }  /* a checked checkbox/radio */
```

---

## 15. Structural & Form-State Pseudo-Classes

### `:first-child`, `:last-child`, `:nth-child()`
```css
tr:first-child {
    background-color: navy;
    color: white;
}
tr:last-child {
    background-color: bisque;
}
tbody > tr:hover {
    background-color: rgb(230, 230, 250);
}
/* nth-child formula: an+b — here, every 4th row starting from the 1st (rows 1, 5, 9, 13...) */
tbody > tr:nth-child(4n+1) {
    background-color: rgb(214, 210, 210);
}
```
- **`:first-child`** — matches an element only if it is the FIRST child of its parent.
- **`:last-child`** — matches an element only if it is the LAST child of its parent.
- **`:nth-child(an+b)`** — the most flexible structural selector, using a mathematical formula: `n` starts at 0 and increments (0, 1, 2, 3...), so `an+b` generates a sequence of matching positions.
  ```css
  :nth-child(odd)    /* equivalent to 2n+1 — matches 1st, 3rd, 5th... */
  :nth-child(even)   /* equivalent to 2n — matches 2nd, 4th, 6th... */
  :nth-child(3)       /* matches ONLY the 3rd child, a plain number with no formula */
  :nth-child(4n+1)     /* matches 1st, 5th, 9th, 13th... — the repo's zebra-striping-every-4-rows pattern */
  ```
- **`:nth-of-type()`** — like `nth-child`, but counts only among siblings of the **same tag type**, ignoring other element types mixed in between.
- **`:first-of-type`** / **`:last-of-type`** — the type-specific equivalents of `:first-child`/`:last-child`.

### Form validation state pseudo-classes
```css
input {
    border: 1px solid navy;
    padding: 8px;
    margin-bottom: 10px;
}
input:user-valid {
    border: 2px solid green;
}
input:user-invalid {
    border: 2px solid red;
}
```
```html
<input type="text" placeholder="Enter Name" id="nm" required minlength="4">
<input type="email" placeholder="Enter Email" id="mail" required minlength="6">
```
- **`:valid`** / **`:invalid`** — match a form control based on whether its current value satisfies its validation constraints (`required`, `pattern`, `type="email"`, `minlength`, etc.) — but these apply **immediately**, even before the user has interacted with the field at all, which can be visually jarring (an empty required field shows as "invalid" right away).
- **`:user-valid`** / **`:user-invalid`** (newer, used in the repo) — the same validity check, but only activates **after the user has interacted with the field** (typed something, then left it, or the form was submitted) — a much better UX default, since fields don't show red/invalid styling before the user has even had a chance to fill them in.
- Related: **`:required`** / **`:optional`** (matches based on the presence of the `required` attribute), **`:disabled`** / **`:enabled`**, **`:checked`** (for checkboxes/radios), **`:placeholder-shown`** (matches while the placeholder is visible, i.e. the field is empty).

---

## 16. Pseudo-Elements

A **pseudo-element** targets a specific *part* of an element (rather than the whole element, like a pseudo-class does) — written with a double colon `::` (single colon is also tolerated for legacy reasons, but `::` is the modern, correct syntax).

```css
#mypara::before {
    content: "Hi... ";
}
#mypara::after {
    content: " 😊";
}
::marker {
    content: "✔️ ";
}
::selection {
    background-color: navy;
    color: antiquewhite;
}
```
```html
<p id="mypara">Hello World!</p>
<ul>
    <li>ListItem1</li>
</ul>
```
- **`::before`** / **`::after`** — insert generated content immediately before/after an element's actual content, without needing extra HTML markup. The `content` property is **mandatory** for them to render at all (even `content: "";` for a purely visual/decorative pseudo-element with no text, as used in the underline-hover-effect example below).
- **`::marker`** — styles the bullet/number marker of a list item (`<li>`) — here, replacing the default bullet with a custom checkmark character via `content`.
- **`::selection`** — styles the appearance of text the user has highlighted/selected with their mouse.
- **`::placeholder`** (not in repo, but essential) — styles the placeholder text color/style inside an `<input>`.
- **`::first-line`** / **`::first-letter`** (not in repo) — style just the first line or first letter of a block of text (classic "drop cap" effect uses `::first-letter`).

### Real technique from the repo — animated underline using `::before`
```css
.mylink {
    text-decoration: none;
    position: relative;
    color: navy;
}
.mylink::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 23px;
    transform: translate(-50%);
    width: 0px;
    height: 2px;
    background-color: navy;
    transition: 0.2s;
}
.mylink:hover::before {
    width: 100%;
}
```
This combines a pseudo-element (`::before`, a fake "underline" bar starting at `width: 0`), absolute positioning, and a `:hover` pseudo-class + `transition` to smoothly grow the underline from the center outward on hover — entirely in CSS, no JS or extra markup needed.

---

## 17. Attribute Selectors

Select elements based on the presence or value of an HTML attribute — extremely useful for styling form inputs by `type` without needing extra classes.

```css
input {
    margin-bottom: 10px;
}
input[type="email"] {
    background-color: antiquewhite;
}
input[placeholder="Enter Password"] {
    background-color: bisque;
}
```
```html
<input type="text" placeholder="Enter Name"/>
<input type="email" placeholder="Enter Email"/>
<input type="password" placeholder="Enter Password"/>
```

### The full attribute selector syntax
```css
[disabled] { opacity: 0.5; }              /* has the attribute at all, regardless of value */
[type="text"] { }                           /* EXACT value match */
[class~="btn"] { }                            /* value appears as one whole word in a space-separated list */
[href^="https"] { }                             /* STARTS WITH ("^" = beginning) */
[href$=".pdf"] { }                                /* ENDS WITH ("$" = end) — great for styling links to PDFs differently */
[class*="col-"] { }                                /* CONTAINS the substring anywhere */
[lang|="en"] { }                                     /* exact value, OR starts with value followed by a hyphen (e.g. matches "en" and "en-US") */
```
- Attribute selectors are especially powerful combined with a type selector for precision, as in the repo (`input[type="email"]` — only `<input>` elements with that specific attribute value, not every element that happens to have `type="email"`).
- Case-insensitive attribute value matching is available by adding `i` before the closing bracket: `[type="email" i]`.

---

## 18. Media Queries & Responsive Design

**Media queries** apply CSS conditionally, based on characteristics of the device/viewport — the foundation of responsive web design.

```css
h1 { display: none; }   /* hidden by default */

/* Large devices — 768px and wider */
@media all and (min-width: 768px) {
    body { background-color: red; }
    #h1 { display: block; color: white; }
}

/* Medium devices — between 576px and 767px */
@media all and (min-width: 576px) and (max-width: 767px) {
    body { background-color: yellow; }
    #h2 { display: block; color: black; }
}

/* Small devices — up to 575px */
@media all and (max-width: 575px) {
    body { background-color: navy; }
    #h3 { display: block; color: white; }
}
```
- **`@media`** — a CSS "at-rule" that wraps a block of normal CSS rules, applied only when the specified condition(s) are true.
- **`all`** — the media type (screen, print, all); almost always `all` or omitted (screen is implied) for responsive web layouts; `print` targets printed/print-preview output specifically.
- **`min-width`** / **`max-width`** — the most common conditions, targeting a viewport width range. Multiple conditions are combined with `and`.
- **Mobile-first vs. desktop-first**: writing base styles for the smallest screen and layering `min-width` media queries on top to progressively enhance for larger screens (mobile-first, generally preferred) vs. writing base styles for desktop and using `max-width` queries to adapt down (desktop-first) — the repo's navbar example (Section 19) uses a desktop-first approach with `max-width` breakpoints.
- **Common breakpoint conventions** (not official standards, just widely-used conventions, matching Bootstrap's grid): `576px` (small/phones landscape), `768px` (medium/tablets), `992px` (large/small desktops), `1200px` (extra-large/desktops).
- Other useful media features: `orientation: portrait`/`landscape`, `prefers-color-scheme: dark`/`light` (respects the user's OS dark-mode setting), `prefers-reduced-motion: reduce` (respects a user's request to minimize animations, an accessibility consideration).

---

## 19. Flexbox — Complete Guide

**Flexbox (Flexible Box Layout)** is a one-dimensional layout system (a single row OR a single column at a time) designed for distributing space and aligning items within a container — the modern replacement for float-based layouts.

### Turning on Flexbox & basic container properties
```css
.container {
    border: 2px solid black;
    height: 100vh;
    width: 100vw;
    display: flex;                  /* activates flexbox for this element's direct children */
    flex-direction: row;              /* row (default) | row-reverse | column | column-reverse */
    flex-wrap: wrap;                    /* nowrap (default, items shrink to fit one line) | wrap (items flow to new lines) */
    justify-content: center;              /* alignment along the MAIN axis */
    align-items: center;                    /* alignment along the CROSS axis, per line */
    align-content: center;                    /* alignment of the WRAPPED LINES themselves (only matters with flex-wrap + multiple lines) */
    gap: 10px;                                  /* spacing between flex items, both row and column gaps */
    border-radius: 20px;
}
```
- **The "main axis" vs "cross axis"** is the single most important Flexbox concept: `flex-direction: row` makes the main axis horizontal (and cross axis vertical); `flex-direction: column` makes the main axis vertical (and cross axis horizontal). Every alignment property below is relative to these axes, not literally "horizontal"/"vertical."
- **`justify-content`** (main-axis alignment) values: `flex-start` (default), `flex-end`, `center`, `space-between` (items spread with equal gaps between them, none at the very edges), `space-around` (equal space around each item, so edge gaps are half of between-item gaps), `space-evenly` (perfectly equal spacing everywhere, including edges).
- **`align-items`** (cross-axis alignment, single line) values: `stretch` (default — items stretch to fill the cross-axis size), `flex-start`, `flex-end`, `center`, `baseline` (aligns items by their text baseline).
- **`align-content`** — only has a visible effect when `flex-wrap: wrap` produces multiple lines; controls how those lines are distributed within the container (same value options as `justify-content`).

### Item (child) properties
```css
.container > div {
    flex-grow: 1;         /* how much this item grows to fill EXTRA available space, relative to siblings' flex-grow values */
    flex-shrink: 1;         /* how much this item shrinks when there's NOT enough space, relative to siblings */
    flex-basis: 100%;         /* the item's initial/default size before growing or shrinking is applied */
    order: 2;                    /* changes VISUAL order without touching the HTML — lower numbers appear first, default is 0 */
}
```
- **`flex: <grow> <shrink> <basis>`** — the shorthand almost always used in practice instead of the three longhand properties separately: `flex: 1 1 0%;` is extremely common ("grow and shrink equally, ignore natural content size").
- **`order`** — purely visual re-ordering; the underlying DOM/HTML order (and therefore tab order for accessibility, and source order for screen readers) is unaffected — use with some care for genuinely re-orderable content, not to fix broken HTML structure.

### Real repo example — a responsive layout using `order` and `flex-grow` across breakpoints
```css
.container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 4px;
}
.container > * {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 100%;    /* stacked full-width by default (mobile) */
}
@media all and (min-width: 992px) {
    .myHeader { order: 1; }
    .aside1   { order: 2; flex-grow: 1; flex-basis: 0%; }
    .main     { order: 3; flex-grow: 3; flex-basis: 0%; }  /* main content gets 3x the space of each aside */
    .aside2   { order: 4; flex-grow: 1; flex-basis: 0%; }
    .myFooter { order: 5; }
}
```
This is a complete responsive **holy-grail layout** (header, two sidebars, main content, footer) built with pure Flexbox: on small screens everything stacks full-width in source order; on large screens (`min-width: 992px`) it reflows into header → sidebar → main (3x wider) → sidebar → footer, purely via `order` and relative `flex-grow` weights — no media-query-specific widths needed for the middle section.

### Real repo example — a responsive navbar
```css
nav {
    display: flex;
    justify-content: space-between;   /* logo on the left, links on the right, pushed to opposite ends */
}
nav > ul {
    display: flex;
    flex-direction: row;
    list-style-type: none;              /* removes default bullets since ul>li is being used as a nav */
}
@media all and (max-width: 768px) {
    nav { flex-direction: column; }         /* stack logo above links vertically on small screens */
    nav > ul { flex-direction: column; }
    nav > img { display: none; }              /* hide the logo entirely on small screens */
}
```
This is the standard pattern behind almost every responsive navigation bar on the web: a flex row that becomes a flex column below a breakpoint.

---

## 20. CSS Grid

While not present in the repo, **CSS Grid** is essential modern CSS and is Flexbox's two-dimensional counterpart — designed for laying out rows AND columns simultaneously, rather than Flexbox's single-axis-at-a-time model.

```css
.grid-container {
    display: grid;
    grid-template-columns: 200px 1fr 1fr;    /* 3 columns: fixed 200px, then two equal flexible columns */
    grid-template-rows: 100px auto;             /* 2 rows: fixed 100px, then auto-sized */
    gap: 20px;                                     /* spacing between grid cells, both directions */
}
.sidebar {
    grid-column: 1;             /* place this item in column 1 */
    grid-row: 1 / 3;              /* span from row line 1 to row line 3 (i.e. across both rows) */
}
```
- **`fr` unit** — a "fraction" of the remaining available space in the grid container, unique to Grid (`1fr 2fr` splits remaining space 1:2 between two columns).
- **`grid-template-areas`** — a highly readable way to define a layout visually, using named areas:
  ```css
  .container {
      display: grid;
      grid-template-columns: 1fr 3fr 1fr;
      grid-template-areas:
          "header header header"
          "aside1 main   aside2"
          "footer footer footer";
  }
  .myHeader { grid-area: header; }
  .main     { grid-area: main; }
  ```
- **When to use Grid vs. Flexbox**: Grid for overall page/component layout involving both rows and columns together (the exact holy-grail layout the repo built with Flexbox + media queries could also be expressed more directly with Grid + `grid-template-areas`); Flexbox for one-dimensional arrangements — a single row of nav links, a column of stacked cards, distributing space along one axis.

---

## 21. Transforms

`transform` applies visual manipulations (move, rotate, scale, skew) to an element **without affecting the normal document flow** — surrounding elements are unaffected by a transformed element's new visual position/size.

```css
div {
    transform: scale(1.1, 1.1);          /* scaleX, scaleY together — enlarges by 10% */
    /* transform: scaleX(2); */             /* stretch horizontally only */
    /* transform: scaleY(2); */              /* stretch vertically only */
    /* transform: rotate(90deg); */            /* rotate clockwise by the given angle */
    /* transform: translateX(-100px); */        /* shift horizontally */
    /* transform: translateY(-100px); */          /* shift vertically */
    /* transform: skew(25deg); */                  /* slant the element */
    /* transform: translate(100px, 100px); */        /* shift both x and y at once */
    transform: translateY(100px) rotate(45deg);        /* MULTIPLE transforms combined, space-separated, applied in order */
}
```
- **`translate()`** — moves the element from its current position; unlike `top`/`left` with `position`, this doesn't require the element to be positioned at all, and (importantly) `translate()` values don't affect the surrounding layout even when other elements' sizes change.
- **`scale()`** — resizes the element visually (the actual layout space it reserves does NOT change — a scaled-up element can visually overlap its neighbors).
- **`rotate()`** — rotates around the element's center by default (adjustable via `transform-origin`).
- **`skew()`** — slants the element along the X and/or Y axis.
- Multiple transform functions in one declaration are applied **in the order listed, left to right** — order matters (`translateY(100px) rotate(45deg)` produces a visually different result than `rotate(45deg) translateY(100px)`, since rotating first changes what direction "Y" points in for the subsequent translate).

### Repo pattern — perfect centering with transform (works without knowing the element's exact dimensions)
```css
div {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```
Positioning an element's top-left corner at 50%/50% only centers that *corner* — `translate(-50%, -50%)` then shifts the element back by exactly half of **its own** width/height, achieving true visual centering regardless of the element's actual size. This is one of the most useful, widely-applicable CSS centering tricks (an alternative to Flexbox's `justify-content: center; align-items: center;` on the parent, useful when the parent itself shouldn't become a flex container).

- **`transform-origin`** (not in repo) — changes the pivot point transforms are calculated from (default: the element's center, `50% 50%`): `transform-origin: top left;` rotates/scales from the corner instead.

---

## 22. Transitions & Animations

### `transition` — smoothly animates a property change over time
```css
div {
    width: 200px;
    height: 300px;
    background-color: rgb(225, 167, 167);
    transition: 1s;               /* animates ANY property that changes, over 1 second */
}
div:hover {
    transform: translateY(100px) rotate(45deg);   /* the transform above animates smoothly instead of jumping instantly */
}
```
```css
/* Repo example — an underline that grows on hover */
.mylink::before {
    width: 0px;
    transition: 0.2s;    /* the width change on hover below is smoothly animated */
}
.mylink:hover::before {
    width: 100%;
}
```
- **`transition`** shorthand: `transition: property duration timing-function delay;` — e.g. `transition: background-color 0.3s ease-in-out 0s;`. Using just a duration (`transition: 1s;`, as in the repo) applies it to **all** animatable properties that change.
- **Timing functions**: `ease` (default, slow-fast-slow), `linear` (constant speed), `ease-in` (slow start), `ease-out` (slow end), `ease-in-out`, or a custom `cubic-bezier()` curve.
- Transitions require a **trigger** — typically a state change like `:hover`, `:focus`, or a class toggled via JavaScript; they only animate between two known states, not free-running loops.

### `@keyframes` + `animation` — for more complex, multi-step, or looping animations
```css
@keyframes bounce {
    0%   { transform: translateY(0); }
    50%  { transform: translateY(-30px); }
    100% { transform: translateY(0); }
}
.ball {
    animation: bounce 1s ease-in-out infinite;
    /*         name   duration timing   iteration-count */
}
```
- **`@keyframes`** defines named waypoints (`0%`, `50%`, `100%`, or `from`/`to` for just two states) describing how properties should change over the animation's duration.
- **`animation`** shorthand: `animation: name duration timing-function delay iteration-count direction fill-mode;`
  - `iteration-count`: a number, or `infinite` for looping forever.
  - `direction`: `normal` | `reverse` | `alternate` (bounces back and forth each cycle).
  - `fill-mode`: `forwards` keeps the final keyframe's styles applied after the animation ends (otherwise it snaps back to the element's original pre-animation styles).
- **Transition vs. Animation**: use `transition` for simple two-state changes triggered by user interaction (hover, focus, a class toggle); use `@keyframes`/`animation` for automatic, looping, or multi-step sequences that don't need an external trigger.

---

## 23. Practical Patterns from the Repo

Two complete, realistic UI patterns built by combining the fundamentals above — worth studying as complete examples.

### Card image overlay (position + rgba + border-radius)
```css
div {
    width: 300px;
    height: 200px;
    border: 1px solid red;
    position: relative;                                     /* establishes positioning context for the child */
    box-shadow: 1px 1px 5px 2px rgba(239, 51, 51, 0.6);
}
img {
    width: 100%;
    height: 200px;
}
p {
    background-color: rgba(0, 0, 0, 0.6);                    /* semi-transparent dark overlay */
    color: white;
    position: absolute;                                        /* floats over the image, positioned relative to the parent div */
    top: 50px;
    left: 100px;
    padding: 3px;
    text-align: center;
    border-radius: 10px;
}
```
```html
<div>
    <img src="../images/frustrated.jpg" />
    <p>Hello World</p>
</div>
```
This is the fundamental technique behind every "text-over-image" card/hero pattern on the web: a `position: relative` container, a full-size image, and an `position: absolute` overlay element with an `rgba()` semi-transparent background so the image remains partially visible underneath the text.

### Floating label input (a modern form UX pattern)
```css
.inputName {
    position: relative;
}
.inputName > label {
    position: absolute;
    left: 5px;
    top: 5px;
    font-size: 10px;
    color: grey;
    transition: 0.2s;
}
.inputName > input[type="text"]:focus {
    outline: 1px solid blue;
    border: 0;
}
.inputName > input[type="text"]:focus + label {
    top: -3px;
    font-size: 7px;
    color: navy;
    background-color: white;   /* "erases" the input border line behind the shrunk label */
}
```
```html
<div class="inputName">
    <input type="text" id="nm">
    <label>Enter name</label>
</div>
```
This combines several techniques into one polished pattern: `position: relative`/`absolute` for overlaying the label on top of the input, the **adjacent sibling combinator** (`input:focus + label`) to style the label based on the input's state (note: this requires the label to come *after* the input in the HTML — sibling combinators only select forward, never backward), `:focus` pseudo-class, and a `transition` to animate the label smoothly shrinking and moving up when the input is focused — the classic "Material Design" floating-label input effect, achieved with zero JavaScript.

---

## 24. Units in CSS

| Unit | Type | What it's relative to |
|---|---|---|
| `px` | Absolute | A fixed pixel size, does not scale with anything |
| `%` | Relative | The corresponding dimension of the parent element |
| `em` | Relative | The font-size of the element itself (or its parent, for non-font properties) — compounds when nested |
| `rem` | Relative | The font-size of the **root** (`<html>`) element only — does not compound, generally preferred over `em` for predictability |
| `vw` / `vh` | Relative | 1% of the viewport's width / height respectively — `100vw`/`100vh` = the full screen |
| `vmin` / `vmax` | Relative | 1% of the viewport's smaller/larger dimension respectively |
| `fr` | Relative | A fraction of remaining space — Grid-only (Section 20) |

```css
body { background-size: 100vw 100vh; }      /* from the repo — always fills the exact viewport regardless of screen size */
html { font-size: 16px; }                       /* the base — 1rem now equals 16px everywhere in the document */
h1 { font-size: 2rem; }                            /* always 32px, regardless of any parent's font-size */
.card { padding: 1.5em; }                            /* 1.5 × THIS element's own font-size */
```
- **Absolute (`px`) vs. relative units**: relative units (`rem`, `%`, `vw`/`vh`) are strongly preferred for most modern responsive design, since they scale naturally with user font-size preferences (`rem`) and viewport size (`%`, `vw`/`vh`), whereas `px` stays exactly fixed regardless of context — useful for things that genuinely should never scale (like a 1px hairline border), but risky for font sizes and layout.
- **`em` vs `rem`**: `em` is relative to the *current* element's (or, for `font-size` itself, its *parent's*) font-size, which means nested `em` values **compound/multiply** unpredictably; `rem` always refers back to the single root `<html>` font-size, making it far easier to reason about across a whole page.

---

## 25. CSS Variables (Custom Properties)

Not present in the repo, but a core modern CSS feature — reusable, dynamically-changeable values defined once and referenced throughout a stylesheet.

```css
:root {
    --primary-color: navy;
    --spacing-unit: 8px;
}
h1 {
    color: var(--primary-color);
    padding: var(--spacing-unit);
}
.card {
    padding: calc(var(--spacing-unit) * 2);   /* calc() lets you do math with variables/units */
}
```
- **`:root`** — a pseudo-class matching the document's root element (`<html>`), the conventional place to declare global custom properties.
- Unlike Sass/LESS preprocessor variables (which are compiled away before reaching the browser), CSS custom properties are **live in the browser** — they can be read and changed dynamically via JavaScript (`element.style.setProperty('--primary-color', 'red')`), and are commonly used to implement dark/light theme toggles.
- Custom properties **inherit and cascade** just like normal CSS properties — a variable redefined inside a specific selector only affects that scope and its descendants.

---

## 26. Overflow, Visibility & z-index

```css
.box {
    overflow: hidden;      /* visible (default) | hidden (clips content) | scroll (always shows scrollbars) | auto (scrollbars only if needed) */
    visibility: hidden;      /* hides the element but it STILL occupies its layout space (unlike display: none) */
    z-index: 10;                /* controls STACKING ORDER for overlapping positioned elements — higher values render on top */
}
```
- **`overflow`** — controls what happens when content is too large for its container; `overflow-x`/`overflow-y` control each axis independently.
- **`visibility: hidden`** vs **`display: none`** (Section 12) — `hidden` keeps the element's space reserved in the layout (everything else stays exactly where it was); `none` removes it entirely, causing surrounding content to reflow into the freed-up space.
- **`z-index`** — only has an effect on elements with a `position` value other than `static` (relative/absolute/fixed/sticky); when two positioned elements visually overlap, the one with the higher `z-index` renders on top. Elements with no explicit `z-index` stack in source order (later elements on top of earlier ones by default).

---

## 27. Best Practices & Common Pitfalls

- ✅ Prefer external stylesheets over internal/inline CSS for anything beyond a quick one-off demo — reusable, cacheable, and keeps concerns separated.
- ✅ Apply a `box-sizing: border-box;` reset globally — it makes width/height calculations dramatically more predictable.
- ✅ Use classes for reusable styling; reserve IDs for unique elements/JS hooks/anchors, since ID selectors carry high specificity that's harder to override later.
- ✅ Prefer `rem` for font sizes and `%`/`vw`/`vh`/Flexbox/Grid for layout, over hardcoded `px` everywhere — keeps designs responsive and accessible to user font-size preferences.
- ✅ Use `:user-valid`/`:user-invalid` over `:valid`/`:invalid` for form feedback, so validation styling doesn't appear before the user has had a chance to type.
- ✅ Remember `position: relative` on a parent (even with no offset) is what makes `position: absolute` on a child behave predictably, contained within that parent.
- ⚠️ Avoid `!important` except as a last resort — it breaks the normal cascade and makes future style overrides much harder to reason about.
- ⚠️ Remember `margin` can collapse between adjacent block elements' vertical margins — a frequent source of "why is my spacing different than I calculated" bugs.
- ⚠️ `display: none` removes an element from layout entirely (content reflows); `visibility: hidden` keeps its space reserved — pick the one that matches the actual intended effect.
- ⚠️ `z-index` does nothing on `position: static` elements — a common "why isn't z-index working" pitfall.
- ⚠️ Legacy presentational HTML attributes (`bgcolor`, `align`, `<font>` — seen in the companion HTML notes) should always be replaced with actual CSS in modern code.
- 🔧 Use browser DevTools (Elements/Inspector panel) to inspect the live box model, computed styles, and experiment with CSS changes in real time — the single most valuable CSS debugging tool.

---

### How to use this file
- Jump to any section via the [Table of Contents](#table-of-contents).
- Every technique either comes directly from the repo's 28 numbered practice files (`01-internal-inline-css.html` through `28-floating-label.html`) or extends the same topics with official MDN/CSS standards not present in the repo (CSS Grid, CSS Variables, `@keyframes` animations, units in depth) so this file covers CSS end-to-end — from applying a single style rule to building fully responsive, animated, accessible layouts.
