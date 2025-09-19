import { expect } from '@playwright/test'
import test from './../../utils'
import { WppCarouselPage } from '../../pages/carousel.page'

const wppCarouselPage = new WppCarouselPage()

test.beforeEach(async ({ page }) => {
  await wppCarouselPage.setPage(page)
  await wppCarouselPage.init()
  await wppCarouselPage.openPage('swiper')
  await wppCarouselPage.setViewportSize(1280, 720)
})

test.describe('WPP Regular Carousel', () => {
  test('[WPPOPENDS-T488] Check that the component passes the visual check', async () => {
    await expect(wppCarouselPage.regularCarousel).toHaveScreenshot()
  })

  test('[WPPOPENDS-T477] Check that the component can be navigated forward', async ({ page }) => {
    await wppCarouselPage.regularCarousel.locator('[part="button-next"]').click()
    await page.waitForTimeout(500)

    await expect(wppCarouselPage.regularCarousel).toHaveScreenshot()
  })

  test('[WPPOPENDS-T478] Check that the component can be navigated backward', async ({ page }) => {
    await wppCarouselPage.regularCarousel.locator('[part="button-next"]').click()
    await wppCarouselPage.regularCarousel.locator('[part="button-next"]').click()
    await wppCarouselPage.regularCarousel.locator('[part="button-next"]').click()
    await wppCarouselPage.regularCarousel.locator('[part="button-prev"]').click()
    await page.waitForTimeout(500)

    await expect(wppCarouselPage.regularCarousel).toHaveScreenshot()
  })

  test('[WPPOPENDS-T479] Check that the component can be navigated with dots', async ({ page }) => {
    await wppCarouselPage.regularCarousel.locator('[aria-label="Go to slide 5"]').click()
    await page.waitForTimeout(500)

    await expect(wppCarouselPage.regularCarousel).toHaveScreenshot()
  })
})

test.describe('WPP Gallery Carousel', () => {
  test('[WPPOPENDS-T489] Check that the component passes the visual check', async () => {
    await expect(wppCarouselPage.galleryCarousel).toHaveScreenshot()
  })

  test('[WPPOPENDS-T480] Check that the component can be navigated forward', async ({ page }) => {
    await wppCarouselPage.galleryCarousel.locator('[part="button-next"]').click()
    await page.waitForTimeout(500)

    await expect(wppCarouselPage.galleryCarousel).toHaveScreenshot()
  })

  test('[WPPOPENDS-T569] Check that the component can be navigated backward', async ({ page }) => {
    await wppCarouselPage.galleryCarousel.locator('[part="button-next"]').click()
    await wppCarouselPage.galleryCarousel.locator('[part="button-next"]').click()
    await wppCarouselPage.galleryCarousel.locator('[part="button-next"]').click()
    await wppCarouselPage.galleryCarousel.locator('[part="button-prev"]').click()
    await page.waitForTimeout(500)

    await expect(wppCarouselPage.galleryCarousel).toHaveScreenshot()
  })

  test('[WPPOPENDS-T570] Check that the component can be navigated with dots', async ({ page }) => {
    await wppCarouselPage.galleryCarousel.locator('[aria-label="Go to slide 10"]').click()
    await page.waitForTimeout(500)

    await expect(wppCarouselPage.galleryCarousel).toHaveScreenshot()
  })
})
