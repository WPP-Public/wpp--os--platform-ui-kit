import { Color, TypographyType } from './types';
/**
 * @part typography - Main content wrapper element
 * @part inner - Content slot element
 */
export declare class WppTypography {
  host: HTMLWppTypographyElement;
  /**
   * Defines the typography style.
   */
  readonly type: TypographyType;
  /**
   * Defines the typography semantic tag.
   */
  readonly tag: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /**
   Defines the text color.
   */
  readonly color: Color;
  private typographyCssClasses;
  render(): any;
}
