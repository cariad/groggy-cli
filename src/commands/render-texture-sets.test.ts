import { CanvasBuilder } from 'canvasbuilder';
import Project from '../models/project';
import RenderTextureSetsCommand from './render-texture-sets';

const project = Project.load('demo');

test('invoke creates and exports an image', async () => {
  const canvasBuilder = new CanvasBuilder();

  const command = new RenderTextureSetsCommand(project, canvasBuilder);
  await command.invoke();

  expect(canvasBuilder.events).toEqual([
    {
      function: 'setSize',
      height: 204,
      width: 150,
    },
    {
      function: 'fillRectangle',
      rectangle: [0, 0, 150, 204],
      style: 'white',
    },
    {
      function: 'setFontSize',
      size: 14,
    },
    {
      at: [10, 24],
      function: 'fillText',
      text: '"demo" texture set',
    },
    {
      at: [10, 44],
      function: 'drawImage',
      image: 'demo/texture-sets/demo.png',
      source: [0, 0, 16, 16],
    },
    {
      at: [36, 59],
      function: 'fillText',
      text: 'Wall',
    },
    {
      at: [10, 74],
      function: 'drawImage',
      image: 'demo/texture-sets/demo.png',
      source: [16, 0, 16, 16],
    },
    {
      at: [36, 89],
      function: 'fillText',
      text: 'WallTop',
    },
    {
      at: [10, 104],
      function: 'drawImage',
      image: 'demo/texture-sets/demo.png',
      source: [32, 0, 16, 16],
    },
    {
      at: [36, 119],
      function: 'fillText',
      text: 'FloorLeft',
    },
    {
      at: [10, 134],
      function: 'drawImage',
      image: 'demo/texture-sets/demo.png',
      source: [48, 0, 16, 16],
    },
    {
      at: [36, 149],
      function: 'fillText',
      text: 'Floor',
    },
    {
      at: [10, 164],
      function: 'drawImage',
      image: 'demo/texture-sets/demo.png',
      source: [64, 0, 16, 16],
    },
    {
      at: [36, 179],
      function: 'fillText',
      text: 'FloorRight',
    },
    {
      function: 'export',
      to: 'demo/renders/demo.texture-set.png',
    },
  ]);
});
