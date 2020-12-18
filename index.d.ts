declare module "@ptkdev/logger" {
	interface RotateType {
		size: "10B" | "10K" | "10M" | "10G";
		encoding?: string;
	}

	interface PaletteElement {
		label: string;
		text: string;
		background: string;
	}

	interface PaletteType {
		info?: PaletteElement;
		warning?: PaletteElement;
		error?: PaletteElement;
		stackoverflow?: PaletteElement;
		docs?: PaletteElement;
		debug?: PaletteElement;
		sponsor?: PaletteElement;
		time?: Omit<PaletteElement, "text">;
	}

	interface PathType {
		debug_log: string;
		error_log: string;
	}

	interface LoggerOptions {
		language?: "de" | "en" | "es" | "fr" | "it" | "pl" | "pt" | "ru";
		colors?: boolean;
		debug?: boolean;
		info?: boolean;
		warning?: boolean;
		error?: boolean;
		sponsor?: boolean;
		write?: boolean;
		type?: "log" | "json";
		rotate?: RotateType;
		palette?: PaletteType;
		path?: PathType;
	}

	export default class Logger {
		constructor(options?: LoggerOptions);

		/**
		 * Logging of the debug message
		 * =====================
		 * This method show message on terminal and/or write message on file/json
		 *
		 * @param {string} message - description of issue (mandatory)
		 * @param {string} tag - func unique tag (optional)
		 *
		 */
		debug(message: string, tag?: string): void;

		/**
		 * Logging of the info message
		 * =====================
		 * This method show message on terminal and/or write message on file/json
		 *
		 * @param {string} message - description of issue (mandatory)
		 * @param {string} tag - func unique tag (optional)
		 *
		 */
		info(message: string, tag?: string): void;

		/**
		 * Logging of the warning message
		 * =====================
		 * This method show message on terminal and/or write message on file/json
		 *
		 * @param {string} message - description of issue (mandatory)
		 * @param {string} tag - func unique tag (optional)
		 *
		 */
		warning(message: string, tag?: string): void;

		/**
		 * Logging of the error message
		 * =====================
		 * This method show message on terminal and/or write message on file/json
		 *
		 * @param {string} message - description of issue (mandatory)
		 * @param {string} tag - func unique tag (optional)
		 *
		 */
		error(message: string, tag?: string): void;

		/**
		 * Logging of the sponsor message
		 * =====================
		 * This method show message on terminal and/or write message on file/json
		 *
		 * @param {string} message - description of issue (mandatory)
		 * @param {string} tag - func unique tag (optional)
		 *
		 */
		sponsor(message: string, tag?: string): void;

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
		stackoverflow(
			message: string,
			tag?: string,
			error_message?: string
		): void;

		/**
		 * Logging of the docs message
		 * =====================
		 * This method show message on terminal and/or write message on file/json
		 *
		 * @param {string} message - description of issue (mandatory)
		 * @param {string} url - url of documentation (optional)
		 * @param {string} tag - func unique tag (optional)
		 *
		 *
		 */
		docs(message: string, url?: string, tag?: string): void;
	}
}
