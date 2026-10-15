'use strict';

let isLoadingHaloAngleRegistered = false;
/**
 * Registers the angle that rotates the `loadingHalo` SCSS mixin (`src/global/loadingHalo.scss`).
 * Call it in the `connectedCallback` of every component that uses the mixin.
 *
 * Custom property registrations are document-scoped, so an `@property` rule inside a component's
 * shadow stylesheet is ignored. Without a registration the angle interpolates discretely and the
 * halo jumps instead of rotating.
 */
const registerLoadingHaloAngle = () => {
  if (isLoadingHaloAngleRegistered || typeof CSS === 'undefined' || !CSS.registerProperty)
    return;
  isLoadingHaloAngleRegistered = true;
  try {
    CSS.registerProperty({
      name: '--wpp-loading-halo-angle',
      syntax: '<angle>',
      initialValue: '0deg',
      inherits: false,
    });
  }
  catch {
    // Already registered, e.g. by another version of the library on the same page.
  }
};

exports.registerLoadingHaloAngle = registerLoadingHaloAngle;
