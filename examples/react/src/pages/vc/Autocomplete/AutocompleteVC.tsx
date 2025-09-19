import React, { useCallback, useEffect, useRef, useState } from 'react'
import { AutocompleteDefaultOption, AutocompleteOption, debounce } from '@platform-ui-kit/components-library'
import { WppAutocomplete, WppButton, WppListItem } from '@platform-ui-kit/components-library-react'

import styles from './AutocompleteVC.module.scss'
import { SelectedValues } from '../../Autocomplete/SelectedValues'
import { AutocompleteExtendedOption, SlotItemNode } from '@platform-ui-kit/components-library/src'

const fetchDummyData = async (query: string): Promise<AutocompleteDefaultOption[]> =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: 1, label: `Item matching "${query}" 1` },
        { id: 2, label: `Item matching "${query}" 2` },
        { id: 3, label: `Item matching "${query}" 3` },
      ])
    }, 500)
  })

export const staticSuggestions = [
  { id: 1, label: 'Avacado' },
  { id: 2, label: 'Blueberry' },
  { id: 3, label: 'Cherry' },
  { id: 4, label: 'Durian' },
  { id: 5, label: 'Elderberry' },
  {
    id: 12,
    label: 'All the fruits in the world mixed into a SUPER FRUIT MIX! Trimmed to the edge of the universe -_-',
  },
]

export const fruitOptions = [
  {
    id: 1,
    label: 'Avacado',
  },
  {
    id: 2,
    label: 'Blueberry',
  },
  {
    id: 3,
    label: 'Cherry',
  },
  {
    id: 4,
    label: 'Durian',
  },
  {
    id: 5,
    label: 'Elderberry',
  },
  {
    id: 6,
    label: 'Сarambola',
  },
  {
    id: 7,
    label: 'Grape',
  },
  {
    id: 8,
    label: 'Orange',
  },
  {
    id: 9,
    label: 'Apple',
  },
  {
    id: 10,
    label: 'Grapefruit',
  },
  {
    id: 11,
    label: 'Watermelon',
  },
  {
    id: 12,
    label: 'All the fruits in the world mixed into a SUPER FRUIT MIX! Trimmed to the edge of the universe -_-',
  },
  {
    id: 13,
    label: 'Pear',
  },
  {
    id: 14,
    label: 'Apricot',
  },
  {
    id: 15,
    label: 'Banana',
  },
  {
    id: 16,
    label: 'Melon',
  },
]

const SUGGESTIONS_SAMPLE_1 = [
  {
    id: 1,
    label: 'Avacado',
  },
  {
    id: 2,
    label: 'Blueberry',
  },
  {
    id: 3,
    label: 'Cherry',
  },
  {
    id: 4,
    label: 'Durian',
  },
  {
    id: 5,
    label: 'Elderberry',
  },
]

const SUGGESTIONS_SAMPLE_2 = [
  {
    id: 10,
    label: 'Grapefruit',
  },
  {
    id: 11,
    label: 'Watermelon',
  },
  {
    id: 12,
    label: 'All the fruits in the world mixed into a SUPER FRUIT MIX! Trimmed to the edge of the universe -_-',
  },
  {
    id: 13,
    label: 'Pear',
  },
]

