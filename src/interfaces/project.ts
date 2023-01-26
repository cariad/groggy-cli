import IProjectSchema from './schemas/project';
import SurfaceCallback from '../types/surface-callback';
import TextureSetCallback from '../types/texture-set-callback';

export default interface IProject {
  data: IProjectSchema;
  path: string;
  rendersPath: string;
  surfacesPath: string;
  textureSetsPath: string;

  forEachSurface(cb: SurfaceCallback): void;
  forEachTextureSet(cb: TextureSetCallback): void;
}
