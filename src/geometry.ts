import Vector from './types/vector';

export function addVector(v: Vector, n: number): Vector {
  return [v[0] + n, v[1] + n];
}

export function multiplyVector(v: Vector, n: number): Vector {
  return [v[0] * n, v[1] * n];
}
