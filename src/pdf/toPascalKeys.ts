export const toPascalKeys = (value: unknown): unknown => {
  if (Array.isArray(value)) {
    return value.map(toPascalKeys);
  }

  if (value !== null && typeof value === 'object') {
    return Object.entries(value as Record<string, unknown>).reduce<
      Record<string, unknown>
    >((acc, [key, val]) => {
      acc[key.charAt(0).toUpperCase() + key.slice(1)] = toPascalKeys(val);
      return acc;
    }, {});
  }

  return value;
};
