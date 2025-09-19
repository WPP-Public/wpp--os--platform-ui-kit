import { Locator } from '@playwright/test'
import { BasePage } from './base.page'

export class WppTimePickerPage extends BasePage {
    private _timePickerContainer!: Locator
    private _timePickerSizeM!: Locator
    private _timePickerSizeS!: Locator
    private _timePickerDisabled!: Locator
    private _timePickerInput!: Locator
    private _timePickerFocus!: Locator
    private _timePickerFiled!: Locator
    private _clearTimePickerBtn!: Locator
    private _setValueAndMinutesIntervalBtn!: Locator
    private _hoursSectionDropDownList!: Locator
    private _minutesSectionDropDownList!: Locator
    private _inlineMessage!: Locator

    get timePickerContainer() {
        return this._timePickerContainer
    }

    get timePickerSizeM() {
        return this._timePickerSizeM
    }

    get timePickerSizeS() {
        return this._timePickerSizeS
    }

    get timePickerDisabled() {
        return this._timePickerDisabled
    }

    get timePickerInput() {
        return this._timePickerInput
    }

    get timePickerFocus() {
        return this._timePickerFocus
    }

    get timePickerFiled() {
        return this._timePickerFiled
    }

    get clearTimePickerBtn() {
        return this._clearTimePickerBtn
    }

    get setValueAndMinutesIntervalBtn() {
        return this._setValueAndMinutesIntervalBtn
    }

    get hoursSectionDropDownList() {
        return this._hoursSectionDropDownList
    }

    get minutesSectionDropDownList() {
        return this._minutesSectionDropDownList
    }

    get inlineMessage() {
        return this._inlineMessage
    }

    async init() {
        this._timePickerContainer = this.page.locator('#time-picker-container')
        this._timePickerSizeM = this.page.locator('.size-m')
        this._timePickerSizeS = this.page.locator('.idle.size-s.no-value')
        this._timePickerDisabled = this.page.locator('.idle.size-m.disabled.no-value')
        this._timePickerInput = this.page.locator('#time-picker')
        this._timePickerFocus = this.page.locator('.size-m.focus')
        this._timePickerFiled = this.page.locator('.size-m.idle')
        this._clearTimePickerBtn = this.page.locator('.cross-icon-container')
        this._setValueAndMinutesIntervalBtn = this.page.getByTestId('wppButton')
        this._hoursSectionDropDownList = this.page.locator('.hours.section')
        this._minutesSectionDropDownList = this.page.locator('.minutes.section')
        this._inlineMessage = this.page.locator('.inline-message')
    }

    setHoursFromDropDownList(hours: string) {
        return this.page.locator(`#hour-${hours}`);
    }

    setMinutesFromDropDownList(minutes: string) {
        return this.page.locator(`#minutes-${minutes}`);
    }
}