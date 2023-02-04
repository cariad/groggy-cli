import fs from 'fs';
import path from 'path';

import { ICanvasBuilder, ICanvasPainter } from 'canvasbuilder';

import ITextureSet from '../interfaces/texture-set.js';

export default class TextureSetRenderer {
  public static readonly IMAGE_MARGIN = 10;

  public static readonly TEXT_MARGIN = 20;

  public static readonly TEXT_SIZE = 14;

  // TODO: This assumes a tile size of 16.
  public static readonly TEXTURE_ROW_HEIGHT = 30;

  private readonly canvasPainter: ICanvasPainter;

  private readonly ts: ITextureSet;

  constructor(ts: ITextureSet, canvasBuilder: ICanvasBuilder) {
    let height = TextureSetRenderer.IMAGE_MARGIN;
    height += TextureSetRenderer.TEXT_SIZE;
    height += TextureSetRenderer.TEXT_MARGIN;
    height += ts.textureCount * TextureSetRenderer.TEXTURE_ROW_HEIGHT;
    height += TextureSetRenderer.IMAGE_MARGIN;

    this.canvasPainter = canvasBuilder
      .setSize(150, height)
      .build()
      .clear('white')
      .setFontSize(TextureSetRenderer.TEXT_SIZE);

    this.ts = ts;
  }

  public render(dir: string): Promise<ICanvasPainter> {
    const image = this.ts.getImage();

    this.canvasPainter.fillText(`"${this.ts.name}" texture set`, [
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
      const source = this.ts.getTextureSource(name);

      this.canvasPainter.drawImage(image, renderAt, source);

      this.canvasPainter.fillText(name, [
        renderAt[0] + source[2] + 10,
        renderAt[1] + TextureSetRenderer.TEXTURE_ROW_HEIGHT / 2,
      ]);

      renderAt[1] += TextureSetRenderer.TEXTURE_ROW_HEIGHT;
    });

    const renderPath = path.join(dir, `${this.ts.name}.texture-set.png`);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    return this.canvasPainter.export(renderPath);
  }
}
