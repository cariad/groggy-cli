import Project from './project';

const project = Project.load('demo');

test('getAllFiles finds all files', () => {
  const found = project.getAllFiles('texture-sets');
  expect(found).toEqual(['demo.json', 'demo.png']);
});

test('getAllJsonNames finds all JSON file names', () => {
  const found = project.getAllJsonNames('texture-sets');
  expect(found).toEqual(['demo']);
});

test('getTextureSets finds all texture sets', () => {
  const found = project.getTextureSets();
  expect(found).toEqual(['demo']);
});
