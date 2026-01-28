export function validateImage(file) {
  if (!file) throw new Error("No file");

  if (!file.type.startsWith("image/")) {
    throw new Error("Invalid file type");
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new Error("File too large");
  }
}
