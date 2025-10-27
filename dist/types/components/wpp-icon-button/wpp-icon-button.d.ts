/**
 * @slot - Icon slot. The default slot, without the name attribute.
 *
 * @part wrapper - component wrapper element
 * @part inner - Content slot element
 */
export declare class WppIconButton {
  /**
   * Defines the button size. Setting this attribute changes the button height and padding.
   */
  readonly size: 'm' | 's';
  /**
   * If the component is disabled.
   */
  readonly disabled: boolean;
  /**
   * If the component is in loading state.
   */
  readonly loading: boolean;
  /**
   * Defines the button name.
   * */
  readonly name?: string;
  componentWillLoad(): void;
  private hostCssClasses;
  render(): any;
}
