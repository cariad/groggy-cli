import ICanvasBuilder from '../interfaces/canvas-builder';

type MakeCanvasBuilder = (width: number, height: number) => ICanvasBuilder;

export default MakeCanvasBuilder;
