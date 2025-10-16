import { Instance, Plugin } from 'tippy.js'

declare module 'tippy.js' {
  interface Props {
    hideOnEsc?: boolean
    hideOnPopperBlur?: boolean
    portalInside?: boolean
  }
}

export const hideOnEsc: Plugin = {
  name: 'hideOnEsc',
  defaultValue: false,
  fn(instance: Instance) {
    function onKeyDown(event: KeyboardEvent) {
      if (event.code === 'Escape' && instance.state.isVisible) {
        instance.hide()
      }
    }

    return {
      onShow() {
        document.addEventListener('keydown', onKeyDown)
      },
      onHide() {
        document.removeEventListener('keydown', onKeyDown)
      },
      onDestroy() {
        document.removeEventListener('keydown', onKeyDown)
      },
    }
  },
}

export const hideOnPopperBlur = {
  name: 'hideOnPopperBlur',
  defaultValue: false,
  fn(instance: Instance) {
    return {
      onCreate() {
        instance.popper.addEventListener('focusout', (event: FocusEvent) => {
          if (
            instance.props.hideOnPopperBlur &&
            event.relatedTarget &&
            !instance.popper.contains(event.relatedTarget as Node)
          ) {
            instance.hide()
          }
        })
      },
    }
  },
}

// Adds an attribute to the popper root so it is treated as inside the modal.
// Usage option: portalInside: boolean | string
//  - true - adds data-wpp-portal-inside
//  - false - removes attribute
//  - string (e.g., 'data-foo') -> uses custom attribute name
export const portalInside: Plugin = {
  name: 'portalInside',
  defaultValue: true,
  fn(instance: Instance) {
    let lastAttrName: string | null = null

    const toAttrName = (value: boolean | string): string | null => {
      if (value === false) return null
      if (typeof value === 'string') {
        // Accept either full data-* or just a token (we’ll prefix data-)
        return value.startsWith('data-') ? value : `data-${value}`
      }

      return 'data-wpp-portal-inside'
    }

    const apply = () => {
      const popper = instance.popper as HTMLElement | null

      if (!popper) return

      // Clean previous
      if (lastAttrName) {
        popper.removeAttribute(lastAttrName)
      }

      const nextAttr = toAttrName(instance.props.portalInside as any)

      if (nextAttr) {
        popper.setAttribute(nextAttr, '')
      }
      lastAttrName = nextAttr
    }

    return {
      onCreate() {
        apply()
      },
      onAfterUpdate(_, partial) {
        if (Object.prototype.hasOwnProperty.call(partial, 'portalInside')) {
          apply()
        }
      },
      onDestroy() {
        const popper = instance.popper as HTMLElement | null

        if (popper && lastAttrName) {
          popper.removeAttribute(lastAttrName)
        }
      },
    }
  },
}
