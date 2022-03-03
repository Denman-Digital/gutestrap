# Gutestrap

Bootstrap layout blocks for Gutenberg

## 👉  `npm start`
- Use to compile and run the block in development mode.
- Watches for any changes and reports back any errors in your code.

## 👉  `npm run build`
- Use to build production code for your block inside `dist` folder.
- Runs once and reports back the gzip file sizes of the produced code.

<br>

---

<br>

## Grid values

> Last changed in v1.3.1

```scss
$grid-breakpoints: (
	xs: 0,
	sm: 576px,
	md: 768px,
	lg: 992px,
	xl: 1200px,
	xxl: 1440px,
	xxxl: 1680px,
);

$container-max-widths: (
	sm: 540px,
	md: 720px,
	lg: 960px,
	xl: 1140px,
	xxl: 1320px,
	xxxl: 1440px,
);

$grid-gutter-width: 30px;
```
