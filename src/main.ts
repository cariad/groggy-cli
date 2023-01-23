import { version } from './version.js';

export default function entry(args: string[]) {
  console.info(`groggy-cli v${version}`);
  console.log(args);
}
