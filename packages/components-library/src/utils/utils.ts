import { DEFAULT_HIDE_DURATION_ANIMATION, DEFAULT_SHOW_DURATION_ANIMATION } from '../common/consts'
import version from '../../versioned-components/version'
import { AriaProps } from '../components'

export function format(first?: string, middle?: string, last?: string): string {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '')
}

export const hasShadowDom = (el: HTMLElement) => !!el.shadowRoot && !!(el as any).attachShadow

// TODO: Improve typings
export const getSlotEmptyStates = <T extends string>(
  nodes?: Node[] | NodeListOf<Node>,
  slotSelectors?: Record<T, string>,
) => {
  const emptySlots: Record<string, boolean> = {
    main: true,
  }

  if (slotSelectors) {
    Object.keys(slotSelectors).forEach(slotName => {
      emptySlots[slotName] = true
    })
  }

  if (!nodes?.length) {
    return emptySlots as Record<T | 'main', boolean>
  }

  const nodeList = Array.isArray(nodes) ? nodes : Array.from(nodes)
  const whitespaceRegex = /^\s*$/

  nodeList.forEach(node => {
    switch (node.nodeType) {
      // Text nodes are always assigned to the main slot if not empty
      case Node.TEXT_NODE: {
        if (node.nodeValue && !whitespaceRegex.test(node.nodeValue)) {
          emptySlots.main = false
        }
        break
      }

      // Ignore comment nodes
      case Node.COMMENT_NODE: {
        break
      }

      // Element nodes may belong to named slots or default to the main slot
      case Node.ELEMENT_NODE: {
        let isMainNode = true

        if (slotSelectors) {
          Object.entries<string>(slotSelectors).forEach(([slotName, slotSelector]) => {
            if ((node as HTMLElement).matches(slotSelector)) {
              if ((node as HTMLElement).tagName === 'SLOT') {
                if ((node as HTMLSlotElement).assignedNodes().length) {
                  isMainNode = false
                  emptySlots[slotName] = false
                }
              } else {
                isMainNode = false
                emptySlots[slotName] = false
              }
            }
          })
        }

        if (isMainNode) {
          emptySlots.main = false
        }

        break
      }

      // TODO: May need adjustments to take into account other node types like `Node.CDATA_SECTION_NODE`, etc.
      default: {
        emptySlots.main = false
      }
    }
  })

  return emptySlots as Record<T | 'main', boolean>
}

export const debounce = <T extends (...args: any[]) => ReturnType<T>>(
  callback: T,
  timeout: number,
): ((...args: Parameters<T>) => void) => {
  let timer: ReturnType<typeof setTimeout>

  return (...args: Parameters<T>) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      callback(...args)
    }, timeout)
  }
}

export const uuidv4 = (): string =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16),
  )

export const areSetsEqual = <T = any>(a: Set<T>, b: Set<T>) => {
  if (a.size !== b.size) {
    return false
  }

  for (const item of a) {
    if (!b.has(item)) {
      return false
    }
  }

  return true
}

// Checks whether event is targeted inside the specified container.
// Looks through nested shadowDOM containers as `event.target` might be misleading
export const isEventTargetContained = (containerEl: HTMLElement, event: Event) => {
  const isTargetContained = containerEl.contains(event.target as HTMLElement)
  const composedPath = event.composedPath()

  if (isTargetContained) {
    return true
  }

  // Nested shadowDOM elements mess with event.target node,
  // so we have to look through the event tree to be sure.
  let isPathNodeContained = false
  let currentRoot = null

  for (const item of composedPath) {
    if (item instanceof Node) {
      let nextRoot = item.getRootNode()

      if (nextRoot instanceof ShadowRoot) {
        nextRoot = nextRoot.host
      }

      if (currentRoot !== nextRoot) {
        currentRoot = nextRoot

        if (containerEl.contains(currentRoot)) {
          isPathNodeContained = true
          break
        }
      }
    }
  }

  return isPathNodeContained
}

export const hasParentWithId = (target: HTMLElement, id: string): boolean => {
  let current: HTMLElement | null = target

  while (current) {
    if (current.id.includes(id)) {
      return true
    }
    current = current.parentElement
  }

  return false
}

export const truncate = (value: string = '', maxLength: number, evenly: boolean = false): string => {
  if (value.length > maxLength) {
    if (evenly) {
      const firstChunkIndex = Math.round(maxLength / 2 - 0.1)
      const secondChunkIndex = value.length - Math.round(maxLength / 2 + 0.1) + 1

      return `${value.substring(0, firstChunkIndex)}…${value.substring(secondChunkIndex)}`
    }

    return `${value.substring(0, maxLength - 1)}…`
  }

  return value
}

export const toKebabCase = (str: string) =>
  str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase()

export const isObject = (val: any) => typeof val === 'object' && val !== null

export const recursiveObjectMap = <T>(initObj: T, mapFunction: (a: string | number) => string | number): T => {
  const obj = { ...initObj }

  for (const k in obj) {
    if (isObject(obj[k])) {
      obj[k] = recursiveObjectMap<T[Extract<keyof T, string>]>(obj[k], mapFunction)
    } else {
      obj[k] = mapFunction(obj[k] as any) as unknown as T[Extract<keyof T, string>]
    }
  }

  return obj
}

