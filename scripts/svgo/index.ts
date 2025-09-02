// @ts-ignore
import svgo from "svgo/dist/svgo.browser.js";

// SVG optimization: multi-pass with reduced float precision
const optimizeSVG = (svgString: string) =>
    svgo.optimize(svgString, {
        multipass: true,
        floatPrecision: 2,
    }).data;

// SVG path to SVG
const pathToSVG = (path: string) => `<svg><path d="${path.trim()}"/></svg>`;

// SVG to SVG path
// @ts-ignore
const svgToPath = (svgString: string) =>
    svgString.match(/path\s+d="([^"]+)"/)[1];

// Use svgo to optimize a SVG path
export const optimizeSVGPath = (path: string) =>
    svgToPath(optimizeSVG(pathToSVG(path)));
