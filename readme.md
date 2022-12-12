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

> Last changed in v1.3.24

```scss
$grid-breakpoints: (
	xs: 0,
	sm: 576px,
	md: 768px,
	lg: 992px,
	xl: 1200px,
	xxl: 1420px,
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

$grid-gutter-width: 1.875rem;

:root {
	--gs-gutter-x: #{$grid-gutter-width};
	@each $breakpoint in map.keys($grid-breakpoints) {
		@if $breakpoint == xs {
			--gs-container-w-#{$breakpoint}: initial;
		} @else {
			--gs-container-w-#{$breakpoint}: #{map.get($container-max-widths, $breakpoint)};
		}
		@include media-breakpoint-up($breakpoint) {
			--gs-container-w: var(--gs-container-w-#{$breakpoint});
		}
	}
}
```

<br>

## Configuration

### Enable/Disable Gutestrap Blocks for Post Types

```php
function my_project_enable_gutestrap(bool $current_status, string $post_type_name): bool 
{
  return $post_type_name === "my_cpt" ? false : $current_status;
}
add_filter("gutestrap_enable_for_post_type", "my_project_enable_gutestrap", 10, 2);
```

### ~~Enable Border Colors (experimental)~~ (disabled)

```php
// add_theme_support("gutestrap-border-colors"), // disabled
```
