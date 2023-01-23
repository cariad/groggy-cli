import path from 'path';

import ProjectModel from './project';

const model = new ProjectModel('demo');
const textureSets = path.join('demo', 'texture-sets');

test('forEachFile finds all files', async () => {
  const found: string[] = [];

  await ProjectModel.forEachFile(textureSets, (f) => found.push(f));

  expect(found).toEqual([
    'demo/texture-sets/demo.json',
    'demo/texture-sets/demo.png',
  ]);
});

test('forEachJson finds all files', async () => {
  const found: string[] = [];

  await ProjectModel.forEachJson(textureSets, (f) => found.push(f));

  expect(found).toEqual(['demo/texture-sets/demo.json']);
});

test('forEachTextureSet finds all texture sets', async () => {
  const found: string[] = [];

  await model.forEachTextureSet((ts) => found.push(ts.name));

  expect(found).toEqual(['demo']);
});
