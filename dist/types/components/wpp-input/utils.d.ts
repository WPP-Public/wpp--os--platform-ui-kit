import { MaskOptions } from './types';
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
export declare const getRawValueForExtra: (maskedValue: string, type: string, maskOptions?: MaskOptions) => string;
