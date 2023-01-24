import path from 'path';

import Project from './project';
import TextureSet from './texture-set';

const textureSet = TextureSet.load('demo', new Project('demo'));

test('imagePath is correct', () => {
  const expected = path.join(path.resolve('demo'), 'texture-sets', 'demo.png');
  expect(textureSet.imagePath).toBe(expected);
});

test('textureCount is correct', () => {
  expect(textureSet.textureCount).toBe(5);
});

test('getTextureSource is correct', () => {
  expect(textureSet.getTextureSource('Wall')).toEqual([0, 0, 16, 16]);
  expect(textureSet.getTextureSource('FloorLeft')).toEqual([32, 0, 16, 16]);
  expect(textureSet.getTextureSource('FloorRight')).toEqual([64, 0, 16, 16]);
});
