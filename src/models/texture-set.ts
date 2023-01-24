import fs from 'fs';
import path from 'path';

import ITextureSet from '../interfaces/texture-set.js';
import ITextureSetSchema from '../interfaces/texture-set-schema.js';
import Project from './project.js';
import Rectangle from '../types/rectangle.js';

/**
 * A set of textures from a single image file.
 */
export default class TextureSet implements ITextureSet {
  public readonly data: ITextureSetSchema;

  public readonly name: string;

  public readonly project: Project;

  constructor(data: ITextureSetSchema, name: string, project: Project) {
    this.data = data;
    this.name = name;
    this.project = project;
  }

  public get imagePath(): string {
    return path.join(this.project.textureSetsPath, `${this.name}.png`);
  }

  public get textureCount(): number {
    return Object.keys(this.data.textures).length;
  }

  public getTextureSource(name: string): Rectangle {
    const texture = this.data.textures[name];
    return [
      texture[0] * this.data.grid,
      texture[1] * this.data.grid,
      this.data.grid,
      this.data.grid,
    ];
  }

  /**
   * Loads a texture set from the local filesystem.
   *
   * @param name Name of the texture set to load
   * @returns Texture set
   */
  public static load(name: string, project: Project): TextureSet {
    const file = path.join(project.textureSetsPath, `${name}.json`);
    const buffer = fs.readFileSync(file);
    const s = buffer.toString();
    const data = JSON.parse(s) as ITextureSetSchema;
    return new TextureSet(data, name, project);
  }
}
