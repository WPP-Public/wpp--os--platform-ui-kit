import { ChangeDetectionStrategy, Component } from '@angular/core'
import { StickyBarButtonItem, StickyBarTabItem } from '@platform-ui-kit/components-library'
import { btns_list_1, tabs_list_1 } from './consts'

@Component({
  selector: 'sticky-bar-example',
  templateUrl: './sticky-bar.page.html',
  styleUrls: ['./sticky-bar.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StickyBarExamplePage {
  public validButtonsList: StickyBarButtonItem[] = btns_list_1 as StickyBarButtonItem[]

  public validTabsList: StickyBarTabItem[] = tabs_list_1

  public handleClickBackIcon = () => {
    console.log('Has Clicked Back Icon')
  }

  public handleClickBtn = (event: Event) => {
    console.log((event as CustomEvent).detail)
  }

  public handleClickTab = (event: Event) => {
    console.log((event as CustomEvent).detail)
  }
}
