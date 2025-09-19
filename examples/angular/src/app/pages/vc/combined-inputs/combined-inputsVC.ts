import { ChangeDetectionStrategy, Component } from '@angular/core'
import periodicTable from '../../../dummy-data/periodic-table'
import { PeriodicTableElement } from '../../../dummy-data/periodic-table-element.interface'
import { SAMPLE_LIST_COMBINED } from '../../single-select-example/consts'

@Component({
  selector: 'app-combined-inputs-example',
  templateUrl: './combined-inputsVC.html',
  styleUrls: ['./combined-inputsVC.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CombinedInputsVC {
  public value: PeriodicTableElement['name'] | null = null
  public SAMPLE_LIST_COMBINED = SAMPLE_LIST_COMBINED
  public valueEur = 'eur'
  public valueUsd = 'usd'
  public valueUah = 'uah'

  public readonly options: PeriodicTableElement[] = periodicTable

  public message =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices enim nunc, nec molestie nibh commodo at home'
  public getLabelConfig = (text: string) => ({
    text,
  })

  public combinedSelectLabelConfig = {
    icon: 'wpp-icon-info',
    text: 'Info',
    description: 'Description',
    locales: {
      optional: 'Optional',
    },
  }

  public inputWithIconLabelConfig = {
    icon: 'wpp-icon-info',
    text: 'Input with Icon',
    description: 'Description',
    locales: {
      optional: 'Optional',
    },
  }

  public handleChangeEur = (event: Event) => {
    const detail = (event as CustomEvent).detail

    console.log('value :>> ', detail)
    this.valueEur = detail.value
  }

  public handleChangeUsd = (event: Event) => {
    const detail = (event as CustomEvent).detail

    console.log('value :>> ', detail)
    this.valueUsd = detail.value
  }

  public handleChangeUah = (event: Event) => {
    const detail = (event as CustomEvent).detail

    console.log('value :>> ', detail)
    this.valueUah = detail.value
  }
}
