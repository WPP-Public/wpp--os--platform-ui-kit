import { ChangeDetectionStrategy, Component } from '@angular/core'
import { breadcrumb_items, topbar_items, cards } from '../../config'

@Component({
  selector: 'app-banner-navbar-example',
  templateUrl: './banner-navbar.html',
  styleUrls: ['./banner-navbar.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerNavbar {
  public value = 'marketOverview'
  public isToShowBanner = false
  public breadcrumbsItems = breadcrumb_items
  public topbarItems = topbar_items
  public cards = cards

  public handleTopbarItemChange = (event: Event) => {
    this.value = (event as CustomEvent).detail.value
  }

  public handleShowBanner = () => {
    this.isToShowBanner = true
  }

  public handleCloseBanner = () => {
    this.isToShowBanner = false
  }
}
