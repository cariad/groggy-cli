import fs from 'fs';
import path from 'path';

import IProject from '../interfaces/project.js';
import TextureSet from './texture-set.js';
import TextureSetCallback from '../types/texture-set-callback.js';

export default class Project implements IProject {
  public readonly path: string;

  private static readonly TEXTURE_SETS_DIR = 'texture-sets';

  constructor(projectPath: string) {
    this.path = path.resolve(projectPath);
  }

  public get textureSetsPath(): string {
    return path.join(this.path, Project.TEXTURE_SETS_DIR);
  }

  public getAllFiles(subdirectory: string): string[] {
    const dir = path.join(this.path, subdirectory);
    return fs.readdirSync(dir);
  }

  public getAllJsonNames(subdirectory: string): string[] {
    return this.getAllFiles(subdirectory)
      .filter((f) => f.toLowerCase().endsWith('.json'))
      .map((f) => f.substring(0, f.length - '.json'.length));
  }

  public forEachTextureSet(cb: TextureSetCallback): void {
    const names = this.getAllJsonNames(Project.TEXTURE_SETS_DIR);

    names.forEach((name) => {
      const textureSet = TextureSet.load(name, this);
      cb(textureSet);
    });
  }
}
