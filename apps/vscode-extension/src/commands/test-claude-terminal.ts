import * as vscode from 'vscode';
import { sendTextToClaudeTerminal } from '../utils/call-claude-code-terminal';

export function registerTestClaudeTerminalCommand(
  context: vscode.ExtensionContext,
) {
  // Command to test sending "hello" to Claude terminal
  const testCommand = vscode.commands.registerCommand(
    'stagewise.testClaudeTerminal',
    async () => {
      // Send "hello" and press Enter
      await sendTextToClaudeTerminal('hello', true);
    },
  );

  // Command to open Claude terminal without sending anything
  const openCommand = vscode.commands.registerCommand(
    'stagewise.openClaudeTerminal',
    async () => {
      // Just open the terminal without sending text
      await sendTextToClaudeTerminal('', false);
    },
  );

  context.subscriptions.push(testCommand, openCommand);
}
