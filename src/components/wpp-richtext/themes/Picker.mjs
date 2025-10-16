import Keyboard from 'quill/modules/keyboard'
import { KEYBOARD_FOCUS_EVENT } from '../const'
import { WppIconChevron } from '../../wpp-icon/components/arrows/arrows/wpp-icon-chevron/wpp-icon-chevron'

let optionsCounter = 0

function toggleAriaAttribute(element, attribute) {
  element.setAttribute(attribute, !(element.getAttribute(attribute) === 'true'))
}

class Picker {
  expanded = false
  constructor(select, quill) {
    this.quill = quill
    this.select = select
    this.container = document.createElement('span')
    this.buildPicker()
    this.select.style.display = 'none'
    this.select.parentNode.insertBefore(this.container, this.select)

    this.label.addEventListener('click', e => {
      e.preventDefault()
      this.togglePicker()
    })
    this.label.addEventListener('keydown', event => {
      switch (event.keyCode) {
        // Allows the keys to open the picker
        case Keyboard.keys.ENTER:
        case Keyboard.keys.SPACE:
        case Keyboard.keys.UP:
        case Keyboard.keys.DOWN:
          this.togglePicker()
          event.preventDefault()
          break

        // Allows the "Escape" key to close the picker
        case Keyboard.keys.ESCAPE:
          this.escape()
          event.preventDefault()
          break
        default:
      }
    })
    this.select.addEventListener('change', this.update.bind(this))
    this.options.addEventListener('keydown', event => {
      if (event.keyCode === Keyboard.keys.TAB) {
        this.close()
      }
    })
  }

  togglePicker() {
    this.expanded = !this.expanded
    this.container.classList.toggle('ql-expanded')
    // Toggle aria-expanded and aria-hidden to make the picker accessible
    toggleAriaAttribute(this.label, 'aria-expanded')
    toggleAriaAttribute(this.options, 'aria-hidden')
    if (this.expanded) {
      const focusElement = this.options.querySelector('.ql-selected') || this.options.querySelector('[tabindex="0"]')
      focusElement?.focus()
    }
  }

  buildItem(option) {
    const item = document.createElement('button')
    item.tabIndex = '0'

    item.classList.add('ql-picker-item')
    if (option.hasAttribute('value')) {
      item.setAttribute('data-value', option.getAttribute('value'))
    }
    if (option.textContent) {
      item.setAttribute('data-label', option.textContent)
    }
    item.addEventListener('click', e => {
      e.preventDefault()
      this.selectItem(item, true)
    })
    item.addEventListener('keydown', event => {
      switch (event.keyCode) {
        // Allows the keys to select an item
        case Keyboard.keys.ENTER:
        case Keyboard.keys.SPACE:
          this.selectItem(item, true)
          event.stopPropagation()
          event.preventDefault()
          break

        // Allows the "Escape" key to close the picker
        case Keyboard.keys.ESCAPE:
          this.escape()
          event.preventDefault()
          setTimeout(() => {
            this.label.dispatchEvent(
              new CustomEvent(KEYBOARD_FOCUS_EVENT, {
                bubbles: true,
                detail: {
                  keydownEvent: event,
                },
              }),
            )
          }, 10)
          break
        default:
      }
    })

    return item
  }

  buildLabel() {
    const label = document.createElement('button')
    const chevron = new WppIconChevron()

    chevron.setAttribute('size', 's')
    chevron.setAttribute('direction', 'down')

    label.classList.add('ql-picker-label')
    label.setAttribute('aria-expanded', 'false')
    label.setAttribute('tabindex', '0')

    label.appendChild(chevron)
    this.container.appendChild(label)

    return label
  }

  buildOptions() {
    const options = document.createElement('span')

    options.classList.add('ql-picker-options')

    // Don't want screen readers to read this until options are visible
    options.setAttribute('aria-hidden', 'true')
    options.tabIndex = '-1'

    // Need a unique id for aria-controls
    options.id = `ql-picker-options-${optionsCounter}`
    optionsCounter += 1
    this.label.setAttribute('aria-controls', options.id)

    this.options = options
    ;[].slice.call(this.select.options).forEach(option => {
      const item = this.buildItem(option)

      options.appendChild(item)
      if (option.selected === true) {
        this.selectItem(item)
      }
    })
    this.container.appendChild(options)
    this.options = options
  }

  buildPicker() {
    ;[].slice.call(this.select.attributes).forEach(item => {
      this.container.setAttribute(item.name, item.value)
    })
    this.container.classList.add('ql-picker')
    this.label = this.buildLabel()
    this.buildOptions()
  }

  escape() {
    // Close menu and return focus to trigger label
    this.close()
    // Need setTimeout for accessibility to ensure that the browser executes
    // focus on the next process thread and after any DOM content changes
    setTimeout(() => this.label.focus(), 1)
  }

  close() {
    this.expanded = false
    this.container.classList.remove('ql-expanded')
    this.label.setAttribute('aria-expanded', 'false')
    this.options.setAttribute('aria-hidden', 'true')
  }

  selectItem(item, trigger = false) {
    const selected = this.container.querySelector('.ql-selected')

    if (item === selected) return
    if (selected != null) {
      selected.classList.remove('ql-selected')
    }
    if (item == null) return
    item.classList.add('ql-selected')
    this.select.selectedIndex = [].indexOf.call(item.parentNode.children, item)
    if (item.hasAttribute('data-value')) {
      this.label.setAttribute('data-value', item.getAttribute('data-value'))
    } else {
      this.label.removeAttribute('data-value')
    }
    if (item.hasAttribute('data-label')) {
      this.label.setAttribute('data-label', item.getAttribute('data-label'))
    } else {
      this.label.removeAttribute('data-label')
    }
    if (trigger) {
      if (typeof Event === 'function') {
        this.select.dispatchEvent(new Event('change'))
      } else if (typeof Event === 'object') {
        // IE11
        const event = document.createEvent('Event')

        event.initEvent('change', true, true)
        this.select.dispatchEvent(event)
      }
      this.escape()
    }
  }

  update() {
    let option

    if (this.select.selectedIndex > -1) {
      const item = this.container.querySelector('.ql-picker-options').children[this.select.selectedIndex]

      option = this.select.options[this.select.selectedIndex]
      this.selectItem(item)
    } else {
      this.selectItem(null)
    }
    const isActive = option != null && option !== this.select.querySelector('option[selected]')

    this.label.classList.toggle('ql-active', isActive)
  }
}

export default Picker
