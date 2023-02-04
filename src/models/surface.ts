import ISurface from '../interfaces/surface.js';
import ISurfaceSchema from '../interfaces/schemas/surface.js';
import Vector from '../types/vector.js';

export default class Surface implements ISurface {
  public readonly data: ISurfaceSchema;

  public readonly name: string;

  constructor(data: ISurfaceSchema, name: string) {
    this.data = data;
    this.name = name;
  }

  public getSize(): Vector {
    let width = this.data.surface[0] + this.data.surface[2];
    let height = this.data.surface[1] + this.data.surface[3];

    this.data.textures.forEach((t) => {
      width = Math.max(width, t.cell[0]);
      height = Math.max(height, t.cell[1]);
    });

    return [width, height];
  }
}
