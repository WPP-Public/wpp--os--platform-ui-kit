import { ChangeDetectionStrategy, Component } from '@angular/core'
import { AutocompleteDefaultOption, LoadMoreHandler } from '@platform-ui-kit/components-library'
import { BasicOption, isInfiniteLastPage } from '../../options'
import { generateInfiniteResults } from '@platform-ui-kit/react-example/src/pages/Autocomplete/options'

@Component({
  selector: 'app-autocomplete-with-infinite-scroll-and-lazy-load-example',
  templateUrl: './infinite-scroll-with-lazy-load.html',
  styleUrls: ['./autocomplete-example.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfiniteScrollWithLazyLoad {
  public infiniteValue: AutocompleteDefaultOption[] = []

  public isInfiniteFirstLoadSkipped = false
  public infiniteLoadMoreTimer: ReturnType<typeof setTimeout> | null = null
  public searchTimer: ReturnType<typeof setTimeout> | null = null
  public infiniteSearchPage = 0
  public isSearchingInfinite = false
  public infiniteSearchValue = ''
  public infiniteSearchResults: BasicOption[] = []
  public isInfiniteLastPage = isInfiniteLastPage

  public infiniteSearchValueTrimmed = this.infiniteSearchValue.trim()

  public handleInfiniteSearchValue(newSearchValue: any, oldSearchValue: string) {
    if (newSearchValue.trim() === oldSearchValue.trim()) {
      return
    }

    const infiniteSearchValueTrimmed = newSearchValue.trim()

    if (this.infiniteLoadMoreTimer) {
      clearTimeout(this.infiniteLoadMoreTimer)
      this.infiniteLoadMoreTimer = null
    }

    if (this.searchTimer) {
      clearTimeout(this.searchTimer)
      this.searchTimer = newSearchValue
    }

    this.isSearchingInfinite = true

    const timeout = 700 + Math.round(Math.random() * 1300)

    this.searchTimer = setTimeout(() => {
      this.infiniteSearchResults = generateInfiniteResults(infiniteSearchValueTrimmed, 0)

      this.infiniteSearchPage = 0

      this.isSearchingInfinite = false
    }, timeout)
  }

  public getLabelConfig = (text: string) => ({
    text,
  })

  public handleInfiniteSearchValueChange(event: Event) {
    this.infiniteSearchValue = (event as CustomEvent).detail
  }

  public handleInfiniteValueChange(event: Event) {
    this.infiniteValue = (event as CustomEvent).detail.value as AutocompleteDefaultOption[]
  }

  public infiniteSearchLoadMore(): LoadMoreHandler {
    const infiniteSearchValueTrimmed = this.infiniteSearchValue.trim()

    const loadMore: LoadMoreHandler = () =>
      new Promise(resolve => {
        const timeout = 300 + Math.round(Math.random() * 700)
        const page = this.infiniteSearchResults.length ? this.infiniteSearchPage + 1 : this.infiniteSearchPage

        this.infiniteLoadMoreTimer = setTimeout(() => {
          this.infiniteLoadMoreTimer = null
          this.infiniteSearchResults = [
            ...this.infiniteSearchResults,
            ...generateInfiniteResults(infiniteSearchValueTrimmed, page),
          ]
          this.infiniteSearchPage = page

          resolve()
        }, timeout)
      })

    return loadMore
  }
}
