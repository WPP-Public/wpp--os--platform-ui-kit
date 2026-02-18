'use strict';

const consts = require('./consts-dba6e6dd.js');

const version = 'v4-0-0';

function format(first, middle, last) {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}
const hasShadowDom = (el) => !!el.shadowRoot && !!el.attachShadow;
// TODO: Improve typings
const getSlotEmptyStates = (nodes, slotSelectors) => {
  const emptySlots = {
    main: true,
  };
  if (slotSelectors) {
    Object.keys(slotSelectors).forEach(slotName => {
      emptySlots[slotName] = true;
    });
  }
  if (!nodes?.length) {
    return emptySlots;
  }
  const nodeList = Array.isArray(nodes) ? nodes : Array.from(nodes);
  const whitespaceRegex = /^\s*$/;
  nodeList.forEach(node => {
    switch (node.nodeType) {
      // Text nodes are always assigned to the main slot if not empty
      case Node.TEXT_NODE: {
        if (node.nodeValue && !whitespaceRegex.test(node.nodeValue)) {
          emptySlots.main = false;
        }
        break;
      }
      // Ignore comment nodes
      case Node.COMMENT_NODE: {
        break;
      }
      // Element nodes may belong to named slots or default to the main slot
      case Node.ELEMENT_NODE: {
        let isMainNode = true;
        if (slotSelectors) {
          Object.entries(slotSelectors).forEach(([slotName, slotSelector]) => {
            if (node.matches(slotSelector)) {
              if (node.tagName === 'SLOT') {
                if (node.assignedNodes().length) {
                  isMainNode = false;
                  emptySlots[slotName] = false;
                }
              }
              else {
                isMainNode = false;
                emptySlots[slotName] = false;
              }
            }
          });
        }
        if (isMainNode) {
          emptySlots.main = false;
        }
        break;
      }
      // TODO: May need adjustments to take into account other node types like `Node.CDATA_SECTION_NODE`, etc.
      default: {
        emptySlots.main = false;
      }
    }
  });
  return emptySlots;
};
const debounce = (callback, timeout) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, timeout);
  };
};
const uuidv4 = () => 
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16));
const areSetsEqual = (a, b) => {
  if (a.size !== b.size) {
    return false;
  }
  for (const item of a) {
    if (!b.has(item)) {
      return false;
    }
  }
  return true;
};
// Checks whether event is targeted inside the specified container.
// Looks through nested shadowDOM containers as `event.target` might be misleading
const isEventTargetContained = (containerEl, event) => {
  const isTargetContained = containerEl.contains(event.target);
  const composedPath = event.composedPath();
  if (isTargetContained) {
    return true;
  }
  // Nested shadowDOM elements mess with event.target node,
  // so we have to look through the event tree to be sure.
  let isPathNodeContained = false;
  let currentRoot = null;
  for (const item of composedPath) {
    if (item instanceof Node) {
      let nextRoot = item.getRootNode();
      if (nextRoot instanceof ShadowRoot) {
        nextRoot = nextRoot.host;
      }
      if (currentRoot !== nextRoot) {
        currentRoot = nextRoot;
        if (containerEl.contains(currentRoot)) {
          isPathNodeContained = true;
          break;
        }
      }
    }
  }
  return isPathNodeContained;
};
const hasParentWithId = (target, id) => {
  let current = target;
  while (current) {
    if (current.id.includes(id)) {
      return true;
    }
    current = current.parentElement;
  }
  return false;
};
const truncate = (value = '', maxLength, evenly = false) => {
  if (value.length > maxLength) {
    if (evenly) {
      const firstChunkIndex = Math.round(maxLength / 2 - 0.1);
      const secondChunkIndex = value.length - Math.round(maxLength / 2 + 0.1) + 1;
      return `${value.substring(0, firstChunkIndex)}…${value.substring(secondChunkIndex)}`;
    }
    return `${value.substring(0, maxLength - 1)}…`;
  }
  return value;
};
const toKebabCase = (str) => str
  .replace(/([a-z])([A-Z])/g, '$1-$2')
  .replace(/\s+/g, '-')
  .toLowerCase();
