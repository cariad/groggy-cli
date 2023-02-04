import fs from 'fs';

import IProject from '../interfaces/project.js';
import ISurface from '../interfaces/surface.js';
import ISurfaceSchema from '../interfaces/schemas/surface.js';
import Surface from './surface.js';

export default class Surfaces {
  private readonly project: IProject;

  private readonly surfaces: Map<string, ISurface>;

  constructor(project: IProject) {
    this.project = project;
    this.surfaces = new Map();
    console.info('Created a new managed collection of surfaces');
  }

  public get(name: string): ISurface {
    const loaded = this.surfaces.get(name);

    if (loaded !== undefined) return loaded;

    console.info('Loading surface:', name);

    const file = this.project.getSurfaceDataFilename(name);
    const content = fs.readFileSync(file).toString();
    const data = JSON.parse(content) as ISurfaceSchema;
    const surface = new Surface(data, name);
    this.surfaces.set(name, surface);
    return surface;
  }
}
