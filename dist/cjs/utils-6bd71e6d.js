'use strict';

const utils = require('./utils-8b2c3bc1.js');

const setStepTabIndexes = (steps, tabStop) => {
  steps.forEach(step => {
    // A negative tabindex on a shadow host also excludes its slotted descendants from sequential focus.
    if (tabStop && step !== tabStop && step.contains(tabStop)) {
      step.removeAttribute('tabindex');
    }
    else {
      step.tabIndex = step === tabStop ? 0 : -1;
    }
  });
};
const getNavigableSteps = (stepper) => {
  const selector = utils.getTagSelector('wpp-step');
  return Array.from(stepper.querySelectorAll(selector)).filter(step => {
    if (step.getAttribute('aria-disabled') === 'true')
      return false;
    let parentStep = step.parentElement?.closest(selector);
    while (parentStep) {
      if (parentStep.getAttribute('orientation') !== 'horizontal' &&
        (!parentStep.hasAttribute('expanded') || parentStep.getAttribute('expanded') === 'false')) {
        return false;
      }
      parentStep = parentStep.parentElement?.closest(selector);
    }
    return true;
  });
};

exports.getNavigableSteps = getNavigableSteps;
exports.setStepTabIndexes = setStepTabIndexes;
