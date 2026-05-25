import axios from "axios"

const ALLOWED_VIDEO_TYPES = [
  "video/mp4",
  "video/webm",
  "video/ogg",
  "video/quicktime",
  "application/x-mpegurl",
  "application/vnd.apple.mpegurl",
  "application/dash+xml"
];

export function validateUrl(url: string) {
  return axios.head(url)
    .catch((err) => {
      console.warn("HEAD запрос не удался, пробуем обычный GET для заголовков", err);
      return axios.get(url, { headers: { Range: "bytes=0-0" } });
    })
    .then((response) => {
      const contentType = String(response.headers["content-type"] || "").toLowerCase();
      const pureMimeType = contentType.split(";")[0].trim();
      const isSupported = ALLOWED_VIDEO_TYPES.includes(pureMimeType);

      return { isSupported, pureMimeType };
    })
    .catch(() => {
      return { isSupported: false, pureMimeType: "" };
    });
}