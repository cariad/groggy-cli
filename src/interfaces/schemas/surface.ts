import ITextureTargetSchema from './texture-target';
import Rectangle from '../../types/rectangle';

export default interface ISurfaceSchema {
  grid: number;
  surface: Rectangle;
  textures: ITextureTargetSchema[];
}
