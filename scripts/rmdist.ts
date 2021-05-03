/**
 * Delete dist folder
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *
 * @license: MIT License
 *
 */
import * as shell from "shelljs";
declare const __dirname: string;

const path = `${__dirname}/../dist`;

shell.rm("-Rf", path);
