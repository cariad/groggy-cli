import fs from 'fs';
import path from 'path';

import IProject from '../interfaces/project.js';
import ISurface from '../interfaces/surface.js';
import ISurfaceSchema from '../interfaces/schemas/surface.js';

export default class Surface implements ISurface {
  public readonly data: ISurfaceSchema;

  public readonly name: string;

  constructor(data: ISurfaceSchema, name: string) {
    this.data = data;
    this.name = name;
  }

  public static load(name: string, project: IProject): Surface {
    const file = path.join(project.surfacesPath, `${name}.json`);
    const buffer = fs.readFileSync(file);
    const s = buffer.toString();
    const data = JSON.parse(s) as ISurfaceSchema;
    return new Surface(data, name);
  }

  public get size(): [number, number] {
    let width = this.data.surface[0] + this.data.surface[2];
    let height = this.data.surface[1] + this.data.surface[3];

    this.data.textures.forEach((t) => {
      width = Math.max(width, t.cell[0]);
      height = Math.max(height, t.cell[1]);
    });

    return [width, height];
  }
}
