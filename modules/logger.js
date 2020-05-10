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
const fse = require("fs-extra");
const chalk = require("chalk");
const ansi = require("strip-ansi");
const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const languages = {
	en: require("../translations/en"),
	it: require("../translations/it"),
	pl: require("../translations/pl"),
	pt: require("../translations/pt"),
	es: require("../translations/es"),
	de: require("../translations/de"),
	ru: require("../translations/ru"),
	fr: require("../translations/fr")
};
const logger = console;
let Types = require("./types");

class Log {
	constructor(options = new Object) {
		if (typeof options.language === "undefined" || options.language === null) {
			options.language = "en";
		} else {
			Types.INFO.label = languages[options.language]["INFO"];
			Types.WARNING.label = languages[options.language]["WARNING"];
			Types.ERROR.label = languages[options.language]["ERROR"];
			Types.DEBUG.label = languages[options.language]["DEBUG"];
			Types.DOCS.label = languages[options.language]["DOCS"];
			Types.STACKOVERFLOW.label = languages[options.language]["STACKOVERFLOW"];
			Types.SPONSOR.label = languages[options.language]["SPONSOR"];
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

		this.config = options;
		this.TYPES_LOG = Types;
	}

	/**
	 * Date now
	 * =====================
	 * Current (now) date and time for prefix of logs. Timezone is supported.
	 *
	 * @param {string} format - format of date: json, timestamp or string (optional, deafult: string)
	 *
	 * @return {string} time - current Date.now()
	 *
	 */
	current_time(format = "string") {
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
	 * Output of console log to file
	 * =====================
	 * Write in debug.log and error.log in /logs folder
	 *
	 * @param {string} type - example: INFO/WARNING/ERROR/DEBUG or other valid type string (see ./types.js) (mandatory)
	 * @param {string} message - description of issue (mandatory)
	 * @param {string} tag - func unique tag (optional)
	 */
	append_file(type = "INFO", tag = "", message = "") {
		if (this.config.write === "enabled" || this.config.write === true) {
			if (this.config.type === "log") {
				if (tag !== "") {
					tag = `${tag}: `;
				}
				let log_text = `[${this.current_time()}] [${type.id}] ${tag}${message}\n`;

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

				debug_db.get("logs").push({level: level, time: this.current_time("timestamp"), date: this.current_time("json"), msg: ansi(message), tag: ansi(tag), v: 1}).write();

				if (type.id === "ERROR") {
					error_db.get("logs").push({level: level, time: this.current_time("timestamp"), date: this.current_time("json"), msg: ansi(message), tag: ansi(tag), v: 1}).write();
				}
			}
		}
	}

	/**
	 * Write to stdout
	 * =====================
	 * Log manager - don't use this directly. Use info() error() debug() warning()
	 *
	 * @param {string} type - example: INFO/WARNING/ERROR/DEBUG or other valid type string (see ./types.js) (mandatory)
	 * @param {string} tag - func unique tag (optional)
	 * @param {string} message - error, warning or info description (mandatory)
	 *
	 */
	log(type = "INFO", tag = "", message = "") {
		let time = this.TYPES_LOG.TIME;
		if (tag !== "") {
			tag = ` ${tag}:`;
		}
		if (this.config.colors === "enabled" || this.config.colors === true) {
			logger.log(chalk`${type.bgcolor(type.label)}${time.bgcolor(` ${this.current_time()} `)}${type.bgcolor(" ")}${type.color(tag)} ${type.color(message)}`);
		} else {
			logger.log(ansi(chalk`${type.bgcolor(type.label)}${time.bgcolor(` ${this.current_time()} `)}${type.bgcolor(" ")}${type.color(tag)} ${type.color(message)}`));
		}
	}

	/**
	 * Write to stderr
	 * =====================
	 * Log manager - don't use this directly. Use info() error() debug() warning()
	 *
	 * @param {string} type - example: INFO/WARNING/ERROR/DEBUG or other valid type string (see ./types.js) (mandatory)
	 * @param {string} tag - func unique tag (optional)
	 * @param {string} message - error, warning or info description (mandatory)
	 *
	 */
	err(type = "ERROR", tag = "", message = "") {
		let time = this.TYPES_LOG.TIME;
		if (tag !== "") {
			tag = ` ${tag}:`;
		}
		if (this.config.colors === "enabled" || this.config.colors === true) {
			logger.error(chalk`${type.bgcolor(type.label)}${time.bgcolor(` ${this.current_time()} `)}${type.bgcolor(" ")}${type.color(tag)} ${type.color(message)}`);
		} else {
			logger.error(ansi(chalk`${type.bgcolor(type.label)}${time.bgcolor(` ${this.current_time()} `)}${type.bgcolor(" ")}${type.color(tag)} ${type.color(message)}`));
		}
	}

	/**
	 * Output of console log: type info
	 * =====================
	 * Write log on console and file
	 *
	 * @param {string} message - description of issue (mandatory)
	 * @param {string} tag - func unique tag (optional)
	 *
	 */
	info(message = "", tag = "") {
		if (this.config.info === "enabled" || this.config.info === true) {
			this.log(this.TYPES_LOG.INFO, tag, `${message}`);
			this.append_file(this.TYPES_LOG.INFO, tag, message);
		}
	}

	/**
	 * Output of console log: type warning
	 * =====================
	 * Write log on console and file
	 *
	 * @param {string} message - description of issue (mandatory)
	 * @param {string} tag - func unique tag (optional)
	 *
	 */
	warning(message = "", tag = "") {
		if (this.config.warning === "enabled" || this.config.warning === true) {
			this.log(this.TYPES_LOG.WARNING, tag, `${message}`);
			this.append_file(this.TYPES_LOG.WARNING, tag, message);
		}
	}

	/**
	 * Output of console log: type error
	 * =====================
	 * Write log on console and file
	 *
	 * @param {string} message - description of issue (mandatory)
	 * @param {string} tag - func unique tag (optional)
	 *
	 */
	error(message = "", tag = "") {
		if (this.config.error === "enabled" || this.config.error === true) {
			this.err(this.TYPES_LOG.ERROR, tag, `${message}`);
			this.append_file(this.TYPES_LOG.ERROR, tag, message);
		}
	}

	/**
	 * Output of console log: type debug
	 * =====================
	 * Write log on console and file
	 *
	 * @param {string} message - description of issue (mandatory)
	 * @param {string} tag - func unique tag (optional)
	 *
	 */
	debug(message = "", tag = "") {
		if (this.config.debug === "enabled" || this.config.debug === true) {
			this.log(this.TYPES_LOG.DEBUG, tag, `${message}`);
			this.append_file(this.TYPES_LOG.DEBUG, tag, message);
		}
	}

	/**
	 * Output of console log: type docs
	 * =====================
	 * Write log on console and file
	 *
	 * @param {string} message - description of issue (mandatory)
	 * @param {string} tag - func unique tag (optional)
	 * @param {string} url - url of documentation (optional)
	 *
	 */
	docs(message = "", url = "", tag = "") {
		this.log(this.TYPES_LOG.DOCS, tag, `${message} - ${chalk.rgb(236, 135, 191).underline.italic(url)}`);
		this.append_file(this.TYPES_LOG.DOCS, tag, `${message} - ${chalk.rgb(236, 135, 191).underline.italic(url)}`);
	}

	/**
	 * Output of console log: type stackoverflow
	 * =====================
	 * Write log on console and file
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

		let url = `https://stackoverflow.com/search?q=${encodeURI(error_message)}`;
		this.log(this.TYPES_LOG.STACKOVERFLOW, tag, `${message} - ${chalk.rgb(41, 128, 185).underline.italic(url)}`);
		this.append_file(this.TYPES_LOG.STACKOVERFLOW, tag, `${message} - ${chalk.rgb(41, 128, 185).underline.italic(url)}`);
	}

	/**
	 * Output of console log: type sponsor
	 * =====================
	 * Write log on console and file
	 *
	 * @param {string} message - description of issue (mandatory)
	 * @param {string} tag - func unique tag (optional)
	 *
	 */
	sponsor(message = "", tag = "") {
		this.log(this.TYPES_LOG.SPONSOR, tag, message);
		this.append_file(this.TYPES_LOG.SPONSOR, tag, message);
	}
}

module.exports = Log;