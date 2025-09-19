import { ChangeDetectionStrategy, Component } from '@angular/core'
import { TreeActionClickEventDetail, TreeType } from '@platform-ui-kit/components-library'
import { data } from '../../config'
import { InputChangeEventDetail } from '@platform-ui-kit/components-library'

@Component({
  selector: 'app-single-tree-with-new-custom-search-example',
  templateUrl: './tree-single-with-new-custom-search.html',
  styleUrls: ['./tree-single-with-new-custom-search.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeSingleWithNewCustomSearch {
  public searchValue = ''
  public treeData = data

  public searchConfig = {
    isMatchingSearch: (item: TreeType, search: any) => item.title.toLocaleLowerCase().includes(search.toLowerCase()),
  }

  public handleSearch = (e: Event) => {
    this.searchValue = (e as CustomEvent<InputChangeEventDetail>).detail.value || ''
  }

  //TO DO: return back this logic in future
  // In order to prevent rendering issues on big data, use debounce for search handler
  // public debouncedHandleSearch = debounce(this.handleSearch, 400)

  public handleTreeChange = (event: Event) => {
    console.log('handleTreeChange event :>> ', (event as CustomEvent).detail)
    this.treeData = (event as CustomEvent).detail.treeState
  }

  public handleActionClick = (event: Event) => {
    console.log('handleActionClick', (event as CustomEvent<TreeActionClickEventDetail>).detail)
  }
}
