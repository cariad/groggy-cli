import fs from 'fs/promises';
import path from 'path';

import FilenameCallback from '../types/filename-callback.js';
import TextureSet from './texture-set.js';
import TextureSetCallback from '../types/texture-set-callback.js';

export default class ProjectModel {
  public readonly projectPath: string;

  constructor(projectPath: string) {
    this.projectPath = path.resolve(projectPath);
  }

  public static async forEachFile(
    dir: string,
    cb: FilenameCallback,
  ): Promise<void> {
    await fs.readdir(dir).then((filenames) => {
      filenames.forEach((filename) => cb(path.join(dir, filename)));
    });
  }

  public static async forEachJson(
    dir: string,
    cb: FilenameCallback,
  ): Promise<void> {
    await ProjectModel.forEachFile(dir, (file) => {
      if (file.toLowerCase().endsWith('.json')) cb(file);
    });
  }

  public async forEachTextureSet(cb: TextureSetCallback): Promise<void> {
    const setsPath = path.join(this.projectPath, 'texture-sets');

    await ProjectModel.forEachJson(setsPath, (file) => {
      cb(TextureSet.load(file));
    });
  }
}
