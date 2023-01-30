import fs from 'fs';

import IProject from '../interfaces/project.js';
import ITextureSet from '../interfaces/texture-set.js';
import ITextureSetSchema from '../interfaces/schemas/texture-set.js';
import TextureSet from './texture-set.js';

export default class TextureSets {
  private readonly project: IProject;

  private readonly schemas: Map<string, ITextureSet>;

  constructor(project: IProject) {
    this.project = project;
    this.schemas = new Map();
  }

  public get(name: string): ITextureSet {
    const loaded = this.schemas.get(name);

    if (loaded !== undefined) return loaded;

    const file = this.project.getTextureSetDataFilename(name);
    const content = fs.readFileSync(file).toString();
    const data = JSON.parse(content) as ITextureSetSchema;
    const textureSet = new TextureSet(data, name, this.project);
    this.schemas.set(name, textureSet);
    return textureSet;
  }
}
