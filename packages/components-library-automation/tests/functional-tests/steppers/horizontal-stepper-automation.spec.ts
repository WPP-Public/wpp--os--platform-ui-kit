import { test, expect } from '@playwright/test'
import { WppStepperPage } from '../../../pages/stepper.page'

const wppStepperPage = new WppStepperPage()
let consoleErrors

test.beforeEach(async ({ page }) => {
  await wppStepperPage.setPage(page)
  await wppStepperPage.init()
  await wppStepperPage.openPage('vc/stepper')
  await wppStepperPage.horizontalStepperTab.click()
  consoleErrors = await wppStepperPage.listenConsoleErrors(page)
})

test.afterEach(async () => {
  await expect(consoleErrors.length === 0).toBeTruthy()
})

test.describe('Horizontal Stepper', () => {
  test('[WPPOPENDS-T242] Check that the previously completed steps can be opened', async () => {
    await wppStepperPage.nextButton.click()
    await wppStepperPage.nextButton.click()

    //Open second completed step
    await wppStepperPage.completedStep.nth(1).click()

    await expect(wppStepperPage.secondPageHorizontalStepper).toBeInViewport()
  })

  test('[WPPOPENDS-T243] Check that the uncompleted steps cannot be opened', async () => {
    await wppStepperPage.fourthStep.click()

    await expect(wppStepperPage.fourthStep).toHaveJSProperty('active', false)
    await expect(wppStepperPage.fourthPageHorizontalStepper).not.toBeInViewport()
  })

  test('[WPPOPENDS-T244] Check that the error icon with tooltip is displayed for invalid step', async () => {
    await wppStepperPage.nextButton.click()
    await wppStepperPage.nextButton.click()
    await wppStepperPage.nextButton.click()
    await wppStepperPage.nextButton.click()

    await expect(wppStepperPage.iconStep).toBeVisible()
    await expect(wppStepperPage.errorIcon).toBeVisible()

    await wppStepperPage.errorIcon.hover()

    await expect(wppStepperPage.tooltipText).toHaveText('Error message')
  })

  test('[WPPOPENDS-T472] Check that the radio is selected when returned to the corresponding step', async () => {
    await wppStepperPage.stepperRadioButton.click()
    await wppStepperPage.nextButton.click()
    await wppStepperPage.previousButton.click()

    await expect(wppStepperPage.stepperRadioButton).toHaveJSProperty('checked', true)
  })

  test('[WPPOPENDS-T730] Check that the stepper returns to the previous step when press on the button Previous Step', async () => {
    await expect(wppStepperPage.horizontalStepperStepOne).toHaveAttribute('displayed-step')
    await wppStepperPage.nextButton.click()
    await expect(wppStepperPage.horizontalStepperStepOne).not.toHaveAttribute('displayed-step')
    await expect(wppStepperPage.horizontalStepperStepOne).toHaveAttribute('completed')
    await wppStepperPage.previousButton.click()
    await expect(wppStepperPage.horizontalStepperStepOne).toHaveAttribute('displayed-step')
    await expect(wppStepperPage.horizontalStepperStepOne).toHaveAttribute('completed')
    await expect(wppStepperPage.horizontalStepperStepTwo).not.toHaveAttribute('displayed-step')
  })

  test('[WPPOPENDS-T731] Check that the stepper moves to the next step when you click on the button Next Step', async () => {
    await expect(wppStepperPage.horizontalStepperStepOne).toHaveAttribute('displayed-step')
    await wppStepperPage.nextButton.click()
    await expect(wppStepperPage.horizontalStepperStepOne).not.toHaveAttribute('displayed-step')
    await expect(wppStepperPage.horizontalStepperStepOne).toHaveAttribute('completed')
    await expect(wppStepperPage.horizontalStepperStepTwo).toHaveAttribute('displayed-step')
    await wppStepperPage.nextButton.click()
    await expect(wppStepperPage.horizontalStepperStepTwo).not.toHaveAttribute('displayed-step')
    await expect(wppStepperPage.horizontalStepperStepTwo).toHaveAttribute('completed')
    await expect(wppStepperPage.horizontalStepperStepThree).toHaveAttribute('displayed-step')
  })
})
