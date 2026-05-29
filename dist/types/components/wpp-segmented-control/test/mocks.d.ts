/**
 * Centralized test mocks for wpp-segmented-control and wpp-segmented-control-item.
 * Import these helpers to avoid duplicating setup logic across test files.
 */
/**
 * Default HTML template for a segmented control with text items (size m).
 * Items: item-1 (active), item-2, item-3 (disabled)
 */
export declare const TEXT_ITEMS_HTML = "\n  <wpp-segmented-control size=\"m\" value=\"item-1\">\n    <wpp-segmented-control-item value=\"item-1\">Tab 1</wpp-segmented-control-item>\n    <wpp-segmented-control-item value=\"item-2\">Tab 2</wpp-segmented-control-item>\n    <wpp-segmented-control-item value=\"item-3\" disabled>Tab 3</wpp-segmented-control-item>\n  </wpp-segmented-control>\n";
/**
 * HTML template for a segmented control with icon items (size s).
 * Items: grid (active), list, grid2
 */
export declare const ICON_ITEMS_HTML = "\n  <wpp-segmented-control size=\"s\" variant=\"icon\" value=\"grid\">\n    <wpp-segmented-control-item variant=\"icon\" value=\"grid\">\n      <wpp-icon-grid-dots></wpp-icon-grid-dots>\n    </wpp-segmented-control-item>\n    <wpp-segmented-control-item variant=\"icon\" value=\"list\">\n      <wpp-icon-list></wpp-icon-list>\n    </wpp-segmented-control-item>\n    <wpp-segmented-control-item variant=\"icon\" value=\"grid2\">\n      <wpp-icon-grid-dots></wpp-icon-grid-dots>\n    </wpp-segmented-control-item>\n  </wpp-segmented-control>\n";
/**
 * HTML template with 5 items for wrapping keyboard navigation tests.
 * Items 2 and 4 are disabled to test skipping.
 */
export declare const FIVE_ITEMS_WITH_DISABLED_HTML = "\n  <wpp-segmented-control size=\"m\" value=\"item-1\">\n    <wpp-segmented-control-item value=\"item-1\">Tab 1</wpp-segmented-control-item>\n    <wpp-segmented-control-item value=\"item-2\" disabled>Tab 2</wpp-segmented-control-item>\n    <wpp-segmented-control-item value=\"item-3\">Tab 3</wpp-segmented-control-item>\n    <wpp-segmented-control-item value=\"item-4\" disabled>Tab 4</wpp-segmented-control-item>\n    <wpp-segmented-control-item value=\"item-5\">Tab 5</wpp-segmented-control-item>\n  </wpp-segmented-control>\n";
/**
 * Creates a KeyboardEvent for testing keyboard navigation.
 */
export declare const createKeyboardEvent: (key: string, options?: Partial<KeyboardEvent>) => KeyboardEvent;
