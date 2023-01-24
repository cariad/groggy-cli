import TextureSetCallback from '../types/texture-set-callback';

export default interface IProject {
  path: string;

  forEachTextureSet(cb: TextureSetCallback): void;
}
