import Project from './project';
import TextureSets from './texture-sets';

const project = Project.load('demo');
const textureSets = new TextureSets(project);
const textureSet = textureSets.get('demo');

test('textureCount is correct', () => {
  expect(textureSet.textureCount).toBe(5);
});

test('getTextureSource is correct', () => {
  expect(textureSet.getTextureSource('Wall')).toEqual([0, 0, 16, 16]);
  expect(textureSet.getTextureSource('FloorLeft')).toEqual([32, 0, 16, 16]);
  expect(textureSet.getTextureSource('FloorRight')).toEqual([64, 0, 16, 16]);
});
