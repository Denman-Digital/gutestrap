/* eslint-disable valid-jsdoc */
/**
 * Tasks for Gulp task runner.
 * @module Tasks
 * @author Paul Walton
 */

/* eslint-env node, es6 */
/* jshint ignore:start */

const glob = require("glob");
const path = require("path");
const through2 = require("through2");

// Gulp
const gulp = require("gulp");
const ifThen = require("gulp-if");
const plumber = require("gulp-plumber");
const lazypipe = require("lazypipe");
const rename = require("gulp-rename");
const gulpReplace = require("gulp-replace");

// Console & Logging
const log = require("fancy-log");
const chalk = require("chalk");
const size = require("gulp-size");
const humanize = require("humanize-duration");

// CSS
const sass = require("gulp-sass")(require("sass"));
const postCSS = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cleanCSS = require("gulp-clean-css");

// JS
const eslint = require("gulp-eslint");
const rollup = require("rollup");
const { babel } = require("@rollup/plugin-babel");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const json = require("@rollup/plugin-json");
const commonjs = require("@rollup/plugin-commonjs");
const replace = require("@rollup/plugin-replace");
const terser = require("gulp-terser-js");
const svgr = require("@svgr/rollup");

const env = process.env.NODE_ENV;

const pipelines = {
	/**
	 * Pipeline partial to handle errors.
	 * @function pipelines.errorHandler
	 */
	errorHandler: lazypipe().pipe(plumber, {
		errorHandler: function (err) {
			log.error(chalk.red(err));
			this.emit("end");
		},
	}),
	updateFileMTime: lazypipe().pipe(through2.obj, {
		function(file, _enc, cb) {
			var date = new Date();
			file.stat.atime = date;
			file.stat.mtime = date;
			cb(null, file);
		},
	}),
};

const stripCase = (str) =>
	str
		.replace(/([A-Z]+)/g, " $1")
		.replace(/[_-]+/g, " ")
		.replace(/\s+/g, " ")
		.trim()
		.toLowerCase();

const upperCaseWords = (str) => str.replace(/\b\w/g, (match) => match.toUpperCase());
const titleCase = (str) => upperCaseWords(stripCase(str));
const pascalCase = (str) => titleCase(str).replace(/\s+/g, "");
const lowerCaseFirst = (str) => str.charAt(0).toLowerCase() + str.slice(1);
const camelCase = (str) => lowerCaseFirst(pascalCase(str));

let isProductionMode = env === "production";
if (isProductionMode) {
	log.info(chalk.bgYellow(chalk.black("[!] PRODUCTION MODE [!]")));
}

let isWatching = false;
const imgExts = "png|jpeg|jpg|gif|svg";

/**
 * Preprocess CSS.
 * @example gulp styles
 * @global
 */
export function styles() {
	return (
		gulp
			.src(["style.scss", "editor.scss"], { cwd: "src", sourcemaps: true })
			.pipe(pipelines.errorHandler())
			.pipe(sass({ errLogToConsole: true }))
			.pipe(postCSS([autoprefixer()]))
			.pipe(pipelines.updateFileMTime())
			.pipe(
				cleanCSS({ compatibility: "*" }) // ~= IE 10+
			)
			.pipe(rename({ prefix: "blocks.", suffix: ".build" }))
			.pipe(size({ showFiles: true, showTotal: false, title: "Clean CSS ->" }))
			// .pipe(gulp.dest("dist", { sourcemaps: true }))
			.pipe(gulp.dest("dist", { sourcemaps: "." }))
	);
}

/**
 * Lint JS with ESLint
 * @example gulp lint
 * @global
 */
export function lint() {
	const warn = (str) => log.warn(chalk.yellow(str));
	const error = (str) => log.warn(chalk.red(str));
	return gulp
		.src("**/*.@(js|jsx)", { cwd: "src" })
		.pipe(eslint({ fix: !isWatching }))
		.pipe(
			eslint.result((result) => {
				if (result.messages.length) {
					const file = path.relative(__dirname, result.filePath);
					const link = (msg) => chalk.underline(`${file}(${msg.line},${msg.column})`);
					result.messages.forEach((msg) => {
						switch (msg.severity) {
							case 1:
								warn(`${link(msg)}: ${msg.message}`);
								break;
							case 2:
								error(`${link(msg)}: ${msg.message}`);
								break;
						}
					});
				}
			})
		)
		.pipe(ifThen(!isWatching, gulp.dest("src")));
}

