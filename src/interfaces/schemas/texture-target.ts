import Point from '../../types/point';

export default interface ITextureTargetSchema {
  cell: Point;
  textureSet: string;
  texture: string;
}
