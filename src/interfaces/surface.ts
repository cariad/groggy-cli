import ISurfaceSchema from './schemas/surface';
import Vector from '../types/vector';

export default interface ISurface {
  data: ISurfaceSchema;
  name: string;

  getSize(): Vector;
}
