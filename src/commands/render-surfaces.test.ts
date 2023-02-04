import { CanvasBuilder } from 'canvasbuilder';
import Project from '../models/project';
import RenderSurfacesCommand from './render-surfaces';

const project = Project.load('demo');

test('invoke creates and exports an image', async () => {
  const canvasBuilder = new CanvasBuilder();

  const command = new RenderSurfacesCommand(project, canvasBuilder);
  await command.invoke();

  expect(canvasBuilder.events).toEqual([
    {
      function: 'setSize',
      height: 222,
      width: 36,
    },
    {
      function: 'fillRectangle',
      rectangle: [0, 0, 36, 222],
      style: 'white',
    },
    // First render, wall top
    {
      at: [10, 10],
      function: 'drawImage',
      image: 'demo/texture-sets/demo.png',
      source: [16, 0, 16, 16],
    },
    // First render, wall
    {
      at: [10, 26],
      function: 'drawImage',
      image: 'demo/texture-sets/demo.png',
      source: [0, 0, 16, 16],
    },
    // First render, wall
    {
      at: [10, 42],
      function: 'drawImage',
      image: 'demo/texture-sets/demo.png',
      source: [0, 0, 16, 16],
    },
    // First render, wall
    {
      at: [10, 58],
      function: 'drawImage',
      image: 'demo/texture-sets/demo.png',
      source: [0, 0, 16, 16],
    },
    // First render, wall
    {
      at: [10, 74],
      function: 'drawImage',
      image: 'demo/texture-sets/demo.png',
      source: [0, 0, 16, 16],
    },
    // First render, wall
    {
      at: [10, 90],
      function: 'drawImage',
      image: 'demo/texture-sets/demo.png',
      source: [0, 0, 16, 16],
    },
    // Second render, wall top
    {
      at: [10, 116],
      function: 'drawImage',
      image: 'demo/texture-sets/demo.png',
      source: [16, 0, 16, 16],
    },
    // Second render, wall
    {
      at: [10, 132],
      function: 'drawImage',
      image: 'demo/texture-sets/demo.png',
      source: [0, 0, 16, 16],
    },
    // Second render, wall
    {
      at: [10, 148],
      function: 'drawImage',
      image: 'demo/texture-sets/demo.png',
      source: [0, 0, 16, 16],
    },
    // Second render, wall
    {
      at: [10, 164],
      function: 'drawImage',
      image: 'demo/texture-sets/demo.png',
      source: [0, 0, 16, 16],
    },
    // Second render, wall
    {
      at: [10, 180],
      function: 'drawImage',
      image: 'demo/texture-sets/demo.png',
      source: [0, 0, 16, 16],
    },
    // Second render, wall
    {
      at: [10, 196],
      function: 'drawImage',
      image: 'demo/texture-sets/demo.png',
      source: [0, 0, 16, 16],
    },
    // Surface highlight
    {
      function: 'strokeRectangle',
      rectangle: [10, 116, 16, 96],
      style: {
        style: 'magenta',
        width: 3,
      },
    },
    {
      function: 'export',
      to: 'demo/renders/wall.surface.png',
    },
  ]);
});