const rollupOptions = {
	input: {
		external: ["jquery", "wp"],
		plugins: [
			replace({
				values: {
					"process.env.NODE_ENV": JSON.stringify(env),
				},
				preventAssignment: true,
			}),
			nodeResolve({
				extensions: [".mjs", ".js", ".json", ".node", ".jsx"],
			}),
			svgr(),
			json(),
			commonjs({
				sourceMap: false,
				exclude: "src/**",
			}),
			babel({
				exclude: "**/node_modules/**", // just in case
				babelHelpers: "bundled",
			}),
		],
		onwarn(warning) {
			log.warn(chalk.yellow(warning));
		},
	},
	output: {
		format: "iife",
		dir: "dist",
		sourcemap: "inline",
		sourcemapExcludeSources: true,
		globals: {
			jquery: "jQuery",
			wp: "wp",
		},
	},
};

/**
 * Roll up JavaScript.
 * * Rollup will only start with JS files in the root JS src folder.
 * * Rollup will not start with files named with a underscore prefix.
 * @example gulp bundleScripts
 * @global
 */
export function bundleScripts() {
	return Promise.all(
		glob.sync("!(_)*.@(js|jsx)", { cwd: "src" }).map((file) => {
			return rollup
				.rollup({
					input: `src/${file}`,
					...rollupOptions.input,
				})
				.then((bundle) => {
					return bundle.write({
						name: camelCase(path.basename(file)).replace(/\.js/i, "Js"),
						...rollupOptions.output,
					});
				});
		})
	);
}

/**
 * Roll up JavaScript.
 * * Rollup will only start with JS files in the root JS src folder.
 * * Rollup will not start with files named with a underscore prefix.
 * @example gulp watchScripts
 * @global
 */
export function watchScripts() {
	glob.sync("!(_)*.@(js|jsx)", { cwd: "src" }).map((file) => {
		const watcher = rollup.watch({
			input: `src/${file}`,
			...rollupOptions.input,
			output: {
				name: camelCase(path.basename(file)).replace(/\.js/i, "Js"),
				...rollupOptions.output,
			},
		});
		watcher.on("event", (event) => {
			switch (event.code) {
				case "START":
					break;
				case "BUNDLE_START":
					log.info(`Rolling up '${chalk.cyan(event.input)}'...`);
					break;
				case "BUNDLE_END":
					log.info(`Rolled up '${chalk.cyan(event.input)}' after ${chalk.magenta(humanize(event.duration))}`);
					break;
				case "END":
					break;
				case "ERROR":
					log.warn(chalk.red(event.error));
					break;
			}
		});
		return watcher;
	});
}

/**
 * Minify JavaScript with Terser.
 * * Ignores any file with `.min.js` identifier.
 * @example gulp minifyScripts
 * @global
 */
export function minifyScripts() {
	return gulp
		.src("!(*.min).js", {
			cwd: "dist",
			since: gulp.lastRun(minifyScripts),
			sourcemaps: true,
		})
		.pipe(
			terser({
				compress: {
					passes: 2,
				},
				mangle: true,
			})
		)
		.pipe(rename({ suffix: ".min" }))
		.pipe(size({ showFiles: true, showTotal: true, title: `minifyScripts ->` }))
		.pipe(gulp.dest("dist", { sourcemaps: "." }));
}

/**
 * Runs all script-related tasks.
 * @function scripts
 * @example gulp scripts
 * @global
 */
export const scripts = gulp.series(lint, bundleScripts, minifyScripts);

/**
 * Compile & process all assets.
 * @function build
 * @example gulp build
 * @global
 */
export const build = gulp.parallel(scripts, styles);

/**
 * Watch files for changes, running tasks accordingly.
 * @example gulp watch
 * @global
 */
export function watch() {
	isWatching = true;
	gulp.watch(`src/**/*.scss`, compileStyles);
	gulp.watch(`src/**/*.@(js|jsx)`, lint);
	gulp.watch(`dist/**/!(*.min).js`, minifyScripts);
	watchScripts();
}

export function watchStyles() {
	isWatching = true;
	gulp.watch(`src/**/*.scss`, compileStyles);
}

/**
 * Compile all assets, and watch files for changes.
 * * Default task.
 * @function dev
 * @example gulp dev
 * @example gulp
 * @global
 */
export const dev = gulp.series(build, watch);
export default dev;
