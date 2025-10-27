import type { Components, JSX } from "../dist/types/components";

interface WppIconExportFile extends Components.WppIconExportFile, HTMLElement {}
export const WppIconExportFile: {
  prototype: WppIconExportFile;
  new (): WppIconExportFile;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
