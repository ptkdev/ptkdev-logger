/**
 * Logger: write log
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 * 				  Ilya Chubarov [@agoalofalife] <agoalofalife@gmail.com>
 *
 * @license: MIT License
 *
 */
const path = require("path");
const fse = require("fs-extra");
const chalk = require("chalk");
const ansi = require("strip-ansi");
const rfs = require("rotating-file-stream");
const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const languages = {
	de: require("../translations/de"),
	en: require("../translations/en"),
	es: require("../translations/es"),
	fr: require("../translations/fr"),
	it: require("../translations/it"),
	pl: require("../translations/pl"),
	pt: require("../translations/pt"),
	ru: require("../translations/ru")
};
const logger = console;
const COLORS = {
	info: "INFO",
	warning: "WARNING",
	error: "ERROR",
	docs: "DOCS",
	stackoverflow: "STACKOVERFLOW",
	debug: "DEBUG",
	sponsor: "SPONSOR",
	time: "TIME"
};
let Types = require("./types");
class Logger {
	constructor(options = new Object) {
		if (isFalsy(options.language)) {
			options.language = "en";
		}

		Types.INFO.label = languages[options.language]["INFO"];
		Types.WARNING.label = languages[options.language]["WARNING"];
		Types.ERROR.label = languages[options.language]["ERROR"];
		Types.DEBUG.label = languages[options.language]["DEBUG"];
		Types.DOCS.label = languages[options.language]["DOCS"];
		Types.STACKOVERFLOW.label = languages[options.language]["STACKOVERFLOW"];
		Types.SPONSOR.label = languages[options.language]["SPONSOR"];

		setupCustomPaletteColors(options);

		options.colors = isTruthy(options.colors);
		options.debug = isTruthy(options.debug);
		options.info = isTruthy(options.info);
		options.warning = isTruthy(options.warning);
		options.error = isTruthy(options.error);

		if (isTruthy(options.type)) {
			options.type = "log";
		}

		setupLogWritingOutput(options);

		if (isFalsy(options.rotate)) {
			options.rotate = {
				size: "10M",
				encoding: "utf8"
			};
		}

		this.config = options;

		if (this.config.write === "enabled" || this.config.write === true) {
			const pad = num => (num > 9 ? "" : "0") + num;
			rfs.createStream((time, index) => {
				if (!time) {
					return this.config.path.debug_log;
				}

				return `${path.parse(this.config.path.debug_log).base.split(".")[0]}.${time.getFullYear()}${pad(time.getMonth() + 1)}${pad(time.getDate())}-${index}.${path.parse(this.config.path.debug_log).base.split(".")[1]}`;
			}, this.config.rotate);

			rfs.createStream((time, index) => {
				if (!time) {
					return this.config.path.error_log;
				}

				return `${path.parse(this.config.path.error_log).base.split(".")[0]}.${time.getFullYear()}${pad(time.getMonth() + 1)}${pad(time.getDate())}-${index}.${path.parse(this.config.path.error_log).base.split(".")[1]}`;
			}, this.config.rotate);

		}
		this.TYPES_LOG = Types;
	}

	/**
	 * Date now
	 * =====================
	 * Current (now) date and time for prefix of logs. Timezone is supported.
	 *
	 * @param {string} format - format of date: json, timestamp or string (optional, deafult: string)

	 * @return {string} time - current Date.now()
	 *
	 */
	currentTime(format = "string") {
		let tz_offset = (new Date()).getTimezoneOffset() * 60000;

		if (format === "json") {
			return (new Date(Date.now() - tz_offset)).toISOString();
		}

		if (format === "timestamp") {
			return (new Date(Date.now() - tz_offset)).getTime();
		}

		return (new Date(Date.now() - tz_offset)).toISOString().slice(0, -5).replace("T", " ");

	}

