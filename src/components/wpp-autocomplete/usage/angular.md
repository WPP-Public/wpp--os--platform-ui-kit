### autocomplete-example.page.html
```html
<wpp-autocomplete
  ngDefaultControl
  name='value'
  ngModel
  [value]='basicExampleValue'
  [labelConfig]="getLabelConfig('Extended autocomplete with suggestions')"
  (wppChange)='handleExampleValueChange($event, "basicExampleValue")'
  type='extended'
  placeholder='Select items'
  class='example-item'
  [getOptionId]='getOptionId'
  [getOptionLabel]='getOptionLabel'
  [suggestions]='suggestions'
  multiple
  show-create-new-element
  simple-search
>
  <wpp-list-item *ngFor="let option of options" [value]="option" [label]="option.name">
    <p slot="label">{{ option.name }}</p>
  </wpp-list-item>
  <div slot="selected-values" class='selected-values extended'>
    <wpp-pill
      *ngFor='let selectedValue of basicExampleValue'
      [label]='selectedValue.name'
      [value]='selectedValue.name'
      type="display"
      (wppClose)='handleExamplePillCloseClick(selectedValue.name, "basicExampleValue")'
      removable
    >
      {{ selectedValue.name }}
    </wpp-pill>
  </div>
</wpp-autocomplete>

<wpp-autocomplete
  ngDefaultControl
  [value]='customOptionsExampleValue'
  [labelConfig]="getLabelConfig('Required Regular with Custom options and suggestions')"
  (wppChange)='handleExampleValueChange($event, "customOptionsExampleValue")'
  placeholder='Select items'
  class='example-item'
  required
  [suggestions]='suggestions'
  multiple
  show-create-new-element
  simple-search
>
  <wpp-list-item *ngFor="let option of countriesOptions" [value]="option" [label]="option.label">
    <div slot="label">
      <div class="primary">
        <span class="flag">{{ option.flag }}</span> {{ option.label }}
      </div>
    </div>
    <div class="secondary" slot="caption">
      {{ option.nativeName }}
    </div>
  </wpp-list-item>
  <div slot="selected-values" class='selected-values'>
    <wpp-pill
      *ngFor='let selectedValue of customOptionsExampleValue'
      [label]='selectedValue.label'
      [value]='selectedValue.label'
      type="display"
      (wppClose)='handleExamplePillCloseClick(selectedValue.id, "customOptionsExampleValue")'
      removable
    >
      {{ selectedValue.label }}
    </wpp-pill>
  </div>
</wpp-autocomplete>
```

### autocomplete-example.page.ts
```tsx
import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  LoadMoreHandler,
  AutocompleteChangeEventDetail,
  AutocompleteDefaultOption,
} from '@wppopen/components-library'
import periodicTable from '../../dummy-data/periodic-table'
import countriesOptions from '../../dummy-data/countries'

@Component({
  selector: 'app-autocomplete-example',
  templateUrl: './autocomplete-example.page.html',
  styleUrls: ['./autocomplete-example.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteExamplePage {
  public basicExampleValue: AutocompleteDefaultOption[] = []
  public customOptionsExampleValue: AutocompleteDefaultOption[] = []

  public readonly options = periodicTable
  public readonly countriesOptions = countriesOptions

  public readonly suggestions = [
    { id: 101, name: 'Avocado' },
    { id: 102, name: 'Blueberry' },
    { id: 103, name: 'Cherry' },
    { id: 104, name: 'Durian' },
    { id: 105, name: 'Elderberry' },
  ]

  public readonly loadMore: LoadMoreHandler = async () => {
    console.log('Triggered loadMore() handler')
  }

  public handleExampleValueChange = (event: Event, fieldName: 'basicExampleValue' | 'customOptionsExampleValue') => {
    this[fieldName] = (event as CustomEvent<AutocompleteChangeEventDetail>).detail.value as AutocompleteDefaultOption[]
  }

  public getOptionId = (option: typeof periodicTable[0]) => option.name
  public getOptionLabel = (option: typeof periodicTable[0]) => option.name

  public handleExamplePillCloseClick = (
    value: string | number,
    fieldName: 'basicExampleValue' | 'customOptionsExampleValue',
  ) => {
    this[fieldName] = this[fieldName].filter(
      i => i[fieldName === 'customOptionsExampleValue' ? 'id' : 'name'] !== value,
    )
  }

  public getLabelConfig = (text: string) => ({
    text,
  })
}
```
