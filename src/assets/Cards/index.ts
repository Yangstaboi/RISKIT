// src/assets/Cards/index.ts

// Automatically export all png images in the current directory.
const requireContext = require.context(".", false, /\.png$/);
const cards: { [key: string]: string } = {};

requireContext.keys().forEach((filename: string) => {
  const key = filename.replace("./", "");
  cards[key] = requireContext(filename).default;
});

export { cards };
