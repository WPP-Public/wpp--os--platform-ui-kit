import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SearchDefaultOption } from '@platform-ui-kit/components-library'
import { fruitOptions } from './options'

@Component({
  selector: 'app-search-example',
  templateUrl: './searchVC.html',
  styleUrls: ['./searchVC.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchVC {
  public fruitOptions = fruitOptions
  public basicValue: SearchDefaultOption[] = [
    {
      id: 5,
      label: 'Pineapple',
    },
  ]

  public customLabelConfig = {
    icon: 'wpp-icon-info',
    text: 'Custom Label Search',
    description: 'Description',
    locales: {
      optional: 'Optional',
    },
  }

  public handleBasicValue = (event: Event) => {
    this.basicValue = (event as CustomEvent).detail.value as SearchDefaultOption[]
  }

  public getLabelConfig = (text: string) => ({
    text,
  })
}
