import path from 'path';

import Command from './command.js';
import IProject from '../interfaces/project.js';
import MakeCanvasBuilder from '../types/make-canvas-builder.js';
import TextureSetRenderer from '../renderers/texture-set.js';

export default class RenderTextureSetsCommand extends Command {
  private readonly makeCanvasBuilder: MakeCanvasBuilder;

  constructor(project: IProject, makeCanvasBuilder: MakeCanvasBuilder) {
    super(project);
    this.makeCanvasBuilder = makeCanvasBuilder;
  }

  public async invoke(): Promise<void> {
    const promises: Promise<void>[] = [];

    this.project.forEachTextureSet((ts) => {
      const renderer = new TextureSetRenderer(ts, this.makeCanvasBuilder);
      const dir = path.join(this.project.path, 'renders');
      const render = renderer.render(dir);
      promises.push(render);
    });

    await Promise.all(promises);
  }
}