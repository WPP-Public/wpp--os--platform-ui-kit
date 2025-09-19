import { Locator } from '@playwright/test'
import { BasePage } from './base.page'

export class WppCarouselPage extends BasePage {
  private _regularCarousel!: Locator
  private _galleryCarousel!: Locator

  get regularCarousel(): Locator {
    return this._regularCarousel
  }

  get galleryCarousel(): Locator {
    return this._galleryCarousel
  }

  async init() {
    this._regularCarousel = this.page.locator('[data-testid="regular-carousel"]')
    this._galleryCarousel = this.page.locator('[data-testid="gallery-carousel"]')
  }
}
