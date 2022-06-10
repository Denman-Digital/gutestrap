# Gutestrap BSv4
 
> ⚠️ **Important** ⚠️
> 
>   Gutestrap BSv4 uses the layout styles from Bootstrap version 4. Version 5 of Bootstrap dropped support for a number of older browsers, and leans hard into using CSS variables. This version of Gutestrap exists only for projects where supporting legacy(ish) browsers is crucial. In all other cases, use the latest version of regular [Gutestrap](https://github.com/Denman-Digital/gutestrap).

Bootstrap layout blocks for Gutenberg.

<br>

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

<br>

## Configuration

### Enable/Disable Gutestrap Blocks for Post Types

```php
add_filter("gutestrap_enable_for_post_type", function (bool $current_status, string $post_type_name): bool {
	return $post_type_name === "my_cpt" ? false : $current_status;
}, 10, 2);
```

### Enable Border Colors (experimental)

```php
add_theme_support("gutestrap-border-colors"),
```
