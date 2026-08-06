export type FocusableTriggerElement = HTMLElement & {
  setFocus?: () => Promise<void>;
};
