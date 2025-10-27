export declare type FlatTheme = Record<string, string>;
export declare type From100to1000 = '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | '1000';
export declare type From1to10 = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10';
export declare type ThemeSettings = {
  fontUrl: string | string[];
};
export declare type ThemeContent = {
  light: ThemeStyles;
  dark: ThemeStyles;
};
export declare type ThemeColorState = 'default' | 'disabled' | 'hover' | 'active';
export declare type ThemeCatDataviz = {
  dark: Record<From1to10, string>;
  light: Record<From1to10, string>;
  neutral: Record<From1to10, string>;
};
export declare type ThemeSeqDataviz = {
  brand: Record<From100to1000, string>;
  grey: Record<From100to1000, string>;
  negative: Record<From100to1000, string>;
  warning: Record<From100to1000, string>;
  positive: Record<From100to1000, string>;
};
export declare type ThemeColorDataviz = {
  cat: ThemeCatDataviz;
  seq: ThemeSeqDataviz;
};
export declare type ThemeColor = {
  primary: Record<'100' | '200' | '300' | '400' | '500' | '600' | '700' | '800', string>;
  success: Record<'200' | '400' | '500', string>;
  warning: Record<'200' | '400' | '500', string>;
  danger: Record<'200' | '300' | '400' | '500' | '600', string>;
  grey: Record<'000' | From100to1000, string>;
  highlight: Record<'200' | '400', string>;
  brand: Record<ThemeColorState, string>;
  dataviz: ThemeColorDataviz;
  white?: string;
};
export declare type ThemeFont = {
  family: string | string[];
};
export declare type ThemeBorder = {
  radius: Record<'xs' | 's' | 'm' | 'l' | 'xl' | 'round', string>;
  width: Record<'s' | 'm' | 'l', string>;
};
export declare type ThemeIcon = {
  color: Record<ThemeColorState, string>;
};
export declare type ThemeText = {
  color: Record<'default' | 'whiteInfo' | 'disabled' | 'danger' | 'warning' | 'success' | 'info', string>;
};
export declare type ThemeSurface = {
  bgColor: string;
};
export declare type ThemeOverlay = {
  bgColor: string;
};
export declare type ThemeTypography = {
  '9xl'?: ThemeTypography9XL;
  '8xl'?: ThemeTypography8XL;
  '7xl'?: ThemeTypography7XL;
  '6xl'?: ThemeTypography6XL;
  '5xl'?: ThemeTypography5XL;
  '4xl'?: ThemeTypography4XL;
  '3xl'?: ThemeTypography3XL;
  '2xl'?: ThemeTypography2XL;
  xl?: ThemeTypographyXL;
  l?: ThemeTypographyL;
  m?: ThemeTypographyM;
  s?: ThemeTypographyS;
  xs?: ThemeTypographyXS;
  '2xs'?: ThemeTypography2XS;
};
export declare type ThemeTypographyStyles = {
  color?: string;
  fontWeight?: string;
  fontSize?: string;
  fontFamily?: string | string[];
  fontStyle?: string;
  lineHeight?: string;
  letterSpacing?: string;
  textTransform?: string;
};
export declare type ThemeTypography9XL = {
  display: ThemeTypographyStyles;
  displayStrong?: ThemeTypographyStyles;
  displayEmphasis?: ThemeTypographyStyles;
  displayLight?: ThemeTypographyStyles;
};
export declare type ThemeTypography8XL = {
  display: ThemeTypographyStyles;
  displayStrong?: ThemeTypographyStyles;
  displayEmphasis?: ThemeTypographyStyles;
  displayLight?: ThemeTypographyStyles;
};
export declare type ThemeTypography7XL = {
  display: ThemeTypographyStyles;
  displayStrong?: ThemeTypographyStyles;
  displayEmphasis?: ThemeTypographyStyles;
  displayLight?: ThemeTypographyStyles;
};
export declare type ThemeTypography6XL = {
  display: ThemeTypographyStyles;
  displayStrong?: ThemeTypographyStyles;
  displayEmphasis?: ThemeTypographyStyles;
  displayLight?: ThemeTypographyStyles;
};
export declare type ThemeTypography5XL = {
  display: ThemeTypographyStyles;
  displayStrong?: ThemeTypographyStyles;
  displayEmphasis?: ThemeTypographyStyles;
  displayLight?: ThemeTypographyStyles;
};
export declare type ThemeTypography4XL = {
  display: ThemeTypographyStyles;
  displayStrong?: ThemeTypographyStyles;
  displayEmphasis?: ThemeTypographyStyles;
  displayLight?: ThemeTypographyStyles;
};
export declare type ThemeTypography3XL = {
  heading: ThemeTypographyStyles;
  headingStrong?: ThemeTypographyStyles;
  headingEmphasis?: ThemeTypographyStyles;
  headingLight?: ThemeTypographyStyles;
};
export declare type ThemeTypography2XL = {
  heading: ThemeTypographyStyles;
  headingStrong?: ThemeTypographyStyles;
  headingEmphasis?: ThemeTypographyStyles;
  headingLight?: ThemeTypographyStyles;
};
export declare type ThemeTypographyXL = {
  heading: ThemeTypographyStyles;
  headingStrong?: ThemeTypographyStyles;
  headingEmphasis?: ThemeTypographyStyles;
  headingLight?: ThemeTypographyStyles;
};
export declare type ThemeTypographyL = {
  strong?: ThemeTypographyStyles;
  midi?: ThemeTypographyStyles;
  body?: ThemeTypographyStyles;
  light?: ThemeTypographyStyles;
  emphasis?: ThemeTypographyStyles;
};
export declare type ThemeTypographyM = {
  strong?: ThemeTypographyStyles;
  midi?: ThemeTypographyStyles;
  body?: ThemeTypographyStyles;
  light?: ThemeTypographyStyles;
  emphasis?: ThemeTypographyStyles;
};
export declare type ThemeTypographyS = {
  strong?: ThemeTypographyStyles;
  midi?: ThemeTypographyStyles;
  body?: ThemeTypographyStyles;
  light?: ThemeTypographyStyles;
  emphasis?: ThemeTypographyStyles;
};
export declare type ThemeTypographyXS = {
  strong?: ThemeTypographyStyles;
  midi?: ThemeTypographyStyles;
  body?: ThemeTypographyStyles;
  light?: ThemeTypographyStyles;
  emphasis?: ThemeTypographyStyles;
};
export declare type ThemeTypography2XS = {
  strong: ThemeTypographyStyles;
  strongUppercase?: ThemeTypographyStyles;
};
export declare type ThemeStyles = {
  color: ThemeColor;
  border: ThemeBorder;
  boxShadow: Record<'xs' | 's' | 'm' | 'brand' | 'l', string>;
  font: ThemeFont;
  icon: ThemeIcon;
  text: ThemeText;
  surface: ThemeSurface;
  overlay: ThemeOverlay;
  typography?: ThemeTypography;
  components?: Record<string, any>;
};
export interface Theme {
  version: number;
  settings: ThemeSettings;
  content: Partial<ThemeContent>;
}
