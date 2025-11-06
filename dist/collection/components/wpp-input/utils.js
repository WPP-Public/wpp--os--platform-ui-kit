/**
 * Escapes special regex characters in a string (like '.' or '*').
 */
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
/**
 * Returns a "raw" version of a masked value.
 *
 * For 'decimal'/'number' types:
 * - Removes a configured prefix and postfix.
 * - If a thousandSeparator is provided, it is removed; otherwise, whitespace is removed.
 * - Replaces the custom decimal separator with a period.
 *
 * For telephone numbers (type 'tel'):
 * - Removes dashes, parentheses, and whitespace.
 *
 * For custom text masks (e.g., credit cards), removes all non-digit characters.
 * For all other types, removes whitespace.
 *
 * @param maskedValue The formatted (masked) string from the input.
 * @param type The input type (e.g., 'decimal', 'number', 'tel', 'text', etc.).
 * @param maskOptions Optional mask configuration.
 * @returns The raw value string.
 */
export const getRawValueForExtra = (maskedValue, type, maskOptions) => {
  // 1) Handle decimal/number types
  if (type === 'decimal' || type === 'number') {
    let raw = maskedValue;
    if (maskOptions?.decimalPatternOptions) {
      const { prefix, postfix, thousandSeparator, decimalSeparator } = maskOptions.decimalPatternOptions;
      // Remove prefix
      if (prefix && raw.startsWith(prefix)) {
        raw = raw.slice(prefix.length);
      }
      // Remove postfix
      if (postfix && raw.endsWith(postfix)) {
        raw = raw.slice(0, raw.length - postfix.length);
      }
      // Remove thousand separators if provided; otherwise, remove whitespace.
      if (thousandSeparator) {
        const regex = new RegExp(escapeRegex(thousandSeparator), 'g');
        raw = raw.replace(regex, '');
      }
      else {
        raw = raw.replace(/\s/g, '');
      }
      // Replace the custom decimal separator with '.'
      if (decimalSeparator && decimalSeparator !== '.') {
        const regex = new RegExp(escapeRegex(decimalSeparator), 'g');
        raw = raw.replace(regex, '.');
      }
      return raw;
    }
    // Fallback: remove everything except digits, minus sign, and period.
    return raw.replace(/[^\d.-]/g, '');
  }
  // 2) Handle telephone inputs: remove dashes, parentheses, and whitespace.
  if (type === 'tel') {
    return maskedValue.replace(/[-()\s]/g, '');
  }
  // 3) For custom text masks (like credit cards), remove non-digit characters.
  if (maskOptions?.customPatternOptions) {
    return maskedValue.replace(/\D/g, '');
  }
  // 4) For other types, remove whitespace.
  return maskedValue.replace(/\s/g, '');
};
