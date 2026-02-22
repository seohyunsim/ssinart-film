export const FILM_LIST_QUERY = `
*[_type == "film"] | order(publishedAt desc) {
  _id,
  title,
  youtubeUrl,
  publishedAt,
  coverImage
}
`;
