/**
 * Tasks for Gulp task runner.
 * @module Tasks
 * @author Paul Walton
 */

/* eslint-env node, es6 */
/* eslint-disable compat/compat */

import * as url from "url";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

import glob from "glob";
import path from "path";
import through2 from "through2";

// Gulp
import gulp from "gulp";
import ifThen from "gulp-if";
import plumber from "gulp-plumber";
import lazypipe from "lazypipe";
import rename from "gulp-rename";

// Console & Logging
import log from "fancy-log";
import chalk from "chalk";
import size from "gulp-size";
import humanize from "humanize-duration";
import prettyBytes from "pretty-bytes";

// CSS
import * as dartSass from "sass";
import gulpSass from "gulp-sass";
const sass = gulpSass(dartSass);
import postCSS from "gulp-postcss";
import autoprefixer from "autoprefixer";
import cleanCSS from "gulp-clean-css";

// JS
import eslint from "gulp-eslint-new";
import { rollup, watch as rollupWatch } from "rollup";
import { babel } from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import terser from "@rollup/plugin-terser";
import svgr from "@svgr/rollup";

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

	/**
	 * Pipeline partial to update file modified time metadata.
	 * @function pipelines.updateFileMTime
	 */
	updateFileMTime: lazypipe().pipe(through2.obj, function (file, _enc, cb) {
		var date = new Date();
		file.stat.atime = date;
		file.stat.mtime = date;
		cb(null, file);
	}),
};

const stripCase = (str) =>
	str
		.replace(/([A-Z]+)/g, " $1")
		.replace(/[_-]+/g, " ")
		.replace(/\s+/g, " ")
		.trim()
		.toLowerCase();

const lowerCaseFirst = (str) => str.charAt(0).toLowerCase() + str.slice(1);

const camelCase = (str) =>
	lowerCaseFirst(
		stripCase(str)
			.replace(/\b\w/g, (match) => match.toUpperCase())
			.replace(/\s+/g, "")
	);

let isProductionMode = env === "production";
if (isProductionMode) {
	log.info(chalk.bgYellow(chalk.black("[!] PRODUCTION MODE [!]")));
}

let isWatching = false;

/**
 * Preprocess & minify CSS.
 * @example gulp styles
 * @global
 */
export function styles() {
	return gulp
		.src(["style.scss", "editor.scss", "compat.scss"], { cwd: "src", sourcemaps: true })
		.pipe(pipelines.errorHandler())
		.pipe(sass.sync().on("error", sass.logError))
		.pipe(postCSS([autoprefixer()]))
		.pipe(pipelines.updateFileMTime())
		.pipe(
			cleanCSS({
				compatibility: "*", // ~= IE 10+
				level: 1,
			})
		)
		.pipe(rename({ prefix: "blocks.", suffix: ".build" }))
		.pipe(size({ showFiles: true, showTotal: false, title: "Bundle styles ->" }))
		.pipe(gulp.dest("dist", { sourcemaps: isProductionMode && "." }));
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
		.pipe(
			eslint({
				fix: !isWatching,
			})
		)
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
		// external: ["jquery", "wp", /@wordpress\/(.*)/],
		external: (id) => {
			if (["jquery", "wp"].includes(id)) return true;
			return /^@wordpress\/(.*)$/.test(id) && "@wordpress/icons" !== id;
		},
		plugins: [
			replace({
				values: {
					"process.env.NODE_ENV": JSON.stringify(env),
				},
				preventAssignment: true,
			}),
			nodeResolve({
				browser: true,
				exportConditions: [isProductionMode ? env : "development"],
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
		entryFileNames: "[name].build.js",
		sourcemap: !isProductionMode && "inline",
		sourcemapExcludeSources: true,
		globals: (id) => {
			switch (id) {
				case "jquery":
					return "jQuery";
				case "wp":
					return "wp";
				default:
					return id.replace(/^@wordpress\/(.*)$/, (_match, pkg) => {
						return `wp.${camelCase(pkg)}`;
					});
			}
		},
		compact: isProductionMode,
		plugins: [
			terser({
				compress: { passes: 2 },
				mangle: isProductionMode,
			}),
		],
	},
};

/**
 * Roll up & minify JavaScript.
 * * Rollup will only start with JS files in the root JS src folder.
 * * Rollup will not start with files named with a underscore prefix.
 * @example gulp bundleScripts
 * @global
 */
export function bundleScripts() {
	return Promise.all(
		glob.sync("!(_)*.@(js|jsx)", { cwd: "src" }).map((file) => {
			return rollup({
				input: `src/${file}`,
				...rollupOptions.input,
			})
				.then((bundle) => {
					return bundle.write({
						name: camelCase(file).replace(/\.js/i, "Js"),
						...rollupOptions.output,
					});
				})
				.then(({ output }) => {
					const label = chalk.cyan("Bundle scripts ->"),
						file = chalk.blue(output[0].fileName),
						size = chalk.magenta(prettyBytes(output[0].code.length));
					log.info(`${label} ${file} ${size}`);
				});
		})
	);
}

/**
 * Watch and Rollup & minify JavaScript.
 * * Rollup will only start with JS files in the root JS src folder.
 * * Rollup will not start with files named with a underscore prefix.
 * @example gulp watchScripts
 * @global
 */
export function watchScripts() {
	glob.sync("!(_)*.@(js|jsx)", { cwd: "src" }).map((file) => {
		const watcher = rollupWatch({
			input: `src/${file}`,
			...rollupOptions.input,
			output: {
				name: camelCase(file).replace(/\.js/i, "Js"),
				...rollupOptions.output,
			},
		});
		watcher.on("event", (event) => {
			const file = chalk.blue(event.input);
			switch (event.code) {
				case "START":
					break;
				case "BUNDLE_START":
					log.info(`Rolling up ${file}...`);
					break;
				case "BUNDLE_END":
					const label = chalk.cyan("Rolled up ->"),
						duration = chalk.grey(`(${humanize(event.duration)})`);
					log.info(`${label} ${file} ${duration}`);
					if (event.result) {
						event.result.close();
					}
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
 * Runs all script-related tasks.
 * @function scripts
 * @example gulp scripts
 * @global
 */
export const scripts = gulp.series(lint, bundleScripts);

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
	gulp.watch(`src/**/*.scss`, styles);
	gulp.watch(`src/**/*.@(js|jsx)`, lint);
	watchScripts();
}

export function watchStyles() {
	isWatching = true;
	gulp.watch(`src/**/*.scss`, styles);
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
