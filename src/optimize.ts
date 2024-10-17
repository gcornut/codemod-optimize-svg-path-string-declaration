import { optimizeSVGPath } from "./svgo/index.js";
import { SvgPath } from "./svg-path-editor/svg.js";
import { optimizePath } from "./svg-path-editor/optimize-path.js";

export function multiPassOptimizePath(path: string) {
    let optimized = path;

    for (const _ of new Array(2)) {
        try {
            const optimized2 = optimizeSVGPath(optimized);
            if (optimized2.length < optimized.length)
                optimized = optimized2;
        } catch (e) {
        }

        try {
            let optimizedPath = new SvgPath(optimized);
            optimizePath(optimizedPath, {
                removeUselessComponents: true,
                removeOrphanDots: true,
                useShorthands: true,
                useHorizontalAndVerticalLines: true,
                useRelativeAbsolute: true,
                useReverse: true,
            });
            const optimized2 = optimizedPath.asString(2, true);
            if (optimized2.length < optimized.length)
                optimized = optimized2;
        } catch (e) {
        }
    }

    return optimized;
}
