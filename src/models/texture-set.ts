import { Image, loadImage } from 'canvas';
import { ICanvasPainter } from 'canvasbuilder';

import IProject from '../interfaces/project.js';
import ITextureSet from '../interfaces/texture-set.js';
import ITextureSetSchema from '../interfaces/schemas/texture-set.js';
import Rectangle from '../types/rectangle.js';
import Vector from '../types/vector.js';

/**
 * A set of textures from a single image file.
 */
export default class TextureSet implements ITextureSet {
  public readonly data: ITextureSetSchema;

  public readonly name: string;

  public readonly project: IProject;

  private image: Promise<Image> | undefined;

  constructor(data: ITextureSetSchema, name: string, project: IProject) {
    this.data = data;
    this.image = undefined;
    this.name = name;
    this.project = project;
  }

  public get textureCount(): number {
    return Object.keys(this.data.textures).length;
  }

  public draw(name: string, at: Vector, on: ICanvasPainter): void {
    const image = this.getImage();
    const source = this.getTextureSource(name);
    on.drawImage(image, at, source);
  }

  public getImage(): Promise<Image> {
    if (this.image === undefined) {
      const imagePath = this.project.getTextureSetImageFilename(this.name);
      console.info(`Loading image: ${imagePath}`);
      this.image = loadImage(imagePath);
    }

    return this.image;
  }

  public getTextureSource(name: string): Rectangle {
    const texture = this.data.textures[name];
    return [
      texture[0] * this.project.data.grid,
      texture[1] * this.project.data.grid,
      this.project.data.grid,
      this.project.data.grid,
    ];
  }
}
