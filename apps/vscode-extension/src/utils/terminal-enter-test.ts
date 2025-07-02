import * as vscode from 'vscode';

// Test different ways to send Enter to a terminal
export function registerTerminalEnterTest(context: vscode.ExtensionContext) {
  // Test 1: Send empty string with true
  const test1 = vscode.commands.registerCommand(
    'stagewise.testEnter1',
    async () => {
      const terminal = vscode.window.terminals.find(t => t.name === 'node');
      if (terminal) {
        terminal.show();
        terminal.sendText('hello');
        terminal.sendText('', true);
        vscode.window.showInformationMessage('Test 1: Sent empty string with true');
      }
    }
  );

  // Test 2: Send text with true parameter
  const test2 = vscode.commands.registerCommand(
    'stagewise.testEnter2',
    async () => {
      const terminal = vscode.window.terminals.find(t => t.name === 'node');
      if (terminal) {
        terminal.show();
        terminal.sendText('hello', true);
        vscode.window.showInformationMessage('Test 2: Sent text with true');
      }
    }
  );

  // Test 3: Send explicit newline character
  const test3 = vscode.commands.registerCommand(
    'stagewise.testEnter3',
    async () => {
      const terminal = vscode.window.terminals.find(t => t.name === 'node');
      if (terminal) {
        terminal.show();
        terminal.sendText('hello\n');
        vscode.window.showInformationMessage('Test 3: Sent text with \\n');
      }
    }
  );

  // Test 4: Send carriage return
  const test4 = vscode.commands.registerCommand(
    'stagewise.testEnter4',
    async () => {
      const terminal = vscode.window.terminals.find(t => t.name === 'node');
      if (terminal) {
        terminal.show();
        terminal.sendText('hello\r');
        vscode.window.showInformationMessage('Test 4: Sent text with \\r');
      }
    }
  );

  context.subscriptions.push(test1, test2, test3, test4);
}