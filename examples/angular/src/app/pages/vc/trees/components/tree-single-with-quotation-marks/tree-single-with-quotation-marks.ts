import { ChangeDetectionStrategy, Component } from '@angular/core'
import { TreeActionClickEventDetail } from '@platform-ui-kit/components-library'
import { data } from '../../config'
import { InputChangeEventDetail } from '@platform-ui-kit/components-library'

@Component({
  selector: 'app-single-tree-quotation-marks-example',
  templateUrl: './tree-single-with-quotation-marks.html',
  styleUrls: ['./tree-single-with-quotation-marks.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeSingleWithQuotationMarks {
  public searchValue = ''
  public treeData = data

  public multipleWordSearch = (title: string, multipleWord: string[]) =>
    multipleWord.find(element => element && title.includes(element)) !== undefined

  public exactMatchSearch = (title: string, exactMatchChunks: string[]) =>
    exactMatchChunks.find(element => element && title.includes(element)) !== undefined

  public searchConfig = {
    isMatchSearch: (title: any, search: any) => {
      const exactMatch: string[] = []
      const multipleWord: string[] = []
      const regx = /("(.*?)"|\S+)/g

      for (const match of search.matchAll(regx) as unknown as any) {
        match[2] ? exactMatch.push(match[2]) : multipleWord.push(match[1].toLowerCase())
      }
      const scTitle = title.toLowerCase()

      return this.exactMatchSearch(title, exactMatch) || this.multipleWordSearch(scTitle, multipleWord)
    },
    transformSearchQuery: (search: string) => search.replace(/"/g, ''),
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
