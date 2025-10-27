import { ValueAccessorConfig } from '@stencil/angular-output-target'
import { ATTRS, EVENTS } from './types'

export const angularValueAccessorBindings: ValueAccessorConfig[] = [
  {
    elementSelectors: ['wpp-input-v3-3-0', 'wpp-textarea-v3-3-0'],
    event: EVENTS.Change,
    targetAttr: ATTRS.Value,
    type: 'text',
  },
  {
    elementSelectors: ['wpp-checkbox-v3-3-0', 'wpp-toggle-v3-3-0'],
    event: EVENTS.Change,
    targetAttr: ATTRS.Checked,
    type: 'boolean',
  },
  {
    elementSelectors: ['wpp-radio-group-v3-3-0', 'wpp-segmented-control-v3-3-0'],
    event: EVENTS.Change,
    targetAttr: ATTRS.Value,
    type: 'radio',
  },
  {
    elementSelectors: ['wpp-autocomplete-v3-3-0', 'wpp-select-v3-3-0'],
    event: EVENTS.Change,
    targetAttr: ATTRS.Value,
    type: 'select',
  },
]
