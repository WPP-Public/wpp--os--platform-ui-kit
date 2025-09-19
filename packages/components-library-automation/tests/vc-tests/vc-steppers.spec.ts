import { expect } from '@playwright/test'
import { WppStepperPage } from '../../pages/stepper.page'
import test from './../../utils'

const wppStepperPage = new WppStepperPage()

test.beforeEach(async ({ page }) => {
  await wppStepperPage.setPage(page)
  await wppStepperPage.init()
  await wppStepperPage.openPage('vc/stepper')
})

test.describe('WPP Vertical Stepper', () => {
  test('[WPPOPENDS-T325] Check that the component passes the visual check', async ({ page }) => {
    await page.waitForTimeout(800)
    expect(await wppStepperPage.stepper.screenshot()).toMatchSnapshot()
  })

  test('[WPPOPENDS-T346] Check that the component passes the visual check with all the steps clicked', async ({
    page,
  }) => {
    await wppStepperPage.nextButton.click()
    await wppStepperPage.nextButton.click()
    await wppStepperPage.nextButton.click()
    await wppStepperPage.nextButton.click()
    await page.waitForTimeout(500)

    expect(await wppStepperPage.stepper.screenshot()).toMatchSnapshot()
  })
})

test.describe('WPP Horizontal Stepper', () => {
  test('[WPPOPENDS-T347] Check that the component passes the visual check', async ({ page }) => {
    await page.getByRole('option', { name: 'Vertical Stepper with width' }).click()
    await page.waitForTimeout(1000)
    await wppStepperPage.horizontalStepperTab.click()
    await page.waitForTimeout(1000)

    expect(await wppStepperPage.stepper.screenshot()).toMatchSnapshot()
  })

  test('[WPPOPENDS-T348] Check that the component passes the visual check with all the steps clicked', async ({
    page,
  }) => {
    await wppStepperPage.horizontalStepperTab.click()
    await wppStepperPage.nextButton.click()
    await wppStepperPage.nextButton.click()
    await wppStepperPage.nextButton.click()
    await wppStepperPage.nextButton.click()
    await page.waitForTimeout(1500)

    expect(await wppStepperPage.stepper.screenshot()).toMatchSnapshot()
  })
})
