# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Essential Commands

### Development
```bash
pnpm dev                  # Start all dev servers (concurrent limit: 20)
pnpm dev:playgrounds      # Dev mode for playgrounds
pnpm dev:examples         # Dev mode for examples  
pnpm dev:toolbar          # Dev mode for toolbar packages
pnpm dev:plugins          # Dev mode for plugins
```

### Building
```bash
pnpm build                # Build all packages
pnpm build:apps           # Build applications only
pnpm build:packages       # Build packages only
pnpm build:toolbar        # Build toolbar packages
pnpm build:plugins        # Build plugins
```

### Code Quality
```bash
pnpm check                # Run Biome linter
pnpm check:fix            # Fix linting issues
pnpm typecheck            # Run TypeScript type checking
pnpm test                 # Run tests (using Vitest)
```

### Maintenance
```bash
pnpm clean                # Clean node_modules
pnpm clean:workspaces     # Clean with Turbo
pnpm sherif               # Fix dependency issues
```

### Versioning
```bash
pnpm changeset            # Create changeset for version bumps
pnpm version-and-format   # Version packages and format
```

## Architecture Overview

Stagewise is a browser toolbar that connects frontend UI to AI code agents in code editors. It uses a modular monorepo structure:

- **apps/**: Runnable applications
  - `vscode-extension`: VS Code/Cursor/Windsurf extension
  - `website`: Documentation site
  
- **packages/**: Shared libraries
  - `extension-toolbar-srpc-contract`: Type-safe RPC contracts
  - `srpc`: RPC implementation
  - `ui`: Shared UI components
  
- **toolbar/**: Framework-specific toolbar implementations
  - `core`: Core toolbar logic and plugin system
  - `next`, `react`, `vue`: Framework integrations
  
- **plugins/**: Toolbar plugins for different frameworks
  - Each plugin implements the `ToolbarPlugin` interface
  
- **examples/**: Full framework examples with toolbar integrated

### Communication Architecture

The toolbar communicates with the extension via sRPC (typed RPC):
- WebSocket connection for real-time communication
- Type-safe contracts defined in `extension-toolbar-srpc-contract`
- Automatic reconnection and error handling

### Plugin System

Plugins extend toolbar functionality by implementing the `ToolbarPlugin` interface:
- Lifecycle hooks: `onLoad`, `onPromptingStart`, `onPromptSend`
- Context injection into prompts
- Optional MCP (Model Context Protocol) server support
- Custom toolbar actions

## Development Conventions

### Code Style
- **Component naming**: Use kebab-case (e.g., `my-component.tsx`)
- **Package manager**: Always use pnpm
- **Linting**: Biome with 2-space indentation, single quotes
- **Pre-commit hooks**: Enforced via Lefthook

### Commit Conventions
Strict Conventional Commits with REQUIRED scopes:
- `root`: Root-level files
- `cursor-rules`: Changes in `.cursor/rules/`
- `toolbar`: Changes in `toolbar/`
- `docs`: Documentation changes
- `deps`: Dependency updates
- **Package name**: For changes in specific packages (e.g., `feat(vscode-extension): add feature`)

Format: `type(scope): description`

### Testing
- Test framework: Vitest
- Run tests with `pnpm test`
- Tests are located alongside source files as `*.test.ts` or in `__tests__/` directories

### Building and Dependencies
- Build tool: Vite for most packages, Webpack for VS Code extension
- Monorepo orchestration: Turborepo
- TypeScript everywhere with shared configs
- Node.js requirement: >=18

## Working with the Extension

The VS Code extension in `apps/vscode-extension/`:
- Uses Webpack for bundling
- Supports multiple AI agents (Cursor, Copilot, Windsurf, etc.)
- WebView for toolbar UI rendering
- Extension host API for editor integration

## Working with Toolbar Packages

When developing toolbar features:
1. Core logic goes in `toolbar/core/`
2. Framework adapters in `toolbar/[framework]/`
3. Plugins in `plugins/[framework]/`
4. Always maintain TypeScript types
5. Export public API through package.json exports field

## MCP Integration

The toolbar supports MCP servers for AI agent integration:
- MCP server runs at `http://localhost:5746/sse`
- Configuration in `.cursor/mcp.json`
- Plugins can expose prompts, resources, and tools to AI agents