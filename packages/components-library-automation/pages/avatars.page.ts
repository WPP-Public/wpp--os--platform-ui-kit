import { Locator } from '@playwright/test'
import { BasePage } from './base.page'

export class WppAvatarsPage extends BasePage {
  private _avatars!: Locator
  private _moreButton!: Locator
  private _avatarWithoutImage!: Locator
  private _avatarIcon!: Locator
  private _avatarWithoutImageLVariant!: Locator
  private _avatarGroups!: Locator
  private _avatarFromDropdown!: Locator
  private _avatarLogo!: Locator

  get moreButton(): Locator {
    return this._moreButton
  }

  get avatars(): Locator {
    return this._avatars
  }

  get avatarWithoutImage(): Locator {
    return this._avatarWithoutImage
  }

  get avatarIcon(): Locator {
    return this._avatarIcon
  }

  get avatarWithoutImageLVariant(): Locator {
    return this._avatarWithoutImageLVariant
  }

  get avatarGroups(): Locator {
    return this._avatarGroups
  }

  get avatarFromDropdown(): Locator {
    return this._avatarFromDropdown
  }

  get avatarLogo(): Locator {
    return this._avatarLogo
  }


  async init() {
    this._avatars = this.page.locator('[data-testid="avatars-container"]')
    this._moreButton = this.page.locator('text=+18').first()
    this._avatarGroups = this.page.locator('.avatar-item')
    this._avatarWithoutImage = this.page.locator('.without-image')
    this._avatarIcon = this.page.locator('.wpp-icon.wpp-icon-premium')
    this._avatarWithoutImageLVariant = this.page.locator('.without-image').nth(4)
    this._avatarFromDropdown = this.page.locator('.wpp-list-item.wpp-mounted')
    this._avatarLogo = this.page.locator('.AvatarsVC_item__re2Ww.wpp-avatar.size-m')
  }
}
