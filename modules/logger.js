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
let Types = require("./types");
class Log {
	constructor(options = new Object) {
		if (typeof options.language === "undefined" || options.language === null) {
			options.language = "en";
		}

		Types.INFO.label = languages[options.language]["INFO"];
		Types.WARNING.label = languages[options.language]["WARNING"];
		Types.ERROR.label = languages[options.language]["ERROR"];
		Types.DEBUG.label = languages[options.language]["DEBUG"];
		Types.DOCS.label = languages[options.language]["DOCS"];
		Types.STACKOVERFLOW.label = languages[options.language]["STACKOVERFLOW"];
		Types.SPONSOR.label = languages[options.language]["SPONSOR"];

		if (typeof options.palette === "undefined" || options.palette === null) {
			options.palette = null;
		} else {
			if (typeof options.palette.info !== "undefined" && options.palette.info !== null) {
				Types.INFO.bgcolor = (typeof options.palette.info.background === "undefined" || options.palette.info.background === null) ? Types.INFO.bgcolor : chalk.bgHex(options.palette.info.background).hex(options.palette.info.label);
				Types.INFO.color = (typeof options.palette.info.text === "undefined" || options.palette.info.text === null) ? Types.INFO.color : chalk.hex(options.palette.info.text);
			}

			if (typeof options.palette.warning !== "undefined" && options.palette.warning !== null) {
				Types.WARNING.bgcolor = (typeof options.palette.warning.background === "undefined" || options.palette.warning.background === null) ? Types.WARNING.bgcolor : chalk.bgHex(options.palette.warning.background).hex(options.palette.warning.label);
				Types.WARNING.color = (typeof options.palette.warning.text === "undefined" || options.palette.warning.text === null) ? Types.WARNING.color : chalk.hex(options.palette.warning.text);
			}

			if (typeof options.palette.error !== "undefined" && options.palette.error !== null) {
				Types.ERROR.bgcolor = (typeof options.palette.error.background === "undefined" || options.palette.error.background === null) ? Types.ERROR.bgcolor : chalk.bgHex(options.palette.error.background).hex(options.palette.error.label);
				Types.ERROR.color = (typeof options.palette.error.text === "undefined" || options.palette.error.text === null) ? Types.ERROR.color : chalk.hex(options.palette.error.text);
			}

			if (typeof options.palette.debug !== "undefined" && options.palette.debug !== null) {
				Types.DEBUG.bgcolor = (typeof options.palette.debug.background === "undefined" || options.palette.debug.background === null) ? Types.DEBUG.bgcolor : chalk.bgHex(options.palette.debug.background).hex(options.palette.debug.label);
				Types.DEBUG.color = (typeof options.palette.debug.text === "undefined" || options.palette.debug.text === null) ? Types.DEBUG.color : chalk.hex(options.palette.debug.text);
			}

			if (typeof options.palette.docs !== "undefined" && options.palette.docs !== null) {
				Types.DOCS.bgcolor = (typeof options.palette.docs.background === "undefined" || options.palette.docs.background === null) ? Types.DOCS.bgcolor : chalk.bgHex(options.palette.docs.background).hex(options.palette.docs.label);
				Types.DOCS.color = (typeof options.palette.docs.text === "undefined" || options.palette.docs.text === null) ? Types.DOCS.color : chalk.hex(options.palette.docs.text);
			}

			if (typeof options.palette.stackoverflow !== "undefined" && options.palette.stackoverflow !== null) {
				Types.STACKOVERFLOW.bgcolor = (typeof options.palette.stackoverflow.background === "undefined" || options.palette.stackoverflow.background === null) ? Types.STACKOVERFLOW.bgcolor : chalk.bgHex(options.palette.stackoverflow.background).hex(options.palette.stackoverflow.label);
				Types.STACKOVERFLOW.color = (typeof options.palette.stackoverflow.text === "undefined" || options.palette.stackoverflow.text === null) ? Types.STACKOVERFLOW.color : chalk.hex(options.palette.stackoverflow.text);
			}

			if (typeof options.palette.sponsor !== "undefined" && options.palette.sponsor !== null) {
				Types.SPONSOR.bgcolor = (typeof options.palette.sponsor.background === "undefined" || options.palette.sponsor.background === null) ? Types.SPONSOR.bgcolor : chalk.bgHex(options.palette.sponsor.background).hex(options.palette.sponsor.label);
				Types.SPONSOR.color = (typeof options.palette.sponsor.text === "undefined" || options.palette.sponsor.text === null) ? Types.SPONSOR.color : chalk.hex(options.palette.sponsor.text);
			}

			if (typeof options.palette.time !== "undefined" && options.palette.time !== null) {
				Types.TIME.bgcolor = (typeof options.palette.time.background === "undefined" || options.palette.time.background === null) ? Types.TIME.bgcolor : chalk.bgHex(options.palette.time.background).hex(options.palette.time.label);
				Types.TIME.color = (typeof options.palette.time.text === "undefined" || options.palette.time.text === null) ? Types.TIME.color : chalk.hex(options.palette.time.text);
			}
		}

		if (typeof options.colors === "undefined" || options.colors === null) {
			options.colors = true;
		}

		if (typeof options.debug === "undefined" || options.debug === null) {
			options.debug = true;
		}

		if (typeof options.info === "undefined" || options.info === null) {
			options.info = true;
		}

		if (typeof options.warning === "undefined" || options.warning === null) {
			options.warning = true;
		}

		if (typeof options.error === "undefined" || options.error === null) {
			options.error = true;
		}

		if (typeof options.type === "undefined" || options.type === null) {
			options.type = "log";
		}

		if (typeof options.write === "undefined" || options.write === null) {
			options.write = false;
		} else if (typeof options.path === "undefined" || options.path === null) {
			if (typeof options.debug_log === "undefined" || options.debug_log === null) {
				options.debug_log = "./debug.log";
			}

			if (typeof options.error_log === "undefined" || options.error_log === null) {
				options.error_log = "./errors.log";
			}
		}

		if (typeof options.rotate === "undefined" || options.rotate === null) {
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

module.exports = Log;
module.exports.default = Log;