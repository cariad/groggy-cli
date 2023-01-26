import CommandBuilder from './command-builder';
import RenderSurfacesCommand from './commands/render-surfaces';
import RenderTextureSetsCommand from './commands/render-texture-sets';

const commandBuilder = new CommandBuilder('demo');

test('renderSurfaces builds the correct command', () => {
  const command = commandBuilder.renderSurfaces();
  expect(command).toBeInstanceOf(RenderSurfacesCommand);
});

test('renderTextureSets builds the correct command', () => {
  const command = commandBuilder.renderTextureSets();
  expect(command).toBeInstanceOf(RenderTextureSetsCommand);
});
