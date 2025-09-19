import { test, expect } from '@playwright/test'
import { WppStepperPage } from '../../../pages/stepper.page'

const wppStepperPage = new WppStepperPage()
let consoleErrors

test.beforeEach(async ({ page }) => {
  await wppStepperPage.setPage(page)
  await wppStepperPage.init()
  await wppStepperPage.openPage('vc/stepper')
  consoleErrors = await wppStepperPage.listenConsoleErrors(page)
})

test.afterEach(async () => {
  await expect(consoleErrors.length === 0).toBeTruthy()
})

test.describe('Vertical Stepper', () => {
  test('[WPPOPENDS-T254] Check that the previously completed steps can be opened', async () => {
    await wppStepperPage.nextButton.click()
    await wppStepperPage.completedStepVerticalStepper.click()

    await expect(wppStepperPage.firstPageVerticalStepper).toBeInViewport()
  })

  test('[WPPOPENDS-T253] Check that the uncompleted steps cannot be opened', async () => {
    await wppStepperPage.thirdStepVerticalStepper.click()

    await expect(wppStepperPage.thirdStepVerticalStepper).toHaveJSProperty('active', false)
    await expect(wppStepperPage.thirdPageVerticalStepper).not.toBeInViewport()
  })

  test('[WPPOPENDS-T255] Check that the error icon with tooltip is displayed for invalid step[@bug-WPPOPENDS-715]', async () => {
    await wppStepperPage.nextButton.click()
    await wppStepperPage.nextButton.click()
    await wppStepperPage.nextButton.click()
    await wppStepperPage.nextButton.click()
    await wppStepperPage.nextButton.click()

    await expect(wppStepperPage.iconStepVerticalStepper).toBeVisible()
    await expect(wppStepperPage.errorIcon).toBeVisible()

    await wppStepperPage.errorIcon.hover()

    await expect(wppStepperPage.tooltipText).toHaveText('Error message')
  })

  test('[WPPOPENDS-T471] Check that the radio is selected when returned to the corresponding step', async () => {
    await wppStepperPage.stepperRadioButton.click()
    await wppStepperPage.nextButton.click()
    await wppStepperPage.previousButton.click()

    await expect(wppStepperPage.stepperRadioButton).toHaveJSProperty('checked', true)
  })

  //WPPLONOP-24140
  test('[WPPOPENDS-T651] Check stepper steps description', async ({ page }) => {
    const firstStepLabel = page.locator('[index="1"][step="1"] >> [slot="label"]')
    const firstStepDescription = page.locator('[index="1"][step="1"] >> [slot="description"]')
    await expect(firstStepLabel).toHaveText('Step with a long text')
    await expect(firstStepDescription).toHaveText(
      "First step (this text gets truncated if it's too long and a tooltip is displayed)",
    )
    const forthStepLabel = page.locator('[index="9"][step="4"] >> [slot="label"]')
    const forthStepDescription = page.locator('[index="9"][step="4"] >> [slot="description"]')
    await expect(forthStepLabel).toHaveText('Step 4')
    await expect(forthStepDescription).toHaveText('Last Step')
  })

  test('[WPPOPENDS-T664] Check tooltip for long label', async ({ page }) => {
    const firstStepLabel = page.locator('[step="1"] >> [slot="label"]')
    const tooltip = page.locator('.wpp-internal-tooltip :text("Step with a long text")')
    await expect(tooltip).toBeVisible({visible: false})
    await firstStepLabel.hover()
    await expect (firstStepLabel).toHaveText('Step with a long text')
    await expect(tooltip).toBeVisible({visible: true})
    await expect (firstStepLabel).toHaveText('Step with a long text')
  })

test('[WPPOPENDS-T728] Check that the stepper moves to the next step when you click on the button Next Step', async ({ page }) => {
    await expect (wppStepperPage.verticalStepperStepOne).toHaveAttribute('displayed-step')
    await wppStepperPage.nextButton.click()
    await expect (wppStepperPage.verticalStepperStepOne).not.toHaveAttribute('displayed-step')
    await expect (wppStepperPage.verticalStepperStepOne).toHaveAttribute('completed')
    await expect (wppStepperPage.verticalStepperStepTwo).toHaveAttribute('expanded')
    await expect (wppStepperPage.verticalStepperStep2Substep1).toHaveAttribute('displayed-step')
    await wppStepperPage.nextButton.click()
    await expect (wppStepperPage.verticalStepperStep2Substep1).not.toHaveAttribute('displayed-step')
    await expect (wppStepperPage.verticalStepperStep2Substep1).toHaveAttribute('completed')
    await expect (wppStepperPage.verticalStepperStep2Substep2).toHaveAttribute('displayed-step')
    await wppStepperPage.nextButton.click()
    await expect (wppStepperPage.verticalStepperStep2Substep2).not.toHaveAttribute('displayed-step')
    await expect (wppStepperPage.verticalStepperStepTwo).toHaveAttribute('completed')
  })

  test('[WPPOPENDS-T729] Check that the stepper returns to the previous step when press on the button Previous Step', async ({ page }) => {
    await expect (wppStepperPage.verticalStepperStepOne).toHaveAttribute('displayed-step')
    await wppStepperPage.nextButton.click()
    await expect (wppStepperPage.verticalStepperStepOne).not.toHaveAttribute('displayed-step')
    await expect (wppStepperPage.verticalStepperStepOne).toHaveAttribute('completed')
    await expect (wppStepperPage.verticalStepperStepTwo).toHaveAttribute('expanded')
    await expect (wppStepperPage.verticalStepperStep2Substep1).toHaveAttribute('displayed-step')
    await wppStepperPage.previousButton.click()
    await expect (wppStepperPage.verticalStepperStepOne).toHaveAttribute('displayed-step')
    await expect (wppStepperPage.verticalStepperStepOne).toHaveAttribute('completed')
    await expect (wppStepperPage.verticalStepperStepTwo).not.toHaveAttribute('expanded')
    await expect (wppStepperPage.verticalStepperStep2Substep1).not.toHaveAttribute('displayed-step')
  })
})
