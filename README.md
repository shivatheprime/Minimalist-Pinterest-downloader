# Pinterest Downloader

A premium, production-ready SaaS application for downloading Pinterest videos, images, and GIFs in full quality. Built with a modern tech stack focused on performance, accessibility, and high-end design.

## Architecture

This project is built using a Full-Stack architecture to ensure secure and reliable extraction of Pinterest media, bypassing client-side CORS limitations.

- **Frontend:** React 19, TypeScript, Tailwind CSS v4, Framer Motion
- **Backend:** Node.js, Express, Cheerio (for HTML parsing)
- **Build Tool:** Vite & ESBuild

The UI components are modular and decoupled, allowing for easy expansion. For example, to add a "YouTube Thumbnail Downloader", you can create a new route in `server.ts` and build a corresponding Hero variation on the frontend without modifying existing core components.

## Features

- **Intelligent Auto-Detection:** Automatically identifies Video, Image, or GIF from a single Pinterest URL.
- **Premium UI/UX:** Luxury aesthetic utilizing Geist and Playfair Display typography, subtle micro-interactions, and a warm neutral color palette.
- **High Performance:** Client-side routing, debounced input handling, and minimal layout shifts.
- **Accessible:** Semantic HTML, focus states, and aria-friendly structures.
- **Secure:** Backend proxy prevents exposing internal logic to the client and handles CORS gracefully.

## Installation & Setup

1. **Install Dependencies**
   \`\`\`bash
   npm install
   \`\`\`

2. **Run Development Server**
   \`\`\`bash
   npm run dev
   \`\`\`
   The server will start on port 3000. It handles both API requests and Vite's frontend serving.

3. **Production Build**
   \`\`\`bash
   npm run build
   \`\`\`
   This command bundles the frontend to \`/dist\` and compiles the Express server to a standalone \`dist/server.cjs\` using ESBuild.

4. **Start Production Server**
   \`\`\`bash
   npm run start
   \`\`\`

## Adding New Tools

To add a new tool (e.g., YouTube Thumbnail Downloader):
1. Add the extraction logic to `server.ts` as a new `/api/extract-youtube` endpoint.
2. Create a new frontend component (e.g., `src/components/YouTubeHero.tsx`).
3. Update `App.tsx` or set up a router (like `react-router-dom`) to switch between tools.
