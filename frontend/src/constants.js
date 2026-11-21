// Fixed values and their labels, in one place.
export const TAGS = [
  { value: "Motorcycle", label: "Motorcycle" },
  { value: "Gear", label: "Gear" },
  { value: "Protection", label: "Protection" },
  { value: "Accessories", label: "Accessories" },
  { value: "Consumables", label: "Consumables" },
];

export const TAG_LABELS = Object.fromEntries(
  TAGS.map((t) => [t.value, t.label])
);