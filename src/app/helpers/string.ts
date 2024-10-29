/*
 * function truncate long strings
 * @param text: string
 * @param maxLength: number
 * @returns string
 *
 * --- comments -----
 *
 * this should help cleanup descriptions with long urls in them, which
 * can break the layout of the page by forcing the container to be wider
 * */
export const truncateLongWords = (text: string, maxLength: number = 20) => {
  return text
    .split(" ")
    .map((word) =>
      word.length > maxLength ? `${word.slice(0, maxLength)}...` : word
    )
    .join(" ");
};
