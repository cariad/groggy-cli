import ICommand from './command';

export default interface ICommandBuilder {
  renderTextureSets(): ICommand;
}
