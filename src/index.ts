// @ts-ignore
import svgo from 'svgo/dist/svgo.browser.js';
import type { Api } from '@codemod.com/workflow';

// RegExp used to detect the start of a svg path string
const SVG_PATH_START_RX = /^[Mm]\d/;

// SVG optimization: multi-pass with reduced float precision
const optimizeSVG = (svgString: string) => svgo.optimize(svgString, {
    multipass: true,
    floatPrecision: 2,
}).data;

// SVG path to SVG
const pathToSVG = (path: string) => `<svg><path d="${path.trim()}"/></svg>`;

// SVG to SVG path
const svgToPath = (svgString: string) => svgString.match(/path\s+d="([^"]+)"/)?.[1];

// Use svgo to optimize a SVG path
const optimizeSVGPath = (path: string) => svgToPath(optimizeSVG(pathToSVG(path)));

export async function workflow({ files }: Api) {
     await files()
        .jsFam()
        .astGrep("'$VALUE'")
        .replace(({getMatch}) => {
            const value = getMatch("VALUE")?.text();
            if (!value || !SVG_PATH_START_RX.test(value)) return;

            const optimized = optimizeSVGPath(value);
            if (optimized) {
                return optimized;
            }
        })
}
