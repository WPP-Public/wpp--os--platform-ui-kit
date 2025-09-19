import { test, expect } from '@playwright/test'
import { WppTopbarPage } from '../../../pages/topbar.page'

const wppTopbarPage = new WppTopbarPage()

test.beforeEach(async ({ page }) => {
  await wppTopbarPage.setPage(page)
  await wppTopbarPage.init()
  await wppTopbarPage.openPage('vc/topbar')
})

test.describe('Topbar', () => {
  //WPPLONOP-12092
  test('[WPPOPENDS-T627] Check that top bar wrapper element content has width 95% and margins are 5%', async () => {
    const topBarFullElement = await wppTopbarPage.topBarWrapperElement.boundingBox()
    const topBarFullElementWidth = topBarFullElement?.width

    const topBarElementStyles = await wppTopbarPage.topBarWrapperElement.evaluate(element => {
      const computedStyle = window.getComputedStyle(element)
      return {
        width: computedStyle.getPropertyValue('width'),
      }
    })

    const topBarElementContent = function calculateContext() {
      if (topBarFullElementWidth == undefined) return null
      else {
        const topBarElementContextNumber = parseFloat(topBarElementStyles.width) * 100 / topBarFullElementWidth
        return topBarElementContextNumber
      }
    }

    await expect(topBarElementContent()).toBeCloseTo(95)
  })
  //WPPLONOP-12092
  test('[WPPOPENDS-T628] Check that top bar wrapper element content maximum width is 1812px', async () => {
    const topBarElementStyles = await wppTopbarPage.topBarWrapperElement.evaluate(element => {
      const computedStyle = window.getComputedStyle(element)
      return {
        maxWidth: computedStyle.getPropertyValue('max-width'),
      }
    })

    await expect(topBarElementStyles.maxWidth).toEqual('1812px')
  })
  //WPPLONOP-12092
  test('[WPPOPENDS-T629] Check that top bar wrapper element content has width 95% and margins are 5% for large screen', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 })

    const topBarFullElement = await wppTopbarPage.topBarWrapperElement.boundingBox()
    const topBarFullElementWidth = topBarFullElement?.width

    const topBarElementStyles = await wppTopbarPage.topBarWrapperElement.evaluate(element => {
      const computedStyle = window.getComputedStyle(element)
      return {
        width: computedStyle.getPropertyValue('width'),
      }
    })

    const topBarElementContent = function calculateContext() {
      if (topBarFullElementWidth == undefined) return null
      else {
        const topBarElementContextNumber = parseFloat(topBarElementStyles.width) * 100 / topBarFullElementWidth
        return topBarElementContextNumber
      }
    }

    await expect(topBarElementContent()).toBeCloseTo(95)
  })

  test('[WPPOPENDS-T202] Check that the dropdown is displayed when click on "More items" Button', async ({ page }) => {
    await page.setViewportSize({ width: 600, height: 1080 })
    const moreBtn = wppTopbarPage.topBarWrapperElement.locator('.menu-icon.wpp-icon.wpp-icon-more')
    const moreBtnDropddown = await page.locator('.wpp-list.topbar.sc-wpp-menu-context.sc-wpp-menu-context-s')
    await expect(moreBtnDropddown).not.toBeVisible()
    await moreBtn.click()
    await expect(moreBtnDropddown).toBeVisible()
  })
})
