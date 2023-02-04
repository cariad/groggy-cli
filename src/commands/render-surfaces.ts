import { ICanvasBuilder } from 'canvasbuilder';

import Command from './command.js';
import IProject from '../interfaces/project.js';
import Surfaces from '../models/surfaces.js';
import SurfaceRenderer from '../renderers/surface.js';

export default class RenderSurfacesCommand extends Command {
  private readonly canvasBuilder: ICanvasBuilder;

  constructor(project: IProject, canvasBuilder: ICanvasBuilder) {
    super(project);
    this.canvasBuilder = canvasBuilder;
  }

  public async invoke(): Promise<void> {
    const promises: Promise<void>[] = [];

    const surfaces = new Surfaces(this.project);

    this.project.getSurfaces().forEach((name) => {
      const surface = surfaces.get(name);

      const renderer = new SurfaceRenderer(
        surface,
        this.canvasBuilder,
        this.project,
      );

      const render = renderer.render(this.project.rendersPath);
      promises.push(render);
    });

    await Promise.all(promises);
  }
}
