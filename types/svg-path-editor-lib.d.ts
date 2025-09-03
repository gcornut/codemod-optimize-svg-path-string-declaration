declare module "svg-path-editor-lib" {
    export class SvgPath {
        constructor(path: string);
        asString(precision?: number, useShorthands?: boolean): string;
    }

    export function optimizePath(path: SvgPath, options: any): void;
}
