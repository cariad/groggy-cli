import ICommandBuilder from '../interfaces/command-builder';

type MakeCommandBuilder = (projectPath: string) => ICommandBuilder;

export default MakeCommandBuilder;
