import IProjectSchema from './schemas/project';

export default interface IProject {
  data: IProjectSchema;
  path: string;
  rendersPath: string;

  getSurfaces(): string[];
  getSurfaceDataFilename(name: string): string;
  getTextureSets(): string[];
  getTextureSetDataFilename(name: string): string;
  getTextureSetImageFilename(name: string): string;
}
