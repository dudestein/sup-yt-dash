export {};

// Adding YT to the window object to support
// the youtube iframe api across the project
// without making ESLINT mad about it
declare global {
  interface Window {
    YT: typeof YT;
    onYouTubeIframeAPIReady: () => void;
  }
}