const isObject = (val) => typeof val === 'object' && val !== null;
const recursiveObjectMap = (initObj, mapFunction) => {
  const obj = { ...initObj };
  for (const k in obj) {
    if (isObject(obj[k])) {
      obj[k] = recursiveObjectMap(obj[k], mapFunction);
    }
    else {
      obj[k] = mapFunction(obj[k]);
    }
  }
  return obj;
};
const getHighlightData = (initString = '', initSearch = '') => {
  const index = initString.toLowerCase().indexOf(initSearch.toLowerCase());
  return {
    firstPart: initString.substring(0, index),
    highlight: initString.substring(index, index + initSearch.length),
    secondPart: initString.substring(index + initSearch.length),
  };
};
const transformToVersionedTag = (tag) => {
  if (tag.includes(version))
    return tag;
  return `${tag}-${version}`;
};
function closestElement(selector, base) {
  const isWindow = (value) => value === window;
  const isDocument = (value) => value === document;
  function __closestFrom(el) {
    if (!el || isDocument(el) || isWindow(el)) {
      return null;
    }
    const found = el.closest(selector);
    if (found)
      return found;
    if ('assignedSlot' in el && el.assignedSlot) {
      return __closestFrom(el.assignedSlot);
    }
    // Traverse regular DOM - when button placed inside another Wpp element,
    // the traverse will stop at the shadow-root
    if ('parentElement' in el && el.parentElement) {
      return __closestFrom(el.parentElement);
    }
    // Traverse shadow DOM boundary
    const root = el.getRootNode();
    if (root && root.host) {
      return __closestFrom(root.host);
    }
    return null;
  }
  return __closestFrom(base);
}
const applyBodyStylesIfNeeded = (action) => {
  let numberOfModals = 0;
  const wppModalElements = document.querySelectorAll(`wpp-modal-${version}, wpp-side-modal-${version}, wpp-full-screen-modal-${version}`);
  wppModalElements.forEach((modal) => {
    if (modal.classList.contains('wpp-overlay-hidden'))
      return;
    if (modal.hasAttribute('open') && modal.getAttribute('open') !== 'false') {
      numberOfModals++;
    }
  });
  if (action === 'add') {
    if (numberOfModals === 1) {
      // This padding is added to the body so there will be no content
      // shifting in case the scrollbar appears / disappears
      document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
      document.body.style.overflow = 'hidden';
    }
  }
  else if (numberOfModals === 0) {
    document.body.style.paddingRight = '0';
    document.body.style.overflow = 'auto';
  }
};
const autoFocusElement = (shouldFocus, el) => {
  if (shouldFocus) {
    setTimeout(() => {
      if (!el)
        return;
      el.focus();
      if (el.tagName.toLowerCase() === 'input' || el.tagName.toLowerCase() === 'textarea') {
        const inputEl = el;
        if (inputEl.value.length) {
          inputEl.setSelectionRange(inputEl.value.length, inputEl.value.length);
        }
      }
    }, 0);
  }
};
const form2object = (form) => {
  const data = new FormData(form);
  const result = {};
  for (const [name, value] of data) {
    if (!(value instanceof File)) {
      if (Object.prototype.hasOwnProperty.call(result, name)) {
        if (!(result[name] instanceof Array))
          result[name] = [result[name]];
        result[name].push(value);
      }
      else {
        result[name] = value;
      }
    }
  }
  return result;
};
const getDurationValues = (duration, componentDefaultValues) => duration === undefined
  ? [
    componentDefaultValues ? componentDefaultValues[0] : consts.DEFAULT_SHOW_DURATION_ANIMATION,
    componentDefaultValues ? componentDefaultValues[1] : consts.DEFAULT_HIDE_DURATION_ANIMATION,
  ]
  : typeof duration === 'number'
    ? [duration, duration]
    : duration;
const selectDropdownWidth = (dropdownWidth, triggerEl, host) => {
  const triggerElWidth = triggerEl ? triggerEl.offsetWidth : host.offsetWidth;
  const match = dropdownWidth.match(/(\d+)/);
  const dropdownWidthValue = parseInt(match ? match[1] : '0', 10);
  return triggerElWidth > dropdownWidthValue ? `${triggerElWidth}px` : dropdownWidth;
};
let hasFocused = false;
function getHasFocused() {
  return hasFocused;
}
function setHasFocused(value) {
  hasFocused = value;
}
// The "#micro-app" container is inside OS-based applications and has priority, as events
// from Components-Library are not registered outside of this container.
function getHighestContainerInDOM() {
  return document.querySelector('#root') || document.querySelector('#app') || document.body;
}
const getAriaProps = (ariaProps) => {
  const result = {};
  Object.entries(ariaProps).forEach(([key, val]) => {
    if (key === 'tabIndex')
      return;
    if (val !== undefined && val !== null) {
      result[`aria-${key}`] = typeof val === 'boolean' ? String(val) : val;
    }
  });
  return result;
};
const isWppElement = (element) => element.tagName.toLowerCase().includes('wpp-') && element.tagName.toLowerCase().includes('-v');

exports.applyBodyStylesIfNeeded = applyBodyStylesIfNeeded;
exports.areSetsEqual = areSetsEqual;
exports.autoFocusElement = autoFocusElement;
exports.closestElement = closestElement;
exports.debounce = debounce;
exports.form2object = form2object;
exports.format = format;
exports.getAriaProps = getAriaProps;
exports.getDurationValues = getDurationValues;
exports.getHasFocused = getHasFocused;
exports.getHighestContainerInDOM = getHighestContainerInDOM;
exports.getHighlightData = getHighlightData;
exports.getSlotEmptyStates = getSlotEmptyStates;
exports.hasParentWithId = hasParentWithId;
exports.hasShadowDom = hasShadowDom;
exports.isEventTargetContained = isEventTargetContained;
exports.isObject = isObject;
exports.isWppElement = isWppElement;
exports.recursiveObjectMap = recursiveObjectMap;
exports.selectDropdownWidth = selectDropdownWidth;
exports.setHasFocused = setHasFocused;
exports.toKebabCase = toKebabCase;
exports.transformToVersionedTag = transformToVersionedTag;
exports.truncate = truncate;
exports.uuidv4 = uuidv4;
exports.version = version;
