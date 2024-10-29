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
- The desdcription of the sidebar only states title/description, but I also want to display the Thumbnails for the videos as I believe that enriches the experiece for the user. - _solved by providing a toggle to switch between both modes_

## Functionality that should be provided

- [x] - Video Search
- [x] - Video Playback
- [ ] - Pagination
- [ ] - Video Trimming by setting start/end times for playback
- [ ] - Remember user options for trimming

## What I'm using

- **Typescript** - standard from create-next-app
- **Tailwind** - standard from create-next-app
- **Youtube Iframe API** - Rather than using the YouTube API for search functionality, I'm using a JSON file containing search results. This approach minimizes dependencies, simplifying evaluation since no YouTube API keys are required. Additionally, the abstraction of search functionality falls outside the scope of this exercise. However, to comply with YouTube's policies, we’ll still embed videos using the YouTube iframe, as direct streaming isn’t permitted without their player.

## Problems and compromises

1. YT type missing when adding the library and attempting to use it - Solved by just overloading the global window type to have the YT property.

2. Some of the images are not loading(or the videos are private). Meaning we need a fallback for the images I'm trying to display in the sidebar as well. Next's <Image/> doesn't support fallback, so let's extend that.

3. By passing props around I end up breaking the server side benefits of nextjs by having to annotate the files with `'use client'`. will need a better organization to prevent this. -- _added AppContext to hold all of the state instead of scattered props going around_

4. Trimming information is being saved to localStorage, but not retrieved. Moving to the context may fix this, so will do that first and check back on it.
