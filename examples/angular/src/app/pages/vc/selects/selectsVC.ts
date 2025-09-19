import { ChangeDetectionStrategy, Component } from '@angular/core'
import periodicTable from '../../../dummy-data/periodic-table'
import { PeriodicTableElement } from '../../../dummy-data/periodic-table-element.interface'

@Component({
  selector: 'app-select-example',
  templateUrl: './selectsVC.html',
  styleUrls: ['./selectsVC.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectsVC {
  public value: PeriodicTableElement['name'] | null = null

  public readonly options: PeriodicTableElement[] = periodicTable

  public message =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices enim nunc, nec molestie nibh commodo at home'
  public selectWithItemsLabelConfig = {
    icon: 'wpp-icon-info',
    text: 'Single Select With Items and left Icon',
    description: 'Description',
    locales: {
      optional: 'Optional',
    },
  }
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

  public regionMap = {
    Europe: ['England', 'Germany', 'France'],
    Asia: ['China', 'Korea', 'Japan'],
    Africa: ['Nigeria', 'Ethiopia', 'Egypt'],
  }
  public countries: any
  public regions: Array<keyof typeof this.regionMap> = ['Europe']
  public regionKeys = Object.keys(this.regionMap)

  public getCountriesList = () => this.regions.flatMap(region => this.regionMap[region])

  public handleRegionChange = (event: Event) => {
    this.regions = (event as CustomEvent).detail.value
    this.countries = this.getCountriesList()
  }

  public getLabelConfig = (text: string) => ({
    text,
  })

  public handleChange = (event: Event) => {
    const detail = (event as CustomEvent).detail

    console.log('value :>> ', detail)
  }
}
