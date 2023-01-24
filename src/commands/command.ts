import ICommand from '../interfaces/command.js';
import IProject from '../interfaces/project.js';

export default abstract class Command implements ICommand {
  public readonly project: IProject;

  constructor(project: IProject) {
    this.project = project;
  }

  abstract invoke(): void;
}
