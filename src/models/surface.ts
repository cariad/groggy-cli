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
}
