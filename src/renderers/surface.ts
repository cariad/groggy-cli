import path from 'path';

import VectorBuilder from 'vectorbuilder';

import { ICanvasBuilder, ICanvasPainter } from 'canvasbuilder';

import IProject from '../interfaces/project.js';
import ISurface from '../interfaces/surface.js';
import TextureSets from '../models/texture-sets.js';
import Vector from '../types/vector.js';

export default class SurfaceRenderer {
  public static readonly IMAGE_MARGIN = 10;

  private readonly canvasPainter: ICanvasPainter;

  private readonly project: IProject;

  private readonly secondOrigin: [number, number];

  private readonly surface: ISurface;

  private readonly textureSets: TextureSets;

  constructor(
    surface: ISurface,
    canvasBuilder: ICanvasBuilder,
    project: IProject,
  ) {
    const surfaceSize = surface.getSize();

    const renderSize = new VectorBuilder()
      // Add the surface size in cells
      .add(surfaceSize)
      // Convert to pixels
      .multiply(project.data.grid);

    const canvasSize = new VectorBuilder()
      // Add top and left margin
      .add(SurfaceRenderer.IMAGE_MARGIN)
      // Add first render
      .add(renderSize)
      // Add gap between the two renders
      .add([0, SurfaceRenderer.IMAGE_MARGIN]);

    this.secondOrigin = [SurfaceRenderer.IMAGE_MARGIN, canvasSize.build()[1]];

    canvasSize
      // Add height for the second render
      .add([0, renderSize.build()[1]])
      // Add bottom and right margin
      .add(SurfaceRenderer.IMAGE_MARGIN);

    const [cw, ch] = canvasSize.build();

    this.canvasPainter = canvasBuilder.setSize(cw, ch).build().clear('white');
    this.project = project;
    this.surface = surface;
    this.textureSets = new TextureSets(project);
  }

  public render(dir: string): Promise<void> {
    const firstOrigin: [number, number] = [
      SurfaceRenderer.IMAGE_MARGIN,
      SurfaceRenderer.IMAGE_MARGIN,
    ];

    return Promise.all([
      this.renderSurface(firstOrigin, false),
      this.renderSurface(this.secondOrigin, true),
    ])
      .then(() => {
        const renderPath = path.join(dir, `${this.surface.name}.surface.png`);
        return this.canvasPainter.export(renderPath);
      })
      .then(() => {});
  }

  private renderSurface(origin: Vector, includeSurface: boolean): void {
    this.surface.data.textures.forEach((t) => {
      const ts = this.textureSets.get(t.textureSet);

      const at = new VectorBuilder(t.cell)
        .multiply(this.project.data.grid)
        .add(origin)
        .build();

      ts.draw(t.texture, at, this.canvasPainter);
    });

    if (includeSurface) {
      const rect = this.surface.data.surface;
      const [x, y] = new VectorBuilder([rect[0], rect[1]])
        .multiply(this.project.data.grid)
        .add(origin)
        .build();

      const [w, h] = new VectorBuilder([rect[2], rect[3]])
        .multiply(this.project.data.grid)
        .build();

      this.canvasPainter.strokeRectangle([x, y, w, h], {
        width: 3,
        style: 'magenta',
      });
    }
  }
}
