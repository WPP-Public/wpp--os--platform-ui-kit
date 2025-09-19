import { ChangeDetectionStrategy, Component } from '@angular/core'
import { AutocompleteDefaultOption } from '@platform-ui-kit/components-library'
import { fruitOptions, countryOptions, hugeListOptions } from './options'

@Component({
  selector: 'app-autocomplete-example',
  templateUrl: './autocomplete-example.page.html',
  styleUrls: ['./autocomplete-example.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteExamplePage {
  public basicValue: AutocompleteDefaultOption[] = [
    {
      id: 5,
      label: 'Pineapple',
    },
    {
      id: 3,
      label: 'Kiwi',
    },
    {
      id: 13,
      label: 'Pear',
    },
  ]

  public customOptionsValue: AutocompleteDefaultOption[] = []
  public hugeListValue: AutocompleteDefaultOption[] = []
  public labelConfig = {
    icon: 'wpp-icon-info',
    text: 'Basic with initial values',
    description: 'Description',
    locales: {
      optional: 'Optional',
    },
  }
  public fruitsOptions = fruitOptions
  public countryOptions = countryOptions
  public hugeListOptions = hugeListOptions
  public dropdownConfig = { popperOptions: { strategy: 'fixed' } }

  public handleBasicValue = (event: Event) => {
    this.basicValue = (event as CustomEvent).detail.value as AutocompleteDefaultOption[]
  }

  public handleBasicValuePillCloseClick = (selectedValue: number) => {
    this.basicValue = this.basicValue.filter(i => i.id !== selectedValue)
  }

  public handleCustomOptionsValue = (event: Event) => {
    this.customOptionsValue = (event as CustomEvent).detail.value
  }

  public handleHugeListValue = (event: Event) => {
    this.hugeListValue = (event as CustomEvent).detail.value
  }
  // public basicExampleValue: AutocompleteDefaultOption[] = []
  // public customOptionsExampleValue: AutocompleteDefaultOption[] = []
  //
  // public readonly options = periodicTable
  // public readonly countriesOptions = countriesOptions
  //
  // public readonly loadMore: LoadMoreHandler = async () => {
  //   console.log('Triggered loadMore() handler')
  // }
  //
  // public handleExampleValueChange = (event: Event, fieldName: 'basicExampleValue' | 'customOptionsExampleValue') => {
  //   this[fieldName] = (event as CustomEvent<AutocompleteChangeEventDetail>).detail.value as AutocompleteDefaultOption[]
  // }
  //
  // public getOptionId = (option: typeof periodicTable[0]) => option.name
  // public getOptionLabel = (option: typeof periodicTable[0]) => option.name
  //
  // public handleExamplePillCloseClick = (
  //   value: string | number,
  //   fieldName: 'basicExampleValue' | 'customOptionsExampleValue',
  // ) => {
  //   this[fieldName] = this[fieldName].filter(
  //     i => i[fieldName === 'customOptionsExampleValue' ? 'id' : 'name'] !== value,
  //   )
  // }

  public getLabelConfig = (text: string) => ({
    text,
  })
}
