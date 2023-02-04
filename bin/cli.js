#!/usr/bin/env node

const CommandBuilder = require('../dist/command-builder.js').default;
const entry = require('../dist/main.js').default;

entry(process.argv, (projectPath) => new CommandBuilder(projectPath, true));
