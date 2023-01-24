import CanvasBuilder from './canvas-builder.js';
import Project from './models/project.js';
import RenderTextureSetsCommand from './commands/render-texture-sets.js';

export default class CommandBuilder {
  private readonly project: Project;

  constructor(projectPath: string) {
    this.project = new Project(projectPath);
  }

  public renderTextureSets(): RenderTextureSetsCommand {
    const makeCanvasBuilder = (w: number, h: number) => new CanvasBuilder(w, h);
    return new RenderTextureSetsCommand(this.project, makeCanvasBuilder);
  }
}
