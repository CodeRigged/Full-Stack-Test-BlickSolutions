# Fullstack Coding Challenge – Monorepo

This repository contains a fullstack application as a coding challenge for BlickSolutions. The project is structured as a monorepo using [pnpm workspaces](https://pnpm.io/workspaces) and includes both frontend and backend packages.

## Technical Requirements

- **Frontend:** React with TypeScript
- **Backend:** Express with TypeScript
- **Database:** MongoDB (local or via MongoDB Atlas)
- **State Management:** Zustand in the frontend (client-side, e.g., via useState/useEffect)
- **No authentication required**

## Submission

- Please provide a GitHub repository with a `README.md` that includes:
  - Setup instructions for running the project
  - A note on whether any external UI libraries were used
- The code should be well-structured, with frontend and backend clearly separated

## Evaluation Criteria

- Application functionality
- Clean TypeScript code
  - Type safety in both frontend and backend
- Use of React patterns and Zustand
- Code readability and structure
- UI quality (design, usability, responsiveness)

---

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) (v20.19.0 or higher recommended)
- [pnpm](https://pnpm.io/) (v10.28 or higher recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) (required for backend; can be run locally or via Docker)

To install pnpm globally:

```bash
npm install -g pnpm
```

### Getting Started

1. **Clone the repository:**

   ```bash
   git clone <your-repo-url>
   cd <repo-folder>
   ```

2. **Install dependencies for all packages:**

   ```bash
   pnpm install
   ```

3. **Run the development servers:**

   ```bash
   pnpm dev
   ```

   This command starts both the frontend and backend in development mode. Output from both will be shown in your terminal.

4. **Build all packages:**

   ```bash
   pnpm build
   ```

   This compiles the frontend and backend for production.

5. **Clean build artifacts:**
   ```bash
   pnpm clean
   ```

## Project Structure

- `frontend/` – React + TypeScript frontend app
- `backend/` – Express + TypeScript backend service (with MongoDB)
- `shared/` – Shared TypeScript code (types, enums, utilities)

## UI Libraries

- This project uses [Material UI (MUI)](https://mui.com/) for the frontend UI components.

## Troubleshooting

- Ensure you are using the correct Node.js and pnpm versions.
- If you encounter issues, try running `pnpm install` again.
- If the backend fails to connect to MongoDB, ensure MongoDB is running locally (default: mongodb://localhost:27017/todos) or update the `MONGO_URI` environment variable.

## License

MIT © [CodeRigged](https://github.com/CodeRigged)
