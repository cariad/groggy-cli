import ICommand from './command';

export default interface ICommandBuilder {
  renderSurfaces(): ICommand;
  renderTextureSets(): ICommand;
}
