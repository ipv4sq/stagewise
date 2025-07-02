import * as vscode from 'vscode';
import type { PromptRequest } from '@stagewise/extension-toolbar-srpc-contract';

export async function callClaudeCodeTerminal(
  request: PromptRequest,
): Promise<void> {
  // Find the terminal named "node"
  let claudeTerminal = vscode.window.terminals.find(
    (terminal) => terminal.name === 'node',
  );

  if (!claudeTerminal) {
    // Create terminal with zsh and run Claude
    claudeTerminal = vscode.window.createTerminal({
      name: 'node',
      shellPath: '/bin/bash',
    });

    // Show the terminal
    claudeTerminal.show();

    // Run Claude with permissions flag
    claudeTerminal.sendText('claude --dangerously-skip-permissions', true);

    // Wait for Claude to spin up (2 seconds)
    await new Promise((resolve) => setTimeout(resolve, 2000));
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
  claudeTerminal.sendText('', true);
}

// Helper function to send simple text to Claude Code terminal
export async function sendTextToClaudeTerminal(
  text: string,
  pressEnter = true,
): Promise<void> {
  let claudeTerminal = vscode.window.terminals.find(
    (terminal) => terminal.name === 'node',
  );

  if (!claudeTerminal) {
    // Create terminal with zsh and run Claude
    claudeTerminal = vscode.window.createTerminal({
      name: 'node',
      shellPath: '/bin/zsh',
    });

    // Show the terminal
    claudeTerminal.show();

    // Run Claude with permissions flag
    claudeTerminal.sendText('claude --dangerously-skip-permissions', true);

    // Wait for Claude to spin up (2 seconds)
    await new Promise((resolve) => setTimeout(resolve, 2000));
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
