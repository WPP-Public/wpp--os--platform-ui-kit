import { expect, Locator } from '@playwright/test'
import { BasePage } from './base.page'

type ButtonType =
  | 'action_primary_enabled'
  | 'action_primary_disabled'
  | 'action_secondary_enabled'
  | 'action_secondary_disabled'
  | 'regular_primary_enabled'
  | 'regular_primary_disabled'
  | 'regular_secondary_enabled'
  | 'regular_secondary_disabled'
  | 'regular_destructive_enabled'
  | 'regular_destructive_disabled'

export class WppButtonsPage extends BasePage {
  private _regularDisabledButton!: Locator
  private _regularLoadingButton!: Locator
  private _regularSmallButton!: Locator
  private _regularCustomWidthButton!: Locator
  private _regularPlusIconButton!: Locator
  private _regularArrowIconButton!: Locator
  private _regularAllInButton!: Locator
  private _regularButton!: Locator
  private _setFocusBtn!: Locator

  private _disabledSecondaryButton!: Locator
  private _loadingSecondaryButton!: Locator
  private _smallSecondaryButton!: Locator
  private _customWidthSecondaryButton!: Locator
  private _plusIconSecondaryButton!: Locator
  private _arrowIconSecondaryButton!: Locator
  private _allInSecondaryButton!: Locator
  private _regularSecondaryButton!: Locator

  private _disabledDestructiveButton!: Locator
  private _loadingDestructiveButton!: Locator
  private _smallDestructiveButton!: Locator
  private _customWidthDestructiveButton!: Locator
  private _allInDestructiveButton!: Locator
  private _regularDestructiveButton!: Locator

  private _disabledActionPrimaryButton!: Locator
  private _loadingActionPrimaryButton!: Locator
  private _plusIconActionPrimaryButton!: Locator
  private _arrowIconActionPrimaryButton!: Locator
  private _allInActionPrimaryButton!: Locator
  private _actionPrimaryButton!: Locator

  private _disabledActionSecondaryButton!: Locator
  private _loadingActionSecondaryButton!: Locator
  private _plusIconActionSecondaryButton!: Locator
  private _arrowIconActionSecondaryButton!: Locator
  private _allInActionSecondaryButton!: Locator
  private _actionSecondaryButton!: Locator

  private _disabledIconButton!: Locator
  private _loadingIconButton!: Locator
  private _smallIconButton!: Locator
  private _allInIconButton!: Locator
  private _iconButton!: Locator
  private _filterBtn!: Locator
  private _sortBtn!: Locator
  private _floatBtn!: Locator
  private _backToTopBtn!: Locator

  private _regularButtons!: Locator
  private _actionButtons!: Locator
  private _iconButtons!: Locator
  private _moreButtons!: Locator

  get regularDisabledButton(): Locator {
    return this._regularDisabledButton
  }

  get regularLoadingButton(): Locator {
    return this._regularLoadingButton
  }

  get regularSmallButton(): Locator {
    return this._regularSmallButton
  }

  get regularCustomWidthButton(): Locator {
    return this._regularCustomWidthButton
  }

  get regularPlusIconButton(): Locator {
    return this._regularPlusIconButton
  }

  get regularArrowIconButton(): Locator {
    return this._regularArrowIconButton
  }

  get regularAllInButton(): Locator {
    return this._regularAllInButton
  }

  get regularButton(): Locator {
    return this._regularButton
  }

  get disabledSecondaryButton(): Locator {
    return this._disabledSecondaryButton
  }

  get loadingSecondaryButton(): Locator {
    return this._loadingSecondaryButton
  }

  get smallSecondaryButton(): Locator {
    return this._smallSecondaryButton
  }

  get customWidthSecondaryButton(): Locator {
    return this._customWidthSecondaryButton
  }

  get plusIconSecondaryButton(): Locator {
    return this._plusIconSecondaryButton
  }

  get arrowIconSecondaryButton(): Locator {
    return this._arrowIconSecondaryButton
  }

  get allInSecondaryButton(): Locator {
    return this._allInSecondaryButton
  }

  get regularSecondaryButton(): Locator {
    return this._regularSecondaryButton
  }

  get disabledDestructiveButton(): Locator {
    return this._disabledDestructiveButton
  }

  get loadingDestructiveButton(): Locator {
    return this._loadingDestructiveButton
  }

  get smallDestructiveButton(): Locator {
    return this._smallDestructiveButton
  }

  get customWidthDestructiveButton(): Locator {
    return this._customWidthDestructiveButton
  }

