import ITextureSetSchema from './texture-set-schema';
import Rectangle from '../types/rectangle';

export default interface ITextureSet {
  data: ITextureSetSchema;
  imagePath: string;
  name: string;
  textureCount: number;

  getTextureSource(textureName: string): Rectangle;
}
