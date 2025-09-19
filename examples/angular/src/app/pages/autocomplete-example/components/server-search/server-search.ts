import { ChangeDetectionStrategy, Component } from '@angular/core'
import { MovieOption, movieOptions } from '@platform-ui-kit/react-example/src/pages/Autocomplete/options'
import { AutocompleteDefaultOption } from '@platform-ui-kit/components-library'

@Component({
  selector: 'app-autocomplete-with-server-search-example',
  templateUrl: './server-search.html',
  styleUrls: ['./server-search.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServerSearch {
  public serverDataValue: AutocompleteDefaultOption[] = []
  public isGettingInitialMoviesValue = true
  public isSearchingMovies = true
  public movieSearchValue = ''
  public movieSearchValueTrimmed = this.movieSearchValue.trim()
  public moviesLoadingNote = this.isGettingInitialMoviesValue ? '(Loading initial values) ' : ''
  public movieSearchResult: MovieOption[] = []
  public labelConfig = `${this.moviesLoadingNote}Server search with lots of customization (max 5 selected items)`

  // Load initial server value
  mounted() {
    setTimeout(() => {
      this.serverDataValue = [
        {
          id: 'tt2948356',
          label: 'Zootopia',
          year: 2016,
          rating: 8,
          unavailable: false,
        },
        {
          id: 'tt0107290',
          label: 'Jurassic Park',
          year: 1993,
          rating: 8.2,
          unavailable: false,
        },
        {
          id: 'tt1074638',
          label: 'Skyfall',
          year: 2012,
          rating: 7.8,
          unavailable: true,
        },
      ]
      this.isGettingInitialMoviesValue = false
    }, 2000)
  }

  // Load movie options based on search
  public handleMovieSearchValue(newSearchValue: string, oldSearchValue: string) {
    if (newSearchValue.trim() === oldSearchValue.trim()) {
      return
    }

    const movieSearchValueTrimmed = newSearchValue.trim()

    this.isSearchingMovies = true

    const timeout = 700 + Math.round(Math.random() * 1300)

    setTimeout(() => {
      this.movieSearchResult = movieOptions
        .filter(option => {
          const searchValue = movieSearchValueTrimmed.toLocaleLowerCase()

          return option.label.toLocaleLowerCase().includes(searchValue) || String(option.year).includes(searchValue)
        })
        .sort((a, b) => (a.label.toLocaleLowerCase() > b.label.toLocaleLowerCase() ? 1 : -1))
      this.isSearchingMovies = false
    }, timeout)
  }

  public getLabelConfig = (text: string) => ({
    text,
  })

  public handleSearchValueChange(event: Event) {
    this.movieSearchValue = (event as CustomEvent).detail
  }

  public handleServerDataValueChange(event: Event) {
    this.serverDataValue = (event as CustomEvent).detail.value as any
  }
}
