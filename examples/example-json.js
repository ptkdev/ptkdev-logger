/**
 * Logger: example (json output)
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *
 * @license: MIT License
 *
 */
const Logger = require("./../modules/logger"); // in your project use: require("@ptkdev/logger");

const options = {
	"language": "en", // set language of log type, NOTE: please help with translations! (optional, default en - values: en|it|pl|es|pt|de|ru)
	"colors": true,  // enable/disable colors in terminal (optional, default enabled - values: true|enabled or false|disabled)
	"debug": true,   // enable/disable all logs with method debug (optional, default enabled - values: true|enabled or false|disabled)
	"info": true,    // enable/disable all logs with method info (optional, default enabled - values: true|enabled or false|disabled)
	"warning": true, // enable/disable all logs with method warning (optional, default enabled -  values: true|enabled or false|disabled)
	"error": true,   // enable/disable all logs with method errors (optional, default enabled - values: true|enabled or false|disabled)
	"sponsor": true, // enable/disable all logs with method sponsor (optional, default enabled - values: true|enabled or false|disabled)
	"write": true,   // write the logs into a file, you need set path values (optional, default disabled - values: true|enabled or false|disabled)
	"type": "json",   // format of logs in files (optional, default log - values: log|json)
	"path": {        // if write is true, the library writes the logs to a path
		"debug_log": "./debug.json",  // all logs
		"error_log": "./errors.json", // only errors logs
	}
};

const logger = new Logger(options);
logger.info("your info message", "your tag");
logger.warning("your warning message", "your tag");
logger.error("your error message", "your tag");
logger.debug("your debug message", "your tag");
logger.sponsor("your sponsor message", "your tag");
logger.stackoverflow("your stackoverflow message", "your tag");
logger.docs("your docs message", "https://docs.yoursite.com", "your tag");