import path from 'path';

import { Image } from 'canvas';

import ICanvasBuilder from '../interfaces/canvas-builder';
import MakeCanvasBuilder from '../types/make-canvas-builder';
import Vector from '../types/vector';
import Rectangle from '../types/rectangle';

export default class MockCanvasBuilder implements ICanvasBuilder {
  public readonly log: string[];

  constructor() {
    this.log = [];
  }

  public static prepare(): [MakeCanvasBuilder, MockCanvasBuilder] {
    const canvasBuilder = new MockCanvasBuilder();
    const makeCanvasBuilder = jest.fn(() => canvasBuilder);
    return [makeCanvasBuilder, canvasBuilder];
  }

  public drawImage(image: Image, source: Rectangle, at: Vector): ICanvasBuilder {
    this.log.push(`drawImage: source=${source.toString()} at=${at.toString()}`);
    return this;
  }

  public drawText(text: string, at: Vector): ICanvasBuilder {
    this.log.push(`drawText: text=${text} at=${at.toString()}`);
    return this;
  }

  public export(to: string): ICanvasBuilder {
    const dir = path.basename(path.dirname(to));
    const file = path.basename(to);

    // We use '/' rather than a platform-specific separator because we need the
    // tests to produce the same output regardless of the operating system.
    const short = `${dir}/${file}`;

    this.log.push(`export: to=${short}`);
    return this;
  }

  public setFontSize(px: number): ICanvasBuilder {
    this.log.push(`setFontSize: px=${px}`);
    return this;
  }
}
