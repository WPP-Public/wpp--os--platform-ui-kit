import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-banner-example',
  templateUrl: './banner-example.page.html',
  styleUrls: ['./banner-example.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerExamplePage {
  public currentTab = 'bannerTopBar'

  public handleTabChange = (event: Event) => {
    this.currentTab = (event as CustomEvent).detail.value
  }
}
