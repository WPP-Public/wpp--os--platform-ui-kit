import extend from 'extend'
import Quill from 'quill'
import Emitter from 'quill/core/emitter'
import BaseTheme, { BaseTooltip } from './base'
import { Range } from 'quill/core/selection'
import { icons } from './icons'
import { transformToVersionedTag } from '../../../utils/utils'
import { applyRovingTabindex, ROVING_DIRECTION } from './rovingTabindex'
import { KEYBOARD_FOCUS_CLASS } from '../const'
import { WppActionButton } from '../../wpp-action-button/wpp-action-button'
import { WppInput } from '../../wpp-input/wpp-input'

const TOOLBAR_CONFIG = [
  [{ header: ['1', '2', '3', false] }],
  ['bold', 'italic', 'underline', 'link'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['clean'],
]

const LinkBlot = Quill.import('formats/link')

const tooltipControlClassNames = ['ql-link', 'ql-formula', 'ql-image', 'ql-video']

class WppTheme extends BaseTheme {
  constructor(quill, options) {
    if (options.modules.toolbar != null && options.modules.toolbar.container == null) {
      options.modules.toolbar.container = TOOLBAR_CONFIG
    }
    super(quill, options)
    this.quill.container.classList.add('ql-wpp')
  }

  extendToolbar(toolbar) {
    toolbar.container.classList.add('ql-wpp')
    this.buildButtons([].slice.call(toolbar.container.querySelectorAll('button')), icons)
    this.buildPickers([].slice.call(toolbar.container.querySelectorAll('select')), icons)
    this.tooltip = new WppQuillTooltip(this.quill, this.options.bounds)
    if (toolbar.container.querySelector('.ql-link')) {
      this.quill.keyboard.addBinding({ key: 'K', shortKey: true }, function (range, context) {
        toolbar.handlers['link'].call(toolbar, !context.format.link)
      })
    }

    toolbar.focusControls = Array.from(toolbar.container.querySelectorAll('[tabindex="0"]:not(.ql-picker-item)'))
    const pickerItems = toolbar.container.querySelectorAll('.ql-picker-item')
    applyRovingTabindex(ROVING_DIRECTION.HORIZONTAL, toolbar.focusControls)
    applyRovingTabindex(ROVING_DIRECTION.VERTICAL, pickerItems)

    toolbar.activeElement = toolbar.focusControls[0]

    toolbar.focusControls.forEach(control => {
      control.addEventListener('focus', e => {
        toolbar.activeElement = e.target
      })

      control.addEventListener('click', () => {
        // Focus buttons back in keyboard focus mode, excluding tooltip triggers
        if (
          control.tagName.toUpperCase() === 'BUTTON' &&
          this.quill.container.parentNode.classList.contains(KEYBOARD_FOCUS_CLASS) &&
          !tooltipControlClassNames.some(className => control.classList.contains(className))
        ) {
          control.focus()
        }
      })
    })

    toolbar.enable = isEnabled => toolbar.activeElement.setAttribute('tabindex', isEnabled ? '0' : '-1')
  }
}

WppTheme.DEFAULTS = extend(true, {}, BaseTheme.DEFAULTS, {
  modules: {
    toolbar: {
      handlers: {
        link(value) {
          if (value) {
            let range = this.quill.getSelection()
            if (range === null || range.length === 0) return
            let preview = this.quill.getText(range)
            if (/^\S+@\S+\.\S+$/.test(preview) && preview.indexOf('mailto:') !== 0) {
              preview = 'mailto:' + preview
            }
            let tooltip = this.quill.theme.tooltip
            tooltip.edit('link', preview)
            tooltip.focusInput()
          } else {
            this.quill.format('link', false)
          }
        },
      },
    },
  },
})

class WppQuillTooltip extends BaseTooltip {
  constructor(quill, bounds) {
    super(quill, bounds)
    this.preview = this.root.querySelector('.ql-preview')
    this.input = this.root.querySelector(`${wppInput}`)
  }

  listen() {
    super.listen()
    this.root.querySelectorAll('.ql-action').forEach(button =>
      button.addEventListener('click', e => {
        if (this.root.classList.contains('ql-editing')) {
          this.save()
        } else {
          this.edit('link', this.preview.textContent)
          this.input.focus()
        }
        e.preventDefault()
      }),
    )
    this.root.querySelector('.ql-delete').addEventListener('click', e => {
      if (this.linkRange != null) {
        let range = this.linkRange
        this.restoreFocus()
        this.quill.formatText(range, 'link', false, Emitter.sources.USER)
        delete this.linkRange
      }
      e.preventDefault()
      this.hide()
    })

    this.root.querySelector('.ql-edit').addEventListener('click', e => {
      this.input.focus()
      e.preventDefault()
    })

    this.quill.on(Emitter.events.SELECTION_CHANGE, (range, oldRange, source) => {
      if (range == null) return
      if (range.length === 0 && source === Emitter.sources.USER) {
        const [link, offset] = this.quill.scroll.descendant(LinkBlot, range.index)
        if (link) {
          this.linkRange = new Range(range.index - offset, link.length())
          const preview = LinkBlot.formats(link.domNode)
          this.preview.textContent = preview
          this.preview.setAttribute('href', preview)
          this.show()
          this.position(this.quill.getBounds(this.linkRange))
          return
        }
      } else {
        delete this.linkRange
      }
      this.hide()
    })
  }

  show() {
    super.show()
    this.root.removeAttribute('data-mode')
  }

  focusInput() {
    this.input.focus()
  }
}

const wppActionButton = transformToVersionedTag(WppActionButton.is)
const wppInput = transformToVersionedTag(WppInput.is)

WppQuillTooltip.TEMPLATE = [
  `
  <div class="ql-tooltip-wrapper">
    <a class="ql-preview" rel="noopener noreferrer" target="_blank" href="about:blank"></a>
    <${wppInput} type="text" size="s" data-formula="Enter formula" data-link="Enter link" data-video="Enter video"></${wppInput}>
    <${wppActionButton} class="ql-action ql-save">Save</${wppActionButton}>
    <div class="ql-action-buttons">
      <${wppActionButton} class="ql-action ql-edit">Edit</${wppActionButton}>
      <${wppActionButton} class="ql-delete" variant="destructive">Delete</${wppActionButton}>
    </div>
  </div>
  `,
]

export default WppTheme
