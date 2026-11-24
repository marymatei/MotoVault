// Server-side validation: data from the client is never trusted.
// The fixed values must be identical to TAGS in frontend/src/constants.js.
export const TAGS = ["Motorcycle", "Gear", "Protection", "Accessories", "Consumables"];
const NAME_MAX = 100;
const QUANTITY_MAX = 9999;
// Photo: a JPG, PNG or WEBP data URL of at most 3 MB, the same limits as frontend/src/photo.js
const PHOTO_PATTERN = /^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/]+={0,2}$/;
const PHOTO_MAX_CHARS = Math.ceil((3 * 1024 * 1024) / 3) * 4 + 30;

// partial = true for PATCH (only the fields that were sent are checked)
export function validateProduct(body, { partial = false } = {}) {
  const errors = [];
  const data = {};

  if (!partial || body.name !== undefined) {
    if (typeof body.name !== "string" || body.name.trim() === "") {
      errors.push("name is required");
    } else if (body.name.trim().length > NAME_MAX) {
      errors.push(`name can have at most ${NAME_MAX} characters`);
    } else {
      data.name = body.name.trim();
    }
  }

  if (!partial || body.tag !== undefined) {
    const tag = body.tag ?? "Gear";
    if (!TAGS.includes(tag)) {
      errors.push(`tag must be one of: ${TAGS.join(", ")}`);
    } else {
      data.tag = tag;
    }
  }

  if (body.available !== undefined) {
    if (typeof body.available !== "boolean") {
      errors.push("available must be true or false");
    } else {
      data.available = body.available;
    }
  } else if (!partial) {
    data.available = false;
  }

  if (body.quantity !== undefined) {
    if (!Number.isInteger(body.quantity) || body.quantity < 0 || body.quantity > QUANTITY_MAX) {
      errors.push(`quantity must be a whole number between 0 and ${QUANTITY_MAX}`);
    } else {
      data.quantity = body.quantity;
    }
  } else if (!partial) {
    data.quantity = 0;
  }

  if (body.photo !== undefined) {
    if (
      typeof body.photo !== "string" ||
      body.photo.length > PHOTO_MAX_CHARS ||
      !PHOTO_PATTERN.test(body.photo)
    ) {
      errors.push("photo must be a JPG, PNG or WEBP image of at most 3 MB");
    } else {
      data.photo = body.photo;
    }
  }

  return { errors, data };
}

// Ids in the address come as text; only positive whole numbers are accepted
export function parseId(value) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}