import { Locator } from '@playwright/test'
import { BasePage } from './base.page'

export class WppSkeletonPage extends BasePage {
  private _skeletonTable!: Locator

  get skeletonTable(): Locator {
    return this._skeletonTable
  }

  async init() {
    this._skeletonTable = this.page.locator('.SkeletonVC_container__9902a')
  }
}
