import fs from 'fs';
import path from 'path';

import ITextureSet from '../interfaces/texture-set.js';
import ITextureSetSchema from '../interfaces/texture-set-schema.js';

/**
 * A set of textures from a single image file.
 */
export default class TextureSet implements ITextureSet {
  public readonly name: string;

  private readonly data: ITextureSetSchema;

  constructor(data: ITextureSetSchema, name: string) {
    this.data = data;
    this.name = name;
  }

  public get grid(): number {
    return this.data.grid;
  }

  /**
   * Loads a texture set from the local filesystem.
   *
   * @param file Path to texture set JSON file
   * @returns Texture set
   */
  public static load(file: string): TextureSet {
    const buffer = fs.readFileSync(file);
    const s = buffer.toString();
    const data = JSON.parse(s) as ITextureSetSchema;
    const basename = path.basename(file);
    const extensionLength = path.extname(basename).length;
    const name = basename.substring(0, basename.length - extensionLength);
    return new TextureSet(data, name);
  }
}
