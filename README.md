# Groggy CLI

[![codecov](https://codecov.io/gh/cariad/groggy-cli/branch/main/graph/badge.svg?token=B7yiFeZ173)](https://codecov.io/gh/cariad/groggy-cli)

A CLI for managing Groggy game engine assets.

## Groggy project structure

A Groggy project is a directory that contains the following files:

```text
/texture-sets/<texture set name>.json
/texture-sets/<texture set name>.png
```

An example project is available at [github.com/cariad/groggy-cli/demo](https://github.com/cariad/groggy-cli/tree/main/demo).

### Texture sets

A _texture set_ is a pairing of:

1. A PNG image that contains one or more textures in a grid
2. A JSON document that describes the embedded textures

An example texture set is available at [github.com/cariad/groggy-cli/demo/texture-sets](https://github.com/cariad/groggy-cli/tree/main/demo/texture-sets).

The JSON schema is:

```json
{
  "grid": 16, // Width and height of each texture in pixels
  "textures": {
    // The name of each texture and its (x,y) coordinate in textures
    // (not pixels).
    // For example, the "Wall" texture is at the top left:
    "Wall": [0, 0],
    // ...the "WallTop" texture is one texture to the right:
    "WallTop": [1, 0],
    // ...and the "FloorLeft" texture is two textures to the right:
    "FloorLeft": [2, 0]
  }
}
```

## Commands

### render-textures

```console
npx groggy render-textures [--project PATH]
```

The `render-textures` command renders a project's texture sets to human-readable lookup tables. Each texture set is rendered to a "renders" subdirectory and named `<name>.texture-set.png`.

For example, [the demo texture set](https://github.com/cariad/groggy-cli/tree/main/demo/texture-sets) renders to:

![A lookup table of textures](https://media.githubusercontent.com/media/cariad/groggy-cli/main/demo/renders/demo.texture-set.png 'demo.texture-set.png')

## Development

### Running the CLI in development

```console
npm run build
./bin/cli.js [arguments]
```

## FAQ

### What's the Groggy game engine?

Groggy is the game engine I'm building to distract myself from the terror of existence. Groggy isn't online yet, much like the rest of us shouldn't.
