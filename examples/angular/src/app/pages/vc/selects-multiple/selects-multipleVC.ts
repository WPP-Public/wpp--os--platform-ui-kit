import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SAMPLE_LIST_MULTIPLE } from '../../single-select-example/consts'

@Component({
  selector: 'app-select-multiple-example',
  templateUrl: './selects-multipleVC.html',
  styleUrls: ['./selects-multipleVC.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectsMultipleVC {
  public message =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices enim nunc, nec molestie nibh commodo at home'

  public selectValue = []
  public LIST = SAMPLE_LIST_MULTIPLE
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

  public handleSelectChange = (event: Event) => {
    const customEvent = event as CustomEvent

    this.selectValue = customEvent.detail.value
  }
}