  get allInDestructiveButton(): Locator {
    return this._allInDestructiveButton
  }

  get regularDestructiveButton(): Locator {
    return this._regularDestructiveButton
  }

  get disabledActionPrimaryButton(): Locator {
    return this._disabledActionPrimaryButton
  }

  get loadingActionPrimaryButton(): Locator {
    return this._loadingActionPrimaryButton
  }

  get plusIconActionPrimaryButton(): Locator {
    return this._plusIconActionPrimaryButton
  }

  get arrowIconActionPrimaryButton(): Locator {
    return this._arrowIconActionPrimaryButton
  }

  get allInActionPrimaryButton(): Locator {
    return this._allInActionPrimaryButton
  }

  get actionPrimaryButton(): Locator {
    return this._actionPrimaryButton
  }

  get disabledActionSecondaryButton(): Locator {
    return this._disabledActionSecondaryButton
  }

  get loadingActionSecondaryButton(): Locator {
    return this._loadingActionSecondaryButton
  }

  get plusIconActionSecondaryButton(): Locator {
    return this._plusIconActionSecondaryButton
  }

  get arrowIconActionSecondaryButton(): Locator {
    return this._arrowIconActionSecondaryButton
  }

  get allInActionSecondaryButton(): Locator {
    return this._allInActionSecondaryButton
  }

  get actionSecondaryButton(): Locator {
    return this._actionSecondaryButton
  }

  get disabledIconButton(): Locator {
    return this._disabledIconButton
  }

  get loadingIconButton(): Locator {
    return this._loadingIconButton
  }

  get smallIconButton(): Locator {
    return this._smallIconButton
  }

  get allInIconButton(): Locator {
    return this._allInIconButton
  }

  get iconButton(): Locator {
    return this._iconButton
  }

  get regularButtons(): Locator {
    return this._regularButtons
  }

  get actionButtons(): Locator {
    return this._actionButtons
  }

  get iconButtons(): Locator {
    return this._iconButtons
  }

  get moreButtons(): Locator {
    return this._moreButtons
  }

  get setFocusBtn(): Locator {
    return this._setFocusBtn
  }

  get filterBtn(): Locator {
    return this._filterBtn
  }

  get sortBtn(): Locator {
    return this._sortBtn
  }

  get floatBtn(): Locator {
    return this._floatBtn
  }

  get backToTopBtn(): Locator {
    return this._backToTopBtn
  }

