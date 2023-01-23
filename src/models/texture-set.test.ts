import TextureSet from './texture-set';

const model = new TextureSet({ grid: 12 }, 'demo');

test('gets grid', () => {
  expect(model.grid).toBe(12);
});
