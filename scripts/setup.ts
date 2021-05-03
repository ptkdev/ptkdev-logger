/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
/**
 * Setup
 * =====================
 * Replace package name, authors, url with others values.
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *
 * @license: MIT License
 *
 */
import * as shell from "shelljs";
const replace = require("replace-in-file");
const setup = require("../setup.json");
const pkg = require("../package.json");

(async () => {
	try {
		await replace({
			files: ["**/*", ".*", "**/.*"],
			ignore: ["node_modules/**/*", "setup.json", "package-lock.json", "scripts/setup.ts", ".all-contributorsrc"],
			from: /github.com\/ptkdev-boilerplate\/node-module-boilerplate/g,
			to: setup.github_full_repository_url,
		});
	} catch (error) {
		console.error("Error occurred:", error);
	}

	try {
		await replace({
			files: ["**/*", ".*", "**/.*"],
			ignore: ["node_modules/**/*", "setup.json", "package-lock.json", "scripts/setup.ts", ".all-contributorsrc"],
			from: /github.com\/ptkdev\/node-module-boilerplate/g,
			to: setup.github_full_repository_url,
		});
	} catch (error) {
		console.error("Error occurred:", error);
	}

	try {
		await replace({
			files: ["**/*", ".*", "**/.*"],
			ignore: ["node_modules/**/*", "setup.json", "package-lock.json", "scripts/setup.ts", ".all-contributorsrc"],
			from: /githubusercontent.com\/ptkdev-boilerplate/g,
			to: setup.github_repository_url.replace("github.com", "githubusercontent.com"),
		});
	} catch (error) {
		console.error("Error occurred:", error);
	}

	try {
		await replace({
			files: ["**/*", ".*", "**/.*"],
			ignore: ["node_modules/**/*", "setup.json", "package-lock.json", "scripts/setup.ts", ".all-contributorsrc"],
			from: /githubusercontent.com\/ptkdev/g,
			to: setup.github_repository_url.replace("github.com", "githubusercontent.com"),
		});
	} catch (error) {
		console.error("Error occurred:", error);
	}

	try {
		await replace({
			files: ["**/*", ".*", "**/.*"],
			ignore: ["node_modules/**/*", "setup.json", "package-lock.json", "scripts/setup.ts", ".all-contributorsrc"],
			from: /github.com\/ptkdev-boilerplate/g,
			to: setup.github_repository_url,
		});
	} catch (error) {
		console.error("Error occurred:", error);
	}

	try {
		await replace({
			files: ["**/*", ".*", "**/.*"],
			ignore: ["node_modules/**/*", "setup.json", "package-lock.json", "scripts/setup.ts", ".all-contributorsrc"],
			from: /github.com\/ptkdev/g,
			to: setup.github_repository_url,
		});
	} catch (error) {
		console.error("Error occurred:", error);
	}

	try {
		await replace({
			files: ["**/*", ".*", "**/.*"],
			ignore: ["node_modules/**/*", "setup.json", "package-lock.json", "scripts/setup.ts", ".all-contributorsrc"],
			from: /@ptkdev\/node-module-boilerplate/g,
			to: setup.package_org !== "" ? `${setup.package_org}/${setup.package_name}` : setup.package_name,
		});
	} catch (error) {
		console.error("Error occurred:", error);
	}

	try {
		await replace({
			files: ["**/*", ".*", "**/.*"],
			ignore: ["node_modules/**/*", "setup.json", "package-lock.json", "scripts/setup.ts", ".all-contributorsrc"],
			from: /Node NPM Library Boilerplate/g,
			to: setup.display_name,
		});
	} catch (error) {
		console.error("Error occurred:", error);
	}

	try {
		await replace({
			files: ["**/*", ".*", "**/.*"],
			ignore: ["node_modules/**/*", "setup.json", "package-lock.json", "scripts/setup.ts", ".all-contributorsrc"],
			from: /Create your npm library with this friendly boilerplate. Use this respository as template for your new node library\/module/g,
			to: setup.description,
		});
	} catch (error) {
		console.error("Error occurred:", error);
	}

	try {
		await replace({
			files: ["**/*", ".*", "**/.*"],
			ignore: ["node_modules/**/*", "setup.json", "package-lock.json", "scripts/setup.ts", ".all-contributorsrc"],
			from: /Patryk Rzucidło \[@ptkdev\] <support@ptkdev.io> \(https:\/\/ptk.dev\)/g,
			to: setup.author,
		});
	} catch (error) {
		console.error("Error occurred:", error);
	}

	try {
		await replace({
			files: ["**/*", ".*", "**/.*"],
			ignore: ["node_modules/**/*", "setup.json", "package-lock.json", "scripts/setup.ts", ".all-contributorsrc"],
			from: /\[Patryk Rzucidło\]\(https:\/\/ptk.dev\) \(\[@PTKDev\]\(https:\/\/twitter.com\/ptkdev\)\) <\[support@ptkdev.io\]\(mailto:support@ptkdev.io\)>/g,
			to: setup.author_markdown,
		});
	} catch (error) {
		console.error("Error occurred:", error);
	}

	try {
		await replace({
			files: [".all-contributorsrc"],
			ignore: ["node_modules/**/*", "setup.json", "package-lock.json", "scripts/setup.ts"],
			from: /"projectName": "ptkdev-boilerplate\/node-module-boilerplate"/g,
			to: `"projectName": "${setup.github_full_repository_url.replace("github.com/", "")}"`,
		});
	} catch (error) {
		console.error("Error occurred:", error);
	}

	try {
		await replace({
			files: [".all-contributorsrc"],
			ignore: ["node_modules/**/*", "setup.json", "package-lock.json", "scripts/setup.ts"],
			from: /"projectOwner": "ptkdev"/g,
			to: `"projectOwner": "${setup.github_nickname}"`,
		});
	} catch (error) {
		console.error("Error occurred:", error);
	}

	try {
		await replace({
			files: [".github/**/*"],
			ignore: ["node_modules/**/*", "setup.json", "package-lock.json", "scripts/setup.ts"],
			from: /ptkdev/g,
			to: setup.github_nickname,
		});
	} catch (error) {
		console.error("Error occurred:", error);
	}

	try {
		await replace({
			files: ["**/*", ".*", "**/.*"],
			ignore: ["node_modules/**/*", "setup.json", "package-lock.json", "scripts/setup.ts", ".all-contributorsrc"],
			from: /node-module-boilerplate/g,
			to: setup.package_name.replace(setup.package_org),
		});
	} catch (error) {
		console.error("Error occurred:", error);
	}

	try {
		await replace({
			files: ["**/*", ".*", "**/.*"],
			ignore: ["node_modules/**/*", "setup.json", "package-lock.json", "scripts/setup.ts", ".all-contributorsrc"],
			from: /support@ptkdev.io/g,
			to: setup.email,
		});
	} catch (error) {
		console.error("Error occurred:", error);
	}

	try {
		await replace({
			files: ["package.json"],
			ignore: ["node_modules/**/*", "setup.json", "package-lock.json", "scripts/setup.ts"],
			from: pkg.version,
			to: "1.0.0",
		});
	} catch (error) {
		console.error("Error occurred:", error);
	}
})();
