import fs from 'fs';
import path from 'path';

import { createCanvas } from 'canvas';

import ITextureSet from '../interfaces/texture-set.js';

import Command from './command.js';

export default class RenderTextureSetsCommand extends Command {
  public async invoke(): Promise<void> {
    await this.project.forEachTextureSet(this.renderTextureSet.bind(this));
  }

  private renderTextureSet(ts: ITextureSet): void {
    const IMAGE_WIDTH = 800;
    const TEXT_Y_OFFSET = 15;

    let nextTextY = TEXT_Y_OFFSET;

    const canvas = createCanvas(IMAGE_WIDTH, 200);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, IMAGE_WIDTH, 200);

    ctx.fillStyle = 'black';
    ctx.font = '14px';
    ctx.fillText(`Texture set: ${ts.name}`, 10, nextTextY);
    nextTextY += TEXT_Y_OFFSET;

    ctx.fillText('TODO: texture previews go here', 10, nextTextY);
    nextTextY += TEXT_Y_OFFSET;

    const renderDir = path.join(this.project.projectPath, 'renders');
    console.debug(`ts.name: ${ts.name}`);

    const renderPath = path.join(renderDir, `${ts.name}.texture-set.png`);

    console.debug(`Rendering: ${renderPath}`);

    if (!fs.existsSync(renderDir)) fs.mkdirSync(renderDir);

    const out = fs.createWriteStream(renderPath);
    const stream = canvas.createPNGStream();
    stream.pipe(out);
  }
}