export const getHighlightData = (initString: string = '', initSearch: string = '') => {
  const index = initString.toLowerCase().indexOf(initSearch.toLowerCase())

  return {
    firstPart: initString.substring(0, index),
    highlight: initString.substring(index, index + initSearch.length),
    secondPart: initString.substring(index + initSearch.length),
  }
}

export const transformToVersionedTag = (tag: string): string => {
  if (tag.includes(version)) return tag

  return `${tag}-${version}`
}

export function closestElement(selector: string, base: Window | Document | Element) {
  const isWindow = (value: any): value is Window => value === window
  const isDocument = (value: any): value is Document => value === document

  function __closestFrom(el: Window | Document | Element): Element | null {
    if (!el || isDocument(el) || isWindow(el)) {
      return null
    }

    const found: Element | null = el.closest(selector)

    if (found) return found

    if ('assignedSlot' in el && el.assignedSlot) {
      return __closestFrom(el.assignedSlot)
    }

    // Traverse regular DOM - when button placed inside another Wpp element,
    // the traverse will stop at the shadow-root
    if ('parentElement' in el && el.parentElement) {
      return __closestFrom(el.parentElement)
    }

    // Traverse shadow DOM boundary
    const root = el.getRootNode() as ShadowRoot

    if (root && (root as ShadowRoot).host) {
      return __closestFrom(root.host)
    }

    return null
  }

  return __closestFrom(base)
}

export const applyBodyStylesIfNeeded = (action: 'remove' | 'add'): void => {
  let numberOfModals = 0

  const wppModalElements: NodeListOf<Element> = document.querySelectorAll(
    `wpp-modal-${version}, wpp-side-modal-${version}, wpp-full-screen-modal-${version}`,
  )

  wppModalElements.forEach((modal: Element) => {
    if (modal.classList.contains('wpp-overlay-hidden')) return

    if (modal.hasAttribute('open') && modal.getAttribute('open') !== 'false') {
      numberOfModals++
    }
  })

  if (action === 'add') {
    if (numberOfModals === 1) {
      // This padding is added to the body so there will be no content
      // shifting in case the scrollbar appears / disappears
      document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`
      document.body.style.overflow = 'hidden'
    }
  } else if (numberOfModals === 0) {
    document.body.style.paddingRight = '0'
    document.body.style.overflow = 'auto'
  }
}

export const autoFocusElement = (shouldFocus: boolean, el?: HTMLInputElement | HTMLTextAreaElement | HTMLElement) => {
  if (shouldFocus) {
    setTimeout(() => {
      if (!el) return

      el.focus()

      if (el.tagName.toLowerCase() === 'input' || el.tagName.toLowerCase() === 'textarea') {
        const inputEl = el as HTMLInputElement | HTMLTextAreaElement

        if (inputEl.value.length) {
          inputEl.setSelectionRange(inputEl.value.length, inputEl.value.length)
        }
      }
    }, 0)
  }
}

type FormObjectType = Record<string, string | string[]>

export const form2object = (form: HTMLFormElement): FormObjectType => {
  const data = new FormData(form)
  const result = {} as FormObjectType

  for (const [name, value] of data) {
    if (!(value instanceof File)) {
      if (Object.prototype.hasOwnProperty.call(result, name)) {
        if (!(result[name] instanceof Array)) result[name] = [result[name] as string]
        ;(result[name] as string[]).push(value)
      } else {
        result[name] = value
      }
    }
  }

  return result
}

export const getDurationValues = (
  duration?: number | [number, number],
  componentDefaultValues?: [number, number],
): [number, number] =>
  duration === undefined
    ? [
        componentDefaultValues ? componentDefaultValues[0] : DEFAULT_SHOW_DURATION_ANIMATION,
        componentDefaultValues ? componentDefaultValues[1] : DEFAULT_HIDE_DURATION_ANIMATION,
      ]
    : typeof duration === 'number'
    ? [duration, duration]
    : duration

export const selectDropdownWidth = (
  dropdownWidth: string,
  triggerEl: HTMLElement | null | undefined,
  host: HTMLElement,
): string => {
  const triggerElWidth = triggerEl ? triggerEl.offsetWidth : host.offsetWidth

  const match = dropdownWidth.match(/(\d+)/)

  const dropdownWidthValue: number = parseInt(match ? match[1] : '0', 10)

  return triggerElWidth > dropdownWidthValue ? `${triggerElWidth}px` : dropdownWidth
}

let hasFocused = false

export function getHasFocused(): boolean {
  return hasFocused
}

export function setHasFocused(value: boolean): void {
  hasFocused = value
}

// The "#micro-app" container is inside OS-based applications and has priority, as events
// from Components-Library are not registered outside of this container.
export function getHighestContainerInDOM(): HTMLElement {
  return document.querySelector('#root') || document.querySelector('#app') || document.body
}

export const getAriaProps = (ariaProps: AriaProps) => {
  const result: Record<string, string> = {}

  Object.entries(ariaProps).forEach(([key, val]) => {
    if (key === 'tabIndex') return

    if (val !== undefined && val !== null) {
      result[`aria-${key}`] = typeof val === 'boolean' ? String(val) : val
    }
  })

  return result
}

export const isWppElement = (element: HTMLElement): boolean =>
  element.tagName.toLowerCase().includes('wpp-') && element.tagName.toLowerCase().includes('-v')
