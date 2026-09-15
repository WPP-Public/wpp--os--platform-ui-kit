export const TOAST_DURATION = 5000;
export const debounceWithControl = (callback, timeout) => {
  let timer;
  return {
    call: (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        timer = undefined;
        callback(...args);
      }, timeout);
    },
    cancel: () => {
      clearTimeout(timer);
      timer = undefined;
    },
    flush: (...args) => {
      clearTimeout(timer);
      timer = undefined;
      callback(...args);
    },
  };
};
let isLoadingAngleRegistered = false;
/**
 * Registers the angle driving the `is-loading` conic-gradient border.
 *
 * Custom property registrations are document-scoped, so an `@property` rule inside this
 * component's shadow stylesheet is ignored. Without a registration the angle interpolates
 * discretely and the gradient is invalid for half of every cycle.
 */
export const registerLoadingAngle = () => {
  if (isLoadingAngleRegistered || typeof CSS === 'undefined' || !CSS.registerProperty)
    return;
  isLoadingAngleRegistered = true;
  try {
    CSS.registerProperty({
      name: '--wpp-chat-input-loading-angle',
      syntax: '<angle>',
      initialValue: '0deg',
      inherits: false,
    });
  }
  catch {
    // Already registered by another instance.
  }
};