  //Init all the variables
  async init() {
    this._regularDisabledButton = this.page.locator('[data-testid="disabled-button"]')
    this._regularLoadingButton = this.page.locator('[data-testid="loading-button"]')
    this._regularSmallButton = this.page.locator('[data-testid="small-button"]')
    this._regularCustomWidthButton = this.page.locator('[data-testid="custom-width-button"]')
    this._regularPlusIconButton = this.page.locator('[data-testid="regular-plus-icon-button"]')
    this._regularArrowIconButton = this.page.locator('[data-testid="regular-arrow-icon-button"]')
    this._regularAllInButton = this.page.locator('[data-testid="all-in-button"]')
    this._regularButton = this.page.locator('[data-testid="regular-button"]')
    this._setFocusBtn = this.page.getByText('SetFocus to first button')

    this._disabledSecondaryButton = this.page.locator('[data-testid="disabled-secondary-button"]')
    this._loadingSecondaryButton = this.page.locator('[data-testid="loading-secondary-button"]')
    this._smallSecondaryButton = this.page.locator('[data-testid="small-secondary-button"]')
    this._customWidthSecondaryButton = this.page.locator('[data-testid="custom-width-secondary-button"]')
    this._plusIconSecondaryButton = this.page.locator('[data-testid="plus-icon-secondary-button"]')
    this._arrowIconSecondaryButton = this.page.locator('[data-testid="arrow-icon-secondary-button"]')
    this._allInSecondaryButton = this.page.locator('[data-testid="all-in-secondary-button"]')
    this._regularSecondaryButton = this.page.locator('[data-testid="regular-secondary-button"]')

    this._disabledDestructiveButton = this.page.locator('[data-testid="disabled-destructive-button"]')
    this._loadingDestructiveButton = this.page.locator('[data-testid="loading-destructive-button"]')
    this._smallDestructiveButton = this.page.locator('[data-testid="small-destructive-button"]')
    this._customWidthDestructiveButton = this.page.locator('[data-testid="custom-width-destructive-button"]')
    this._allInDestructiveButton = this.page.locator('[data-testid="all-in-destructive-button"]')
    this._regularDestructiveButton = this.page.locator('[data-testid="regular-destructive-button"]')

    this._disabledActionPrimaryButton = this.page.locator('[data-testid="disabled-action-primary-button"]')
    this._loadingActionPrimaryButton = this.page.locator('[data-testid="loading-action-primary-button"]')
    this._plusIconActionPrimaryButton = this.page.locator('[data-testid="plus-icon-action-primary-button"]')
    this._arrowIconActionPrimaryButton = this.page.locator('[data-testid="arrow-icon-action-primary-button"]')
    this._allInActionPrimaryButton = this.page.locator('[data-testid="all-in-action-primary-button"]')
    this._actionPrimaryButton = this.page.locator('[data-testid="regular-action-primary-button"]')

    this._disabledActionSecondaryButton = this.page.locator('[data-testid="disabled-action-secondary-button"]')
    this._loadingActionSecondaryButton = this.page.locator('[data-testid="loading-action-secondary-button"]')
    this._plusIconActionSecondaryButton = this.page.locator('[data-testid="plus-icon-action-secondary-button"]')
    this._arrowIconActionSecondaryButton = this.page.locator('[data-testid="arrow-icon-action-secondary-button"]')
    this._allInActionSecondaryButton = this.page.locator('[data-testid="all-in-action-secondary-button"]')
    this._actionSecondaryButton = this.page.locator('[data-testid="regular-action-secondary-button"]')

    this._disabledIconButton = this.page.locator('[data-testid="disabled-icon-button"]')
    this._loadingIconButton = this.page.locator('[data-testid="loading-icon-button"]')
    this._smallIconButton = this.page.locator('[data-testid="small-icon-button"]')
    this._allInIconButton = this.page.locator('[data-testid="all-in-icon-button"]')
    this._iconButton = this.page.locator('[data-testid="icon-button"]').first()
    this._filterBtn = this.page.getByTestId('wppFilterButton')
    this._sortBtn = this.page.getByTestId('wppSortButton')
    this._floatBtn = this.page.getByTestId('wppFloatingButton')
    this._backToTopBtn = this.page.getByTestId('wppBackToTopButton')

    this._regularButtons = this.page.getByText('wpp regular buttonswpp')
    this._actionButtons = this.page.locator('.action-buttons')
    this._iconButtons = this.page.locator('.icon-buttons')
    this._moreButtons = this.page.getByText('WppMoreButtonDefaultLoadingDisabled')
  }

  async checkButtonText(selector: Locator, text: string) {
    await expect(selector).toHaveText(text)
  }

  async performHoverButtonColorsCheck(selector: Locator, buttonType: ButtonType, multipleButtons?: boolean) {
    let bgHoverColor
    let textHoverColor

    switch (buttonType) {
      case 'action_primary_enabled':
        bgHoverColor = 'wpp-grey-color-200'
        textHoverColor = 'wpp-primary-color-400'
        break
      case 'action_primary_disabled':
        bgHoverColor = 'wpp-transparent'
        textHoverColor = 'wpp-primary-color-300'
        break
      case 'action_secondary_enabled':
        bgHoverColor = 'wpp-grey-color-200'
        textHoverColor = 'wpp-grey-color-800'
        break
      case 'action_secondary_disabled':
        bgHoverColor = 'wpp-transparent'
        textHoverColor = 'wpp-grey-color-500'
        break
      case 'regular_primary_enabled':
        bgHoverColor = 'wpp-primary-color-400'
        textHoverColor = 'wpp-grey-color-000'
        break
      case 'regular_primary_disabled':
        bgHoverColor = 'wpp-primary-color-300'
        textHoverColor = 'wpp-grey-color-000'
        break
      case 'regular_secondary_enabled':
        bgHoverColor = 'wpp-primary-color-100'
        textHoverColor = 'wpp-primary-color-500'
        break
      case 'regular_secondary_disabled':
        bgHoverColor = 'wpp-transparent'
        textHoverColor = 'wpp-primary-color-300'
        break
      case 'regular_destructive_enabled':
        bgHoverColor = 'wpp-danger-color-400'
        textHoverColor = 'wpp-grey-color-000'
        break
      case 'regular_destructive_disabled':
        bgHoverColor = 'wpp-danger-color-300'
        textHoverColor = 'wpp-grey-color-000'
        break

      default:
        break
    }

    multipleButtons? await this.checkHoverElementColors(selector.locator('button').nth(1), bgHoverColor, textHoverColor) : 
    await this.checkHoverElementColors(selector.locator('button'), bgHoverColor, textHoverColor)
  }
}
