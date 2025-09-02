# optimize-svg-path-string-declaration

Optimize SVG path in string literal

## Installation

```bash
# Install from registry
codemod run optimize-svg-path-string-declaration

# Or run locally
codemod run -w workflow.yaml
```

## Usage

This codemod transforms string const declaration of SVG path to optimize it

```ts
// Before
export const icon1 = 'M150 5 L75 200 L225 200 Z';

// After
export const icon1 = 'M150 5 75 200h150Z';
```

## Development

```bash
# Test the transformation
npm test

# Validate the workflow
codemod validate -w workflow.yaml

# Publish to registry
codemod login
codemod publish
```

## License

MIT
