export default interface ITextureSourcesSchema {
  // Texture ID: (x, y) location in source image.
  // Width and height is specified in the texture set.
  [id: string]: [number, number];
}
