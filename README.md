# Printit - A dockerized web api to convert HTML & CSS to PDF

Printit is a docker image and web api to easily convert HTML
and CSS to PDF documents. It does not implement a rendering
engine, but encapsulates existing ones under an api:

- weasyprint
- princexml
- wkhtmltopdf

## Hacking

### Prerequisites

* make
* node.js >= 16
* ruby >= 2.7
* docker

### Install dependencies

Install dependencies first (npm for code, ruby for integration
tests) then run:

```
make deps
```

### Run the unit tests and TDD

To run unit tests:

```
make tests.unit
```

To TDD:

```
make tests.unit.watch
```

### Run integration tests

Start the api first (it reloads on every change):

```
make up
```

Then launch the webspicy tests:

```
make tests.integration
```
