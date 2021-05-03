/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * Reset CHANGELOG
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *
 * @license: MIT License
 *
 */
import * as fs from "fs";

declare const __dirname;

const changelog = `# v1.0.0 (${new Date().toLocaleString("en-us", { month: "long", year: "numeric", day: "numeric" })})

-   First release

<!-- all-shields/sponsors-badges:START -->
<!-- all-shields/sponsors-badges:END -->
`;

fs.unlinkSync(`${__dirname}/../CHANGELOG.md`);
fs.writeFileSync(`${__dirname}/../CHANGELOG.md`, `${changelog}`, { encoding: "utf8" });
