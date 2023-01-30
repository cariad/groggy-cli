import { Image } from 'canvas';

import ITextureSetSchema from './schemas/texture-set';
import Rectangle from '../types/rectangle';

export default interface ITextureSet {
  data: ITextureSetSchema;
  name: string;
  textureCount: number;

  getImage(): Promise<Image>;
  getTextureSource(textureName: string): Rectangle;
}
