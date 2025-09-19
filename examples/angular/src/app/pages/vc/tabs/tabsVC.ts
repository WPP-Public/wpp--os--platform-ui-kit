import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-tab-example',
  templateUrl: './tabsVC.html',
  styleUrls: ['./tabsVC.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsVC {
  public currentTab = 'drinks'

  public handleTabChange = (event: Event) => {
    this.currentTab = (event as CustomEvent).detail.value
  }
}
