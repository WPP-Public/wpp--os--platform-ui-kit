import type { Components, JSX } from "../dist/types/components";

interface WppIconCampaign extends Components.WppIconCampaign, HTMLElement {}
export const WppIconCampaign: {
  prototype: WppIconCampaign;
  new (): WppIconCampaign;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
