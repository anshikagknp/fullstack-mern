# 📘 Bootstrap — The Complete Notes (Basics → Advanced)

> Compiled from the official Bootstrap documentation (getbootstrap.com/docs/5.3) and cross-referenced with the practice repo (`03-bootstrap`, which used **Bootstrap 4.6.2**). Wherever the repo's syntax differs from current Bootstrap 5.3, both are shown so you understand *why* things changed.

---

## 📑 Table of Contents

1. [Introduction & Setup](#1-introduction--setup)
2. [Bootstrap 4 → 5 Migration Cheatsheet](#2-bootstrap-4--5-migration-cheatsheet)
3. [Containers](#3-containers)
4. [Breakpoints](#4-breakpoints)
5. [The Grid System](#5-the-grid-system)
6. [Typography](#6-typography)
7. [Colors & Theme Colors](#7-colors--theme-colors)
8. [Images](#8-images)
9. [Tables](#9-tables)
10. [Forms](#10-forms)
11. [Buttons & Button Groups](#11-buttons--button-groups)
12. [Badges](#12-badges)
13. [Alerts](#13-alerts)
14. [Cards](#14-cards)
15. [Carousel](#15-carousel)
16. [Collapse](#16-collapse)
17. [Accordion](#17-accordion)
18. [Dropdowns](#18-dropdowns)
19. [List Group](#19-list-group)
20. [Modal](#20-modal)
21. [Navs & Tabs](#21-navs--tabs)
22. [Navbar](#22-navbar)
23. [Offcanvas](#23-offcanvas)
24. [Pagination](#24-pagination)
25. [Placeholders](#25-placeholders)
26. [Popovers & Tooltips](#26-popovers--tooltips)
27. [Progress](#27-progress)
28. [Scrollspy](#28-scrollspy)
29. [Spinners](#29-spinners)
30. [Toasts](#30-toasts)
31. [Close Button](#31-close-button)
32. [Utility Classes (the real power of Bootstrap)](#32-utility-classes)
33. [Utilities API (customizing/generating utilities)](#33-utilities-api)
34. [Bootstrap Icons](#34-bootstrap-icons)
35. [JavaScript: How Components Work](#35-javascript-how-components-work)
36. [Customizing with Sass](#36-customizing-with-sass)
37. [Accessibility & Best Practices](#37-accessibility--best-practices)
38. [Building the Landing Page (repo walkthrough)](#38-building-the-landing-page-repo-walkthrough)
39. [Quick Reference Cheatsheet](#39-quick-reference-cheatsheet)

---

## 1. Introduction & Setup

**What is Bootstrap?**
- A free, open-source **CSS + JavaScript framework** for building responsive, mobile-first websites quickly.
- Originally built at Twitter (2011), now maintained by the open-source community.
- Provides a **grid system**, pre-styled **components** (buttons, cards, navbars, modals...), and hundreds of **utility classes** so you write less custom CSS.
- Current stable line used in these notes: **Bootstrap 5.3.x**. Bootstrap 5 dropped jQuery as a dependency (BS4 needed it) and dropped official IE support.

### Ways to install/include Bootstrap

**1. CDN (fastest, what the repo uses — just update the version/URLs to v5.3):**
```html
<!-- CSS in <head> -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
      integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">

<!-- JS bundle (includes Popper) right before </body> -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
```
> ⚠️ **Repo note:** the `01-14` HTML files link Bootstrap **4.6.2** and also load `jquery.slim.min.js`. In Bootstrap 5 you **do not need jQuery at all** — remove that script tag. Bootstrap 5's `bootstrap.bundle.min.js` already contains **Popper.js** (needed for tooltips, popovers, dropdowns).

**2. npm/package manager:**
```bash
npm install bootstrap@latest
```
```js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
```

**3. Download the source** — gives you compiled `css/`, `js/`, and the raw `scss/` + `js/` source for customization.

### Minimum starter template
```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <h1>Hello, Bootstrap!</h1>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```
- **Responsive meta tag** (`width=device-width, initial-scale=1`) is *mandatory* — Bootstrap is mobile-first, so without it, mobile scaling breaks.
- HTML5 `<!doctype html>` is required — without it you get inconsistent styling.
- Bootstrap uses **Reboot** internally — a modern, opinionated CSS reset (like Normalize.css) applied automatically when you include Bootstrap's CSS. You don't add it separately.

---

## 2. Bootstrap 4 → 5 Migration Cheatsheet

The uploaded repo was written in **Bootstrap 4** syntax. Since you're learning from the **v5.3** docs, here's exactly what changed — this table alone will save you hours of confusion:

| Bootstrap 4 (repo) | Bootstrap 5.3 | Notes |
|---|---|---|
| `data-toggle="collapse"` | `data-bs-toggle="collapse"` | ALL `data-*` JS attributes now prefixed `data-bs-*` to avoid clashes with other libraries |
| `data-target="#id"` | `data-bs-target="#id"` | |
| `data-dismiss="modal"` | `data-bs-dismiss="modal"` | |
| `data-parent="#accordion"` | `data-bs-parent="#accordion"` | |
| `data-ride="carousel"` | `data-bs-ride="carousel"` | |
| `data-slide="prev"/"next"` | `data-bs-slide="prev"/"next"` | |
| `data-slide-to="0"` | `data-bs-slide-to="0"` | |
| jQuery **required** | jQuery **removed** — pure vanilla JS | Delete jQuery `<script>` tags |
| `.badge-pill`, `.badge-info` | `.rounded-pill` + `.text-bg-info` | Badge color classes changed |
| `.btn-block` | Use grid/flex utilities: `d-grid` on the wrapper, `w-100` on the button | `.btn-block` was removed entirely |
| `.close` (for dismiss ×) | `.btn-close` | Also no longer needs `&times;` inside — it's a background-image `<button>` now |
| `.form-group` | Removed — use spacing utilities like `.mb-3` on each field | |
| `.form-row` | Use `.row` with gutter utilities (`.g-2`, etc.) | |
| `.custom-control`, `.custom-checkbox` | `.form-check`, `.form-check-input` | Forms were completely redesigned |
| `.custom-select` | `.form-select` | |
| `.sr-only` | `.visually-hidden` | |
| `.text-left/.text-right` | `.text-start/.text-end` | RTL-friendly renaming |
| `.float-left/.float-right` | `.float-start/.float-end` | |
| `.ml-*/.mr-*` (margin) | `.ms-*/.me-*` (margin-start/end) | |
| `.pl-*/.pr-*` (padding) | `.ps-*/.pe-*` | |
| `.card-content` wrapper needed | **Not a real BS4/5 class** — the repo's `.card-content` div does nothing; card children (`.card-header`, `.card-body`, `.card-footer`, `.card-img-top`) go **directly** inside `.card` | See [Cards](#14-cards) |
| Gutters: none/manual | `.g-0`–`.g-5`, `.gx-*`, `.gy-*` classes | New standardized gutter utility system |
| No default form-select arrow control | `.form-select` | |
| Jumbotron component | **Removed** — recreate with utilities (`p-5`, `bg-light`, `rounded`) | |

> Rule of thumb: **any `data-xxx` attribute that drives Bootstrap JavaScript now needs a `bs-` prefix in v5.**

---

## 3. Containers

Containers are the basic layout wrapper in Bootstrap — they center your content horizontally and add responsive `padding-left`/`padding-right`.

| Class | Behavior |
|---|---|
| `.container` | Fixed, responsive max-width at each breakpoint (e.g., 540px on `sm`, 720px on `md`, 960px on `lg`...) |
| `.container-fluid` | Always `width: 100%` at every breakpoint — full browser width |
| `.container-{breakpoint}` (e.g. `.container-md`) | `100%` wide *until* that breakpoint, then fixed-width like `.container` from there up |

```html
<div class="container">I'm centered with max-width per breakpoint</div>
<div class="container-fluid">I'm always 100% wide</div>
<div class="container-md">100% wide until md, then fixed</div>
```
- Repo example (`03-containers-buttons.html`) used `.container` and `.container-fluid` with `bg-info`/`bg-warning` — same behavior in v5, just verify the CDN version.
- Containers are **required** as the outermost wrapper before you start a `.row`/`.col` grid.

---

## 4. Breakpoints

Bootstrap's grid and responsive utilities are all built around 6 breakpoints (mobile-first — styles apply from that width **and up**, unless it's an "only" style):

| Breakpoint | Abbreviation | Min width | Typical device |
|---|---|---|---|
| Extra small | *(none — default)* | `<576px` | Portrait phones |
| Small | `sm` | `≥576px` | Landscape phones |
| Medium | `md` | `≥768px` | Tablets |
| Large | `lg` | `≥992px` | Desktops |
| Extra large | `xl` | `≥1200px` | Large desktops |
| Extra extra large | `xxl` | `≥1400px` | Very large screens |

- Classes follow the pattern `{property}-{breakpoint}-{value}`, e.g. `col-md-6`, `d-lg-flex`, `text-sm-center`.
- No breakpoint abbreviation = applies to **all sizes** (mobile-first base).
- You can check current breakpoint visually while developing using `.d-*-none` utility combos, or Bootstrap's hidden `<div class="d-block d-sm-none">XS</div>` trick.

---

## 5. The Grid System

Bootstrap's grid uses **Flexbox** and is based on a **12-column** layout split into `.container` → `.row` → `.col`.

### Core rules
1. Rows (`.row`) must be inside a `.container` (or `.container-fluid`).
2. Columns (`.col-*`) must be inside a `.row`.
3. Content goes inside columns — never put content directly in a `.row`.
4. Columns have built-in horizontal `padding` (a "gutter") to create spacing between them; `.row` has negative margin to offset the first/last column's padding.

### Equal-width columns
```html
<div class="container">
  <div class="row">
    <div class="col">Col 1</div>
    <div class="col">Col 2</div>
    <div class="col">Col 3</div>
  </div>
</div>
```
This matches `11-grid-basics.html` in the repo — 12 `.col` divs auto-distribute; since Bootstrap only truly guarantees widths up to 12 columns per row by default behavior, extra `.col`s beyond 12 simply wrap onto a **new line** (flexbox `flex-wrap`), still evenly distributing among themselves.

### Fixed-width (numbered) columns — 12-column math
```html
<div class="row">
  <div class="col-4">4 of 12 → 33.33%</div>
  <div class="col-4">4 of 12</div>
  <div class="col-4">4 of 12</div>
</div>
```

### Responsive columns (mobile-first stacking)
```html
<div class="row">
  <div class="col-lg-3 col-md-4 col-sm-6">Col 1</div>
  <div class="col-lg-3 col-md-4 col-sm-6">Col 2</div>
  <div class="col-lg-3 col-md-4 col-sm-6">Col 3</div>
  <div class="col-lg-3 col-md-4 col-sm-6">Col 4</div>
</div>
```
This is exactly the pattern in `12-grid-with-cards.html` and `14-landing-page.html`:
- On **large screens (`lg`)**: each column takes `3/12` → 4 cards per row.
- On **medium (`md`)**: `4/12` → 3 cards per row.
- On **small (`sm`)**: `6/12` → 2 cards per row.
- Below `sm` (no class given): columns default to `col-12` behavior... actually **without** an explicit `col-` base class, add `col-12` explicitly if you want guaranteed full-width stacking on extra-small screens.

### Auto-layout + one fixed column
```html
<div class="row">
  <div class="col">Auto</div>
  <div class="col-6">Fixed at 6</div>
  <div class="col">Auto</div>
</div>
```
The two `.col` (auto) columns split the *remaining* space equally.

### Offsetting columns
```html
<div class="row">
  <div class="col-md-4">Col</div>
  <div class="col-md-4 offset-md-4">Pushed right by 4 columns</div>
</div>
```

### Reordering columns
```html
<div class="row">
  <div class="col order-2">First in HTML, shows 2nd</div>
  <div class="col order-1">Second in HTML, shows 1st</div>
</div>
<!-- or push to extremes -->
<div class="col order-first">Always first</div>
<div class="col order-last">Always last</div>
```

### Nesting
```html
<div class="row">
  <div class="col-md-8">
    <div class="row">
      <div class="col-6">Nested col 1</div>
      <div class="col-6">Nested col 2</div>
    </div>
  </div>
  <div class="col-md-4">Sidebar</div>
</div>
```

### Gutters (spacing between columns)
| Class | Meaning |
|---|---|
| `.g-0` … `.g-5` | Gutter (both x and y) size, 0 = none, 5 = largest |
| `.gx-*` | Horizontal gutter only |
| `.gy-*` | Vertical gutter only |

```html
<div class="row g-4">
  <div class="col-6">Spaced</div>
  <div class="col-6">Spaced</div>
</div>
```

### Row columns (equal split shorthand)
```html
<div class="row row-cols-2 row-cols-md-4">
  <div class="col">1</div>
  <div class="col">2</div>
  <div class="col">3</div>
  <div class="col">4</div>
</div>
```
Instead of setting a `col-*` class on every child, `.row-cols-*` on the **row** tells all children to auto-split into that many columns — great for card grids.

### Vertical/Horizontal alignment inside the grid
```html
<div class="row align-items-center">...</div>   <!-- vertical align all cols -->
<div class="row justify-content-between">...</div> <!-- horizontal distribution -->
<div class="col align-self-end">...</div>        <!-- align one column -->
```

---

## 6. Typography

| Class / Element | Purpose |
|---|---|
| `h1`–`h6` or `.h1`–`.h6` | Headings (use `.h1` class on a non-`<h1>` tag to *look* like a heading without changing semantics) |
| `.display-1` … `.display-6` | Extra-large "hero" headings, bigger and lighter-weight than `h1` |
| `.lead` | Makes a paragraph stand out (larger font, lighter weight) |
| `<small>` / `.small` | De-emphasized, smaller inline/body text |
| `<mark>` / `.mark` | Highlighted text (yellow background) |
| `.text-muted` | Greyed-out, de-emphasized text |
| `.text-decoration-underline / .text-decoration-line-through` | Underline / strikethrough |
| `.text-uppercase / .text-lowercase / .text-capitalize` | Text transforms |
| `.fw-bold / .fw-semibold / .fw-normal / .fw-light` | Font weight |
| `.fst-italic / .fst-normal` | Font style |
| `.list-unstyled` | Removes bullets/padding from a `<ul>`/`<ol>` |
| `.list-inline` + `.list-inline-item` | Puts list items in one horizontal line |
| `<blockquote class="blockquote">` | Styled quotation block, pair with `.blockquote-footer` for a citation |

```html
<h1 class="display-4">Hero Heading</h1>
<p class="lead">A larger intro paragraph.</p>
<p>Regular text with <small class="text-muted">fine print</small>.</p>
<blockquote class="blockquote">
  <p>A well-known quote.</p>
  <footer class="blockquote-footer">Someone famous</footer>
</blockquote>
```

---

## 7. Colors & Theme Colors

Bootstrap ships with **theme colors** used everywhere (buttons, alerts, backgrounds, text, badges):

`primary` · `secondary` · `success` · `danger` · `warning` · `info` · `light` · `dark`

### Text vs Background
```html
<h1 class="text-primary">Text color</h1>
<h1 class="bg-primary text-white">Background color</h1>
```
> ⚠️ In `01-text-bg-colors.html`, the repo uses `.bg-muted` — **this class doesn't exist**; the correct one is `.text-muted` (for text) — Bootstrap has no `bg-muted` background utility by default.

### v5.3's new combined utility: `.text-bg-*`
Bootstrap 5.3 added a single class that sets **both** an appropriate background AND readable text color together:
```html
<div class="p-3 text-bg-primary">Background + auto-contrasted text</div>
<span class="badge text-bg-info">5</span>
```
This is the modern replacement for manually pairing `bg-info text-white` or the old `.badge-info`.

### Subtle colors (v5.3+)
```html
<div class="bg-primary-subtle text-primary-emphasis border border-primary-subtle rounded p-3">
  Softer, muted variant of the theme color
</div>
```

### Color modes (Dark Mode) — new in v5.3
```html
<html data-bs-theme="dark">
```
Set `data-bs-theme="dark"` on the `<html>`, `<body>`, or any container to switch Bootstrap's color-mode-aware CSS variables to dark styling automatically.

---

## 8. Images

| Class | Purpose |
|---|---|
| `.img-fluid` | `max-width: 100%; height: auto;` — makes images responsive |
| `.img-thumbnail` | Adds a rounded border + padding, like a polaroid frame |
| `.rounded` / `.rounded-circle` | Rounded corners / perfect circle (for avatars) |
| `.float-start` / `.float-end` | Floats an image left/right with text wrap |

```html
<img src="pic.jpg" class="img-fluid rounded" alt="Description">
<img src="avatar.jpg" class="rounded-circle" alt="Avatar" style="width:80px;">
```
The repo's `14-landing-page.html` uses `.img-thumbnail` correctly — that class is unchanged between BS4 and BS5.

**Figures:**
```html
<figure class="figure">
  <img src="pic.jpg" class="figure-img img-fluid rounded" alt="...">
  <figcaption class="figure-caption">A caption for the image.</figcaption>
</figure>
```

---

## 9. Tables

```html
<table class="table table-striped table-hover table-bordered">
  <thead class="table-dark">
    <tr><th>#</th><th>Name</th><th>Email</th></tr>
  </thead>
  <tbody>
    <tr><td>1</td><td>Mark</td><td>mark@example.com</td></tr>
  </tbody>
</table>
```

| Class | Effect |
|---|---|
| `.table` | Base styling |
| `.table-striped` | Zebra-striped rows |
| `.table-bordered` | Borders on all sides |
| `.table-borderless` | No borders |
| `.table-hover` | Highlight row on hover |
| `.table-sm` | Compact padding |
| `.table-{color}` (`primary`, `success`...) | Contextual row/table color |
| `.table-responsive` (wrap the `<table>`) | Adds horizontal scroll on small screens |

```html
<div class="table-responsive">
  <table class="table">...</table>
</div>
```

---

## 10. Forms

Forms were **completely redesigned** in Bootstrap 5 — this is the area most different from the BS4 repo.

### Text inputs
```html
<div class="mb-3">
  <label for="email" class="form-label">Email address</label>
  <input type="email" class="form-control" id="email" placeholder="name@example.com">
  <div class="form-text">We'll never share your email.</div>
</div>
```
- `.form-control` styles inputs, textareas, and `<select>` (though `<select>` now prefers `.form-select`).
- `.form-control-lg` / `.form-control-sm` change size.
- `.form-label` for the `<label>`.
- `.form-text` for helper/hint text below a field.
- ⚠️ `.form-group` (used to wrap label+input in BS4) is **gone** — just use spacing utilities (`.mb-3`) directly on the wrapping `<div>`.

### Select
```html
<select class="form-select">
  <option selected>Choose...</option>
  <option value="1">One</option>
</select>
```

### Checkboxes & Radios
```html
<div class="form-check">
  <input class="form-check-input" type="checkbox" id="chk1">
  <label class="form-check-label" for="chk1">Check me</label>
</div>

<div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" role="switch" id="switch1">
  <label class="form-check-label" for="switch1">Toggle switch</label>
</div>

<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="opt" id="r1" checked>
  <label class="form-check-label" for="r1">Option 1</label>
</div>
```

### Range
```html
<input type="range" class="form-range" min="0" max="100">
```

### Input groups (prepend/append icons, text, buttons)
```html
<div class="input-group mb-3">
  <span class="input-group-text">@</span>
  <input type="text" class="form-control" placeholder="Username">
</div>
<div class="input-group">
  <input type="text" class="form-control">
  <button class="btn btn-outline-secondary">Search</button>
</div>
```

### Floating labels
```html
<div class="form-floating mb-3">
  <input type="email" class="form-control" id="fEmail" placeholder="name@example.com">
  <label for="fEmail">Email address</label>
</div>
```

### Form layout (grid-based)
```html
<form class="row g-3">
  <div class="col-md-6">
    <label class="form-label">First name</label>
    <input class="form-control">
  </div>
  <div class="col-md-6">
    <label class="form-label">Last name</label>
    <input class="form-control">
  </div>
  <div class="col-12">
    <button class="btn btn-primary" type="submit">Submit</button>
  </div>
</form>
```

### Validation states
```html
<input class="form-control is-invalid">
<div class="invalid-feedback">Please provide a valid value.</div>

<input class="form-control is-valid">
<div class="valid-feedback">Looks good!</div>
```
Or use Bootstrap's automatic Bootstrap+browser validation via the `.was-validated` class added to `<form>` by JS after a submit attempt (paired with native HTML5 `required`, `pattern`, etc.).

### Disabled / readonly
```html
<input class="form-control" disabled>
<input class="form-control" readonly>
<fieldset disabled>...</fieldset>
```

---

## 11. Buttons & Button Groups

### Base + contextual buttons
```html
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-success">Success</button>
<button class="btn btn-danger">Danger</button>
<button class="btn btn-warning">Warning</button>
<button class="btn btn-info">Info</button>
<button class="btn btn-light">Light</button>
<button class="btn btn-dark">Dark</button>
<button class="btn btn-link">Link</button>
```

### Outline variants
```html
<button class="btn btn-outline-primary">Outline</button>
```

### Sizes
```html
<button class="btn btn-primary btn-lg">Large</button>
<button class="btn btn-primary btn-sm">Small</button>
```

### Full-width button (replaces removed `.btn-block`)
```html
<div class="d-grid">
  <button class="btn btn-danger">Full width</button>
</div>
<!-- or simply -->
<button class="btn btn-danger w-100">Full width</button>
```
> The repo's `<button class="btn btn-danger btn-block">` (BS4) becomes the `.d-grid` wrapper pattern above in BS5 — `.btn-block` no longer exists.

### States
```html
<button class="btn btn-primary" disabled>Disabled</button>
<button class="btn btn-primary active" aria-pressed="true">Active</button>
```

### Button groups & toolbars
```html
<div class="btn-group" role="group" aria-label="Basic group">
  <button class="btn btn-secondary">Left</button>
  <button class="btn btn-secondary">Middle</button>
  <button class="btn btn-secondary">Right</button>
</div>

<div class="btn-group-vertical">...</div>

<div class="btn-toolbar" role="toolbar">
  <div class="btn-group me-2">...</div>
  <div class="btn-group">...</div>
</div>
```

### Toggle (checkbox/radio) buttons
```html
<input type="checkbox" class="btn-check" id="btncheck1" autocomplete="off">
<label class="btn btn-outline-primary" for="btncheck1">Toggle</label>
```

### Close button (used in alerts, modals, offcanvas, toasts)
```html
<button type="button" class="btn-close" aria-label="Close"></button>
```
> Replaces the repo's `<button class="close" data-dismiss="alert">&times;</button>` (BS4). In BS5: class is `.btn-close`, attribute is `data-bs-dismiss`, and you **remove** the `&times;` text — the × is a CSS background image.

---

## 12. Badges

```html
<h5>Notifications <span class="badge text-bg-primary">4</span></h5>

<span class="badge text-bg-info rounded-pill">New</span>

<button class="btn btn-primary position-relative">
  Inbox
  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill text-bg-danger">
    9+ <span class="visually-hidden">unread messages</span>
  </span>
</button>
```
> Repo's `<span class="badge badge-info badge-pill">5</span>` (BS4) → in BS5 becomes `<span class="badge text-bg-info rounded-pill">5</span>`.

---

## 13. Alerts

```html
<div class="alert alert-info" role="alert">
  A simple info alert.
</div>

<div class="alert alert-danger alert-dismissible fade show" role="alert">
  Something went wrong.
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>

<div class="alert alert-success" role="alert">
  Check it out — <a href="#" class="alert-link">this styled link</a>!
</div>
```
| Piece | Purpose |
|---|---|
| `.alert alert-{color}` | Base + contextual color |
| `.alert-dismissible` | Adds room for a close (×) button and enables auto-fade-out dismiss |
| `.fade .show` | Enables the CSS fade transition (must have both to be visible+animatable) |
| `.alert-link` | Correctly colors links inside an alert to match |

> Repo's `02-alerts.html` uses `class="close" data-dismiss="alert"` with literal `&times;` — update to `class="btn-close" data-bs-dismiss="alert"` with no inner text in BS5.

---

## 14. Cards

The **Card** is one of Bootstrap's most flexible components — a bordered content box.

```html
<div class="card" style="width: 18rem;">
  <img src="pic.jpg" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <h6 class="card-subtitle mb-2 text-muted">Subtitle</h6>
    <p class="card-text">Some quick example text.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>

<div class="card">
  <div class="card-header">Featured</div>
  <div class="card-body">
    <p class="card-text">Body content</p>
  </div>
  <div class="card-footer text-muted">2 days ago</div>
</div>
```

**Key structural rule:** `.card-header`, `.card-img-top`, `.card-body`, `.card-footer` sit **directly** inside `.card` — there is no wrapper needed.
> ⚠️ The repo wraps everything in an extra `<div class="card-content">` — that class **does not exist** in Bootstrap 4 or 5 and has no effect; it can safely be removed (or is just a leftover custom/Emmet-generated div).

**Card grids** (what `12-grid-with-cards.html` and `14-landing-page.html` do): put multiple `.col-*` > `.card` combos inside a `.row`, or use the dedicated grid helpers:
```html
<div class="row row-cols-1 row-cols-md-3 g-4">
  <div class="col"><div class="card">...</div></div>
  <div class="col"><div class="card">...</div></div>
  <div class="col"><div class="card">...</div></div>
</div>
```
Other useful card classes: `.card-img-overlay` (text over a full-bleed image), `.card-group` (equal-height connected cards, no gutters), `.text-bg-primary` on `.card` for a colored card.

---

## 15. Carousel

```html
<div id="myCarousel" class="carousel slide" data-bs-ride="carousel">

  <div class="carousel-indicators">
    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="active" aria-current="true"></button>
    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1"></button>
  </div>

  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="car1.jpeg" class="d-block w-100" alt="...">
      <div class="carousel-caption d-none d-md-block">
        <h5>Hello World</h5>
      </div>
    </div>
    <div class="carousel-item">
      <img src="car2.jpeg" class="d-block w-100" alt="...">
    </div>
  </div>

  <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
```

| Attribute/Class | Purpose |
|---|---|
| `.carousel.slide` | Base + enables slide (crossfade) transition instead of instant "hard" swap |
| `data-bs-ride="carousel"` | Autoplay on page load |
| `data-bs-interval="2000"` | ms between auto-slides (per-`.carousel` or even per-`.carousel-item` override) |
| `data-bs-pause="hover"/"false"` | Whether hover pauses autoplay |
| `.carousel-indicators` | Row of dot/line buttons to jump to a slide |
| `.carousel-caption` | Overlay text on a slide |
| `.carousel-fade` | Crossfade instead of slide-left/right |
| `.carousel-dark` | Dark-colored controls/indicators for light backgrounds |

> Repo differences: `data-ride`→`data-bs-ride`, `data-slide`→`data-bs-slide`, `data-slide-to`→`data-bs-slide-to`, `data-target`→`data-bs-target`. Also v5's indicators are `<button>` elements, not `<li>`.

---

## 16. Collapse

```html
<button class="btn btn-danger" type="button" data-bs-toggle="collapse" data-bs-target="#myDiv" aria-expanded="false" aria-controls="myDiv">
  Toggle
</button>
<div class="collapse" id="myDiv">
  <div class="card card-body">Collapsible content</div>
</div>
```
- `.collapse` = hidden by default; add `.show` to start expanded.
- `.collapse.collapsing` class is added automatically mid-animation by the JS.
- `data-bs-toggle="collapse"` + `data-bs-target="#id"` (or `href="#id"` on an `<a>`) wires up the toggle — **no custom JS needed**.
- Can also target **multiple** elements with a space-separated selector or multiple triggers pointing to the same target.

---

## 17. Accordion

An accordion is a group of collapses where opening one (optionally) closes the others.

```html
<div class="accordion" id="myAcc">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1">
        Section 1
      </button>
    </h2>
    <div id="collapse1" class="accordion-collapse collapse show" data-bs-parent="#myAcc">
      <div class="accordion-body">Content for section 1.</div>
    </div>
  </div>

  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse2">
        Section 2
      </button>
    </h2>
    <div id="collapse2" class="accordion-collapse collapse" data-bs-parent="#myAcc">
      <div class="accordion-body">Content for section 2.</div>
    </div>
  </div>
</div>
```
- `data-bs-parent="#myAcc"` is what makes it a true "accordion" (only one section open at a time). Omit it to allow multiple sections open simultaneously.
- Bootstrap 5 introduced a **dedicated markup structure** (`.accordion-item`, `.accordion-header`, `.accordion-button`) — the repo's `06-collapse.html`/`07-accordion.html` manually build accordions from plain buttons + `.collapse` divs (the BS4 way), which still *works* in BS5 functionally but won't get the styled arrow-icon chevron that `.accordion-button` provides.

---

## 18. Dropdowns

```html
<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Dropdown
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Action</a></li>
    <li><a class="dropdown-item" href="#">Another action</a></li>
    <li><hr class="dropdown-divider"></li>
    <li><a class="dropdown-item disabled">Disabled</a></li>
  </ul>
</div>
```
- Requires Popper.js for positioning (included automatically in `bootstrap.bundle.min.js`).
- Variants: `.dropdown-menu-end` (right-align), `.dropstart`/`.dropend`/`.dropup` on the wrapper (direction), `.dropdown-header`, `.dropdown-item-text`.
- Not present in the repo at all — genuinely new topic to learn.

---

## 19. List Group

```html
<ul class="list-group">
  <li class="list-group-item active" aria-current="true">Active item</li>
  <li class="list-group-item">Second item</li>
  <li class="list-group-item disabled">Disabled item</li>
</ul>

<div class="list-group">
  <a href="#" class="list-group-item list-group-item-action">Clickable link item</a>
</div>
```
- `.list-group-flush` removes outer borders/rounding (good inside a card).
- `.list-group-horizontal` (and `-{breakpoint}` variants) lay items out in a row.
- Contextual coloring: `.list-group-item-success`, `-danger`, etc.
- Can include badges: `<li class="list-group-item d-flex justify-content-between">Item <span class="badge text-bg-primary rounded-pill">3</span></li>`.

---

## 20. Modal

```html
<button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">Open Modal</button>

<div class="modal fade" id="myModal" tabindex="-1" data-bs-backdrop="static" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>Modal body text goes here.</p>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
```
| Feature | Class/Attr |
|---|---|
| Fade transition | `.modal.fade` |
| Centered vertically | `.modal-dialog-centered` |
| Scrollable long content | `.modal-dialog-scrollable` |
| Size | `.modal-sm`, `.modal-lg`, `.modal-xl` on `.modal-dialog` |
| Prevent closing on outside click | `data-bs-backdrop="static"` |
| Fullscreen | `.modal-fullscreen` |

> ⚠️ Repo bug worth knowing: `09-modal.html` misspells the wrapper classes as `.model-content`, `.model-header`, `.model-body`, `.model-footer` — the **correct** Bootstrap class is `.modal-...` (with an "a"), not `.model-...`. This typo would silently break all modal styling in a real project. Also update `data-toggle`/`data-target`/`data-dismiss` → `data-bs-*`.

---

## 21. Navs & Tabs

```html
<!-- Simple horizontal nav -->
<ul class="nav">
  <li class="nav-item"><a class="nav-link active" href="#">Home</a></li>
  <li class="nav-item"><a class="nav-link" href="#">Link</a></li>
  <li class="nav-item"><a class="nav-link disabled">Disabled</a></li>
</ul>

<!-- Pills -->
<ul class="nav nav-pills">...</ul>

<!-- Tabs (functional, JS-driven) -->
<ul class="nav nav-tabs" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#home" type="button">Home</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" data-bs-toggle="tab" data-bs-target="#profile" type="button">Profile</button>
  </li>
</ul>
<div class="tab-content">
  <div class="tab-pane fade show active" id="home">Home content</div>
  <div class="tab-pane fade" id="profile">Profile content</div>
</div>
```
- `.nav-fill` / `.nav-justified` make nav items equal-width.
- `.flex-column` on `.nav` makes it vertical.

---

## 22. Navbar

```html
<nav class="navbar navbar-expand-lg bg-light" data-bs-theme="light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Brand</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navContent"
            aria-controls="navContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item"><a class="nav-link active" href="#">Home</a></li>
        <li class="nav-item"><a class="nav-link" href="#">Link</a></li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#">More</a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action</a></li>
          </ul>
        </li>
      </ul>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
```
| Class | Purpose |
|---|---|
| `.navbar` | Base component |
| `.navbar-expand-{breakpoint}` | Collapses to hamburger below that breakpoint, expands to full horizontal nav at/above it |
| `.navbar-brand` | Logo/site name |
| `.navbar-toggler` + `.navbar-toggler-icon` | The hamburger button |
| `.navbar-nav` | The `<ul>` of links |
| `.navbar-collapse` | Wraps the collapsible content (paired with `.collapse`) |
| `.bg-light` / `.bg-dark` + `data-bs-theme="dark"` | Background + auto text contrast (v5.3 replaces old `.navbar-light`/`.navbar-dark`) |
| `.fixed-top` / `.fixed-bottom` / `.sticky-top` | Positioning behavior |

> Repo's `13-navbar.html`/`14-landing-page.html` use `navbar-light` (a real BS4/5 class, still works) but are missing `container`/`container-fluid` *inside* the `<nav>` (best practice) and use `data-toggle` instead of `data-bs-toggle`. Also `bg-dark` used as a bare attribute (`<button ... bg-dark>`) is invalid — it must be a `class`, not an attribute.

---

## 23. Offcanvas

A slide-in sidebar panel — **new component family, not in the repo at all**.
```html
<button class="btn btn-primary" data-bs-toggle="offcanvas" data-bs-target="#myOffcanvas">Open</button>

<div class="offcanvas offcanvas-start" tabindex="-1" id="myOffcanvas">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title">Menu</h5>
    <button class="btn-close" data-bs-dismiss="offcanvas"></button>
  </div>
  <div class="offcanvas-body">
    Sidebar content, filters, mobile nav, etc.
  </div>
</div>
```
`.offcanvas-start/-end/-top/-bottom` control which edge it slides from.

---

## 24. Pagination

```html
<nav aria-label="Page navigation">
  <ul class="pagination">
    <li class="page-item disabled"><a class="page-link">Previous</a></li>
    <li class="page-item active"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">Next</a></li>
  </ul>
</nav>
```
Sizes: `.pagination-lg`, `.pagination-sm`. Alignment: `.justify-content-center/-end` on `.pagination`.

---

## 25. Placeholders

Skeleton-loading UI (new in Bootstrap 5.2+):
```html
<p class="placeholder-glow">
  <span class="placeholder col-6"></span>
  <span class="placeholder col-4"></span>
</p>
<button class="btn btn-primary disabled placeholder col-4"></button>
```
`.placeholder-glow` (pulsing fade) or `.placeholder-wave` (shimmer sweep) as an animation.

---

## 26. Popovers & Tooltips

Both **require manual JavaScript initialization** — they don't auto-activate like collapse/modal (for performance reasons).

```html
<button type="button" class="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="top" title="Tooltip text">
  Hover me
</button>

<button type="button" class="btn btn-secondary" data-bs-toggle="popover" data-bs-title="Popover title" data-bs-content="Popover body content">
  Click me
</button>
```
```js
// Required activation script
const tooltipList = [...document.querySelectorAll('[data-bs-toggle="tooltip"]')]
  .map(el => new bootstrap.Tooltip(el));

const popoverList = [...document.querySelectorAll('[data-bs-toggle="popover"]')]
  .map(el => new bootstrap.Popover(el));
```
`data-bs-placement`: `top`, `bottom`, `left`, `right`. Not used anywhere in the repo — worth practicing since it teaches the manual-JS-init pattern used by several components.

---

## 27. Progress

```html
<div class="progress" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-bar" style="width: 50%"></div>
</div>

<div class="progress">
  <div class="progress-bar bg-success progress-bar-striped progress-bar-animated" style="width: 80%"></div>
</div>

<!-- Multiple bars stacked in one track -->
<div class="progress">
  <div class="progress-bar bg-success" style="width:35%"></div>
  <div class="progress-bar bg-warning" style="width:20%"></div>
</div>
```
- `.progress-bar-striped` = diagonal stripes; add `.progress-bar-animated` to make the stripes move.
- Matches repo's `05-progress-bar.html` almost exactly — but in v5, add `role="progressbar"` + `aria-*` attributes to the outer `.progress` for accessibility (v5.3 moved ARIA attrs from `.progress-bar` to `.progress` itself).

---

## 28. Scrollspy

Automatically highlights nav links based on scroll position.
```html
<body data-bs-spy="scroll" data-bs-target="#navbar-example" data-bs-offset="0" tabindex="0">
  <nav id="navbar-example" class="navbar">
    <a class="nav-link" href="#section1">Section 1</a>
    <a class="nav-link" href="#section2">Section 2</a>
  </nav>
  <div id="section1">...</div>
  <div id="section2">...</div>
</body>
```
Great for one-page portfolio/landing sites — could enhance `14-landing-page.html`.

---

## 29. Spinners

```html
<span class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></span>
<span class="spinner-border text-info"></span>
<span class="spinner-border spinner-border-sm"></span>

<span class="spinner-grow text-danger"></span>
```
| Class | Purpose |
|---|---|
| `.spinner-border` | Ring spinner |
| `.spinner-grow` | Pulsing dot spinner |
| `.spinner-*-sm` | Small size |
| `text-{color}` | Spinner color |

> Repo's `04-spinners.html` has two bugs: (1) unclosed `<span class="spinner-grow ...">` tags (missing `>` before `</span>` — written as `<span class="spinner-grow text-info-subtle"</span>`, malformed HTML); (2) always add `role="status"` and a visually-hidden "Loading..." label for screen-reader accessibility.

---

## 30. Toasts

Lightweight, auto-dismissing notification popups — **not in the repo, worth learning**.
```html
<div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
  <div class="toast-header">
    <strong class="me-auto">Bootstrap</strong>
    <small>11 mins ago</small>
    <button class="btn-close" data-bs-dismiss="toast"></button>
  </div>
  <div class="toast-body">Hello, world! This is a toast message.</div>
</div>
```
```js
const toastEl = document.querySelector('.toast');
new bootstrap.Toast(toastEl).show();
```
Wrap multiple toasts in a `.toast-container` (with positioning utilities like `.position-fixed .top-0 .end-0`) to stack notifications.

---

## 31. Close Button

Standalone documentation for the `×` dismiss button used across alerts/modals/toasts/offcanvas:
```html
<button type="button" class="btn-close" aria-label="Close"></button>
<button type="button" class="btn-close btn-close-white" aria-label="Close"></button> <!-- for dark backgrounds -->
```

---

## 32. Utility Classes

This is where Bootstrap saves the most hand-written CSS. Utilities follow the pattern `{property}-{breakpoint?}-{value}`.

### Spacing (margin `m`, padding `p`)
```
m|p{side}-{breakpoint}-{size}
```
- **Side:** `t` (top), `b` (bottom), `s` (start/left), `e` (end/right), `x` (left+right), `y` (top+bottom), *(blank = all sides)*
- **Size:** `0`–`5` (scaled steps) or `auto` (margin only)
```html
<div class="mt-3 mb-5 px-2 mx-auto">...</div>
```

### Display
```html
<div class="d-none d-md-block">Hidden on mobile, block from md up</div>
<div class="d-flex d-md-inline-flex">...</div>
```
Values: `none`, `inline`, `inline-block`, `block`, `grid`, `flex`, `inline-flex`, `table`, etc.

### Flexbox
```html
<div class="d-flex justify-content-between align-items-center flex-wrap gap-3">
  <div>Item</div><div>Item</div>
</div>
```
- `justify-content-*`: `start`, `end`, `center`, `between`, `around`, `evenly`
- `align-items-*`: `start`, `end`, `center`, `baseline`, `stretch`
- `flex-row/column`, `flex-wrap/nowrap`, `flex-grow-1`, `flex-shrink-0`, `order-*`, `gap-*`

### Position
```html
<div class="position-relative">
  <span class="position-absolute top-0 end-0">Badge</span>
</div>
```
`position-static/relative/absolute/fixed/sticky`, plus `top/bottom/start/end-{0,50,100}` and `translate-middle`.

### Sizing
```html
<div class="w-100 h-50 mw-100 vh-100">...</div>
```
`w-25/50/75/100/auto`, `h-*`, `vw-100`, `vh-100`, `min-vh-100`.

### Borders
```html
<div class="border border-primary border-2 rounded-3">...</div>
<div class="border-0"></div> <!-- remove border -->
```
`.rounded`, `.rounded-circle`, `.rounded-pill`, `.rounded-{0-5}`, `.rounded-top/-end/-bottom/-start`.

### Shadows
```html
<div class="shadow-sm">...</div>
<div class="shadow">...</div>
<div class="shadow-lg">...</div>
<div class="shadow-none">...</div>
```

### Text utilities
```html
<p class="text-center text-md-start text-truncate" style="max-width: 150px;">Long text...</p>
```
`text-start/center/end`, `text-truncate` (ellipsis overflow), `text-wrap/nowrap`, `text-break`.

### Vertical align, overflow, visibility, z-index, opacity
```html
<div class="overflow-auto opacity-75 vertical-align-middle"></div>
```

### Float & Clearfix
```html
<div class="float-start">...</div>
<div class="clearfix"></div>
```

### Vertical/Horizontal center trick (very common combo)
```html
<div class="d-flex justify-content-center align-items-center vh-100">
  Perfectly centered content
</div>
```

---

## 33. Utilities API

New in Bootstrap 5.2+ — instead of editing raw CSS, you can **generate, remove, or modify utility classes** via Sass maps in `_utilities.scss` / your own `$utilities` map when compiling from source. Example (conceptual — requires the Sass build pipeline, not just the CDN):
```scss
$utilities: map-merge(
  $utilities,
  (
    "cursor": (
      property: cursor,
      class: cursor,
      values: auto pointer grab,
    ),
  )
);
```
This generates custom classes like `.cursor-pointer` automatically. Relevant once you move beyond CDN-only usage into a build pipeline (Sass/Webpack/Vite).

---

## 34. Bootstrap Icons

A separate, matching icon library (not bundled in bootstrap.css) — install/link separately:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css">
<i class="bi bi-heart-fill text-danger"></i>
<i class="bi bi-cart"></i>
```
Great for navbars, buttons (`<button class="btn btn-primary"><i class="bi bi-download"></i> Download</button>`), and list items.

---

## 35. JavaScript: How Components Work

Two ways to trigger interactive components (collapse, modal, dropdown, carousel, tab, offcanvas, alert-dismiss):

1. **Data attributes (no JS needed)** — what the repo uses throughout:
   ```html
   <button data-bs-toggle="modal" data-bs-target="#myModal">Open</button>
   ```
2. **Manual JavaScript API** — needed for tooltips/popovers, or when you want programmatic control:
   ```js
   const modal = new bootstrap.Modal(document.getElementById('myModal'));
   modal.show();
   modal.hide();
   modal.toggle();
   ```
   Every component exposes methods like `.show()`, `.hide()`, `.toggle()`, `.dispose()`, and fires custom events you can listen for, e.g.:
   ```js
   document.getElementById('myModal').addEventListener('shown.bs.modal', () => {
     console.log('Modal is now visible');
   });
   ```
   Common events per component: `show.bs.*`, `shown.bs.*`, `hide.bs.*`, `hidden.bs.*` (the past-tense ones fire *after* the CSS transition completes).

**Key rule:** components that need JS (modal, dropdown, tooltip, popover, carousel, collapse, offcanvas, toast, scrollspy, tab) require `bootstrap.bundle.min.js` (or `bootstrap.min.js` + a separate Popper script) loaded **before** `</body>`, or before any script that calls `new bootstrap.X(...)`.

---

## 36. Customizing with Sass

If you move beyond the CDN, Bootstrap is built from Sass source, meaning you can override **variables** before importing it:
```scss
// custom.scss
$primary: #7c3aed;
$border-radius: 0.75rem;
$enable-rounded: true;

@import "bootstrap/scss/bootstrap";
```
This regenerates *every* component and utility using your new `$primary` color and border radius — far more efficient than overriding CSS after the fact. Key files: `_variables.scss` (all default variable values), `_functions.scss`, `_mixins.scss`.

---

## 37. Accessibility & Best Practices

- Always pair icon-only buttons with `aria-label` or visually-hidden text.
- Use `.visually-hidden` (not `display: none`) for screen-reader-only text, e.g. "Previous"/"Next" on carousel controls.
- Give interactive `role`s where semantics aren't native: `role="alert"`, `role="status"`, `role="dialog"` (modal does this automatically).
- Don't rely on color alone to convey meaning (e.g., pair a red alert with an icon/text, not just `.bg-danger`).
- Always test the hamburger-collapsed navbar and stacked grid on actual small viewports, not just by shrinking a desktop browser.
- Prefer `.form-select`/`.form-check-input` (real Bootstrap 5 form classes) over custom-styled native inputs — you get built-in focus states and keyboard accessibility for free.
- Keep one Bootstrap **major version** consistent across a project — mixing v4 class names (`badge-pill`) with v5 CDN links silently breaks styling with no console error.

---

## 38. Building the Landing Page (repo walkthrough)

`14-landing-page.html` combines nearly everything above into one real page:

1. `container-fluid` > **Navbar** (logo image as `.navbar-brand`, collapsible `.navbar-nav`)
2. **Carousel** (full-viewport `100vw`/`100vh` images, autoplay every 5s)
3. `container` > **Row 1**: alert (`col-lg-6`) beside an accordion (`col-lg-6`)
4. **Row 2**: 4 responsive `.card`s (`col-lg-3 col-md-4 col-sm-6`) animated on scroll using the external **AOS (Animate On Scroll)** library (`data-aos="fade-up"`, `data-aos-duration="1000"`) — not part of Bootstrap itself, a common companion library
5. **Row 3**: two `.img-thumbnail` images side by side

To modernize it to Bootstrap 5.3: swap the CDN links, add `-bs-` prefixes everywhere, replace `.close`→`.btn-close`, fix `.model-*`→`.modal-*` (if a modal is added), and remove the jQuery `<script>` tag entirely (AOS itself doesn't need jQuery either).

---

## 39. Quick Reference Cheatsheet

```
Layout:      container / container-fluid / row / col / col-md-6 / offset-md-2
Spacing:     m{t|b|s|e|x|y}-{0-5|auto}   p{t|b|s|e|x|y}-{0-5}
Flex:        d-flex justify-content-* align-items-* flex-* gap-*
Display:     d-none d-md-block d-lg-flex
Text:        text-center text-primary text-muted fw-bold fs-4
Background:  bg-primary text-bg-primary bg-primary-subtle
Borders:     border rounded rounded-circle shadow
Buttons:     btn btn-primary btn-outline-primary btn-lg btn-sm
Components:  alert / card / modal / navbar / carousel / accordion / dropdown
JS trigger:  data-bs-toggle="..." data-bs-target="#id"
Manual init: new bootstrap.Modal(el).show()
```

**Official docs to bookmark:** https://getbootstrap.com/docs/5.3/getting-started/introduction/

---

### 📝 Summary of repo-specific fixes to apply if upgrading the practice files to Bootstrap 5.3
- [ ] Update CDN `<link>`/`<script>` URLs from `4.6.2` → `5.3.3`
- [ ] Delete the jQuery `<script>` tag from every file
- [ ] Prefix every `data-toggle/target/dismiss/parent/ride/slide/slide-to` with `data-bs-`
- [ ] `.close` → `.btn-close` (and delete the `&times;` text)
- [ ] `.badge-info .badge-pill` → `.text-bg-info .rounded-pill`
- [ ] `.btn-block` → wrap in `.d-grid` or add `.w-100`
- [ ] Fix `.model-*` typos → `.modal-*` in `09-modal.html`
- [ ] Fix malformed unclosed `<span>` tags in `04-spinners.html`
- [ ] Remove the meaningless `.card-content` wrapper divs in card markup
- [ ] Fix `.bg-muted` → `.text-muted` in `01-text-bg-colors.html`
- [ ] Fix invalid bare `bg-dark` attribute on the navbar toggler → should be a class if intended