export const AutocompleteVCPage = () => {
  const [options, setOptions] = useState<AutocompleteOption[]>([])
  const [value, setValue] = useState<AutocompleteOption[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const autocompleteRef = useRef<HTMLWppAutocompleteElement>(null)
  const [basicValue, setBasicValue] = useState<AutocompleteDefaultOption[]>([
    {
      id: 5,
      label: 'Elderberry',
    },
  ])

  const [basicValue1, setBasicValue1] = useState<AutocompleteDefaultOption[]>([
    {
      id: 5,
      label: 'Elderberry',
    },
  ])
  const [basicValue2, setBasicValue2] = useState<AutocompleteDefaultOption[]>([
    {
      id: 5,
      label: 'Elderberry',
    },
  ])
  const [basicValue3, setBasicValue3] = useState<AutocompleteDefaultOption[]>([
    {
      id: 5,
      label: 'Elderberry',
    },
  ])
  const [basicValue4, setBasicValue4] = useState<AutocompleteDefaultOption[]>([
    {
      id: 5,
      label: 'Elderberry',
    },
  ])
  const [basicValue5, setBasicValue5] = useState<AutocompleteDefaultOption[]>([
    {
      id: 5,
      label: 'Elderberry',
    },
  ])
  const [basicValue6, setBasicValue6] = useState<AutocompleteDefaultOption[]>([
    {
      id: 5,
      label: 'Elderberry',
    },
  ])
  const [basicValue7, setBasicValue7] = useState<AutocompleteDefaultOption[]>([
    {
      id: 5,
      label: 'Elderberry',
    },
  ])
  const [basicValue8, setBasicValue8] = useState<AutocompleteDefaultOption[]>([])
  const [basicValue9, setBasicValue9] = useState<AutocompleteDefaultOption[]>([
    {
      id: 5,
      label: 'Elderberry',
    },
  ])

  const [multipleDefaultValues, setMultipleDefaultValues] = useState<AutocompleteDefaultOption[]>([
    {
      id: 5,
      label: 'Elderberry',
    },
    {
      id: 15,
      label: 'Banana',
    },
    {
      id: 13,
      label: 'Pear',
    },
    {
      id: 10,
      label: 'Grapefruit',
    },
    {
      id: 6,
      label: 'Сarambola',
    },
  ])
  const [multipleDefaultValues1, setMultipleDefaultValues1] = useState<AutocompleteDefaultOption[]>([
    {
      id: 5,
      label: 'Elderberry',
    },
    {
      id: 15,
      label: 'Banana',
    },
    {
      id: 13,
      label: 'Pear',
    },
    {
      id: 10,
      label: 'Grapefruit',
    },
    {
      id: 6,
      label: 'Сarambola',
    },
  ])
  const [multipleDefaultValues2, setMultipleDefaultValues2] = useState<AutocompleteDefaultOption[]>([
    {
      id: 5,
      label: 'Elderberry',
    },
    {
      id: 15,
      label: 'Banana',
    },
    {
      id: 13,
      label: 'Pear',
    },
    {
      id: 10,
      label: 'Grapefruit',
    },
    {
      id: 6,
      label: 'Сarambola',
    },
  ])
  const [multipleDefaultValues3, setMultipleDefaultValues3] = useState<AutocompleteDefaultOption[]>([
    {
      id: 5,
      label: 'Elderberry',
    },
    {
      id: 15,
      label: 'Banana',
    },
    {
      id: 13,
      label: 'Pear',
    },
    {
      id: 10,
      label: 'Grapefruit',
    },
    {
      id: 6,
      label: 'Сarambola',
    },
  ])
  const [multipleDefaultValues4, setMultipleDefaultValues4] = useState<AutocompleteDefaultOption[]>([])
  const [multipleDefaultValues5, setMultipleDefaultValues5] = useState<AutocompleteDefaultOption[]>([])
  const [multipleDefaultValues6, setMultipleDefaultValues6] = useState<AutocompleteDefaultOption[]>([])
  const [dynamicSuggestions, setDynamicSuggestions] = useState<AutocompleteExtendedOption[]>([])

  const helperCreateElement = (type: string, props?: any, children?: any): SlotItemNode => ({
    type,
    props: props || {},
    ...(children && { children: Array.isArray(children) ? children : [children] }),
  })

  const staticSuggestionWithSlots: AutocompleteExtendedOption[] = [
    {
      id: 1,
      label: 'Avacado',
    },
    {
      id: 2,
      label: 'Blueberry',
      slots: [helperCreateElement('wpp-icon-mail', { slot: 'left' })],
    },
    {
      id: 3,
      label: 'Cherry',
      slots: [
        helperCreateElement('wpp-icon-available-checkmark', { slot: 'left' }),
        helperCreateElement(
          'wpp-action-button',
          {
            slot: 'right',
            variant: 'secondary',
          },
          helperCreateElement('wpp-icon-plus', { slot: 'icon-start' }),
        ),
      ],
    },
    {
      id: 4,
      label: 'Durian',
      slots: [helperCreateElement('wpp-icon-chevron', { slot: 'right' })],
    },
    {
      id: 5,
      label: 'Elderberry',
      slots: [
        helperCreateElement('wpp-action-button', {
          slot: 'right',
          variant: 'secondary',
        }),
      ],
    },
    {
      id: 6,
      label: 'Сarambola',
      slots: [
        helperCreateElement('wpp-avatar', {
          slot: 'left',
          size: 'xs',
          src: 'https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028',
        }),
      ],
    },
    {
      id: 7,
      label: 'Grape',
      slots: [
        helperCreateElement(
          'wpp-action-button',
          {
            slot: 'right',
            variant: 'secondary',
          },
          helperCreateElement('wpp-icon-plus', { slot: 'icon-start' }),
        ),
        helperCreateElement('wpp-avatar', {
          slot: 'left',
          size: 'xs',
          src: 'https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028',
        }),
      ],
    },
    {
      id: 8,
      label: 'Orange',
      slots: [
        helperCreateElement('wpp-avatar', {
          slot: 'left',
          size: 'xs',
          variant: 'square',
          src: 'https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028',
        }),
      ],
    },
    {
      id: 9,
      label: 'Apple',
      slots: [
        helperCreateElement('wpp-avatar', {
          slot: 'left',
          size: 'xs',
          src: 'https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028',
        }),
        helperCreateElement('wpp-tag', { slot: 'right', label: 'Positive', variant: 'positive' }),
      ],
    },
    {
      id: 10,
      label: 'Grapefruit',
      slots: [helperCreateElement('span', { slot: 'caption', children: 'Caption' })],
    },
    {
      id: 11,
      label: 'Watermelon',
      slots: [
        helperCreateElement('span', { slot: 'caption', children: 'Caption' }),
        helperCreateElement('wpp-avatar', {
          slot: 'left',
          size: 's',
          variant: 'square',
          src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU',
        }),
        helperCreateElement('wpp-tag', { slot: 'right', label: 'Positive', variant: 'positive' }),
      ],
    },
    {
      id: 13,
      label: 'Pear',
      slots: [
        helperCreateElement('span', { slot: 'caption', children: 'Caption' }),
        helperCreateElement('wpp-avatar', {
          slot: 'left',
          size: 's',
          variant: 'square',
          src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU',
        }),
        helperCreateElement(
          'wpp-typography',
          {
            slot: 'right',
            type: 's-body',
          },
          helperCreateElement('span', { children: 'Text' }),
        ),
      ],
    },
  ]

  const handleFetchOptions = async (query: string) => {
    if (!query) return
    setLoading(true)
    try {
      const data = await fetchDummyData(query)

      setOptions(data)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }
  const debouncedFetchOptions = useCallback(debounce(handleFetchOptions, 300), [])

  const handleSearchValueChange = (event: CustomEvent<string>) => {
    const inputValue = event.detail

    debouncedFetchOptions(inputValue)
  }

  useEffect(() => {
    const currentRef = autocompleteRef.current

    if (currentRef) {
      currentRef.addEventListener('wppSearchValueChange', handleSearchValueChange as EventListener)
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('wppSearchValueChange', handleSearchValueChange as EventListener)
      }
    }
  }, [debouncedFetchOptions])

  return (
    <>
      <h2>Autocomplete - without suggestions</h2>
      <div className={styles.container} data-testid="autocompletes">
        <div>
          <div>
            <WppAutocomplete
              className={styles.item}
              required
              labelConfig={{
                text: 'Single Autocomplete with search',
              }}
              name="Single Autocomplete with search"
              placeholder="Select fruits"
              value={basicValue}
              onWppSearchValueChange={(event: CustomEvent) => {
                console.log('Search value changed to:', event.detail)
              }}
              onWppChange={(e: CustomEvent) => {
                console.log('Event name:', e.detail.name)
                setBasicValue(e.detail.value as AutocompleteDefaultOption[])
              }}
              autoFocus
              data-testid="single-autocomplete"
              showCreateNewElement
              simpleSearch
            >
              {fruitOptions.map(option => (
                <WppListItem key={option.id} value={option} label={option.label}>
                  <p slot="label">{option.label}</p>
                </WppListItem>
              ))}
            </WppAutocomplete>
          </div>

          <div className={styles.bottomItem} data-testid="extended-autocomplete-area">
            <WppAutocomplete
              className={styles.item}
              required
              labelConfig={{
                text: 'Extended Multiple Autocomplete',
              }}
              name="Extended Multiple Autocomplete"
              placeholder="Select fruits"
              value={basicValue1}
              onWppChange={(e: CustomEvent) => {
                console.log('Event name:', e.detail.name)
                setBasicValue1(e.detail.value as AutocompleteDefaultOption[])
              }}
              data-testid="extended-autocomplete"
              type="extended"
              multiple
              simpleSearch
            >
              {fruitOptions.map(option => (
                <WppListItem key={option.id} value={option} label={option.label}>
                  <p slot="label">{option.label}</p>
                </WppListItem>
              ))}
              <SelectedValues
                values={basicValue1}
                onCloseClick={value => setBasicValue1(basicValue1.filter(i => i.id !== value))}
              />
            </WppAutocomplete>
          </div>
        </div>

        <div>
          <div>
            <WppAutocomplete
              className={styles.item}
              required
              labelConfig={{
                text: 'Single Autocomplete without search',
              }}
              name="Single Autocomplete without search"
              placeholder="Select fruits"
              value={basicValue2}
              onWppChange={(e: CustomEvent) => {
                console.log('Event name:', e.detail.name)
                setBasicValue2(e.detail.value as AutocompleteDefaultOption[])
              }}
              data-testid="single-autocomplete-without-search"
            >
              {fruitOptions.map(option => (
                <WppListItem key={option.id} value={option} label={option.label}>
                  <p slot="label">{option.label}</p>
                </WppListItem>
              ))}
            </WppAutocomplete>
          </div>

          <div className={styles.bottomItem} data-testid="regular-autocomplete-area">
            <WppAutocomplete
              className={styles.item}
              required
              labelConfig={{
                text: 'Regular Multiple Autocomplete',
              }}
              name="Regular Multiple Autocomplete"
              placeholder="Select fruits"
              value={basicValue3}
              onWppChange={(e: CustomEvent) => {
                console.log('Event name:', e.detail.name)
                setBasicValue3(e.detail.value as AutocompleteDefaultOption[])
              }}
              type="regular"
              multiple
              simpleSearch
              data-testid="regular-autocomplete"
            >
              {fruitOptions.map(option => (
                <WppListItem key={option.id} value={option} label={option.label}>
                  <p slot="label">{option.label}</p>
                </WppListItem>
              ))}
              <SelectedValues
                values={basicValue3}
                onCloseClick={value => setBasicValue3(basicValue3.filter(i => i.id !== value))}
              />
            </WppAutocomplete>
          </div>
        </div>

        <div className={styles.inlineAutocompletes} data-testid="inline-messages-autocompletes">
          <div>
            <WppAutocomplete
              className={styles.inlineItem}
              required
              labelConfig={{
                text: 'Autocomplete with error message',
              }}
              name="Autocomplete with error message"
              placeholder="Select fruits"
              message="Error message"
              messageType="error"
              data-testid="error-autocomplete"
              loading
            ></WppAutocomplete>
          </div>

          <div style={{ marginTop: '5px' }}>
            <WppAutocomplete
              className={styles.inlineItem}
              required
              labelConfig={{
                text: 'Autocomplete with warning message',
              }}
              name="Autocomplete with warning message"
              placeholder="Select fruits"
              message="Warning message"
              messageType="warning"
            ></WppAutocomplete>
          </div>
        </div>

        <div data-testid="s-size-autocompletes">
          <div>
            <WppAutocomplete
              className={styles.item}
              required
              labelConfig={{
                text: 'Regular Autocomplete S size',
              }}
              name="Regular Autocomplete S size"
              placeholder="Select fruits"
              value={multipleDefaultValues3}
              onWppChange={(e: CustomEvent) => {
                console.log('Event name:', e.detail.name)
                setMultipleDefaultValues3(e.detail.value as AutocompleteDefaultOption[])
              }}
              showCreateNewElement
              simpleSearch
              multiple
              size="s"
            >
              {fruitOptions.map(option => (
                <WppListItem key={option.id} value={option} label={option.label}>
                  <p slot="label">{option.label}</p>
                </WppListItem>
              ))}
            </WppAutocomplete>
          </div>

          <div>
            <WppAutocomplete
              className={styles.item}
              required
              labelConfig={{
                text: 'Extended Autocomplete S size',
              }}
              name="Extended Autocomplete S size"
              placeholder="Select fruits"
              value={multipleDefaultValues}
              onWppChange={(e: CustomEvent) => {
                console.log('Event name:', e.detail.name)
                setMultipleDefaultValues(e.detail.value as AutocompleteDefaultOption[])
              }}
              data-testid="extended-s-size-autocomplete"
              type="extended"
              multiple
              size="s"
              simpleSearch
            >
              {fruitOptions.map(option => (
                <WppListItem key={option.id} value={option} label={option.label}>
                  <p slot="label">{option.label}</p>
                </WppListItem>
              ))}
              <SelectedValues
                values={multipleDefaultValues}
                onCloseClick={value => setMultipleDefaultValues(multipleDefaultValues.filter(i => i.id !== value))}
              />
            </WppAutocomplete>
          </div>
        </div>
      </div>

      <h2>Autocomplete - with suggestions</h2>
      <div className={styles.container} data-testid="autocompletes">
        <div>
          <div>
            <WppAutocomplete
              className={styles.item}
              required
              labelConfig={{
                text: 'Single Autocomplete with search',
              }}
              name="Single Autocomplete with search"
              placeholder="Select fruits"
              suggestions={staticSuggestions}
              value={basicValue4}
              onWppChange={(e: CustomEvent) => {
                console.log('Event name:', e.detail.name)
                setBasicValue4(e.detail.value as AutocompleteDefaultOption[])
              }}
              data-testid="single-autocomplete"
              showCreateNewElement
              simpleSearch
            >
              {fruitOptions.map(option => (
                <WppListItem key={option.id} value={option} label={option.label}>
                  <p slot="label">{option.label}</p>
                </WppListItem>
              ))}
            </WppAutocomplete>
          </div>

          <div className={styles.bottomItem} data-testid="extended-autocomplete-area">
            <WppAutocomplete
              className={styles.item}
              required
              labelConfig={{
                text: 'Extended Multiple Autocomplete',
              }}
              name="Extended Multiple Autocomplete"
              placeholder="Select fruits"
              suggestions={staticSuggestions}
              value={basicValue5}
              onWppChange={(e: CustomEvent) => {
                console.log('Event name:', e.detail.name)
                setBasicValue5(e.detail.value as AutocompleteDefaultOption[])
              }}
              data-testid="extended-autocomplete"
              type="extended"
              multiple
              simpleSearch
            >
              {fruitOptions.map(option => (
                <WppListItem key={option.id} value={option} label={option.label}>
                  <p slot="label">{option.label}</p>
                </WppListItem>
              ))}
              <SelectedValues
                values={basicValue5}
                onCloseClick={value => setBasicValue5(basicValue5.filter(i => i.id !== value))}
              />
            </WppAutocomplete>
          </div>
        </div>

        <div>
          <div>
            <WppAutocomplete
              className={styles.item}
              required
              labelConfig={{
                text: 'Single Autocomplete without search',
              }}
              name="Single Autocomplete without search"
              placeholder="Select fruits"
              suggestions={staticSuggestions}
              value={basicValue6}
              onWppChange={(e: CustomEvent) => {
                console.log('Event name:', e.detail.name)
                setBasicValue6(e.detail.value as AutocompleteDefaultOption[])
              }}
              data-testid="single-autocomplete-without-search"
            >
              {fruitOptions.map(option => (
                <WppListItem key={option.id} value={option} label={option.label}>
                  <p slot="label">{option.label}</p>
                </WppListItem>
              ))}
            </WppAutocomplete>
          </div>

          <div className={styles.bottomItem} data-testid="regular-autocomplete-area">
            <WppAutocomplete
              className={styles.item}
              required
              labelConfig={{
                text: 'Regular Multiple Autocomplete',
              }}
              name="Regular Multiple Autocomplete"
              placeholder="Select fruits"
              suggestions={staticSuggestions}
              value={basicValue7}
              onWppChange={(e: CustomEvent) => {
                console.log('Event name:', e.detail.name)
                setBasicValue7(e.detail.value as AutocompleteDefaultOption[])
              }}
              type="regular"
              multiple
              simpleSearch
              data-testid="regular-autocomplete"
            >
              {fruitOptions.map(option => (
                <WppListItem key={option.id} value={option} label={option.label}>
                  <p slot="label">{option.label}</p>
                </WppListItem>
              ))}
              <SelectedValues
                values={basicValue7}
                onCloseClick={value => setBasicValue7(basicValue7.filter(i => i.id !== value))}
              />
            </WppAutocomplete>
          </div>
        </div>

        <div data-testid="s-size-autocompletes">
          <div>
            <WppAutocomplete
              className={styles.item}
              required
              labelConfig={{
                text: 'Regular Autocomplete S size',
              }}
              name="Regular Autocomplete S size"
              placeholder="Select fruits"
              value={multipleDefaultValues1}
              onWppChange={(e: CustomEvent) => {
                console.log('Event name:', e.detail.name)
                setMultipleDefaultValues1(e.detail.value as AutocompleteDefaultOption[])
              }}
              showCreateNewElement
              suggestions={staticSuggestions}
              simpleSearch
              multiple
              size="s"
            >
              {fruitOptions.map(option => (
                <WppListItem key={option.id} value={option} label={option.label}>
                  <p slot="label">{option.label}</p>
                </WppListItem>
              ))}
            </WppAutocomplete>
          </div>

          <div className={styles.bottomItem}>
            <WppAutocomplete
              className={styles.item}
              required
              labelConfig={{
                text: 'Extended Autocomplete S size',
              }}
              name="Extended Autocomplete S size"
              placeholder="Select fruits"
              value={multipleDefaultValues2}
              onWppChange={(e: CustomEvent) => {
                console.log('Event name:', e.detail.name)
                setMultipleDefaultValues2(e.detail.value as AutocompleteDefaultOption[])
              }}
              data-testid="extended-s-size-autocomplete"
              suggestions={staticSuggestions}
              type="extended"
              multiple
              size="s"
              simpleSearch
            >
              {fruitOptions.map(option => (
                <WppListItem key={option.id} value={option} label={option.label}>
                  <p slot="label">{option.label}</p>
                </WppListItem>
              ))}
              <SelectedValues
                values={multipleDefaultValues2}
                onCloseClick={value => setMultipleDefaultValues2(multipleDefaultValues2.filter(i => i.id !== value))}
              />
            </WppAutocomplete>
          </div>
        </div>

        <div>
          <div>
            <WppAutocomplete
              className={styles.item}
              labelConfig={{
                text: 'Multiple Autocomplete with slot suggestions',
              }}
              placeholder="Select fruits"
              value={multipleDefaultValues4}
              onWppChange={(e: CustomEvent) => setMultipleDefaultValues4(e.detail.value as AutocompleteDefaultOption[])}
              suggestions={staticSuggestionWithSlots}
              multiple
            >
              {fruitOptions.map(option => (
                <WppListItem key={option.id} value={option} label={option.label}>
                  <p slot="label">{option.label}</p>
                </WppListItem>
              ))}
            </WppAutocomplete>
          </div>
        </div>

        <div>
          <div>
            <WppAutocomplete
              className={styles.dynamicItem}
              labelConfig={{
                text: 'Single Autocomplete with dynamic suggestions',
              }}
              name="Single Autocomplete with dynamic suggestions"
              placeholder="Select fruits"
              value={basicValue9}
              onWppSearchValueChange={(event: CustomEvent) => {
                console.log('Search value changed to:', event.detail)
              }}
              suggestions={dynamicSuggestions}
              onWppChange={(e: CustomEvent) => {
                console.log('Change event: ', e)
                setBasicValue9(e.detail.value as AutocompleteDefaultOption[])
              }}
              simpleSearch
              data-testid="single-autocomplete-dynamic-suggestions"
            >
              {fruitOptions.map(option => (
                <WppListItem key={option.id} value={option} label={option.label}>
                  <p slot="label">{option.label}</p>
                </WppListItem>
              ))}
            </WppAutocomplete>
          </div>
          <div>
            <WppAutocomplete
              className={styles.dynamicItem}
              labelConfig={{
                text: 'Multiple Autocomplete with dynamic suggestions',
              }}
              name="Multiple Autocomplete with dynamic suggestions"
              placeholder="Select fruits"
              value={multipleDefaultValues5}
              onWppSearchValueChange={(event: CustomEvent) => {
                console.log('Search value changed to:', event.detail)
              }}
              onWppChange={(e: CustomEvent) => {
                console.log('Change event: ', e)
                setMultipleDefaultValues5(e.detail.value as AutocompleteDefaultOption[])
              }}
              suggestions={dynamicSuggestions}
              multiple
              simpleSearch
              data-testid="multiple-autocomplete-dynamic-suggestions"
            >
              {fruitOptions.map(option => (
                <WppListItem key={option.id} value={option} label={option.label}>
                  <p slot="label">{option.label}</p>
                </WppListItem>
              ))}
            </WppAutocomplete>
          </div>

          <div>
            <WppAutocomplete
              className={styles.dynamicItem}
              labelConfig={{
                text: 'Multiple Autocomplete with dynamic suggestions and persistant search',
              }}
              name="Multiple Autocomplete with dynamic suggestions and persitant searc"
              placeholder="Select fruits"
              value={multipleDefaultValues6}
              onWppSearchValueChange={(event: CustomEvent) => {
                console.log('Search value changed to:', event.detail)
              }}
              onWppChange={(e: CustomEvent) => {
                console.log('Change event: ', e)
                setMultipleDefaultValues6(e.detail.value as AutocompleteDefaultOption[])
              }}
              suggestions={dynamicSuggestions}
              multiple
              simpleSearch
              persistentSearch
              data-testid="multiple-autocomplete-dynamic-suggestions-search"
            >
              {fruitOptions.map(option => (
                <WppListItem key={option.id} value={option} label={option.label}>
                  <p slot="label">{option.label}</p>
                </WppListItem>
              ))}
            </WppAutocomplete>
          </div>

          <WppButton
            onClick={() =>
              setDynamicSuggestions(dynamicSuggestions.length === 5 ? SUGGESTIONS_SAMPLE_2 : SUGGESTIONS_SAMPLE_1)
            }
          >
            Update suggestions
          </WppButton>
        </div>
      </div>

      <h2>Autocomplete - rest</h2>
      <div className={styles.container}>
        <div>
          <WppAutocomplete
            ref={autocompleteRef}
            className={styles.item}
            placeholder="Type to search..."
            value={value}
            onWppChange={(e: CustomEvent) => {
              console.log('Event name:', e.detail.name)
              setValue(e.detail.value as AutocompleteOption[])
            }}
            loading={loading}
            simpleSearch
            required
            labelConfig={{
              text: 'Autocomplete with Mock API Search',
            }}
            name="Autocomplete with Mock API Search"
            data-testid="api-autocomplete"
          >
            {options.map(option => (
              <WppListItem key={option.id} value={option} label={option.label}>
                <p slot="label">{option.label}</p>
              </WppListItem>
            ))}
          </WppAutocomplete>
        </div>

        <div>
          <WppAutocomplete
            className={styles.item}
            required
            labelConfig={{
              text: 'Single Autocomplete with persistent search',
            }}
            data-testid="wpp-autocomplete-persistent-search"
            name="Single Autocomplete with persistent search"
            placeholder="Select fruits"
            value={basicValue8}
            onWppSearchValueChange={(event: CustomEvent) => {
              console.log('Search value changed to:', event.detail)
            }}
            onWppChange={(e: CustomEvent) => {
              console.log('Event name:', e.detail.name)
              setBasicValue8(e.detail.value as AutocompleteDefaultOption[])
            }}
            simpleSearch
            persistentSearch
          >
            {fruitOptions.map(option => (
              <WppListItem key={option.id} value={option} label={option.label}>
                <p slot="label">{option.label}</p>
              </WppListItem>
            ))}
          </WppAutocomplete>
        </div>

        <div>
          <WppAutocomplete
            className={styles.item}
            required
            labelConfig={{
              text: 'Single Autocomplete with Infinity loading',
            }}
            name="Single Autocomplete with Infinity loading"
            placeholder="Select fruits"
            loading={true}
            simpleSearch
          />
        </div>
      </div>
    </>
  )
}
