import { ChangeDetectionStrategy, Component } from '@angular/core'
import { AutocompleteDefaultOption, SlotItemNode } from '@platform-ui-kit/components-library'

@Component({
  selector: 'app-autocomplete-example',
  templateUrl: './autocompleteVC.html',
  styleUrls: ['./autocompleteVC.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteVC {
  public basicValue: AutocompleteDefaultOption[] = [
    {
      id: 5,
      label: 'Elderberry',
    },
  ]

  public basicValue1: AutocompleteDefaultOption[] = [
    {
      id: 5,
      label: 'Elderberry',
    },
  ]

  public basicValue2: AutocompleteDefaultOption[] = [
    {
      id: 5,
      label: 'Elderberry',
    },
  ]

  public basicValue3: AutocompleteDefaultOption[] = [
    {
      id: 5,
      label: 'Elderberry',
    },
  ]

  public basicValue4: AutocompleteDefaultOption[] = [
    {
      id: 5,
      label: 'Elderberry',
    },
  ]

  public basicValue5: AutocompleteDefaultOption[] = [
    {
      id: 5,
      label: 'Elderberry',
    },
  ]

  public basicValue6: AutocompleteDefaultOption[] = []

  public basicValue7: AutocompleteDefaultOption[] = []

  public multipleValue: AutocompleteDefaultOption[] = [
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
  ]

  public multipleValue1: AutocompleteDefaultOption[] = [
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
  ]

  public multipleValue2: AutocompleteDefaultOption[] = [
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
  ]

  public multipleValue3: AutocompleteDefaultOption[] = [
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
  ]

  public multipleValue4: AutocompleteDefaultOption[] = [
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
  ]

  public multipleValue5: AutocompleteDefaultOption[] = [
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
  ]

  public multipleValue6: AutocompleteDefaultOption[] = []
  public multipleValue7: AutocompleteDefaultOption[] = []
  public multipleValue8: AutocompleteDefaultOption[] = []

  public dynamicSuggestions: AutocompleteDefaultOption[] = []

  public SUGGESTIONS_SAMPLE_1: AutocompleteDefaultOption[] = [
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

  public SUGGESTIONS_SAMPLE_2: AutocompleteDefaultOption[] = [
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

  fruitOptions = [
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

  public multipleDefaultValues: AutocompleteDefaultOption[] = [
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
  ]

  public handleBasicValue = (event: Event) => {
    this.basicValue = (event as CustomEvent).detail.value
  }

  public handleBasicValue1 = (event: Event) => {
    this.basicValue1 = (event as CustomEvent).detail.value
  }

  public handleBasicValue2 = (event: Event) => {
    this.basicValue2 = (event as CustomEvent).detail.value
  }

  public handleBasicValue3 = (event: Event) => {
    this.basicValue3 = (event as CustomEvent).detail.value
  }

  public handleBasicValue4 = (event: Event) => {
    this.basicValue4 = (event as CustomEvent).detail.value
  }

  public handleBasicValue5 = (event: Event) => {
    this.basicValue5 = (event as CustomEvent).detail.value
  }

  public handleBasicValue6 = (event: Event) => {
    this.basicValue6 = (event as CustomEvent).detail.value
  }

  public handleBasicValue7 = (event: Event) => {
    console.log('Change event: ', event)

    this.basicValue7 = (event as CustomEvent).detail.value
  }

  public handleMultipleValue = (event: Event) => {
    this.multipleValue = (event as CustomEvent).detail.value
  }

  public handleMultipleValue1 = (event: Event) => {
    this.multipleValue1 = (event as CustomEvent).detail.value
  }

  public handleMultipleValue2 = (event: Event) => {
    this.multipleValue2 = (event as CustomEvent).detail.value
  }

  public handleMultipleValue3 = (event: Event) => {
    this.multipleValue3 = (event as CustomEvent).detail.value
  }

  public handleMultipleValue4 = (event: Event) => {
    this.multipleValue4 = (event as CustomEvent).detail.value
  }

  public handleMultipleValue5 = (event: Event) => {
    this.multipleValue5 = (event as CustomEvent).detail.value
  }

  public handleMultipleValue6 = (event: Event) => {
    this.multipleValue6 = (event as CustomEvent).detail.value
  }

  public handleMultipleValue7 = (event: Event) => {
    console.log('Change event: ', event)

    this.multipleValue7 = (event as CustomEvent).detail.value
  }

  public handleMultipleValue8 = (event: Event) => {
    console.log('Change event: ', event)

    this.multipleValue8 = (event as CustomEvent).detail.value
  }

  public handleMultipleDefaultValues = (event: Event) => {
    this.multipleDefaultValues = (event as CustomEvent).detail.value
  }

  public getLabelConfig = (text: string) => ({
    text,
  })

  public handleExamplePillCloseClick = (value: any) => {
    this.multipleValue = this.multipleValue.filter(i => i.id !== value)
  }

  public handleExamplePillCloseClick2 = (value: any) => {
    this.multipleValue2 = this.multipleValue2.filter(i => i.id !== value)
  }

  public handleExamplePillCloseClick3 = (value: any) => {
    this.multipleValue3 = this.multipleValue3.filter(i => i.id !== value)
  }

  public handleExamplePillCloseClick5 = (value: any) => {
    this.multipleValue5 = this.multipleValue5.filter(i => i.id !== value)
  }

  public handleSuggestionsChange = (event: MouseEvent) => {
    this.dynamicSuggestions =
      this.dynamicSuggestions.length === 5 ? this.SUGGESTIONS_SAMPLE_2 : this.SUGGESTIONS_SAMPLE_1

    console.log('Changing list', event)
  }

  public staticSuggestions: AutocompleteDefaultOption[] = [
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

  public helperCreateElement = (type: string, props?: any, children?: any): SlotItemNode => ({
    type,
    props: props || {},
    ...(children && { children: Array.isArray(children) ? children : [children] }),
  })

  public staticSuggestionWithSlots: AutocompleteDefaultOption[] = [
    {
      id: 1,
      label: 'Avacado',
    },
    {
      id: 2,
      label: 'Blueberry',
      slots: [this.helperCreateElement('wpp-icon-mail', { slot: 'left' })],
    },
    {
      id: 3,
      label: 'Cherry',
      slots: [
        this.helperCreateElement('wpp-icon-available-checkmark', { slot: 'left' }),
        this.helperCreateElement(
          'wpp-action-button',
          {
            slot: 'right',
            variant: 'secondary',
          },
          this.helperCreateElement('wpp-icon-plus', { slot: 'icon-start' }),
        ),
      ],
    },
    {
      id: 4,
      label: 'Durian',
      slots: [this.helperCreateElement('wpp-icon-chevron', { slot: 'right' })],
    },
    {
      id: 5,
      label: 'Elderberry',
      slots: [
        this.helperCreateElement('wpp-action-button', {
          slot: 'right',
          variant: 'secondary',
        }),
      ],
    },
    {
      id: 6,
      label: 'Сarambola',
      slots: [
        this.helperCreateElement('wpp-avatar', {
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
        this.helperCreateElement(
          'wpp-action-button',
          {
            slot: 'right',
            variant: 'secondary',
          },
          this.helperCreateElement('wpp-icon-plus', { slot: 'icon-start' }),
        ),
        this.helperCreateElement('wpp-avatar', {
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
        this.helperCreateElement('wpp-avatar', {
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
        this.helperCreateElement('wpp-avatar', {
          slot: 'left',
          size: 'xs',
          src: 'https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028',
        }),
        this.helperCreateElement('wpp-tag', { slot: 'right', label: 'Positive', variant: 'positive' }),
      ],
    },
    {
      id: 10,
      label: 'Grapefruit',
      slots: [this.helperCreateElement('span', { slot: 'caption', children: 'Caption' })],
    },
    {
      id: 11,
      label: 'Watermelon',
      slots: [
        this.helperCreateElement('span', { slot: 'caption', children: 'Caption' }),
        this.helperCreateElement('wpp-avatar', {
          slot: 'left',
          size: 's',
          variant: 'square',
          src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU',
        }),
        this.helperCreateElement('wpp-tag', { slot: 'right', label: 'Positive', variant: 'positive' }),
      ],
    },
    {
      id: 13,
      label: 'Pear',
      slots: [
        this.helperCreateElement('span', { slot: 'caption', children: 'Caption' }),
        this.helperCreateElement('wpp-avatar', {
          slot: 'left',
          size: 's',
          variant: 'square',
          src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU',
        }),
        this.helperCreateElement(
          'wpp-typography',
          {
            slot: 'right',
            type: 's-body',
          },
          this.helperCreateElement('span', { children: 'Text' }),
        ),
      ],
    },
  ]
}
