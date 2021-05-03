module.exports = {
	// Server
	"server": {
		"port": 5000,
	},

	// Debug
	"debug": true,

	// LOGS
	"log": {
		"path": {
			"debug_log": "./logs/debug.log",
			"error_log": "./logs/errors.log"
		},
		"language": "en", // set language of log type, NOTE: please help with translations! (optional, default en - values: en|it|pl)
		"colors": "enabled",  // enable/disable colors in terminal (optional, default enabled - values: true|enabled or false|disabled)
		"debug": "enabled",   // enable/disable all logs with method debug (optional, default enabled - values: true|enabled or false|disabled)
		"info": "enabled",    // enable/disable all logs with method info (optional, default enabled - values: true|enabled or false|disabled)
		"warning": "enabled", // enable/disable all logs with method warning (optional, default enabled -  values: true|enabled or false|disabled)
		"error": "enabled",   // enable/disable all logs with method errors (optional, default enabled - values: true|enabled or false|disabled)
		"sponsor": "enabled", // enable/disable all logs with method sponsor (optional, default enabled - values: true|enabled or false|disabled)
		"write": "enabled",   // write the logs into a file, you need set path values (optional, default disabled - values: true|enabled or false|disabled)
		"type": "log"   // format of logs in files (optional, default log - values: log|json)
	}
};
