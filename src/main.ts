import { program } from 'commander';

import MakeCommandBuilder from './types/make-command-builder.js';

import { version } from './version.js';

export default function entry(
  args: string[],
  makeCommandBuilder: MakeCommandBuilder,
): void {
  program.version(version);

  program
    .command('render-textures')
    .option('--project <string>', 'project directory', process.cwd())
    .action((options: { project: string }) => {
      makeCommandBuilder(options.project).renderTextureSets().invoke();
    });

  program.parse(args);
}
