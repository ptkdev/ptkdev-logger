/**
 * Run
 * =====================
 *
 * Start module
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *
 * @license: MIT License
 *
 */
import m from "@app/functions/module";
import configs from "@configs/config";

(async () => {
	const { app } = await m({ text: "hello-world" });

	console.log(app());
	console.log(`debug: ${configs.debug}`);
})();
