import { Image } from 'canvas';

import Rectangle from '../types/rectangle';
import Vector from '../types/vector';

export default interface ICanvasBuilder {
  drawImage(image: Image, source: Rectangle, at: Vector): ICanvasBuilder;

  drawText(text: string, at: Vector): ICanvasBuilder;

  export(to: string): ICanvasBuilder;

  setFontSize(px: number): ICanvasBuilder;
}
