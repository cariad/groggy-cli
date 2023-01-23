import { version } from './version';

test('can read version', () => {
  expect(version).toBe('0.0.0');
});
