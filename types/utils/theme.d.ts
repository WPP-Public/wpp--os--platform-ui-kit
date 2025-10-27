import { FlatTheme, Theme, ThemeContent } from '../types/theme';
/**
 * Creates flat theme object from theme object
 */
export declare const createTheme: (json: Theme, variant?: keyof ThemeContent) => FlatTheme;
/**
 * Resolve theme object with color values
 */
export declare const resolveTheme: (initJson: Theme, variant?: keyof ThemeContent) => Theme;
