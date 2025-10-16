import { StoryObj, Meta } from '@storybook/web-components'
import { html, render } from 'lit-html'
import { Components } from '../../components'

export default {
  title: 'Design System/Components/Selection and input/Color Picker',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
  argTypes: {
    hexOpacity: { control: { type: 'text' } },
    type: {
      options: ['hex', 'rgba'],
      control: { type: 'select' },
    },
    disabled: {
      options: [true, false],
      control: { type: 'boolean' },
    },
    initialColor: {
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '#CC4B00' },
      },
    },
  },
} as Meta<Components.WppColorPicker>

const createColorPickerStory = (
  mode: 'theme' | 'custom' | 'theme and custom',
): StoryObj<Components.WppColorPicker> => ({
  render: args => {
    let savedColors = [...args.savedColors]
    let renderColorPicker = (colors: string[]) => {
      console.log(colors)
    }

    const handleColorSave = (event: CustomEvent) => {
      const newColor = event.detail

      console.log('Color saved:', newColor)

      savedColors = [...savedColors, newColor]

      renderColorPicker(savedColors)
    }

    const handleRemoveColor = (event: CustomEvent) => {
      const newColor = event.detail

      console.log('Color to be removed: ', newColor)

      savedColors = savedColors.filter(item => item !== newColor)

      renderColorPicker(savedColors)
    }

    renderColorPicker = (updatedSavedColors: string[]) => {
      const container = document.getElementById('color-picker-story')

      if (container) {
        render(
          html`
            <div style=${'display: flex; flex-direction: column'}>
              <wpp-color-picker-v3-2-0
                .type=${args.type}
                .mode=${mode}
                .hexOpacity=${args.hexOpacity}
                .savedColors=${updatedSavedColors}
                .disabled=${args.disabled}
                .initialColor=${args.initialColor}
                @wppSaveColor=${handleColorSave}
                @wppRemoveSavedColor=${handleRemoveColor}
              >
              </wpp-color-picker-v3-2-0>
            </div>
          `,
          container,
        )
      } else {
        console.error('Could not find container element with id "color-picker-story"')
      }
    }

    setTimeout(() => {
      renderColorPicker(savedColors)
    }, 0)

    return html`<div id="color-picker-story"></div>`
  },
})

export const Theme: StoryObj<Components.WppColorPicker> = createColorPickerStory('theme')
export const Custom: StoryObj<Components.WppColorPicker> = createColorPickerStory('custom')
export const ThemeAndCustom: StoryObj<Components.WppColorPicker> = createColorPickerStory('theme and custom')

Theme.args = {
  type: 'hex',
  disabled: false,
  savedColors: ['#7AB6FF', '#45E4B6', '#ECC707', '#FF9E66', '#FF7A91'],
  hexOpacity: '100%',
  initialColor: '#CC4B00',
}

Custom.args = {
  type: 'hex',
  disabled: false,
  savedColors: ['#7AB6FF', '#45E4B6', '#ECC707', '#FF9E66', '#FF7A91'],
  hexOpacity: '100%',
  initialColor: '#CC4B00',
}

ThemeAndCustom.args = {
  type: 'hex',
  disabled: false,
  savedColors: ['#7AB6FF', '#45E4B6', '#ECC707', '#FF9E66', '#FF7A91'],
  hexOpacity: '100%',
  initialColor: '#CC4B00',
}

Theme.parameters = { controls: { exclude: ['mode'] } }
Custom.parameters = { controls: { exclude: ['mode'] } }
ThemeAndCustom.parameters = { controls: { exclude: ['mode'] } }
