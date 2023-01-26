import Project from '../models/project';
import TextureSet from '../models/texture-set';
import TextureSetRenderer from './texture-set';
import MockCanvasBuilder from '../testing/mock-canvas-builder';

const project = Project.load('demo');
const textureSet = TextureSet.load('demo', project);

test('constructor creates a canvas', () => {
  const [makeCanvasBuilder, canvasBuilder] = MockCanvasBuilder.prepare();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const renderer = new TextureSetRenderer(textureSet, makeCanvasBuilder);

  expect(makeCanvasBuilder).toBeCalledWith(150, 204);
  expect(canvasBuilder.log).toEqual(['setFontSize: px=14']);
});

test('render creates and exports an image', async () => {
  const [makeCanvasBuilder, canvasBuilder] = MockCanvasBuilder.prepare();

  const renderer = new TextureSetRenderer(textureSet, makeCanvasBuilder);
  await renderer.render('foo');

  expect(canvasBuilder.log).toEqual([
    'setFontSize: px=14',
    'drawText: text="demo" texture set at=10,24',
    'drawImage: source=0,0,16,16 at=10,44',
    'drawText: text=Wall at=36,59',
    'drawImage: source=16,0,16,16 at=10,74',
    'drawText: text=WallTop at=36,89',
    'drawImage: source=32,0,16,16 at=10,104',
    'drawText: text=FloorLeft at=36,119',
    'drawImage: source=48,0,16,16 at=10,134',
    'drawText: text=Floor at=36,149',
    'drawImage: source=64,0,16,16 at=10,164',
    'drawText: text=FloorRight at=36,179',
    'export: to=foo/demo.texture-set.png',
  ]);
});
