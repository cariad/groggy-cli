// eslint-disable-next-line max-classes-per-file
import ICommand from './interfaces/command';
import ICommandBuilder from './interfaces/command-builder';
import entry from './main';

import MakeCommandBuilder from './types/make-command-builder';

class MockCommand implements ICommand {
  public readonly invokeMock: jest.Mock;

  constructor() {
    this.invokeMock = jest.fn();
  }

  public invoke(): void {
    this.invokeMock();
  }
}

class MockCommandBuilder implements ICommandBuilder {
  public readonly renderTextureSetsCommand: MockCommand;

  constructor() {
    this.renderTextureSetsCommand = new MockCommand();
  }

  public renderTextureSets(): ICommand {
    return this.renderTextureSetsCommand;
  }
}

function prepare(): [MakeCommandBuilder, MockCommandBuilder] {
  const commandBuilder = new MockCommandBuilder();
  const makeCommandBuilder = jest.fn(() => commandBuilder);
  return [makeCommandBuilder, commandBuilder];
}

test('renders texture sets', () => {
  const [makeCommandBuilder, commandBuilder] = prepare();

  entry(['', '', 'render-textures', '--project', 'foo'], makeCommandBuilder);

  expect(makeCommandBuilder).toBeCalledWith('foo');
  expect(commandBuilder.renderTextureSetsCommand.invokeMock).toBeCalled();
});
