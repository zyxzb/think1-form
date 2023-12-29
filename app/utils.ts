export const classNames = (
  ...classes: (string | null | undefined)[]
): string => {
  return classes
    .map((str) => (str ? str.trim().replace(/\s+/g, ' ') : str))
    .filter(Boolean)
    .join(' ');
};
