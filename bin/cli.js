#!/usr/bin/env node

import CommandBuilder from '../dist/command-builder.js';
import entry from '../dist/main.js';

entry(process.argv, (projectPath) => new CommandBuilder(projectPath));
