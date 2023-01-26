import path from 'path';

import Project from './project';

const project = Project.load('demo');

test('resolves the project path', () => {
  expect(path.isAbsolute(project.path)).toBeTruthy();
});

test('getAllFiles finds all files', () => {
  const found = project.getAllFiles('texture-sets');
  expect(found).toEqual(['demo.json', 'demo.png']);
});

test('getAllJsonNames finds all JSON file names', () => {
  const found = project.getAllJsonNames('texture-sets');
  expect(found).toEqual(['demo']);
});

test('forEachTextureSet finds all texture sets', () => {
  const found: string[] = [];
  project.forEachTextureSet((ts) => found.push(ts.name));
  expect(found).toEqual(['demo']);
});
