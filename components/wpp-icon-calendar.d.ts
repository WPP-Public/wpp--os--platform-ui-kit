import type { Components, JSX } from "../dist/types/components";

interface WppIconCalendar extends Components.WppIconCalendar, HTMLElement {}
export const WppIconCalendar: {
  prototype: WppIconCalendar;
  new (): WppIconCalendar;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