	/**
	 * Write the output of console.log() to file
	 * =====================
	 * Write messages to debug.log and error.log in /logs folder
	 *
	 * @param {string} type - example: INFO/WARNING/ERROR/DEBUG or other valid type string (see ./types.js) (mandatory)
	 * @param {string} message - description of issue (mandatory)
	 * @param {string} tag - func unique tag (optional)
	 *
	 */
	appendFile(type = "INFO", tag = "", message = "") {
		if (this.config.write === "enabled" || this.config.write === true) {
			if (this.config.type === "log") {
				if (tag !== "") {
					tag = `${tag}: `;
				}
				let log_text = `[${this.currentTime()}] [${type.id}] ${tag}${message}\n`;

				fse.appendFile(this.config.path.debug_log, ansi(log_text), (err) => {
					if (err) {
						logger.log(err);
					}
				});

				if (type.id === "ERROR") {
					fse.appendFile(this.config.path.error_log, ansi(log_text), (err) => {
						if (err) {
							logger.err(err);
						}
					});
				}
			} else {

				const debug_adapter = new FileSync(this.config.path.debug_log);
				const debug_db = lowdb(debug_adapter);
				const error_adapter = new FileSync(this.config.path.error_log);
				const error_db = lowdb(error_adapter);
				let level = 0;

				switch (type.id) {
					case "ERROR":
						level = 1;
						break;
					case "WARNING":
						level = 2;
						break;
					case "INFO":
						level = 3;
						break;
					case "DEBUG":
						level = 4;
						break;
					default:
						level = 5;
						break;
				}

				debug_db.defaults({logs: []}).write();
				error_db.defaults({logs: []}).write();

				debug_db.get("logs").push({level: level, time: this.currentTime("timestamp"), date: this.currentTime("json"), msg: ansi(message), tag: ansi(tag), v: 1}).write();

				if (type.id === "ERROR") {
					error_db.get("logs").push({level: level, time: this.currentTime("timestamp"), date: this.currentTime("json"), msg: ansi(message), tag: ansi(tag), v: 1}).write();
				}
			}
		}
	}

	/**
	 * Write to stdout
	 * =====================
	 * Stdout manager - don't use this directly. Use info() error() debug() warning()
	 *
	 * @param {string} type - example: INFO/WARNING/ERROR/DEBUG or other valid type string (see ./types.js) (mandatory)
	 * @param {string} tag - func unique tag (optional)
	 * @param {string} message - error, warning or info description (mandatory)
	 *
	 */
	stdout(type = "INFO", tag = "", message = "") {
		let time = this.TYPES_LOG.TIME;
		if (tag !== "") {
			tag = ` ${tag}:`;
		}
		if (this.config.colors === "enabled" || this.config.colors === true) {
			logger.log(chalk`${type.bgcolor(type.label)}${time.bgcolor(` ${this.currentTime()} `)}${type.bgcolor(" ")}${type.color(tag)} ${type.color(message)}`);
		} else {
			logger.log(ansi(chalk`${type.bgcolor(type.label)}${time.bgcolor(` ${this.currentTime()} `)}${type.bgcolor(" ")}${type.color(tag)} ${type.color(message)}`));
		}
	}

	/**
	 * Write to stderr
	 * =====================
	 * Stderr manager - don't use this directly. Use info() error() debug() warning()
	 *
	 * @param {string} type - example: INFO/WARNING/ERROR/DEBUG or other valid type string (see ./types.js) (mandatory)
	 * @param {string} tag - func unique tag (optional)
	 * @param {string} message - error, warning or info description (mandatory)
	 *
	 */
	stderr(type = "ERROR", tag = "", message = "") {
		let time = this.TYPES_LOG.TIME;
		if (tag !== "") {
			tag = ` ${tag}:`;
		}
		if (this.config.colors === "enabled" || this.config.colors === true) {
			logger.error(chalk`${type.bgcolor(type.label)}${time.bgcolor(` ${this.currentTime()} `)}${type.bgcolor(" ")}${type.color(tag)} ${type.color(message)}`);
		} else {
			logger.error(ansi(chalk`${type.bgcolor(type.label)}${time.bgcolor(` ${this.currentTime()} `)}${type.bgcolor(" ")}${type.color(tag)} ${type.color(message)}`));
		}
	}

	/**
	 * Logging of the info message
	 * =====================
	 * This method show message on terminal and/or write message on file/json
	 *
	 * @param {string} message - description of issue (mandatory)
	 * @param {string} tag - func unique tag (optional)
	 *
	 */
	info(message = "", tag = "") {
		if (this.config.info === "enabled" || this.config.info === true) {
			this.stdout(this.TYPES_LOG.INFO, tag, `${message}`);
			this.appendFile(this.TYPES_LOG.INFO, tag, message);
		}
	}

	/**
	 * Logging of the warning message
	 * =====================
	 * This method show message on terminal and/or write message on file/json
	 *
	 * @param {string} message - description of issue (mandatory)
	 * @param {string} tag - func unique tag (optional)
	 *
	 */
	warning(message = "", tag = "") {
		if (this.config.warning === "enabled" || this.config.warning === true) {
			this.stdout(this.TYPES_LOG.WARNING, tag, `${message}`);
			this.appendFile(this.TYPES_LOG.WARNING, tag, message);
		}
	}

