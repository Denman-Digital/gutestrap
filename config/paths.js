/**
 * Paths
 *
 * Project related paths.
 */

const path = require("path");
const fs = require("fs");

// Make sure any symlinks in the project folder are resolved:
const pluginDir = fs.realpathSync(process.cwd());
const resolvePlugin = (relativePath) => path.resolve(pluginDir, relativePath);

// Config after eject: we're in ./config/
module.exports = {
	dotenv: resolvePlugin(".env"),
	pluginSrc: resolvePlugin("src"), // Plugin src folder path.
	pluginBlocksJs: resolvePlugin("src/blocks.js"),
	pluginClassicJs: resolvePlugin("src/classic.js"),
	yarnLockFile: resolvePlugin("yarn.lock"),
	pluginDist: resolvePlugin("."), // We are in ./dist folder already so the path '.' resolves to ./dist/.
	babelExclude: new RegExp(fs.readFileSync(path.resolve("./.non_ES5_node_modules"), "utf-8").slice(1, -2)),
};
