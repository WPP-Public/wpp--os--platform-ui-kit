/**
 * Adds WppRichtext common styles.
 * Implemented as a separate component to avoid styles duplication
 */
export class WppRichtextCommonStyles {
  static get is() { return "wpp-richtext-common-styles"; }
  static get registryIs() { return "wpp-richtext-common-styles-v2-22-0"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-richtext-common-styles.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-richtext-common-styles.css"]
    };
  }
}
