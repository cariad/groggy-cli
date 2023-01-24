import fs from 'fs';
import path from 'path';

import { Image, loadImage } from 'canvas';

import ICanvasBuilder from '../interfaces/canvas-builder.js';
import ITextureSet from '../interfaces/texture-set.js';
import MakeCanvasBuilder from '../types/make-canvas-builder.js';

export default class TextureSetRenderer {
  public static readonly IMAGE_MARGIN = 10;

  public static readonly TEXT_MARGIN = 20;

  public static readonly TEXT_SIZE = 14;

  // TODO: This assumes a tile size of 16.
  public static readonly TEXTURE_ROW_HEIGHT = 30;

  private readonly canvasBuilder: ICanvasBuilder;

  private readonly ts: ITextureSet;

  constructor(ts: ITextureSet, makeCanvasBuilder: MakeCanvasBuilder) {
    let height = TextureSetRenderer.IMAGE_MARGIN;
    height += TextureSetRenderer.TEXT_SIZE;
    height += TextureSetRenderer.TEXT_MARGIN;
    height += ts.textureCount * TextureSetRenderer.TEXTURE_ROW_HEIGHT;
    height += TextureSetRenderer.IMAGE_MARGIN;

    this.canvasBuilder = makeCanvasBuilder(150, height);
    this.canvasBuilder.setFontSize(TextureSetRenderer.TEXT_SIZE);

    this.ts = ts;
  }

  public async render(dir: string): Promise<void> {
    const image = await loadImage(this.ts.imagePath);

    this.canvasBuilder.drawText(`"${this.ts.name}" texture set`, [
      TextureSetRenderer.IMAGE_MARGIN,
      TextureSetRenderer.IMAGE_MARGIN + TextureSetRenderer.TEXT_SIZE,
    ]);

    const renderAt: [number, number] = [
      TextureSetRenderer.IMAGE_MARGIN,
      TextureSetRenderer.IMAGE_MARGIN +
        TextureSetRenderer.TEXT_SIZE +
        TextureSetRenderer.TEXT_MARGIN,
    ];

    Object.keys(this.ts.data.textures).forEach((name) => {
      this.renderTexture(name, image, renderAt);
      renderAt[1] += TextureSetRenderer.TEXTURE_ROW_HEIGHT;
    });

    const renderPath = path.join(dir, `${this.ts.name}.texture-set.png`);
    console.info(`Exporting texture set "${this.ts.name}": ${renderPath}`);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    this.canvasBuilder.export(renderPath);
  }

  private renderTexture(
    name: string,
    image: Image,
    at: [number, number],
  ): void {
    const source = this.ts.getTextureSource(name);
    this.canvasBuilder.drawImage(image, source, at);

    this.canvasBuilder.drawText(name, [
      at[0] + source[2] + 10,
      at[1] + TextureSetRenderer.TEXTURE_ROW_HEIGHT / 2,
    ]);
  }
}
