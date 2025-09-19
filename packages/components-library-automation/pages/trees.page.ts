import { Locator } from '@playwright/test'
import { BasePage } from './base.page'

export class WppTreesPage extends BasePage {
  private _trees!: Locator
  private _searchInput!: Locator
  private _singleTree!: Locator
  private _singleTreeContainer!: Locator
  private _quotationMarksTree!: Locator
  private _quotationMarksInput!: Locator
  private _quotationMarksTreeArea!: Locator
  private _customSearchMatchInput!: Locator
  private _customSearchMatchResult!: Locator
  private _customSearchIncludeInput!: Locator
  private _customSearchIncludeResultHighlighted!: Locator
  private _customSearchIncludeResultRemaining!: Locator

  get trees(): Locator {
    return this._trees
  }

  get searchInput(): Locator {
    return this._searchInput
  }

  get singleTree(): Locator {
    return this._singleTree
  }

  get singleTreeContainer(): Locator {
    return this._singleTreeContainer
  }

  get quotationMarksTree(): Locator {
    return this._quotationMarksTree
  }

  get quotationMarksInput(): Locator {
    return this._quotationMarksInput
  }

  get quotationMarksTreeArea(): Locator {
    return this._quotationMarksTreeArea
  }

  get customSearchMatchInput(): Locator {
    return this._customSearchMatchInput
  }

  get customSearchMatchResult(): Locator {
    return this._customSearchMatchResult
  }

  get customSearchIncludeInput(): Locator {
    return this._customSearchIncludeInput
  }

  get customSearchIncludeResultHighlighted(): Locator {
    return this._customSearchIncludeResultHighlighted
  }

  get customSearchIncludeResultRemaining(): Locator {
    return this._customSearchIncludeResultRemaining
  }

  async init() {
    this._trees = this.page.locator('[data-testid="trees-container"]')
    this._searchInput = this.page.locator('[data-testid="search-input"] input')
    this._singleTree = this.page.locator('[data-testid="single-tree"]')
    this._singleTreeContainer = this.page.locator('[data-testid="single-tree-container"]')
    this._quotationMarksTree = this.page.locator('[data-testid="quotation-marks-tree"]')
    this._quotationMarksInput = this.page.locator('[data-testid="quotation-marks-input"]')
    this._quotationMarksTreeArea = this.page.locator('[data-testid="quotation-marks-tree-area"]')
    this._customSearchMatchInput = this.page.locator('.input-element.size-m.with-icon-start.with-icon-end').nth(1)
    this._customSearchMatchResult = this.page.locator('[data-testid="single-tree-custom-search"] >> .empty-tree-text')
    this._customSearchIncludeInput = this.page.locator('.input-element.size-m.with-icon-start.with-icon-end').nth(2)
    this._customSearchIncludeResultHighlighted = this.page.locator('[data-testid="single-tree-custom-search"] >> [text="Octavia"] >> .highlight')
    this._customSearchIncludeResultRemaining = this.page.locator('[data-testid="single-tree-custom-search"] >> [text="Octavia"] >> [part="tree-item-title"]')
  }
}
