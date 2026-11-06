export const LIBRARY_IMAGES_BUCKET = "library-images";
export const LIBRARY_IMAGE_MAX_BYTES = 10 * 1024 * 1024;

export const LIBRARY_IMAGE_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

/** Checks the real file signature, not only the client-provided MIME type. */
export function hasImageSignature(buffer: Buffer, mimetype: string): boolean {
  if (buffer.length < 12) return false;
  switch (mimetype) {
    case "image/jpeg":
      return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
    case "image/png":
      return buffer.subarray(0, 8).toString("hex") === "89504e470d0a1a0a";
    case "image/gif":
      return buffer.subarray(0, 4).toString("ascii") === "GIF8";
    case "image/webp":
      return (
        buffer.subarray(0, 4).toString("ascii") === "RIFF" &&
        buffer.subarray(8, 12).toString("ascii") === "WEBP"
      );
    default:
      return false;
  }
}
