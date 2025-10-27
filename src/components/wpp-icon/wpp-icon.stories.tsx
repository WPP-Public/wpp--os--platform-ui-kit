import { Meta, StoryObj } from '@storybook/web-components'
import { useState } from 'storybook/internal/preview-api'
import { html } from 'lit-html'
import { styleMap } from 'lit-html/directives/style-map.js'
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js'

import { Props as WppIcon } from './WppIcon'
import { iconsList } from './const'
import { transformToVersionedTag } from '../../utils/utils'

export default {
  title: 'Design System/Icons & Images/Icons',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    options: { showPanel: false },
  },
  argTypes: {
    size: {
      options: ['m', 's'],
      control: { type: 'select' },
    },
    width: {
      control: { type: 'number' },
    },
    height: {
      control: { type: 'number' },
    },
    color: { control: 'color' },
    direction: {
      options: ['top', 'up', 'down', 'bottom', 'right', 'left', 'horizontal', 'vertical'],
      control: { type: 'select' },
    },
  },
} as Meta<WppIcon>

const pageStyle = {
  display: 'flex',
  justifyContent: 'center',
  padding: '4rem 20px',
  minHeight: '100vh',
  boxSizing: 'border-box',
}

const pageWrapper = {
  maxWidth: '1000px',
  width: '100%',
}

const headerStyle = {
  display: 'flex',
  marginBottom: '24px',
  fontWeight: '700',
}

const textStyle = {
  display: 'flex',
  marginBottom: '24px',
  fontWeight: '400',
  fontSize: '18px',
  fontFamily: 'var(--wpp-font-family)',
  lineHeight: '28px',
  letterSpacing: '0',
}

const actionsWrapper = {
  display: 'flex',
  width: '100%',
  marginTop: '32px',
  marginBottom: '20px',
  webkitBoxAlign: 'stretch',
  alignItems: 'stretch',
  flexDirection: 'row',
  justifyContent: 'stretch',
  flexWrap: 'wrap',
}

const actionItemStyle = {
  WebkitBoxFlex: '1',
  flexGrow: '1',
  width: 'auto',
  marginBottom: '5px',
}

const actionItemLabelStyle = {
  display: 'flex',
  marginBottom: '8px',
  fontWeight: '400',
  fontSize: '14px',
  fontFamily: 'var(--wpp-font-family)',
}

export const Icons: StoryObj<WppIcon & { direction: string }> = {
  render: args => {
    const [iconsDataList, setIconsDataList] = useState(iconsList)

    const getIconsData = (args: WppIcon & { direction: string }) =>
      iconsDataList
        .map(
          section => `<section>
        ${
          section.groups?.length > 0
            ? `<wpp-typography-v3-3-0 type="xl-heading" tag="h3" style="display: flex; margin-top: 24px">
              ${section.title}
            </wpp-typography-v3-3-0>`
            : ''
        }
        <div style='display: flex; flex-wrap: wrap;'>
          ${
            section.groups?.length > 0
              ? section.groups
                  .map(
                    group =>
                      `<div style='width: 100%; background: #F8F9FB; padding:16px; border-radius: 8px'>
               <wpp-typography-v3-3-0 type="m-midi" tag="h4" style="display: flex;">
                 ${group.title}
               </wpp-typography-v3-3-0>
               ${group.icons
                 .map(icon => {
                   if (icon.directions) {
                     return icon.directions
                       .map(
                         direction => `<div style="padding: 20px; border: 1px solid #00000010; border-radius: 5px; color: #333333; display: inline-flex; align-items: center; flex-direction: column; margin: 15px 10px 15px 0; width: 145px; height: 91px;">

              <${transformToVersionedTag(`wpp-icon-${icon.name}`)}
                 color=${args.color}
                 width=${args.width}
                 size=${args.size}
                 height=${args.height}
                 direction=${direction}
              ></${transformToVersionedTag(`wpp-icon-${icon.name}`)}>
              <p
            style="display: flex; margin: 15px 0 10px 0; font-weight: 400; font-size: 12px; font-family: var(--wpp-font-family); font-style: normal; text-align: center"
          >${icon.name} (direction: ${direction})</p>
            </div>`,
                       )
                       .join('')
                   }

                   return `<div style="padding: 20px; border: 1px solid #00000010; border-radius: 5px; color: #333333; display: inline-flex; align-items: center; flex-direction: column; margin: 15px 10px 15px 0; width: 145px; height: 91px;">

              <${transformToVersionedTag(`wpp-icon-${icon.name}`)}
                 color=${args.color}
                 width=${args.width}
                 size=${args.size}
                 height=${args.height}
              ></${transformToVersionedTag(`wpp-icon-${icon.name}`)}>
              <p
            style="display: flex; margin: 15px 0 10px 0; font-weight: 400; font-size: 12px; font-family: var(--wpp-font-family); font-style: normal; text-align: center"
          >${icon.name}</p>
            </div>`
                 })
                 .join('')}
             </div>`,
                  )
                  .join('')
              : ''
          }
        </div>
      </section>`,
        )
        .join('')

    const handleIconListChange = (event: CustomEvent) => {
      if (!event.detail.value) {
        setIconsDataList(iconsList)
      }

      const newIconsDataList = iconsList.map((iconSection: any) => ({
        ...iconSection,
        groups: iconSection.groups.reduce((acc: any, curr: any) => {
          const isIconPresentInGroup = curr.icons.find((icon: any) => icon.name.includes(event.detail.value))

          if (isIconPresentInGroup) {
            acc.push({
              ...curr,
              // @ts-ignore wrong typing here
              icons: curr.icons.filter(icon => icon.name.includes(event.detail.value)),
            })
          }

          return acc
        }, []),
      }))

      setIconsDataList(newIconsDataList as any)
    }

    const emptyState = () => {
      const isNothingFound = iconsDataList.find(section => section.groups?.length > 0)

      if (!isNothingFound) {
        return `<wpp-typography-v3-3-0 type='m-midi'>Nothing Found</wpp-typography-v3-3-0>`
      }

      return ''
    }

    return html`<div style=${styleMap(pageStyle)}>
      <div style=${styleMap(pageWrapper)}>
        <wpp-typography-v3-3-0 type="3xl-heading" tag="h3" style=${styleMap(headerStyle)}>Icons</wpp-typography-v3-3-0>
        <h3 style=${styleMap(textStyle)}>
          For icons, visual balance is the perceived size of an icon relative to other elements. The more visual balance
          there is, the easier it becomes to rely on other characteristics for establishing a visual hierarchy and flow
          in the UI.<br />For a list of deprecated icons, see "Notes"
        </h3>
        <div style=${styleMap(actionsWrapper)}>
          <div style=${styleMap(actionItemStyle)}>
            <p style=${styleMap(actionItemLabelStyle)}>Filter icons by name</p>
            <wpp-input-v3-3-0 type="search" @wppChange="${handleIconListChange}"></wpp-input-v3-3-0>
          </div>
        </div>
        ${unsafeHTML(getIconsData(args))} ${unsafeHTML(emptyState())}
      </div>
    </div> `
  },
  args: {
    width: 0,
    height: 0,
    size: 'm',
    color: '#8B919A',
  },
}
