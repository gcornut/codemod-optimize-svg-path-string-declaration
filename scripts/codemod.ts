import type { Edit } from "@codemod.com/jssg-types/main";
import type { SgRoot } from "codemod:ast-grep";
import type TS from "codemod:ast-grep/langs/typescript";
import { multiPassOptimizePath } from "./optimize.ts";

// RegExp used to detect the start of a svg path string
const SVG_PATH_START_RX = /^[Mm]\d/;

async function transform(root: SgRoot<TS>): Promise<string> {
    const rootNode = root.root();

    const singleQuoteNodes = rootNode.findAll({
        rule: {
            pattern: "'$VALUE'",
        },
    });

    const doubleQuoteNodes = rootNode.findAll({
        rule: {
            pattern: '"$VALUE"',
        },
    });

    const edits = [...singleQuoteNodes, ...doubleQuoteNodes]
        .map((node) => {
            const value = node.getMatch("VALUE")?.text();
            if (!value || !SVG_PATH_START_RX.test(value)) {
                return null;
            }
            const optimized = multiPassOptimizePath(value);
            return node.replace(`"${optimized}"`);
        })
        .filter((node): node is Edit => !!node);

    const newSource = rootNode.commitEdits(edits);
    return newSource;
}

export default transform;
