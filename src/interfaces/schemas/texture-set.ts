import ITextureSourcesSchema from './texture-sources';

export default interface ITextureSetSchema {
  grid: number;
  textures: ITextureSourcesSchema;
}
