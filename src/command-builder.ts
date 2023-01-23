import RenderTextureSetsCommand from './commands/render-texture-sets.js';
import ProjectModel from './models/project.js';

export default class CommandBuilder {
  private readonly project: ProjectModel;

  constructor(projectPath: string) {
    this.project = new ProjectModel(projectPath);
  }

  public renderTextureSets(): RenderTextureSetsCommand {
    return new RenderTextureSetsCommand(this.project);
  }
}
