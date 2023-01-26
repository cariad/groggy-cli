import IProjectSchema from './schemas/project';
import TextureSetCallback from '../types/texture-set-callback';

export default interface IProject {
  data: IProjectSchema;
  path: string;
  textureSetsPath: string;

  forEachTextureSet(cb: TextureSetCallback): void;
}
