import { ChangeDetectionStrategy, Component } from '@angular/core'
import { AutocompleteDefaultOption } from '@platform-ui-kit/components-library'
import { delay } from '@platform-ui-kit/react-example/src/utils'

@Component({
  selector: 'app-autocomplete-same-option-for-different-search-example',
  templateUrl: './server-load-same-option-for-different-search.html',
  styleUrls: ['./autocomplete-example.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServerLoadSameOptionForDifferentSearch {
  public isLoading = false
  public value: AutocompleteDefaultOption[] = []
  public options: AutocompleteDefaultOption[] = []
  public timer = null

  public createOptions = (optionsNumber: number): AutocompleteDefaultOption[] => [
    {
      id: 'okta',
      label: '1Cloud Okta',
    },
    ...Array(Math.min(optionsNumber, 5))
      .fill(null)
      .map((_, index) => ({
        id: `opt${index}`,
        label: `Additional Option ${index + 1}`,
      })),
  ]

  public handleSearchChange = async (event: Event) => {
    const searchString = (event as CustomEvent<string>).detail

    this.isLoading = true

    await delay(1000)
    this.options = this.createOptions(searchString.length)

    this.isLoading = false
  }

  public handleValueChange = async (event: Event) => {
    this.value = (event as CustomEvent).detail.value as AutocompleteDefaultOption[]
  }

  public getLabelConfig = (text: string) => ({
    text,
  })
}
