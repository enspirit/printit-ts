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
