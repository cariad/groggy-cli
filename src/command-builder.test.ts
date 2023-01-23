import CommandBuilder from './command-builder';
import RenderTextureSetsCommand from './commands/render-texture-sets';

const commandBuilder = new CommandBuilder('demo');

test('renderTextureSets returns a command', () => {
  const command = commandBuilder.renderTextureSets();
  expect(command).toBeInstanceOf(RenderTextureSetsCommand);
});
