/**
 * Get first image url from post content
 * @param {string} postString Post content from TinyMCE editor
 * @returns Image url
 */
export function getImageSrc(postString) {
  const match = /<img[^>]*\s+src=["']([^"']+)["']/.exec(postString);
  return match ? match[1] : 'https://i.imgur.com/MtG5CAI.png';
}
