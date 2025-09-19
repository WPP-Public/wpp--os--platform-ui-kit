import Picker from './Picker.mjs'

import { WppIconGallery } from '../../wpp-icon/components/content/files/wpp-icon-gallery/wpp-icon-gallery'
import { sources } from '../types'
import { omit } from 'lodash'

export class ImageLibraryPicker extends Picker {
  static handler(value) {
    const { index, length } = this.quill.getSelection()
    const blotValue = this.quill.imageLibrary[value].value

    this.quill.deleteText(index, length, sources.user)
    this.quill.insertEmbed(index, 'image', blotValue, sources.user)
    this.quill.setSelection(index, 1, sources.silent)

    Object.keys(omit(blotValue, ['src'])).forEach(key => {
      this.quill.format(key, blotValue[key])
    })

    this.quill.setSelection(index + 1, 0, sources.user)
  }

  constructor(select, quill) {
    const config = quill.options.modules.imageLibrary

    quill.imageLibrary = {}

    config.sections.forEach(section => {
      section.items.forEach(item => {
        const option = document.createElement('option')

        option.setAttribute('value', item.name)
        option.item = item
        select.appendChild(option)

        quill.imageLibrary[item.name] = item
      })
    })

    super(select, quill)
  }

  buildLabel() {
    const label = super.buildLabel()
    const icon = new WppIconGallery()

    label.prepend(icon)

    return label
  }

  buildOptions() {
    super.buildOptions()
    this.options.addEventListener('dragstart', e => {
      const value = e.target.dataset?.value

      if (value) {
        const item = this.quill.imageLibrary[value]
        const el = document.createElement('img')

        el.setAttribute('alt', item.name)
        el.setAttribute('src', item.value.src)

        if (item.value.width) {
          el.setAttribute('width', item.value.width)
        }

        if (item.value.height) {
          el.setAttribute('height', item.value.height)
        }

        this.quill.wppRichtext.dragElement = el

        setTimeout(() => this.close(), 0)
      }
    })
  }

  buildItem(option) {
    const el = super.buildItem(option)
    const image = document.createElement('img')
    const item = this.quill.imageLibrary[option.value]

    el.setAttribute('title', item.name)
    image.setAttribute('alt', item.name)
    image.setAttribute('src', item.toolbar?.src || item.value.src)

    if (item.toolbar?.width) {
      image.setAttribute('width', item.toolbar?.width)
    }

    if (item.toolbar?.height) {
      image.setAttribute('height', item.toolbar?.height)
    }

    image.dataset.value = option.value

    el.appendChild(image)

    return el
  }
}
