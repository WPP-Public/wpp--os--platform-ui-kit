/**
 * Registers the angle that rotates the `loadingHalo` SCSS mixin (`src/global/loadingHalo.scss`).
 * Call it in the `connectedCallback` of every component that uses the mixin.
 *
 * Custom property registrations are document-scoped, so an `@property` rule inside a component's
 * shadow stylesheet is ignored. Without a registration the angle interpolates discretely and the
 * halo jumps instead of rotating.
 */
export declare const registerLoadingHaloAngle: () => void;
