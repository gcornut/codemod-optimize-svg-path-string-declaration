# optimize-svg-path-string-declaration

Optimize SVG path in string literal

## Installation

```bash
# Install from registry
codemod run optimize-svg-path-string-declaration

# Or run locally
yarn codemod workflow run -w workflow.yaml
```

## Usage

This codemod transforms string const declaration of SVG path to optimize it

```ts
// Before
export const icon1 = "M150 5 L75 200 L225 200 Z";

// After
export const icon1 = "M150 5 75 200h150Z";
```

## Development

```bash
# Test the transformation
yarn test

# Prettier format
yarn format

# Validate the workflow
yarn codemod workflow validate -w workflow.yaml

# Publish to registry
yarn codemod login
yarn codemod publish
```

## License

MIT
