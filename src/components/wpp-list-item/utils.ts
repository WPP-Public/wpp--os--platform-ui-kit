/**
 * Type guard to validate theme color usage
 */
export const isValidThemeColor = (color: string): boolean => color.startsWith('var(--wpp-') && color.endsWith(')')

/**
 * Helper to get color value with proper CSS variable syntax
 */
export const getThemeColor = (color: string): string => {
  // If already a CSS variable, return as is
  if (color.startsWith('var(')) {
    return color
  }

  // If it's a raw token, wrap it
  if (color.startsWith('--wpp-')) {
    return `var(${color})`
  }

  // Otherwise return as is (for edge cases)
  return color
}
