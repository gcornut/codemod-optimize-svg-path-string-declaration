# optimize-svg-path-string-declaration

## Description

Optimize SVG paths in string variable declarations using [`svgo`](https://github.com/svg/svgo).

## Examples

### Before

```ts
export const icon1 = 'M150 5 L75 200 L225 200 Z';
```

### After

```ts
export const icon1 = 'M150 5 75 200h150Z';
```

