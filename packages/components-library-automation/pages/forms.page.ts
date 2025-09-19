import { expect, Locator, Page } from '@playwright/test'
import { BasePage } from './base.page'

export class WppFormsPage extends BasePage {
  private _itemSelectFormik!: Locator
  private _itemsSelectFormik!: Locator
  private _activitiesSelectFormik!: Locator
  private _mainActivitySelectFormik!: Locator

  private _itemSelectVanilla!: Locator
  private _itemsSelectVanilla!: Locator
  private _activitiesSelectVanilla!: Locator
  private _mainActivitySelectVanilla!: Locator

  private _resetButtonFormik!: Locator
  private _resetButtonVanilla!: Locator
  private _submitButton!: Locator

  private _formFormik!: Locator
  private _formVanilla!: Locator

  private _itemSelect!: Locator
  private _itemsSelect!: Locator
  private _activitiesSelect!: Locator
  private _activitySelect!: Locator
  private _nameInput!: Locator

  get itemSelectFormik(): Locator {
    return this._itemSelectFormik
  }

  get itemsSelectFormik(): Locator {
    return this._itemsSelectFormik
  }

  get activitiesSelectFormik(): Locator {
    return this._activitiesSelectFormik
  }

  get mainActivitySelectFormik(): Locator {
    return this._mainActivitySelectFormik
  }

  get itemSelectVanilla(): Locator {
    return this._itemSelectVanilla
  }

  get itemsSelectVanilla(): Locator {
    return this._itemsSelectVanilla
  }

  get activitiesSelectVanilla(): Locator {
    return this._activitiesSelectVanilla
  }

  get mainActivitySelectVanilla(): Locator {
    return this._mainActivitySelectVanilla
  }

  get resetButtonFormik(): Locator {
    return this._resetButtonFormik
  }

  get resetButtonVanilla(): Locator {
    return this._resetButtonVanilla
  }

  get formFormik(): Locator {
    return this._formFormik
  }

  get formVanilla(): Locator {
    return this._formVanilla
  }

  get submitButton(): Locator {
    return this._submitButton
  }

  get nameInput(): Locator {
    return this._nameInput
  }

  async init() {
    this._itemSelectFormik = this.page.locator('[data-testid="item-select-formik"]')
    this._itemsSelectFormik = this.page.locator('[data-testid="items-select-formik"]')
    this._activitiesSelectFormik = this.page.locator('[data-testid="activities-select-formik"]')
    this._mainActivitySelectFormik = this.page.locator('[data-testid="main-activity-select-formik"]')
    this._itemSelectVanilla = this.page.locator('[data-testid="item-select-vanilla"]')
    this._itemsSelectVanilla = this.page.locator('[data-testid="items-select-vanilla"]')
    this._activitiesSelectVanilla = this.page.locator('[data-testid="activities-select-vanilla"]')
    this._mainActivitySelectVanilla = this.page.locator('[data-testid="main-activity-select-vanilla"]')
    this._resetButtonFormik = this.page.locator('[data-testid="reset-formik"]')
    this._resetButtonVanilla = this.page.locator('[data-testid="reset-vanilla"]')
    this._formFormik = this.page.locator('[data-testid="formik-form"]')
    this._formVanilla = this.page.locator('[data-testid="vanilla-form"]')
    this._submitButton = this.page.locator('[data-testid="submit-button"]')
    this._nameInput = this.page.locator('[data-testid="name-input"]')
  }

  async selectValuesForSelects(formType: string, page: Page) {
    switch (formType) {
      case 'formik':
        this._itemSelect = this.itemSelectFormik
        this._itemsSelect = this.itemsSelectFormik
        this._activitiesSelect = this.activitiesSelectFormik
        this._activitySelect = this.mainActivitySelectFormik
        break

      case 'vanilla':
        this._itemSelect = this.itemSelectVanilla
        this._itemsSelect = this.itemsSelectVanilla
        this._activitiesSelect = this.activitiesSelectVanilla
        this._activitySelect = this.mainActivitySelectVanilla
        break

      default:
        break
    }
    //Select value for the first select
    await this._itemSelect.click()
    await page.locator('[value="2"]').click()

    //Select values for the second select
    await this._itemsSelect.click()
    await page.locator('[value="1"]').click()
    await page.locator('[value="3"]').click()
    await page.locator('text=Components Library Examples').click()

    //Select values for the third select
    await this._activitiesSelect.click()
    await this._activitiesSelect.type('foo')
    await this._activitiesSelect.locator('[label="Football"]').click()
    await page.waitForTimeout(300)
    await this._activitiesSelect.click()
    await this._activitiesSelect.type('rea')
    await this._activitiesSelect.locator('[label="Reading"]').click()
    await page.waitForTimeout(300)

    //unfocus the previous select
    await page.locator('text=Components Library Examples').click()

    //Select value for the fourth select
    await this._activitySelect.click()
    await this._activitySelect.type('ska')
    await this._activitySelect.locator('[label="Skating"]').click()

    //unfocus the previous select
    await page.locator('text=Components Library Examples').click()
  }

  async checkSelectedOptions() {
    await expect(this._itemSelect.locator('.overflow-container')).toHaveText('House')
    await expect(this._itemsSelect.locator('.overflow-container')).toHaveText('Item 1, Item 3')
    await expect(this._activitiesSelect.locator('.values')).toHaveText('Football, Reading')
    await expect(this._activitySelect.locator('.values')).toHaveText('Skating')
  }
}
