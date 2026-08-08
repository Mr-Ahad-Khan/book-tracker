# Book Tracker

A full-stack personal library app for keeping track of books you plan to read, are currently reading, and have finished.

## Features

- Add, edit, and delete books
- Track reading status: **To Read**, **Reading**, and **Read**
- Filter by genre and status, or search by title or author
- View reading totals at a glance
- Switch between light and dark themes
- REST API for books and display settings

## Tech Stack

- **Frontend:** React 18 and Vite
- **Backend:** Node.js and Express
- **Database:** MySQL 8 (managed through MySQL Workbench)

## Run Locally

### Prerequisites

- Node.js 18 or later
- npm
- MySQL Server 8 and MySQL Workbench

### 1. Install dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 2. Create the MySQL database

1. Open MySQL Workbench and select your MySQL connection. If you do not have
   one, create it with your server hostname, port (usually `3306`), username,
   and password.
2. Click **File → Open SQL Script**, select
   [`backend/schema.sql`](backend/schema.sql), then click the lightning-bolt
   **Execute** button. This creates the `book_tracker` database, its tables,
   and the default settings row.
3. In the left **Schemas** panel, click refresh. Expand `book_tracker` to see
   `books` and `settings`.
4. Copy `backend/.env.example` to `backend/.env` and enter the same host,
   port, user, password, and database name used in Workbench.

Do not commit the `.env` file.

### 3. Start the backend

From the `backend` directory:

```bash
npm run dev
```

The API runs at `http://localhost:3000`.

### 4. Start the frontend

In a second terminal, from the `frontend` directory:

```bash
npm run dev
```

Open `http://localhost:5173` in your browser. Vite proxies `/api` requests to the backend automatically.

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/health` | Check that the API is running |
| `GET` | `/api/books` | List books; supports `genre`, `status`, and `search` query parameters |
| `GET` | `/api/books/:id` | Get one book |
| `POST` | `/api/books` | Create a book |
| `PUT` | `/api/books/:id` | Update a book |
| `DELETE` | `/api/books/:id` | Delete a book |
| `GET` | `/api/settings` | Get display settings |
| `PUT` | `/api/settings` | Update display settings |

### Create a Book

```json
{
  "title": "Dune",
  "author": "Frank Herbert",
  "genre": "Sci-Fi",
  "status": "Reading",
  "rating": 4,
  "notes": "Epic world-building."
}
```

## Data Storage

Books and display settings are stored persistently in MySQL. MySQL Workbench can
be used to create, inspect, and edit the `book_tracker` database.

## Deploy to Netlify

1. Push this repository to GitHub, GitLab, or Bitbucket, then in Netlify choose
   **Add new project → Import an existing project**.
2. Select the repository. Leave the **base directory** blank: the root
   `netlify.toml` configures the build command, publish directory, API
   redirects, SPA fallback, and serverless function directory.
3. In **Site configuration → Environment variables**, add `DB_HOST`, `DB_PORT`,
   `DB_USER`, `DB_PASSWORD`, and `DB_NAME` (and `DB_SSL=true` if required). Use a hosted MySQL database that
   accepts connections from Netlify; a MySQL server running only on your laptop
   cannot be reached by Netlify.
4. Deploy. Netlify serves the React site and maps `/api/*` to the included
   serverless API function.

## Available Scripts

| Directory | Command | Purpose |
| --- | --- | --- |
| `frontend` | `npm run dev` | Start the Vite development server |
| `frontend` | `npm run build` | Create a production build |
| `frontend` | `npm run preview` | Preview the production build |
| `backend` | `npm run dev` | Start the API with file watching |
| `backend` | `npm start` | Start the API |
