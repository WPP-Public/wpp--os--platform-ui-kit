import { ChangeDetectionStrategy, Component } from '@angular/core'
import { countries } from './config'

@Component({
  selector: 'app-countries',
  templateUrl: './countriesVC.html',
  styleUrls: ['./countriesVC.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountriesVC {
  public groupedCountries: any = []
  public groupSize = 10
  public countriesList = countries

  public handleFlagsGrouping(): any[] {
    for (let i = 0; i < this.countriesList.length; i = i + this.groupSize) {
      this.groupedCountries.push(countries.slice(i, i + this.groupSize))
    }

    return this.groupedCountries
  }
}
