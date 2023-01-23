import ICommand from '../interfaces/command.js';
import ProjectModel from '../models/project.js';

export default abstract class Command implements ICommand {
  public readonly project: ProjectModel;

  constructor(project: ProjectModel) {
    this.project = project;
  }

  abstract invoke(): void;
}
