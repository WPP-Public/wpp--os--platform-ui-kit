import {
  ALLOWED_COMPONENTS_LEFT_MULTIPLE_SELECTION,
  ALLOWED_COMPONENTS_LEFT_SINGLE_SELECTION,
  ALLOWED_COMPONENTS_RIGHT_SINGLE_SELECTION,
  ALLOWED_COMPONENTS_RIGHT_MULTIPLE_SELECTION,
} from './consts'

/**
 * Normalizes a tag name by removing any versioning information (e.g., "-v2-20-0").
 * @param tagName - The original tag name.
 * @returns The normalized tag name.
 */
const normalizeTagName = (tagName: string): string => tagName.split('-v')[0]

/**
 * Validates the content of a slot.
 * Removes any disallowed components and logs warnings for invalid elements.
 *
 * @param host - The host element of the list item.
 * @param slotName - The name of the slot to validate ("left" or "right").
 * @param allowedComponents - The list of allowed components for this slot.
 * @param multiple - Indicates whether the list item’s multiple prop is true.
 */
const validateSlotContent = (
  host: HTMLElement,
  slotName: string,
  allowedComponents: Set<string>,
  multiple: boolean,
): void => {
  const slotElements = Array.from(host.querySelectorAll(`[slot="${slotName}"]`))

  slotElements.forEach(element => {
    const tagName = normalizeTagName(element.tagName.toLowerCase())

    // For the right slot, "wpp-menu-context" is allowed only if multiple is true.
    if (slotName === 'right' && tagName === 'wpp-menu-context' && !multiple) {
      console.warn(`[WppListItem] "wpp-menu-context" is not allowed in single selection mode (multiple is false).`)
      element.remove()

      return
    }

    // Additionally, allow any Icon when it's not multiple
    const isAllowed = allowedComponents.has(tagName) || (tagName.startsWith('wpp-icon') && !multiple)

    if (!isAllowed) {
      console.warn(
        `[WppListItem] Invalid component "${tagName}" found in the "${slotName}" slot. Only these components are allowed: ${Array.from(
          allowedComponents,
        ).join(', ')}`,
      )
      element.remove()
    }
  })
}

export const validateRightSlotContent = (host: HTMLElement, multiple: boolean): void => {
  const allowedComponents = multiple
    ? ALLOWED_COMPONENTS_RIGHT_MULTIPLE_SELECTION
    : ALLOWED_COMPONENTS_RIGHT_SINGLE_SELECTION

  validateSlotContent(host, 'right', allowedComponents, multiple)
}

export const validateLeftSlotContent = (host: HTMLElement, multiple: boolean): void => {
  const allowedComponents = multiple
    ? ALLOWED_COMPONENTS_LEFT_MULTIPLE_SELECTION
    : ALLOWED_COMPONENTS_LEFT_SINGLE_SELECTION

  validateSlotContent(host, 'left', allowedComponents, multiple)
}
