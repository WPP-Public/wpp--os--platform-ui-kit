import { Locator } from '@playwright/test'
import { BasePage } from './base.page'

export class WppBannersPage extends BasePage {
  private _banners!: Locator
  private _showBannerButton!: Locator
  private _bannerStatesTab!: Locator
  private _bannerNavBarTab!: Locator
  private _bannerNavTopbarTab!: Locator
  private _bannerTopbar!: Locator
  private _banner!: Locator

  get banners(): Locator {
    return this._banners
  }

  get showBannerButton(): Locator {
    return this._showBannerButton
  }

  get bannerStatesTab(): Locator {
    return this._bannerStatesTab
  }

  get bannerNavBarTab(): Locator {
    return this._bannerNavBarTab
  }

  get bannerNavTopbarTab(): Locator {
    return this._bannerNavTopbarTab
  }

  get bannerTopbar(): Locator {
    return this._bannerTopbar
  }

  get banner(): Locator {
    return this._banner
  }

  async init() {
    this._banners = this.page.locator('#root')
    this._showBannerButton = this.page.locator('[data-testid="show-banner"]')
    this._bannerStatesTab = this.page.locator('[data-testid="states"]')
    this._bannerNavBarTab = this.page.locator('[data-testid="nav-bar"]')
    this._bannerNavTopbarTab = this.page.locator('[data-testid="top-bar"]')
    this._bannerTopbar = this.page.locator('[data-testid="banner-with-top-bar"]')
    this._banner = this.page.locator('[data-testid="stepper"]')
  }
}
