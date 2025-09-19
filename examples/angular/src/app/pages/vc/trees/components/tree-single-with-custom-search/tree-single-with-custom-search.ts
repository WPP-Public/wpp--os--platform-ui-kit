import { ChangeDetectionStrategy, Component } from '@angular/core'
import { data } from '../../config'
import { debounce } from 'lodash'

@Component({
  selector: 'app-single-tree-with-custom-search-example',
  templateUrl: './tree-single-with-custom-search.html',
  styleUrls: ['./tree-single-with-custom-search.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeSingleWithCustomSearch {
  public searchConfig = {
    isMatchSearch: (title: string, search: string) => title === search,
  }

  public search = ''
  public treeData = data

  public handleTreeChange = (event: Event) => {
    console.log('handleTreeChange event :>> ', (event as CustomEvent).detail)

    this.treeData = (event as CustomEvent).detail.treeState
  }

  public handleSearch = (ev: Event) => {
    this.search = (ev as CustomEvent).detail.value || ''
  }

  // In order to prevent rendering issues on big data, use debounce for search handler
  public debouncedHandleSearch = debounce(this.handleSearch, 400)
}
