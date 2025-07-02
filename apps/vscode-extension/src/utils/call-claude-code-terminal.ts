import * as vscode from 'vscode';
import type { PromptRequest } from '@stagewise/extension-toolbar-srpc-contract';

export async function callClaudeCodeTerminal(
  request: PromptRequest,
): Promise<void> {
  // Find the terminal named "node"
  const claudeTerminal = vscode.window.terminals.find(
    (terminal) => terminal.name === 'node',
  );

  if (!claudeTerminal) {
    vscode.window.showErrorMessage(
      'Please create a terminal named "node" with Claude running first'
    );
    return;
  }

  // Show the terminal
  claudeTerminal.show();

  // Construct the prompt with files and images if provided
  const prompt = `${request.prompt}${
    request.files ? `\n\nFiles: ${request.files.join('\n')}` : ''
  }${request.images ? `\n\nImages: ${request.images.join('\n')}` : ''}`;

  // Send the text to the terminal
  // Send the prompt followed by an explicit newline
  claudeTerminal.sendText(prompt);
  // Send just a newline to trigger Enter
  claudeTerminal.sendText('', true);
}

// Helper function to send simple text to Claude Code terminal
export async function sendTextToClaudeTerminal(
  text: string,
  pressEnter = true,
): Promise<void> {
  const claudeTerminal = vscode.window.terminals.find(
    (terminal) => terminal.name === 'node',
  );

  if (!claudeTerminal) {
    vscode.window.showErrorMessage(
      'Please create a terminal named "node" with Claude running first'
    );
    return;
  }

  claudeTerminal.show();
  
  if (pressEnter) {
    // Send text first, then send Enter separately
    claudeTerminal.sendText(text);
    claudeTerminal.sendText('', true);
  } else {
    claudeTerminal.sendText(text, false);
  }
}

// Example usage: Send "hello" and press Enter
export async function testClaudeTerminal(): Promise<void> {
  await sendTextToClaudeTerminal('hello', true);
  vscode.window.showInformationMessage('Sent "hello" to Claude Code terminal');
}
