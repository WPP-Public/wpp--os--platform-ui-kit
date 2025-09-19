import { expect } from '@playwright/test'
import { WppEChartsPage } from '../../pages/echarts.page'
import test from './../../utils'

const wppEChartsPage = new WppEChartsPage()

test.beforeEach(async ({ page }) => {
  await wppEChartsPage.setPage(page)
  await wppEChartsPage.init()
  await wppEChartsPage.openPage('echarts')
  await wppEChartsPage.setViewportSize(1280, 720)
})

test.describe('WPP Echarts', () => {
  test('[WPPOPENDS-T199] Check that the component passes the visual check', async () => {
    await expect(wppEChartsPage.echarts).toHaveScreenshot()
  })
})
