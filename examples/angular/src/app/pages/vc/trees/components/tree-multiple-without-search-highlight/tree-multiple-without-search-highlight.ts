import { ChangeDetectionStrategy, Component } from '@angular/core'
import { debounce } from 'lodash'
import { dataWithLongNames } from '../../config'
import { InputChangeEventDetail, TreeChangeEventDetail } from '@platform-ui-kit/components-library'

@Component({
  selector: 'app-multiple-tree-without-highlights-example',
  templateUrl: './tree-multiple-without-search-highlight.html',
  styleUrls: ['./tree-multiple-without-search-highlight.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeMultipleWithoutSearchHighlight {
  public treeData = dataWithLongNames
  public search = ''

  public handleTreeChange = (event: Event) => {
    this.treeData = (event as CustomEvent<TreeChangeEventDetail>).detail.treeState
  }

  public handleSearch = (e: Event) => {
    this.search = (e as CustomEvent<InputChangeEventDetail>).detail.value || ''
  }

  // In order to prevent rendering issues on big data, use debounce for search handler
  public debouncedHandleSearch = debounce(this.handleSearch, 400)
}
