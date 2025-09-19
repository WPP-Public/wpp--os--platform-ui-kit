import { h } from '@stencil/core'
import { iconsList } from '../wpp-icon/consts'
import { AcceptConfig } from './types'
import { transformToVersionedTag } from '../../utils/utils'

export const convertMBToBytes = (size: number) => size * 1024 ** 2

export const getExtension = (filename: string = ''): string => `.${filename.split('.').pop()}`

export const getExtensionsList = (acceptConfig: AcceptConfig): string[] =>
  Object.entries(acceptConfig).reduce<string[]>((acc, [_, extensions]) => [...acc, ...extensions], [])

export const getBaseName = (fileName: string = ''): string => fileName.split('.')[0]

export const renameFile = (file: File, newFileName: string): File => new File([file], newFileName, { type: file.type })

export const modifyPropertiesOnFile = (file: File, properties: Partial<File>): File =>
  new File([file], file.name, { ...properties })

//  * WPPOPENDS-512 WPPOPENDS-311
// Extracting all the icon names from iconsList, to force register and prevent tree shaking during build
export const getIconNames = (): string[] => {
  const iconNames: string[] = []

  iconsList.forEach(category => {
    category.groups.forEach(group => {
      group.icons.forEach(icon => {
        iconNames.push(`wpp-icon-${icon.name}`)
      })
    })
  })

  return iconNames
}

// Render all icons dynamically using transformToVersionedTag
export const renderIcons = () => {
  const iconNames = getIconNames()

  return iconNames.map(iconName => {
    const versionedTag = transformToVersionedTag(iconName)

    return h(versionedTag, { 'data-fake': 'prevent-tree-shaking' }) // Dynamically create each icon component
  })
}
