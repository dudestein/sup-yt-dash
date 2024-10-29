This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

(_to speedup the process of setting it up with some standards_)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

(_I kept the font they use in the boilerplate project_)

## Project assumptions

Based on the requirements provided, these are the assumptions I came to:

- Avoiding external libraries and packages
- Responsive layout using Tailwind utility methods
- The desdcription of the sidebar only states title/description, but I also want to display the Thumbnails for the videos as I believe that enriches the experiece for the user.

## Functionality that should be provided

- [ ] - Video Search
- [ ] - Pagination
- [ ] - Video Trimming by setting start/end times for playback
- [ ] - Remember user options for trimming

## What I'm using

- **Typescript** - standard from create-next-app
- **Tailwind** - standard from create-next-app
- **Youtube Iframe API** - Rather than using the YouTube API for search functionality, I'm using a JSON file containing search results. This approach minimizes dependencies, simplifying evaluation since no YouTube API keys are required. Additionally, the abstraction of search functionality falls outside the scope of this exercise. However, to comply with YouTube's policies, we’ll still embed videos using the YouTube iframe, as direct streaming isn’t permitted without their player.

## Problems and compromises

None so far... ;)
