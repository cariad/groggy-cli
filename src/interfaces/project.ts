import IProjectSchema from './schemas/project';
import SurfaceCallback from '../types/surface-callback';

export default interface IProject {
  data: IProjectSchema;
  path: string;
  rendersPath: string;
  surfacesPath: string;

  forEachSurface(cb: SurfaceCallback): void;
  getTextureSets(): string[];
  getTextureSetDataFilename(name: string): string;
  getTextureSetImageFilename(name: string): string;
}
