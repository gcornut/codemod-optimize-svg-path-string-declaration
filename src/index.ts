import type { FileInfo, API, StringLiteral } from 'jscodeshift';
// @ts-ignore
import svgo from 'svgo/dist/svgo.browser.js';

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

/**
 * Transform string svg path variable declaration with optimized svg path.
 */
export default function transform(
    file: FileInfo,
    api: API,
): string | undefined {
    const j = api.jscodeshift;
    const root = j(file.source);

    // Find `<X> = <string>` declaration
    root.find(
        j.VariableDeclarator,
        {
            init: {
                type: 'StringLiteral',
            },
        },
    ).forEach(path => {
        // Right part of the declaration
        const stringLiteral = path.value.init as StringLiteral;

        // Skip if string is not an SVG path
        if (!SVG_PATH_START_RX.test(stringLiteral.value)) return;

        // Optimize the SVG path
        const optimized = optimizeSVGPath(stringLiteral.value);
        if (optimized) {
            stringLiteral.value = optimized;
        }
    });

    return root.toSource();
}
