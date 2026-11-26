export interface LabelLocales {
  optional: string;
  /**
   * Accessible name of the info icon button shown when the label has a description. Optional so that
   * existing `config.locales` objects that only set `optional` keep type-checking.
   */
  showInfo?: string;
}
export interface LabelConfig {
  icon?: string;
  text: string;
  description?: string;
  locales?: LabelLocales;
  labelId?: string;
}
