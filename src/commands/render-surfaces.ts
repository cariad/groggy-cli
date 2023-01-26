import Command from './command.js';
import IProject from '../interfaces/project.js';
import MakeCanvasBuilder from '../types/make-canvas-builder.js';
import SurfaceRenderer from '../renderers/surface.js';

export default class RenderSurfacesCommand extends Command {
  private readonly makeCanvasBuilder: MakeCanvasBuilder;

  constructor(project: IProject, makeCanvasBuilder: MakeCanvasBuilder) {
    super(project);
    this.makeCanvasBuilder = makeCanvasBuilder;
  }

  public invoke(): void {
    this.project.forEachSurface((surface) => {
      const renderer = new SurfaceRenderer(surface, this.makeCanvasBuilder);
      renderer.render(this.project.rendersPath);
    });
  }
}
