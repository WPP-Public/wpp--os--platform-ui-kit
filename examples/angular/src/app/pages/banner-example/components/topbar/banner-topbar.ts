import { ChangeDetectionStrategy, Component } from '@angular/core'
import { breadcrumb_items, topbar_items, cards } from '../../config'

@Component({
  selector: 'app-banner-topbar-example',
  templateUrl: './banner-topbar.html',
  styleUrls: ['./banner-topbar.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerTopbar {
  public value = 'marketOverview'
  public isToShowBanner = true
  public breadcrumbItems = breadcrumb_items
  public topbarItems = topbar_items
  public cards = cards

  public handleTopbarItemChange = (event: Event) => {
    this.value = (event as CustomEvent).detail.value
  }

  public handleBannerShowStateChange = (event: Event) => {
    this.isToShowBanner = (event as CustomEvent).detail.show
  }

  public handleShowBanner = () => {
    this.isToShowBanner = true
  }

  public handleCloseBanner = () => {
    this.isToShowBanner = false
  }
}
