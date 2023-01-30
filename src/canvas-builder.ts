import fs from 'fs';

import { Canvas, CanvasRenderingContext2D, Image, createCanvas } from 'canvas';

import ICanvasBuilder from './interfaces/canvas-builder';
import Rectangle from './types/rectangle';
import Vector from './types/vector';

export default class CanvasBuilder implements ICanvasBuilder {
  private readonly canvas: Canvas;

  private readonly ctx: CanvasRenderingContext2D;

  constructor(width: number, height: number) {
    this.canvas = createCanvas(width, height);
    this.ctx = this.canvas.getContext('2d');

    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, width, height);

    this.ctx.fillStyle = 'black';
  }

  drawImage(
    image: Image,
    [sx, sy, sw, sh]: Rectangle,
    [tx, ty]: Vector,
  ): CanvasBuilder {
    this.ctx.drawImage(image, sx, sy, sw, sh, tx, ty, sw, sh);
    return this;
  }

  public drawText(text: string, [x, y]: Vector): CanvasBuilder {
    this.ctx.fillText(text, x, y);
    return this;
  }

  public export(to: string): CanvasBuilder {
    const out = fs.createWriteStream(to);
    const stream = this.canvas.createPNGStream();
    stream.pipe(out);
    return this;
  }

  public setFontSize(px: number): CanvasBuilder {
    this.ctx.font = `${px}px`;
    return this;
  }
}
