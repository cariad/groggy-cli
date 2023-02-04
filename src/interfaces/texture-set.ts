import { Image } from 'canvas';
import { ICanvasPainter } from 'canvasbuilder';

import ITextureSetSchema from './schemas/texture-set';
import Rectangle from '../types/rectangle';
import Vector from '../types/vector';

export default interface ITextureSet {
  data: ITextureSetSchema;
  name: string;
  textureCount: number;

  draw(texture: string, at: Vector, on: ICanvasPainter): void;
  getImage(): Promise<Image>;
  getTextureSource(textureName: string): Rectangle;
}
