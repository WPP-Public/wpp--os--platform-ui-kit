import isDate from 'lodash/isDate'

import { DATES_SEPARATOR, DATE_FORMAT_REG_EXP, INVALID_DATE, MONTHS, MONTHS_SHORT } from './const'
import { IPreset } from './types'

export function isValidDate(date: Date | Date[]) {
  if (Array.isArray(date)) {
    return date.every(currentDate => isDate(currentDate) && currentDate.toString() !== 'Invalid Date')
  }

  return isDate(date) && date.toString() !== 'Invalid Date'
}

const getSplittedDateParts = (date: string): string[] =>
  date.match(DATE_FORMAT_REG_EXP)?.map(item => item.toLowerCase()) || []

export function getCurrentFormatDate(dateFormat: string, separator = '/') {
  return (date: string): Date => {
    if (!date) return new Date(INVALID_DATE)

    const formatItems = dateFormat.match(DATE_FORMAT_REG_EXP)?.map(item => item.toLowerCase()) || []

    const dateItems = date.split(separator).map(item => {
      const formattedItem = item.includes(',') ? item.slice(0, -1) : item

      return !isNaN(Number(formattedItem)) ? Number(formattedItem) : formattedItem
    })

    if (formatItems.length !== dateItems.length) {
      return new Date(INVALID_DATE)
    }

    const monthFormat = formatItems.find(item => item.includes('m'))
    const month: number | undefined = monthFormat
      ? monthFormat === 'mm' || monthFormat === 'm'
        ? (dateItems[formatItems.indexOf(monthFormat)] as number) - 1
        : (monthFormat === 'mmm' ? MONTHS_SHORT : MONTHS).indexOf(dateItems[formatItems.indexOf(monthFormat)] as string)
      : undefined

    const dayFormat = formatItems.find(item => item.includes('d'))
    const day: number | undefined = dayFormat ? (dateItems[formatItems.indexOf(dayFormat)] as number) : undefined

    const yearFormat = formatItems.find(item => item.includes('yy'))
    const year: number | undefined = yearFormat ? (dateItems[formatItems.indexOf(yearFormat)] as number) : undefined

    if (year && month !== undefined && day) {
      const formattedYear = yearFormat === 'yy' ? parseInt(`${year >= 50 ? '19' : '20'}` + year, 10) : year

      return new Date(formattedYear, month, day)
    }

    return new Date(INVALID_DATE)
  }
}

export const getFormattedDateString = (date: string = '', dateFormat: string, separator = '/') => {
  const formatItems = getSplittedDateParts(dateFormat)

  let prevMargin = 0
  let isAllMatchedPartsLength = true

  const formattedInfoParts = formatItems
    .map((item, index) => {
      const nextMargin = prevMargin + item.length

      const currStringPart = date.substring(prevMargin, nextMargin)
      const isToAddSlash = currStringPart && currStringPart.length === item.length && index !== formatItems.length - 1

      prevMargin = nextMargin

      if (currStringPart.length !== item.length) {
        isAllMatchedPartsLength = false
      }

      return `${currStringPart}${isToAddSlash ? separator : ''}`
    })
    .filter(Boolean)
    .join('')

  return {
    formattedDate: formattedInfoParts,
    isAllMatchedPartsLength,
  }
}

export const getNextCursorPosition = (value: string, startPos: number, isAdded: boolean, separator = '/') => {
  const nearElement = isAdded ? value[startPos] : value[startPos - 2]

  let nextPosition = startPos

  if (isAdded) {
    if (nearElement === separator) {
      nextPosition += 1
    }

    if (value.endsWith(DATES_SEPARATOR)) {
      nextPosition = value.length
    }
  }

  return nextPosition
}

export const generatePreset = (days: number): IPreset => {
  const today = new Date()
  const endDate = today.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' })

  const startDate = new Date(today)

  startDate.setDate(startDate.getDate() - days + 1)

  const formattedStartDate = startDate.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })

  return {
    label: `Last ${days} Days`,
    value: [formattedStartDate, endDate],
  }
}

// Mapping known locales to their first day of the week
export const localeToFirstDayMap: Record<string, 0 | 1 | 2 | 3 | 4 | 5 | 6> = {
  'en-US': 0, // Sunday
  'en-GB': 1, // Monday
  'fr-FR': 1, // Monday
  'ar-SA': 6, // Saturday
  'de-DE': 1, // Monday
  'es-ES': 1, // Monday
  'it-IT': 1, // Monday
  'ja-JP': 0, // Sunday
  'ko-KR': 0, // Sunday
  'nl-NL': 1, // Monday
  'pt-BR': 0, // Sunday
  'ru-RU': 1, // Monday
  'tr-TR': 1, // Monday
  'zh-CN': 1, // Monday
  'hi-IN': 0, // Sunday
  'th-TH': 0, // Sunday
  'sv-SE': 1, // Monday
  'da-DK': 1, // Monday
  'fi-FI': 1, // Monday
  'nb-NO': 1, // Monday
  'pl-PL': 1, // Monday
  'cs-CZ': 1, // Monday
  'sk-SK': 1, // Monday
  'hu-HU': 1, // Monday
  'el-GR': 1, // Monday
  'he-IL': 0, // Sunday
  'ar-EG': 6, // Saturday
}
