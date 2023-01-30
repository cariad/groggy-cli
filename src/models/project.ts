import fs from 'fs';
import path from 'path';

import IProject from '../interfaces/project.js';
import IProjectSchema from '../interfaces/schemas/project.js';
import Surface from './surface.js';
import SurfaceCallback from '../types/surface-callback.js';

export default class Project implements IProject {
  public readonly data: IProjectSchema;

  public readonly path: string;

  private static readonly RENDERS_DIR = 'renders';

  private static readonly SURFACES_DIR = 'surfaces';

  private static readonly TEXTURE_SETS_DIR = 'texture-sets';

  constructor(data: IProjectSchema, projectPath: string) {
    this.data = data;
    this.path = projectPath;
  }

  public static load(directory: string): Project {
    const projectDir = path.resolve(directory);
    const file = path.join(projectDir, 'project.json');
    const buffer = fs.readFileSync(file);
    const s = buffer.toString();
    const data = JSON.parse(s) as IProjectSchema;
    return new Project(data, projectDir);
  }

  public get rendersPath(): string {
    return path.join(this.path, Project.RENDERS_DIR);
  }

  public get surfacesPath(): string {
    return path.join(this.path, Project.SURFACES_DIR);
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

  public forEachSurface(cb: SurfaceCallback): void {
    const names = this.getAllJsonNames(Project.SURFACES_DIR);

    names.forEach((name) => {
      const surface = Surface.load(name, this);
      cb(surface);
    });
  }

  public getTextureSets(): string[] {
    return this.getAllJsonNames(Project.TEXTURE_SETS_DIR);
  }

  public getTextureSetDataFilename(name: string): string {
    return path.join(this.path, Project.TEXTURE_SETS_DIR, `${name}.json`);
  }

  public getTextureSetImageFilename(name: string): string {
    return path.join(this.path, Project.TEXTURE_SETS_DIR, `${name}.png`);
  }
}
