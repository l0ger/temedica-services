/**
 * Capitalize first word of the string
 * @param str
 */
export const capitalize = (str: string) => {
  if (!str) {
    return '';
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};
