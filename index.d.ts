declare module "@ptkdev/logger" {
	interface RotateType {
		size: "10B" | "10K" | "10M" | "10G";
	}

	interface PaletteElement {
		label: string;
		text: string;
		background: string;
	}

	interface PaletteType {
		info: PaletteElement;
		warning: PaletteElement;
		error: PaletteElement;
		stackoverflow: PaletteElement;
		docs: PaletteElement;
		debug: PaletteElement;
		sponsor: PaletteElement;
		time: Omit<PaletteElement, "text">;
	}

	interface PathType {
		debug_log: string;
		error_log: string;
	}

	interface LoggerOptions {
		language: "de" | "en" | "es" | "fr" | "it" | "pl" | "pt" | "ru";
		colors: boolean;
		debug: boolean;
		info: boolean;
		warning: boolean;
		error: boolean;
		sponsor: boolean;
		write: boolean;
		type: "log" | "json";
		rotate: RotateType;
		palette: PaletteType;
		path: PathType;
	}

	export default class Logger {
		constructor(options?: LoggerOptions);

		debug(message: string, tag?: string): void;
		info(message: string, tag?: string): void;
		warning(message: string, tag?: string): void;
		error(message: string, tag?: string): void;
		sponsor(message: string, tag?: string): void;
		stackoverflow(
			message: string,
			tag?: string,
			error_string?: string
		): void;
		docs(message: string, url?: string, tag?: string): void;
	}
}
