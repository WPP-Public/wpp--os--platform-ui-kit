import { maskitoParseNumber } from '@maskito/kit';
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
  if (maskOptions?.decimalPatternOptions) {
    // 1) Handle number inputs: remove prefix/postfix, thousand separators, and convert decimal separator.
    const parsedNumber = maskitoParseNumber(maskedValue, maskOptions.decimalPatternOptions);
    if (isNaN(parsedNumber)) {
      return '';
    }
    return String(parsedNumber);
  }
  // 2) Handle telephone inputs: remove dashes, parentheses, and whitespace.
  if (type === 'tel') {
    return maskedValue.replace(/[-()\s]/g, '');
  }
  // 3) For custom text masks (like credit cards), remove non-digit characters.
  if (maskOptions?.customPatternOptions) {
    return maskedValue.replace(/\D/g, '');
  }
  return maskedValue;
};
export const getValidAutocomplete = (autocomplete) => {
  const validValues = [
    'off',
    'on',
    'name',
    'honorific-prefix',
    'given-name',
    'additional-name',
    'family-name',
    'honorific-suffix',
    'nickname',
    'email',
    'username',
    'new-password',
    'current-password',
    'one-time-code',
    'organization-title',
    'organization',
    'street-address',
    'address-line1',
    'address-line2',
    'address-line3',
    'address-level4',
    'address-level3',
    'address-level2',
    'address-level1',
    'country',
    'country-name',
    'postal-code',
    'cc-name',
    'cc-given-name',
    'cc-additional-name',
    'cc-family-name',
    'cc-number',
    'cc-exp',
    'cc-exp-month',
    'cc-exp-year',
    'cc-csc',
    'cc-type',
    'transaction-currency',
    'transaction-amount',
    'language',
    'bday',
    'bday-day',
    'bday-month',
    'bday-year',
    'sex',
    'tel',
    'tel-country-code',
    'tel-national',
    'tel-area-code',
    'tel-local',
    'tel-extension',
    'impp',
    'url',
    'photo',
  ];
  return validValues.includes(autocomplete) ? autocomplete : 'off';
};
