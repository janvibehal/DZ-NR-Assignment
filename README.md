# DZ-NR-Assignment

A Next.js application (hybrid JavaScript/TypeScript project) providing a small social feed backend + frontend with authentication, posts, comments, likes and media uploads (Cloudinary). This repo includes API routes (Next.js app router), Mongoose models, utility helpers, and a small test suite.

---

## Features

- Next.js (App Router) frontend pages and server API routes
- MongoDB (Mongoose) for persistence
- JWT-based authentication
- Cloudinary media uploads (images & videos) for posts
- Posts, comments, replies, likes, and user profiles
- Basic tests included in `tests/`

## Tech Stack

- Next.js
- Node.js
- MongoDB (Mongoose)
- Cloudinary
- JSON Web Tokens (JWT)
- Jest (tests) — may be present depending on `package.json`

## Prerequisites

- Node.js (16+ recommended)
- npm (or yarn)
- A MongoDB connection (Atlas or local)
- Cloudinary account for media uploads (optional but required to upload media)

## Environment Variables

Create a `.env` file in the project root (or provide environment vars to your host). The app expects at least the following variables:

- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret used to sign JWT tokens
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret
- Any other variables defined in `next.config.js` or used across the `lib/` or `utils/` files

Example `.env`:

```powershell
MONGODB_URI="mongodb+srv://user:password@cluster.example.mongodb.net/dbname"
JWT_SECRET="a-very-strong-secret"
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

Notes:
- Keep secrets out of source control. Use environment settings provided by your hosting platform for production.

## Installation

```powershell
# install dependencies
npm install

# development server
npm run dev

# build for production
npm run build

# start production server (after build)
npm start
```

Replace `npm` with `yarn` if you prefer.

## Available Scripts

- `npm run dev` — start Next.js in development mode
- `npm run build` — production build (Next.js)
- `npm start` — start the production server (depends on `package.json`)
- `npm test` — run tests (if configured)

Check `package.json` for the exact scripts available in your copy of the repository.

## API Routes (Server)

This project exposes a set of API routes implemented using the Next.js app router under `app/api/`.

Common endpoints (as implemented in this repository):

- `POST /api/auth/login` — login (returns JWT)
- `POST /api/auth/register` — register new user
- `POST /api/auth/logout` — logout
- `GET  /api/auth/me` — get current user (requires token)
- `POST /api/posts` — create a post (supports `multipart/form-data` with media uploads)
- `GET  /api/posts` — list posts
- `GET  /api/posts/[postId]` — post operations
- `POST /api/posts/[postId]/like` — like/unlike a post
- `GET/POST/PUT/DELETE /api/comments` — comment routes (various endpoints under `app/api/comments`)
- `GET /api/users/[id]` — user profile

Refer to the route files under `app/api/` for exact request/response shapes and auth requirements.

## File Structure (high level)

- `app/` — Next.js app pages + API routes
	- `api/` — server API route handlers
- `components/` — React UI components
- `lib/` — helpers (database connection, email, responses, etc.)
- `models/` — Mongoose models (`User`, `Post`, `Comment`)
- `services/` — business logic wrappers (postService, commentService, likeService)
- `utils/` — utility helpers (cloudinary wrapper, validators, formatters)
- `public/` — static assets
- `tests/` — unit/integration tests

## Media Uploads

The project uses Cloudinary to upload images and videos. Ensure Cloudinary credentials are set in the environment before attempting to upload media via the `/api/posts` `POST` handler.

## Development Notes & Gotchas

- The repository is a mix of JS and TS artifacts. `tsconfig.json` exists and some type settings can affect editor tooling. If you use path aliases, ensure your editor respects the `tsconfig.json` or add a `jsconfig.json` for JS-only setups.
- We found a common `baseUrl`/`paths` alias issue during build; if you see an error like `Non-relative paths are not allowed when 'baseUrl' is not set`, ensure the `paths` in `tsconfig.json` target relative paths (for example: `"@/*": ["./*"]`).

## Testing

If a test script is provided in `package.json`, run:

```powershell
npm test
```

Adjust or add tests under the `tests/` folder.

## Contributing

- Fork or branch the repo
- Make changes on a branch, add tests for new functionality
- Open a pull request with a clear description of the change

## Troubleshooting

- Build errors: run `npm run build` and inspect output. For TypeScript-related build problems, check `tsconfig.json` and `next-env.d.ts`.
- MongoDB connection issues: verify `MONGODB_URI` and network access (Atlas IP whitelist or VPC setup).
- Cloudinary errors: verify Cloudinary credentials and that `resource_type` and file types match (images vs videos).

## License

This repository does not include an explicit license. Add a `LICENSE` file if you intend to publish or share with specific license terms.

---

If you'd like, I can also:

- Add a short `CONTRIBUTING.md` or `ENV.example` with required variables
- Commit this `README.md` and open a PR

Happy to make it more specific (include example requests/responses or environment examples) — tell me what you'd like added.
# DZ-NR-Assignment