/**
 * Adds Quill styles.
 * Implemented as a separate component to avoid styles duplication
 */
export class WppQuillStyles {
  static get is() { return "wpp-quill-styles"; }
  static get registryIs() { return "wpp-quill-styles-v3-3-0"; }
  static get originalStyleUrls() {
    return {
      "$": ["../../themes/styles/wpp.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["../../themes/styles/wpp.css"]
    };
  }
}
