import { CanvasBuilder } from 'canvasbuilder';

import Project from './models/project.js';
import RenderSurfacesCommand from './commands/render-surfaces.js';
import RenderTextureSetsCommand from './commands/render-texture-sets.js';

export default class CommandBuilder {
  private readonly debug: boolean;

  private readonly project: Project;

  constructor(projectPath: string, debug = false) {
    this.debug = debug;
    this.project = Project.load(projectPath);
  }

  public renderSurfaces(): RenderSurfacesCommand {
    return new RenderSurfacesCommand(
      this.project,
      new CanvasBuilder({ debug: this.debug }),
    );
  }

  public renderTextureSets(): RenderTextureSetsCommand {
    return new RenderTextureSetsCommand(
      this.project,
      new CanvasBuilder({ debug: this.debug }),
    );
  }
}
