# HTML — Complete Notes (Basics to Advanced)

> A one-stop reference built from the `01-html` practice repo and the official [MDN HTML documentation](https://developer.mozilla.org/en-US/docs/Web/HTML). Every element explained in plain language, with pointers, descriptive notes, and runnable code examples.

## Table of Contents

1. [Introduction to HTML](#1-introduction-to-html)
2. [Basic Document Structure](#2-basic-document-structure)
3. [Legacy Body & Font Attributes (and why to avoid them)](#3-legacy-body--font-attributes-and-why-to-avoid-them)
4. [Div and Span](#4-div-and-span)
5. [Headings, Paragraphs & Horizontal Rules](#5-headings-paragraphs--horizontal-rules)
6. [Text Formatting Elements](#6-text-formatting-elements)
7. [Lists](#7-lists)
8. [Fieldset & Legend](#8-fieldset--legend)
9. [Tables](#9-tables)
10. [Images & Responsive Images](#10-images--responsive-images)
11. [Details & Summary](#11-details--summary)
12. [Hyperlinks — External, Internal, tel/mailto](#12-hyperlinks--external-internal-telmailto)
13. [Marquee (legacy) & Modern Alternatives](#13-marquee-legacy--modern-alternatives)
14. [Audio & Video](#14-audio--video)
15. [iFrame](#15-iframe)
16. [Forms — Full Reference](#16-forms--full-reference)
17. [All Input Types](#17-all-input-types)
18. [Other Form Elements](#18-other-form-elements)
19. [Semantic HTML5 Elements](#19-semantic-html5-elements)
20. [Metadata & the &lt;head&gt;](#20-metadata--the-head)
21. [Embedding Scripts in HTML](#21-embedding-scripts-in-html)
22. [Global Attributes](#22-global-attributes)
23. [Accessibility (a11y) Essentials](#23-accessibility-a11y-essentials)
24. [HTML5 APIs Worth Knowing](#24-html5-apis-worth-knowing)
25. [Best Practices & Common Pitfalls](#25-best-practices--common-pitfalls)

---

## 1. Introduction to HTML

- **HTML (HyperText Markup Language)** is the standard markup language used to structure content on the web. It describes the *meaning and structure* of a page — headings, paragraphs, links, images, forms — while CSS handles appearance and JavaScript handles behavior.
- HTML is made of **elements**, written as tags: `<tagname>content</tagname>`. Most elements have an opening and closing tag; some are **void elements** (self-closing, no content) like `<img>`, `<br>`, `<hr>`, `<input>`.
- An **attribute** provides extra information about an element, written inside the opening tag: `<a href="https://example.com">`. Attributes are `name="value"` pairs.
- HTML is **not case-sensitive** for tag/attribute names, but lowercase is the universal convention.
- The current standard is **HTML5** (referenced by `<!DOCTYPE html>`), which added semantic elements, native multimedia support (`<audio>`, `<video>`), new form input types, and many APIs.

---

## 2. Basic Document Structure

Every HTML document follows this skeleton (from the repo's `00-basic-structure.html`, generated via the Emmet `!` + Tab shortcut in most editors):

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Boilerplate</title>
</head>
<body>
    <h2>HTML Boilerplate</h2>
</body>
</html>
```

- **`<!DOCTYPE html>`** — must be the very first line. It declares the document as HTML5, telling the browser to render in "standards mode" rather than the old quirks mode.
- **`<html lang="en">`** — the root element of the page; every other element nests inside it. The `lang` attribute declares the document's language, which helps screen readers use correct pronunciation and helps search engines and translation tools.
- **`<head>`** — contains **meta information** about the document that is not directly displayed on the page: character encoding, viewport settings, the page title, linked stylesheets, and scripts.
  - **`<meta charset="UTF-8">`** — specifies the character encoding. UTF-8 supports virtually every character/emoji from every language and should always be the first thing inside `<head>`.
  - **`<meta name="viewport" content="width=device-width, initial-scale=1.0">`** — essential for **responsive design**: it tells mobile browsers to set the page width to the device's actual screen width and start at 100% zoom, instead of rendering a shrunken desktop-width layout.
  - **`<title>`** — sets the text shown in the browser tab/window title and used as the default title in search results and bookmarks.
- **`<body>`** — contains everything that is actually **visible** on the page: text, images, links, forms, etc. A document has exactly one `<body>`.
- A `<script>` placed inside `<head>` (as in the repo's boilerplate) runs before the page body has loaded — for scripts that need to run after the DOM is ready, placing `<script>` just before `</body>`, or using the `defer` attribute, is the modern best practice (see Section 21).

---

## 3. Legacy Body & Font Attributes (and why to avoid them)

The repo's `01-body-attributes.html` demonstrates old-style HTML presentational attributes that predate CSS becoming the standard styling mechanism:

```html
<body bgcolor="blue" text="yellow" background="../images/shinchan.jpg">
    <font size="5" color="white">
        Some text here...
    </font>
</body>
```

- **`bgcolor`** — set the page's background color directly in HTML.
- **`text`** — set the default text color for the whole page.
- **`background`** — set a background image for the page.
- **`<font size="..." color="...">`** — an entire element dedicated to inline text styling (size, color, face/typeface).

⚠️ **All of these are deprecated in HTML5** and should never be used in modern code. They mix presentation with structure, can't be reused across pages, and have no support for responsive design, hover states, animations, etc. The correct modern equivalent is CSS:
```css
body {
    background-color: blue;
    color: yellow;
    background-image: url('../images/shinchan.jpg');
}
```
Documenting them here is purely so you can recognize and understand old/legacy code you might encounter — never write new code this way.

---

## 4. Div and Span

The two most fundamental **generic containers** in HTML — they carry no inherent meaning, existing purely to group content for styling (CSS) or scripting (JS) purposes.

```html
<style>
div { border: 2px solid rgb(214, 10, 133); }
span { border: 2px solid rgb(214, 10, 133); }
</style>

<!-- div is a BLOCK-level element: starts on a new line, takes the full width available -->
<div>Hello World</div>
<div>Hello World</div>

<br>

<!-- span is an INLINE element: stays on the same line, only takes as much width as its content -->
<span>Demo Text</span>
<span>Demo Text</span>
```

| | `<div>` | `<span>` |
|---|---|---|
| Display type | `block` (own line, full width) | `inline` (flows within text, content-sized width) |
| Typical use | Grouping larger sections — a card, a form section, a layout region | Styling a small piece of text within a sentence — highlighting a word, wrapping an icon |
| Can contain | Other block or inline elements | Typically just inline content/text |

- Neither element has semantic meaning on its own — for content that *does* have meaning (a navigation area, an article, a footer), prefer the semantic HTML5 elements in Section 19 instead of a generic `<div>`.

---

## 5. Headings, Paragraphs & Horizontal Rules

```html
<h1>Main heading — one per page ideally, most important</h1>
<h2>Section heading</h2>
<h3>Sub-section heading</h3>
<h4>...</h4><h5>...</h5><h6>Least important heading</h6>

<p>A paragraph of text — a block-level element with automatic spacing above/below.</p>

<!-- Horizontal rule — a thematic break, rendered as a horizontal line -->
<hr color="orange" size="20" width="300px">
```
- **`<h1>`–`<h6>`** — six levels of headings, `<h1>` being the most important/largest by default. Headings should be used in order for document outline/accessibility purposes (don't skip from `<h1>` straight to `<h4>` just for the smaller font size — use CSS for that instead).
- **`<hr>`** — represents a thematic break between paragraph-level content (historically just a visual line; semantically it signals a topic shift). It's a void/self-closing element. The `color`, `size` (thickness), and `width` attributes shown in the repo are presentational HTML attributes — in modern code, style an `<hr>` via CSS (`border`, `width`) instead.
- **`align="center"`** (seen throughout the repo on headings and tables) is another deprecated presentational attribute — modern layout/alignment is done with CSS (`text-align`, Flexbox, Grid).

---

## 6. Text Formatting Elements

Inline elements used to semantically mark up text (MDN documents all of these under "Text content" and "Inline text semantics"):

```html
<b>Bold text (visual only, no extra importance)</b>
<strong>Strongly important text (bold + semantic meaning)</strong>
<i>Italic text (visual only)</i>
<em>Emphasized text (italic + semantic meaning)</em>
<u>Underlined text</u>
<s>Strikethrough — no longer accurate/relevant</s>
<mark>Highlighted/marked text</mark>
<small>Smaller/fine-print text</small>
<sub>Subscript</sub> and <sup>Superscript</sup>
<code>inline code snippet</code>
<pre>preformatted text — preserves whitespace and line breaks exactly as written</pre>
<blockquote cite="https://source.com">A block-level quotation from another source.</blockquote>
<q>An inline, short quotation</q>
<abbr title="HyperText Markup Language">HTML</abbr>   <!-- shows a tooltip with the full term -->
<br>   <!-- a single line break, no new paragraph -->
```
- **`<b>` vs `<strong>`** and **`<i>` vs `<em>`**: the first of each pair is purely *visual* styling with no extra meaning; the second carries *semantic* importance (screen readers may emphasize `<strong>`/`<em>` content differently, and search engines weigh them for relevance). Prefer the semantic versions when the emphasis is meaningful, and reserve `<b>`/`<i>` for purely stylistic bold/italic with no added importance.

---

## 7. Lists

Three types of lists in HTML:

```html
<!-- Unordered list — bullet points -->
<ul>
    <li>HTML Boilerplate is a starting point for creating a new HTML document.</li>
    <li>It includes the basic structure and essential elements needed for a web page.</li>
</ul>

<!-- Ordered list — numbered -->
<ol>
    <li>First step</li>
    <li>Second step</li>
</ol>
<ol type="A" start="3">   <!-- type: 1, A, a, I, i — start: begin numbering from a custom number -->
    <li>Item C</li>
</ol>

<!-- Description list — term/definition pairs -->
<dl>
    <dt>HTML</dt>
    <dd>HyperText Markup Language, used to structure web content.</dd>
    <dt>CSS</dt>
    <dd>Cascading Style Sheets, used to style web content.</dd>
</dl>
```
- **`<ul>`** (unordered list) → `<li>` items, rendered with bullets by default.
- **`<ol>`** (ordered list) → `<li>` items, numbered automatically; `type` controls the numbering style and `start` sets the starting number.
- **`<dl>`** (description list) → alternating `<dt>` (term) and `<dd>` (description) pairs — used for glossaries, FAQs, key-value data.
- Lists can be **nested** — a `<ul>`/`<ol>` placed inside an `<li>` creates a sub-list.

---

## 8. Fieldset & Legend

Used to visually and semantically **group related form controls** together.

```html
<fieldset>
    <!-- Legend gives a title to the fieldset -->
    <legend align="center">Hey You</legend>

    Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Eos quibusdam ducimus tempore officiis harum voluptatum.

</fieldset>
```
- **`<fieldset>`** — draws a bordered box around its contents (by default, browsers render a border) and is commonly used to group related inputs in a large form (e.g. "Shipping Address" vs. "Billing Address" sections).
- **`<legend>`** — provides a caption/title for the fieldset, displayed embedded in the border by default. It must be the first child of `<fieldset>`.
- A `<fieldset>` can also carry a `disabled` attribute, which disables every form control nested inside it at once — a convenient way to disable a whole section.
- This pairing is also an accessibility win: screen readers announce the legend text as context when a user tabs into any control inside the fieldset.

---

## 9. Tables

Tables display tabular data in rows and columns — never use tables for page layout (that's what CSS Flexbox/Grid are for); reserve them for genuinely tabular data.

```html
<table
    border="1"
    width="60%"
    align="center"
    bgcolor="#f0f0f0"
    cellpadding="8"
    cellspacing="0">

    <!-- Table heading -->
    <thead>
        <tr>
            <th>Emp ID</th>
            <th>Emp Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Department</th>
        </tr>
    </thead>

    <!-- Table data -->
    <tbody>
        <tr>
            <td>101</td>
            <td>Anshika</td>
            <td>anshika@example.com</td>
            <td>21</td>
            <td>IT</td>
        </tr>
        <tr>
            <td>102</td>
            <td>Rahul</td>
            <td>rahul@example.com</td>
            <td>22</td>
            <td>HR</td>
        </tr>
    </tbody>

    <!-- Table footer -->
    <tfoot>
        <tr>
            <td colspan="5" align="center">
                Total Employees: 5
            </td>
        </tr>
    </tfoot>
</table>
```

- **`<table>`** — the container for the whole table.
- **`<thead>` / `<tbody>` / `<tfoot>`** — semantically group the header row(s), body rows, and footer row(s) respectively. Purely organizational (and useful for styling/scripting hooks); a table works without them but including them is best practice.
- **`<tr>`** — a table row.
- **`<th>`** — a header cell (bold and centered by default) — used inside `<thead>` for column headers, but can also appear inside `<tbody>` rows for row headers.
- **`<td>`** — a standard data cell.
- **`colspan="n"`** — makes a cell span across `n` columns (used in the repo's `<tfoot>` to center a summary message under all 5 columns, and in the iframe example to span a header image across 4 columns).
- **`rowspan="n"`** — makes a cell span across `n` rows (not in the repo, but the vertical equivalent of `colspan`).
- **Deprecated presentational attributes seen in the repo** (`border`, `width`, `align`, `bgcolor`, `cellpadding`, `cellspacing` directly on `<table>`) — all of these are legacy HTML attributes; modern code achieves the same visual results with CSS:
  ```css
  table { width: 60%; margin: 0 auto; background-color: #f0f0f0; border-collapse: collapse; }
  th, td { border: 1px solid black; padding: 8px; }
  ```
- **`<caption>`** (not in the repo, but part of the standard) — provides a title for the whole table, placed as the first child of `<table>`.

---

## 10. Images & Responsive Images

### Basic image
```html
<img src="path/to/image.jpg" alt="Description of the image" width="300" height="200">
```
- **`src`** — the path/URL to the image file (required).
- **`alt`** — alternative text describing the image, shown if the image fails to load and read aloud by screen readers. Essential for accessibility and SEO — never omit it (use `alt=""` specifically for purely decorative images with no informational content).
- **`width`/`height`** — reserving explicit dimensions helps the browser allocate space before the image loads, preventing layout shift.

### Responsive images with `<picture>`
```html
<picture>
    <!-- Define different image sources for different screen sizes -->
    <!-- The "media" attribute specifies the minimum width for each image source -->
    <source media="(min-width:1200px)" srcset="../Images/doraemon.jpeg">
    <source media="(min-width:992px)" srcset="../Images/nobita.jpeg">
    <source media="(min-width:768px)" srcset="../Images/shizuka.jpeg">
    <!-- Default/fallback image for smaller screens or browsers without <picture> support -->
    <img src="../Images/Shinchan.jpg" width="1000px" height="700px"/>
</picture>
```
- **`<picture>`** — a wrapper that lets the browser choose the best image source based on conditions (screen width, pixel density, image format support) that you define.
- **`<source>`** — each one specifies a candidate image (`srcset`) and the condition under which it should be used (`media`, a CSS media query). The browser evaluates them top-to-bottom and picks the first match.
- The **`<img>` inside `<picture>` is mandatory** — it's both the fallback for browsers that don't understand `<picture>`, and the actual element that ends up rendered on screen (its `alt` attribute is what's used for accessibility, regardless of which `<source>` was chosen).
- A simpler, single-`<img>` alternative for pure resolution-switching (not art direction) is the `srcset`/`sizes` attributes directly on `<img>`:
  ```html
  <img src="small.jpg" srcset="small.jpg 500w, large.jpg 1500w" sizes="(max-width: 600px) 500px, 1500px" alt="...">
  ```
  `<picture>` is for swapping to genuinely *different images* (art direction) at different breakpoints; `srcset`/`sizes` on a plain `<img>` is for serving different *resolutions of the same image*.

---

## 11. Details & Summary

Creates a native, JavaScript-free **collapsible disclosure widget**.

```html
<style>
details {
    background-color: mediumaquamarine;
    padding: 20px;
    cursor: pointer;
    text-align: justify;
}
</style>

<details>
    <summary>Click to know me!</summary>
    <p>
        Hi, I'm Anshika Gupta. Currently in the second year of MCA...
    </p>
</details>
```
- **`<details>`** — a widget that the user can toggle open/closed. Collapsed by default; add the boolean `open` attribute (`<details open>`) to start it expanded.
- **`<summary>`** — the always-visible heading/label for the widget; clicking it toggles the `<details>` open or closed. It must be the first child of `<details>`.
- Everything else inside `<details>` (other than `<summary>`) is the content shown only when expanded.
- This is genuinely useful in production for FAQs, "read more" sections, and collapsible menus — entirely without JavaScript, and accessible by default (keyboard-toggleable, exposes correct ARIA state).
- A `toggle` event fires on the `<details>` element whenever it's opened or closed, if JS needs to react to the state change.

---

## 12. Hyperlinks — External, Internal, tel/mailto

The **`<a>` (anchor)** element creates hyperlinks — the foundation of the "web" in World Wide Web.

```html
<!-- target="_blank" opens the link in a new tab -->
<a href="https://www.linkedin.com/in/anshikagknp/" target="_blank">My linkedin</a>

<!-- relative link to another page in the same project -->
<a href="./04-tables.html" target="_blank">Tables</a>

<!-- tel: creates a clickable link that initiates a phone call -->
<a href="tel: 9792222220">Contact us</a>

<!-- mailto: opens the user's default email client, with optional pre-filled subject/body -->
<a href="mailto: anshikagknp@gmail.com?subject=Enquiry&body=hello team">Email</a>
```
- **`href`** — the destination URL: absolute (`https://...`), relative (`./page.html`, `../folder/page.html`), or a special scheme (`tel:`, `mailto:`, `#fragment`).
- **`target="_blank"`** — opens the link in a new browser tab/window. Best practice: pair it with `rel="noopener noreferrer"` for security — without it, the newly opened page can access `window.opener` and potentially redirect the original tab (a technique called "tabnabbing").
- **`tel:`** — on mobile devices especially, tapping this link offers to dial the number directly.
- **`mailto:`** — opens the default mail client with the `To:` field pre-filled; `?subject=...&body=...` (URL query-string style, `&` separating parameters) pre-fills those fields too.

### Internal (same-page/anchor) hyperlinks
```html
<style>
html { scroll-behavior: smooth; }  /* animates the jump instead of an instant snap */
</style>

<a id="top" href="#d1">About CSE</a>
<a href="#d2">Paper Pattern</a>

<div id="d1"><h1>About CSE</h1>...</div>
<div id="d2"><h1>Paper Pattern</h1>...</div>

<div id="d6">
    <a href="#top">Back to top</a>
</div>
```
- A link whose `href` starts with `#` followed by an element's `id` scrolls the page to that element instead of navigating to a new page — the browser matches the fragment against any element's `id` attribute.
- `scroll-behavior: smooth` (a CSS property on `html`) makes this jump animate smoothly rather than snapping instantly — a small but very common UX improvement.
- This pattern (a fixed nav of anchor links + `id`-tagged sections + a "back to top" link) is the classic single-page navigation structure, seen in the repo's UPSC-notes example page.

---

## 13. Marquee (legacy) & Modern Alternatives

```html
<!-- Marquee creates a scrolling text/content effect -->
<marquee
    behavior="alternate"
    scrollamount="50"
    direction="right"
    height="800px"
    onmouseover="stop()"
    onmouseout="start()">
    <h1><span>Nobita</span><span>Shizuka</span></h1>
    <img src="../Images/nobita.jpeg" width="200px" />
</marquee>
```
- **`<marquee>`** — a non-standard, **deprecated** HTML element that scrolls its content across the screen.
  - `behavior` — `scroll` (default, continuous loop), `slide` (scrolls in once and stops), `alternate` (bounces back and forth).
  - `scrollamount` — pixels moved per animation frame (higher = faster).
  - `direction` — `left` (default), `right`, `up`, `down`.
  - `onmouseover="stop()"` / `onmouseout="start()"` — pause on hover, resume on mouse-out (these call the marquee's own built-in `.stop()`/`.start()` methods).
- ⚠️ `<marquee>` was never part of any official HTML standard, is unsupported or discouraged in modern browsers, and is inaccessible (constantly-moving text is a serious problem for users with cognitive or attention-related disabilities, and screen readers). It's documented here only for recognizing legacy code.
- **Modern equivalent**: CSS animations, e.g.
  ```css
  @keyframes scroll-left {
      from { transform: translateX(100%); }
      to   { transform: translateX(-100%); }
  }
  .scrolling-text { display: inline-block; animation: scroll-left 10s linear infinite; }
  ```
  This gives full control over timing, easing, pausing on hover (`:hover { animation-play-state: paused; }`), and can be disabled for users who prefer reduced motion via the `prefers-reduced-motion` media query.

---

## 14. Audio & Video

Native HTML5 multimedia elements — no plugins (like the old Flash) required.

```html
<!-- Video element with controls, looping, and a poster image -->
<video width="300px" controls loop poster="../Images/doraemon.jpeg">
    <source src="../multimedia/video1.mp4" />
</video>

<!-- Audio element with controls -->
<audio controls>
    <source src="../multimedia/audio1.mp3" />
</audio>
```
- **`<video>`** attributes:
  - `controls` — shows the browser's built-in play/pause/volume/fullscreen UI.
  - `loop` — restarts playback automatically when it ends.
  - `poster` — an image shown before playback starts (a thumbnail).
  - `autoplay` (not in repo) — starts playing automatically; browsers typically require it to be paired with `muted` to actually work, due to autoplay-with-sound restrictions.
  - `muted` — starts with audio muted.
- **`<audio>`** — same idea, audio-only, no `poster`/dimensions needed.
- **`<source>`** — nested inside `<video>`/`<audio>` to specify the media file; multiple `<source>` elements with different formats (`.mp4`, `.webm`, `.ogg`) can be listed so the browser picks the first format it supports — this is the multimedia equivalent of the `<picture>`/`<source>` pattern from Section 10.
- Any text/content placed between the opening and closing `<video>`/`<audio>` tags (after the `<source>` elements) is a fallback shown only in browsers that don't support the element at all: `<video>...<source .../>Your browser does not support video.</video>`.
- Captions/subtitles for accessibility are added via a nested `<track kind="subtitles" src="captions.vtt" srclang="en" label="English">` element.

---

## 15. iFrame

**`<iframe>`** embeds another complete HTML document inside the current page, as an independent nested browsing context.

```html
<table border="0px" width="1200px" align="center">
    <thead>
        <tr>
            <th colspan="1"><a href="04-tables.html" target="myframe">View Tables</a></th>
            <th colspan="1"><a href="12-forms.html" target="myframe">View Form</a></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="4">
                <!-- name attribute lets links elsewhere target this frame -->
                <iframe
                    name="myframe"
                    width="100%"
                    height="1000px"
                    src="https://www.wikipedia.org/wiki/doraemon"></iframe>
            </td>
        </tr>
    </tbody>
</table>
```
- **`src`** — the URL of the page to embed.
- **`name`** — lets other elements (typically `<a target="myframe">` or `<form target="myframe">`, as in the repo's example) load their result specifically inside this iframe instead of navigating the whole page — this is the classic "click a link in a nav table, content loads in a frame below" pattern.
- **`width`/`height`** — the iframe's own dimensions (it does not automatically size to its content).
- Common real-world uses: embedding YouTube videos, Google Maps, payment widgets, or any third-party embeddable content.
- ⚠️ **Security note**: content inside an iframe runs in its own separate browsing context and generally cannot access the parent page's JavaScript/DOM (and vice versa) unless both pages are on the same origin, or explicitly communicate via `postMessage`. The `sandbox` attribute can further restrict what an embedded iframe is allowed to do (run scripts, submit forms, open popups, etc.) — important when embedding untrusted third-party content.

---

## 16. Forms — Full Reference

The `<form>` element collects user input and (traditionally) submits it to a server.

```html
<!-- method: GET appends data to the URL (visible, bookmarkable, size-limited);
     POST sends data in the request body (hidden, no size limit, used for sensitive/large data) -->
<!-- action: the URL the form data is submitted to -->
<!-- autocomplete="off": disables the browser's remembered-value autofill suggestions -->
<form method="post" action="" autocomplete="off">
    <input type="text" name="unm" minlength="2" required>
    <input type="submit" value="Submit">
</form>
```
- **`method`** — `GET` (default) or `POST`, determines how form data is transmitted.
- **`action`** — the server endpoint URL the form submits to; an empty string (as in the repo) submits back to the current page.
- **`autocomplete`** — `"on"` (default) or `"off"`, controls whether the browser offers/applies remembered values.
- **`name`** on each input is essential — it's the key used when the form data is sent (`name=value` pairs); an input without a `name` is not included in the submitted data at all.
- **`<label for="id">`** — associates descriptive text with a specific input (matched via the input's `id`). Clicking the label focuses/activates the associated input — critical for accessibility and for larger clickable targets, especially on checkboxes/radios.
  ```html
  <input type="radio" name="gender" id="m">
  <label for="m">Male</label>
  ```

---

## 17. All Input Types

The `<input>` element is the most versatile form control — its behavior changes entirely based on the `type` attribute. Every type below is documented, including all types demonstrated in the repo's registration form:

```html
<!-- Text — free-form single-line text -->
<input type="text" name="unm" minlength="2" required>

<!-- Password — masks the typed characters -->
<input type="password" name="pwd" required>

<!-- Email — validates a basic email address format automatically -->
<input type="email" name="email" required>

<!-- Date — a native date picker, with optional min/max range restriction -->
<input type="date" min="2000-01-01" max="2027-07-01" name="dob">

<!-- Datetime-local — picks both a date AND a time together -->
<input type="datetime-local" name="dnt">

<!-- Radio — same `name` on a group means only ONE can be selected at a time -->
<input type="radio" name="gender" id="m"> <label for="m">Male</label>
<input type="radio" name="gender" id="f"> <label for="f">Female</label>

<!-- Checkbox — each is independent; multiple can be checked at once -->
<input type="checkbox" name="chk" id="chk"> <label for="chk">Reading</label>

<!-- File — lets the user pick a file to upload; `accept` restricts allowed file types; `multiple` allows several files -->
<input type="file" accept=".png,.jpg" name="pic" multiple>

<!-- Range — a slider between a min and max value -->
<input type="range" min="100" max="1000" name="range">

<!-- Color — opens the browser's native color picker -->
<input type="color" id="favc" name="favc">

<!-- Hidden — not rendered/visible, but its value IS submitted with the form (e.g. a tracking ID, CSRF token) -->
<input type="hidden" id="urn" name="urn" value="0023">

<!-- Number — accepts numeric input only, with optional min/max restriction -->
<input type="number" id="attempts" name="attempts" min="0" max="6">

<!-- Tel — for phone numbers; `pattern` enforces a custom regex format, `maxlength` caps character count -->
<input type="tel" id="phone" name="phone" pattern="[0-9]{10}" maxlength="10" required>

<!-- URL — validates that the entered value is a well-formed URL -->
<input type="url" id="gh" name="github">

<!-- Submit — submits the form -->
<input type="submit" value="Submit">

<!-- Reset — clears all fields back to their default values -->
<input type="reset" value="Reset">

<!-- Button — a plain button with no default behavior; needs JavaScript to do anything -->
<input type="button" value="Click Me">

<!-- Image — functions as a submit button, but rendered as a clickable image -->
<input type="image" src="../Images/shizuka.jpeg" width="40px">
```

### Additional input types not in the repo but part of the standard
```html
<input type="search">     <!-- styled like text, may show a clear "x" button, semantic hint for search UIs -->
<input type="month">       <!-- picks a year+month, no day -->
<input type="week">         <!-- picks a year+week number -->
<input type="time">          <!-- picks a time only, no date -->
```

### Common validation attributes (work across relevant input types)
| Attribute | Purpose |
|---|---|
| `required` | Field must be filled before the form can submit |
| `minlength` / `maxlength` | Minimum/maximum character count (text-like inputs) |
| `min` / `max` | Minimum/maximum value (number, date, range) |
| `pattern` | A regular expression the value must match |
| `placeholder` | Faint hint text shown when the field is empty (not a substitute for a `<label>`) |
| `readonly` | Value shown but cannot be edited; still submitted with the form |
| `disabled` | Field is unusable and greyed out; NOT submitted with the form |
| `autofocus` | Automatically focuses this field when the page loads |

---

## 18. Other Form Elements

```html
<!-- Dropdown / select list -->
<select name="qual">
    <option>Select</option>
    <option>BTech</option>
    <option>MCA</option>
</select>

<!-- Datalist — connects to a text input via the `list` attribute, provides autocomplete-style typing suggestions -->
<input type="text" name="uni" list="mylist">
<datalist id="mylist">
    <option>DU</option>
    <option>JNU</option>
    <option>AKTU</option>
</datalist>

<!-- Textarea — multi-line free text input (not in repo, but a standard form essential) -->
<textarea name="comments" rows="4" cols="50" placeholder="Your comments..."></textarea>

<!-- Button element — like input type="button"/"submit" but can contain rich HTML content (icons, etc.) -->
<button type="submit">Submit</button>
```
- **`<select>` + `<option>`** — a dropdown list; each `<option>` can have a separate `value` attribute (if omitted, the option's text content is used as the value). Add `multiple` to `<select>` to allow choosing more than one option, and `<optgroup label="...">` to visually group related options.
- **`<datalist>`** — paired with a text `<input list="datalistID">`, it provides typeahead/autocomplete suggestions **while still allowing free-text entry** — unlike `<select>`, the user isn't restricted to only the listed options.
- **`<textarea>`** — for multi-line text input; `rows`/`cols` set its default visible size (though it's commonly resized via CSS in practice).
- **`<button>`** vs **`<input type="submit">`** — functionally similar, but `<button>` can contain nested HTML (an icon + text, for example), while `<input>` can only display plain text via its `value` attribute. `<button>` defaults to `type="submit"` when inside a `<form>` if no `type` is specified — always set `type="button"` explicitly for buttons that shouldn't submit the form.

---

## 19. Semantic HTML5 Elements

HTML5 introduced elements that describe the **meaning/role** of their content, not just generic grouping like `<div>` — improving accessibility, SEO, and code readability. None of these appear in the repo, but they are essential modern HTML:

```html
<header>Site or section header — logo, title, intro content</header>
<nav>A block of primary navigation links</nav>
<main>The primary, unique content of the page (only one per page)</main>
<article>Self-contained, independently distributable content — a blog post, a news story, a forum post</article>
<section>A thematic grouping of content, usually with its own heading</section>
<aside>Content tangentially related to the main content — a sidebar, a pull quote, related links</aside>
<footer>Site or section footer — copyright, contact info, related links</footer>
<figure>
    <img src="chart.png" alt="Sales chart">
    <figcaption>Figure 1: Quarterly sales growth</figcaption>
</figure>
<time datetime="2026-08-30">August 30, 2026</time>
<address>Contact information for the nearest ancestor article/page</address>
```
- **Why semantic elements matter**: a `<nav>` or `<article>` immediately communicates its purpose to screen readers, search engine crawlers, and other developers reading the code — a `<div class="nav">` communicates nothing structurally; the class name is just a convention a machine has no obligation to understand.
- **`<section>` vs `<article>` vs `<div>`**: use `<article>` for content that would make sense standing alone outside the page (a blog post that could be syndicated); use `<section>` for a distinct, usually-headed grouping within the page (a "Features" section on a landing page); fall back to `<div>` only when there's no semantic meaning to convey — purely a styling/layout hook.
- **`<figure>`/`<figcaption>`** — groups a media element (image, chart, code snippet) with its caption; semantically ties them together for accessibility.

---

## 20. Metadata & the &lt;head&gt;

Elements that go inside `<head>`, controlling behavior/metadata rather than visible content:

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title</title>

    <!-- SEO metadata -->
    <meta name="description" content="A short summary of the page for search engines">
    <meta name="keywords" content="html, css, javascript">
    <meta name="author" content="Anshika Gupta">

    <!-- Social sharing previews (Open Graph, used by Facebook/LinkedIn/etc.) -->
    <meta property="og:title" content="Page Title">
    <meta property="og:image" content="preview.jpg">

    <!-- Favicon — the small icon shown in browser tabs -->
    <link rel="icon" type="image/x-icon" href="favicon.ico">

    <!-- Linking an external CSS stylesheet -->
    <link rel="stylesheet" href="styles.css">

    <!-- Preventing search engine indexing -->
    <meta name="robots" content="noindex, nofollow">
</head>
```
- **`<meta>`** — a self-closing element that provides metadata in `name`/`content` (or `property`/`content` for Open Graph) pairs. Browsers, search engines, and social platforms all read specific, standardized `name`/`property` values.
- **`<link>`** — connects the document to an external resource; `rel="stylesheet"` for CSS is the most common use, but also `rel="icon"` (favicon), `rel="preconnect"`/`rel="preload"` (performance hints), `rel="canonical"` (SEO — declares the "master" URL when the same content is reachable at multiple URLs).

---

## 21. Embedding Scripts in HTML

```html
<!-- Inline script, directly in the HTML -->
<script>
    console.log("Hi from HTML Page");
</script>

<!-- External script file -->
<script src="./Demo.js"></script>
```

### Script loading and page rendering — placement matters
- A `<script>` in `<head>` (as in the repo's `00-basic-structure.html`) executes as soon as the browser parses it, which happens **before** the `<body>` content exists yet — so any script trying to access/manipulate the DOM at that point will fail to find those elements.
- Placing `<script>` at the very end of `<body>` (a very common older convention) ensures the DOM is fully parsed before the script runs.
- Modern approach — attributes on `<script>` that control loading without needing manual placement tricks:
  ```html
  <script src="app.js" defer></script>   <!-- downloads in parallel with HTML parsing, executes AFTER parsing finishes, in document order -->
  <script src="app.js" async></script>    <!-- downloads in parallel, executes AS SOON AS it's ready — order relative to other scripts not guaranteed -->
  ```
  `defer` is generally the best default for scripts that need the DOM ready and should run in a predictable order; `async` suits independent scripts (like analytics) that don't depend on the DOM or other scripts.
- `type="module"` on a `<script>` enables ES module `import`/`export` syntax directly in the browser, and is deferred by default.

---

## 22. Global Attributes

Attributes that can be applied to virtually **any** HTML element, regardless of type:

| Attribute | Purpose |
|---|---|
| `id` | A unique identifier for the element (used for CSS targeting, JS access, and internal hyperlinks — Section 12) |
| `class` | One or more space-separated class names, for CSS styling and JS selection |
| `style` | Inline CSS applied directly to this one element |
| `title` | Tooltip text shown on hover |
| `lang` | Language of this specific element's content (overrides the document-level `lang`) |
| `hidden` | Hides the element entirely (equivalent to `display: none`) |
| `tabindex` | Controls keyboard-Tab focus order; `0` makes a normally non-focusable element focusable in natural order, `-1` removes it from Tab order but allows programmatic focus |
| `contenteditable` | Makes the element's content directly editable by the user in the browser |
| `draggable` | Makes the element draggable (used with the HTML Drag and Drop API) |
| `data-*` | Custom data attributes for storing extra information (`data-user-id="42"`), readable in JS via `element.dataset.userId` |
| `aria-*` | Accessibility attributes (Section 23) |

```html
<div id="profile-card" class="card highlighted" data-user-id="42" title="Click to expand">
    User profile content
</div>
```
```js
document.getElementById("profile-card").dataset.userId;   // "42"
```

---

## 23. Accessibility (a11y) Essentials

Building HTML that works for everyone, including users relying on screen readers, keyboard-only navigation, or other assistive technology:

- **Always provide `alt` text** on meaningful images (Section 10); use `alt=""` for purely decorative images so screen readers skip them.
- **Use semantic elements** (Section 19) instead of generic `<div>`s wherever a meaningful equivalent exists — screen readers announce landmarks like `<nav>`, `<main>`, `<header>` to help users jump around the page.
- **Label every form control** with an associated `<label for="...">` (Section 16) — placeholder text alone is not an accessible substitute for a label, since it disappears once the user starts typing.
- **Maintain a logical heading hierarchy** (`<h1>` → `<h2>` → `<h3>`, without skipping levels) so screen reader users can navigate by heading structure.
- **Ensure keyboard operability** — everything clickable with a mouse (buttons, links, custom controls) must also be reachable and operable via Tab/Enter/Space alone. Native elements (`<button>`, `<a>`, `<input>`) get this for free; custom-styled `<div>`-based "buttons" do not, and need `tabindex="0"` plus manual keyboard event handling.
- **ARIA attributes** supplement native HTML semantics when needed (never as a first choice over a native element):
  ```html
  <div role="alert">Your session is about to expire.</div>
  <button aria-label="Close dialog">✕</button>
  <div aria-hidden="true">decorative icon</div>
  ```
  The first rule of ARIA: if a native HTML element or attribute already has the semantics/behavior you need, use it instead of re-purposing a `<div>`/`<span>` with ARIA roles.
- **Color contrast** — ensure sufficient contrast between text and background colors so content is readable for users with low vision or color blindness (a CSS/design concern, but directly affects HTML content's usability).

---

## 24. HTML5 APIs Worth Knowing

HTML5 didn't just add new elements — it introduced JavaScript-accessible browser APIs that HTML pages commonly rely on. Not covered in the repo, but essential context for full-stack/modern web understanding:

- **Geolocation API** — `navigator.geolocation.getCurrentPosition(...)` requests the user's physical location (with permission).
- **Web Storage** (`localStorage`, `sessionStorage`) — persist key-value string data in the browser (covered in detail in the companion JavaScript notes).
- **Canvas (`<canvas>`)** — a scriptable bitmap drawing surface for 2D graphics, games, charts (drawn via JavaScript, not markup).
- **SVG (`<svg>`)** — an XML-based vector graphics format that can be embedded directly inline in HTML, styled with CSS, and manipulated with JS — unlike Canvas, SVG shapes remain individually addressable DOM elements.
- **Drag and Drop API** — native browser support for dragging elements, using the `draggable` global attribute plus `dragstart`/`dragover`/`drop` events.
- **Web Workers** — run JavaScript in a background thread, off the main UI thread, for CPU-intensive tasks without freezing the page.
- **History API** — `history.pushState()`/`history.replaceState()` manipulate the browser's URL/history without a full page reload — the mechanism client-side routers (like React Router) are built on.

---

## 25. Best Practices & Common Pitfalls

- ✅ Always start a document with `<!DOCTYPE html>` and set `<meta charset="UTF-8">` first inside `<head>`.
- ✅ Always include the viewport meta tag for responsive behavior on mobile.
- ✅ Use semantic elements (`<nav>`, `<article>`, `<header>`, etc.) instead of `<div>` soup wherever meaning applies.
- ✅ Always give images meaningful `alt` text (or `alt=""` if purely decorative) — never omit the attribute entirely.
- ✅ Always pair form inputs with `<label>` elements connected via `for`/`id`.
- ✅ Use CSS for all visual styling — never legacy presentational attributes (`bgcolor`, `align`, `<font>`, `border` on `<table>`, etc.).
- ✅ Prefer `defer` on `<script>` tags that manipulate the DOM, or place scripts at the end of `<body>`.
- ⚠️ Don't use tables for page layout — only for genuinely tabular data; use CSS Flexbox/Grid for layout.
- ⚠️ Don't skip heading levels purely to get a smaller font — control size with CSS, keep heading hierarchy logical.
- ⚠️ Don't rely on `placeholder` as a replacement for `<label>` — it disappears on input and isn't a reliable accessibility substitute.
- ⚠️ Remember `id` values must be unique per page — reusing an `id` breaks CSS/JS targeting and internal hyperlinks (Section 12) unpredictably (the browser only ever matches the first occurrence).
- ⚠️ Elements like `<marquee>` and the `<font>` tag are obsolete — recognize them in legacy code, but always use modern CSS equivalents in new work.
- 🔧 Validate HTML with the [W3C Markup Validator](https://validator.w3.org/) to catch structural errors, unclosed tags, and invalid nesting.

---

### How to use this file
- Jump to any section via the [Table of Contents](#table-of-contents).
- Every example either comes directly from the repo's numbered practice files (`00-basic-structure.html` through `12-forms.html`) or extends the same topics with official HTML5/MDN standards not present in the repo (semantic elements, accessibility, HTML5 APIs, metadata) so this file covers HTML end-to-end, from a blank boilerplate to a fully accessible, semantic, modern page.