	/**
	 * Logging of the error message
	 * =====================
	 * This method show message on terminal and/or write message on file/json
	 *
	 * @param {string} message - description of issue (mandatory)
	 * @param {string} tag - func unique tag (optional)
	 *
	 */
	error(message = "", tag = "") {
		if (this.config.error === "enabled" || this.config.error === true) {
			this.stderr(this.TYPES_LOG.ERROR, tag, `${message}`);
			this.appendFile(this.TYPES_LOG.ERROR, tag, message);
		}
	}

	/**
	 * Logging of the debug message
	 * =====================
	 * This method show message on terminal and/or write message on file/json
	 *
	 * @param {string} message - description of issue (mandatory)
	 * @param {string} tag - func unique tag (optional)
	 *
	 */
	debug(message = "", tag = "") {
		if (this.config.debug === "enabled" || this.config.debug === true) {
			this.stdout(this.TYPES_LOG.DEBUG, tag, `${message}`);
			this.appendFile(this.TYPES_LOG.DEBUG, tag, message);
		}
	}

	/**
	 * Logging of the docs message
	 * =====================
	 * This method show message on terminal and/or write message on file/json
	 *
	 * @param {string} message - description of issue (mandatory)
	 * @param {string} url - url of documentation (optional)
	 * @param {string} tag - func unique tag (optional)
	 *
	 */
	docs(message = "", url = "", tag = "") {
		let docs = this.TYPES_LOG.DOCS;

		this.stdout(this.TYPES_LOG.DOCS, tag, `${message} - ${docs.color.underline.italic(url)}`);
		this.appendFile(this.TYPES_LOG.DOCS, tag, `${message} - ${docs.color.underline.italic(url)}`);
	}

	/**
	 * Logging of the stackoverflow message
	 * =====================
	 * This method show message on terminal and/or write message on file/json
	 *
	 * @param {string} message - description of issue (mandatory)
	 * @param {string} tag - func unique tag (optional)
	 * @param {string} error_message - error message to stackoverflow (optional)
	 *
	 */
	stackoverflow(message = "", tag = "", error_message = null) {
		if (typeof error_message === "undefined" || error_message === null) {
			error_message = message;
		}

		let stackoverflow = this.TYPES_LOG.STACKOVERFLOW;

		let url = `https://stackoverflow.com/search?q=${encodeURI(error_message)}`;
		this.stdout(this.TYPES_LOG.STACKOVERFLOW, tag, `${message} - ${stackoverflow.color.underline.italic(url)}`);
		this.appendFile(this.TYPES_LOG.STACKOVERFLOW, tag, `${message} - ${stackoverflow.color.underline.italic(url)}`);
	}

	/**
	 * Logging of the sponsor message
	 * =====================
	 * This method show message on terminal and/or write message on file/json
	 *
	 * @param {string} message - description of issue (mandatory)
	 * @param {string} tag - func unique tag (optional)
	 *
	 */
	sponsor(message = "", tag = "") {
		this.stdout(this.TYPES_LOG.SPONSOR, tag, message);
		this.appendFile(this.TYPES_LOG.SPONSOR, tag, message);
	}
}

function isTruthy(property) {
	return typeof property !== "undefined" && property !== null;
}

function isFalsy(property) {
	return !property && property !== 0;
}

function bgColorOrDefault(customColor, defaultColor) {
	return isFalsy(customColor.background)
		? defaultColor
		: chalk.bgHex(customColor.background).hex(customColor.label);
}

function colorOrDefault(customColor, defaultColor) {
	return isFalsy(customColor.text)
		? defaultColor
		: chalk.hex(customColor.text);
}

/**
 * Setups if the logs are going to be written in a file and the file path
 * @param {*} options - the options
 */
function setupLogWritingOutput(options) {
	if (isFalsy(options.write)) {
		options.write = false;
	} else if (isFalsy(options.path)) {
		if (isFalsy(options.debug_log)) {
			options.debug_log = "./debug.log";
		}

		if (isFalsy(options.error_log)) {
			options.error_log = "./errors.log";
		}
	}
}

/**
 * Setups all custom colors provided
 * @param {*} options - the options
 */
function setupCustomPaletteColors(options) {
	if (isFalsy(options.palette)) {
		options.palette = null;
	} else {
		for (const property in options.palette) {
			const type = COLORS[property];

			if (COLORS[property]) {
				Types[type].bgcolor = bgColorOrDefault(options.palette[property], Types[type].bgcolor);
				Types[type].color = colorOrDefault(options.palette[property], Types[type].color);
			}
		}

	}
}

module.exports = Logger;
module.exports.default = Logger;
