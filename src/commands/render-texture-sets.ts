import { ICanvasBuilder, ICanvasPainter } from 'canvasbuilder';

import Command from './command.js';
import IProject from '../interfaces/project.js';
import TextureSets from '../models/texture-sets.js';
import TextureSetRenderer from '../renderers/texture-set.js';

export default class RenderTextureSetsCommand extends Command {
  private readonly canvasBuilder: ICanvasBuilder;

  constructor(project: IProject, canvasBuilder: ICanvasBuilder) {
    super(project);
    this.canvasBuilder = canvasBuilder;
  }

  public async invoke(): Promise<void> {
    const promises: Promise<ICanvasPainter>[] = [];

    const textureSets = new TextureSets(this.project);

    this.project.getTextureSets().forEach((name) => {
      const ts = textureSets.get(name);
      const renderer = new TextureSetRenderer(ts, this.canvasBuilder);
      const render = renderer.render(this.project.rendersPath);
      promises.push(render);
    });

    await Promise.all(promises);
  }
}
