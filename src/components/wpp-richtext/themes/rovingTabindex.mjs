import Keyboard from 'quill/modules/keyboard'
import { KEYBOARD_FOCUS_EVENT } from '../const'

export const ROVING_DIRECTION = {
  HORIZONTAL: 'HORIZONTAL',
  VERTICAL: 'VERTICAL'
}

// Applies a roving tabindex logic to toolbar
// See https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/examples/toolbar/
export function applyRovingTabindex(direction, controls) {
  const amount = controls.length
  let activeIndex = 0

  const setActiveByIndex = (index) => {
    controls[activeIndex].setAttribute('tabindex', '-1')
    controls[index].setAttribute('tabindex', '0')

    activeIndex = index
  }
  const focusByIndex = (index) => {
    setActiveByIndex(index)
    controls[index].focus()
  }

  controls.forEach((control, i) => {
    const prevKey = direction === ROVING_DIRECTION.HORIZONTAL ? Keyboard.keys.LEFT : Keyboard.keys.UP
    const nextKey = direction === ROVING_DIRECTION.HORIZONTAL ? Keyboard.keys.RIGHT : Keyboard.keys.DOWN

    control.setAttribute('tabindex',  '-1')

    control.addEventListener('keydown', (event) => {
      const newIndex = {
        [Keyboard.keys.HOME]: 0,
        [Keyboard.keys.END]: amount - 1,
        [prevKey]: (i + amount - 1) % amount, // cyclic previous (previous or last, in case of current is first)
        [nextKey]: (i + 1) % amount  // cyclic next (next or first, in case of current is last)
      }[event.keyCode]

      if (typeof newIndex === 'number') {
        focusByIndex(newIndex)

        // Prevent unwanted page scrolls
        event.preventDefault()

        // Notify wpp-richtext to switch to the keyboard focus control mode
        control.dispatchEvent(new CustomEvent(KEYBOARD_FOCUS_EVENT, {
          bubbles: true,
          detail: {
            keydownEvent: event
          }
        }))
      }
    })

    control.addEventListener('click', () => {
      setActiveByIndex(i)
    })
  })
  setActiveByIndex(0)
}
