import ITextureTargetSchema from './texture-target';
import Rectangle from '../../types/rectangle';

export default interface ISurfaceSchema {
  surface: Rectangle;
  textures: ITextureTargetSchema[];
}
