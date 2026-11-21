// Product photos: checked here, saved exactly as they are (no resizing, no compression).
export const PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const PHOTO_MIN_PX = 200;
export const PHOTO_MAX_PX = 4000;
export const PHOTO_MAX_MB = 3;

function readAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("The photo could not be read."));
    reader.readAsDataURL(file);
  });
}

function imageSize(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = () => reject(new Error("The file is not a valid image."));
    img.src = url;
  });
}

// Returns the photo as a data URL, or throws an Error with the message to show
export async function readPhoto(file) {
  if (!PHOTO_TYPES.includes(file.type)) {
    throw new Error("The photo must be a JPG, PNG or WEBP image.");
  }
  const mb = file.size / (1024 * 1024);
  if (mb > PHOTO_MAX_MB) {
    throw new Error(`The photo is too large: ${mb.toFixed(1)} MB (max ${PHOTO_MAX_MB} MB).`);
  }
  const url = await readAsDataUrl(file);
  const { width, height } = await imageSize(url);
  if (width < PHOTO_MIN_PX || height < PHOTO_MIN_PX) {
    throw new Error(`The photo is too small: ${width}×${height} px (min ${PHOTO_MIN_PX}×${PHOTO_MIN_PX} px).`);
  }
  if (width > PHOTO_MAX_PX || height > PHOTO_MAX_PX) {
    throw new Error(`The photo is too large: ${width}×${height} px (max ${PHOTO_MAX_PX}×${PHOTO_MAX_PX} px).`);
  }
  return url;
}