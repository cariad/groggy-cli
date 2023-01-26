import ITextureSetSchema from './schemas/texture-set';
import Rectangle from '../types/rectangle';

export default interface ITextureSet {
  data: ITextureSetSchema;
  imagePath: string;
  name: string;
  textureCount: number;

  getTextureSource(textureName: string): Rectangle;
}
