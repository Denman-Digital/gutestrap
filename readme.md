![GuteStrap](https://raw.githubusercontent.com/Denman-Digital/gutestrap/main/assets/banner-1544x500.jpg)

# GuteStrap

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

> Last changed in v1.4.1

**NOTE:** We have switched to responsive units in the so that the breakpoints will also scale with user browser settings. The breakpoints use em values instead of rem values because (a) Safari does weird stuff with rem breakpoints, and (b) media queries aren't scoped to elements, so in media query `1em` is equal to `1rem`.

```scss
$grid-breakpoints: (
	xs: 0,
	sm: 36em, // 576px,
	md: 48em, // 768px,
	lg: 62em, // 992px,
	xl: 75em, // 1200px,
	xxl: 88.75em, // 1420px,
	xxxl: 105em, // 1680px,
	xxxxl: 118.75em // 1900px,
);

$container-max-widths: (
	sm: 33.75rem, // 540px,
	md: 45rem, // 720px,
	lg: 60rem, // 960px,
	xl: 71.25rem, // 1140px,
	xxl: 82.5rem, // 1320px,
	xxxl: 90rem, // 1440px,
	xxxxl: 108.75rem, // 1740px,
);

$grid-gutter-width: 1.875rem; // 30px

:root {
	--gs-gutter: #{$grid-gutter-width};
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

### Enable/Disable GuteStrap Blocks for Post Types

```php
function my_project_enable_gutestrap(bool $current_status, string $post_type_name): bool 
{
  return $post_type_name === "my_cpt" ? false : $current_status;
}
add_filter("gutestrap_enable_for_post_type", "my_project_enable_gutestrap", 10, 2);
```
