import { ThemeAttributeValues } from './theme-observer';
export interface ThemeSubscriptionController {
  start: () => void;
  stop: () => void;
}
export declare const themeSubscriptionController: (getElement: () => HTMLElement | null | undefined, additionalCB?: ((theme?: ThemeAttributeValues) => void) | undefined) => ThemeSubscriptionController;
