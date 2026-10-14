# blog-slug

Fieldnotes is a sample blog with an Express API and a React client.

## Run locally

1. Copy `.env.example` to `.env` and replace `BLOG_API_TOKEN` with a private token.
2. Run `npm install` from the project root.
3. Run `npm run dev` and open the Vite URL printed in the terminal.

The React client uses the Vite development proxy to reach the API on port 5000.
Enter the same `BLOG_API_TOKEN` value in the client before opening a story.

## API

- `GET /posts` returns the sample posts.
- `GET /posts/:slug` returns one post and requires
  `Authorization: Bearer <BLOG_API_TOKEN>`.

Every request is logged with its method, path, response status, and duration.
The sample data is in `server/src/data/posts.js`.