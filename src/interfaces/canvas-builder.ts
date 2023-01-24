import { Image } from 'canvas';

import Point from '../types/point';
import Rectangle from '../types/rectangle';

export default interface ICanvasBuilder {
  drawImage(image: Image, source: Rectangle, at: Point): ICanvasBuilder;

  drawText(text: string, at: Point): ICanvasBuilder;

  export(to: string): ICanvasBuilder;

  setFontSize(px: number): ICanvasBuilder;
}
