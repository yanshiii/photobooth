export function validateImage(file) {
  if (!file) throw new Error("No file");

  if (!file.type.startsWith("image/")) {
    throw new Error("Invalid file type");
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new Error("File too large");
  }
}

export function validateCreateSession(body) {
  if (!body.layoutId) throw new Error("layoutId required");
}

export function validateCaptureSlot({ index, blob }) {
  if (typeof index !== "number") throw new Error("index required");
  if (!blob) throw new Error("image required");
}
