# Backend – Express + TypeScript + MongoDB

This is the backend package of a fullstack coding challenge from BlickSolutions. It provides a REST API using Express, TypeScript, and MongoDB (via Mongoose).

## Technical Requirements

- Express with TypeScript
- MongoDB (local or via MongoDB Atlas)
- No authentication required

## Features

- RESTful API for shopping items
- MongoDB integration with [mongoose](https://mongoosejs.com/)
- TypeScript-first development
- Shares types and logic with other packages in the monorepo

## Setup Instructions

This package is intended to be used as part of the monorepo. To install dependencies and run the backend in development mode, use the root workspace commands:

```bash
pnpm install
pnpm --filter backend dev
```

You can also build or start the backend specifically:

```bash
pnpm --filter backend build
pnpm --filter backend start
```

## Project Structure

- `src/` – Application source code
  - `api/controllers/` – Express route handlers (controllers)
  - `api/models/` – Mongoose models
  - `api/routes/` – Express routers
  - `api/services/` – Business/data logic
- `build/` – Compiled JavaScript output
- `package.json` – Project metadata and scripts

## API Endpoints

- `GET /shopping` – List all shopping items
- `POST /shopping` – Add a new shopping item (body: `{ name: string }`)
- `PUT /shopping/:id` – Edit a shopping item's name or bought status (body: `{ name?: string, bought?: boolean }`)
- `DELETE /shopping/:id` – Delete a shopping item by ID
- `GET /health` – Health check endpoint (returns 200 if DB is connected)

Example shopping item object:

```json
{
  "_id": "...",
  "name": "Buy milk",
  "bought": false
}
```

## UI Libraries

- No external UI libraries are used in the backend.

## Evaluation Criteria

- Application functionality
- Clean TypeScript code (type safety)
- Use of Express patterns
- Code readability and structure
