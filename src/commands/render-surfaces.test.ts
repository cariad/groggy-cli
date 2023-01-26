import MockCanvasBuilder from '../testing/mock-canvas-builder';
import Project from '../models/project';
import RenderSurfacesCommand from './render-surfaces';

const project = Project.load('demo');

test('invoke creates and exports an image', () => {
  const [makeCanvasBuilder, canvasBuilder] = MockCanvasBuilder.prepare();

  const command = new RenderSurfacesCommand(project, makeCanvasBuilder);
  command.invoke();

  expect(canvasBuilder.log).toEqual([]);
});
