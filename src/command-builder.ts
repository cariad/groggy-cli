import CanvasBuilder from './canvas-builder.js';
import MakeCanvasBuilder from './types/make-canvas-builder.js';
import Project from './models/project.js';
import RenderSurfacesCommand from './commands/render-surfaces.js';
import RenderTextureSetsCommand from './commands/render-texture-sets.js';

export default class CommandBuilder {
  private readonly makeCanvasBuilder: MakeCanvasBuilder;

  private readonly project: Project;

  constructor(projectPath: string) {
    this.makeCanvasBuilder = (w: number, h: number) => new CanvasBuilder(w, h);
    this.project = Project.load(projectPath);
  }

  public renderSurfaces(): RenderSurfacesCommand {
    return new RenderSurfacesCommand(this.project, this.makeCanvasBuilder);
  }

  public renderTextureSets(): RenderTextureSetsCommand {
    return new RenderTextureSetsCommand(this.project, this.makeCanvasBuilder);
  }
}
