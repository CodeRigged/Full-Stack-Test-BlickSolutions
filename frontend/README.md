# Frontend – React + TypeScript

This is the frontend package of a fullstack coding challenge for BlickSolutions. It is built with React, TypeScript, and Vite, and uses Zustand for state management.

## Technical Requirements

- React with TypeScript
- Zustand for client-side state management
- No authentication required

## Features

- Internationalization (English, German, French)
- Settings page with language and theme (dark/light) switch
- State management via [zustand](https://github.com/pmndrs/zustand)
- UI components built with [Material UI (MUI)](https://mui.com/)
- Fast development with [Vite](https://vitejs.dev/)

## Setup Instructions

This package is intended to be used as part of the monorepo. To install dependencies and run the frontend in development mode, use the root workspace commands:

```bash
pnpm install
pnpm --filter frontend dev
```

You can also build or lint the frontend specifically:

```bash
pnpm --filter frontend build
pnpm --filter frontend lint
```

## Project Structure

- `src/` – Application source code
- `public/` – Static assets
- `index.html` – Main HTML entry point

## UI Libraries

- This project uses [Material UI (MUI)](https://mui.com/) for the frontend UI components.

## Notes

- The frontend expects the backend API to be running on http://localhost:5000 for development.
- Shared types and enums are imported from the `shared` package (see monorepo root).

## Evaluation Criteria

- Application functionality
- Clean TypeScript code (type safety)
- Use of React patterns and Zustand
- Code readability and structure
- UI quality (design, usability, responsiveness)
