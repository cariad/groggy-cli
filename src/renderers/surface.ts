import ICanvasBuilder from '../interfaces/canvas-builder.js';
import ISurface from '../interfaces/surface.js';
import MakeCanvasBuilder from '../types/make-canvas-builder.js';

export default class SurfaceRenderer {
  private readonly canvasBuilder: ICanvasBuilder;

  private readonly surface: ISurface;

  constructor(surface: ISurface, makeCanvasBuilder: MakeCanvasBuilder) {
    this.canvasBuilder = makeCanvasBuilder(100, 100);
    this.surface = surface;
  }

  public render(dir: string): void {
    console.debug(`TODO: render surface ${this.surface.name} to ${dir}`);
  }
}
