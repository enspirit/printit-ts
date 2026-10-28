## 2.2.1 - 2026-10-28

* Allow `id` and `dir` attributes on all tags during sanitization.
  Stripping `id` left a document's own `#section` links pointing at
  nothing, so anything carrying a table of contents came out with every
  entry dead. Stripping `dir` dropped the `dir="auto"` a renderer marks
  its output with, so right-to-left text was laid out as if it were
  English — and `bdo`, an allowed tag, means nothing without it.

## 2.2.0 - 2026-10-23

* Upgrade to Node 24 (now required), in the Docker image as well.
* Upgrade dependencies, including Express 5. Static files are now
  served with lowercase `charset=utf-8` and `.js` files as
  `text/javascript`.
* Tooling: TypeScript 6, ESLint 10 (flat config), mocha 12, chai 6.

## 2.1.0 - 2023-06-08

* Add support for html to docx conversion

## 2.0.3 - 2022-11-17

* Add tools and examples for using headers and footers with
  weasyprint.

## 2.0.2 - 2022-11-17

* Allow `class` attribute on all tags during sanitization, since
  a stylesheet can be provided as commandline argument.

## 2.0.1 - 2022-11-17

* Weasyprint input is always sanitized using sanitize-html
  to avoid security problems. There is no way to disable this
  for now.

  This means that stylesheets and inline styles are not
  supported (-s on commandline/options must be used).

## 2.0 - 2022-11-16

Printit 2.x is born, should be globally compatible with
Printit 1.x (written in Ruby and considered deprecated).

Only the weasyprint handler is supported for now, though.
