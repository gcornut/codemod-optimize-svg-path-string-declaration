import type { Api } from "@codemod.com/workflow";
import { multiPassOptimizePath } from "./optimize.js";

// RegExp used to detect the start of a svg path string
const SVG_PATH_START_RX = /^[Mm]\d/;

export async function workflow({ files }: Api) {
    await files()
        .jsFam()
        .astGrep("'$VALUE'")
        .replace(({ getMatch, getNode }) => {
            const value = getMatch("VALUE")?.text();
            if (!value || !SVG_PATH_START_RX.test(value)) return;
            return multiPassOptimizePath(value);
        });
}
