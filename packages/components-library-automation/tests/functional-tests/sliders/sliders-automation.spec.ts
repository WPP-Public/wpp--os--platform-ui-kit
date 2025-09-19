import { test, expect } from '@playwright/test'
import { WppSlidersPage } from '../../../pages/sliders.page'

const wppSlidersPage = new WppSlidersPage()

test.beforeEach(async ({ page }) => {
  await wppSlidersPage.setPage(page)
  await wppSlidersPage.init()
  await wppSlidersPage.openPage('vc/sliders')
})

test.describe('Sliders', () => {
  //WPPLONOP-25506
  test('[WPPOPENDS-T840] Check the height of slider component', async ({ page }) => {
    const sliderRangeSizeMWithInput = page.locator('.wpp-slider[with-input="true"][type="range"]').first()
    const sliderSizeM = sliderRangeSizeMWithInput.locator('.slider-column')
    const sliderSizeMHeight = await sliderSizeM.boundingBox()
    expect(sliderSizeMHeight?.height).toBe(40)
    const inputSizeM = sliderRangeSizeMWithInput.locator('.input-column.size-m')
    const inputSizeMHeight = await inputSizeM.boundingBox()
    expect(inputSizeMHeight?.height).toBe(40)

    const sliderRangeSizeSWithInput = page.locator('.wpp-slider[with-input="true"][type="range"][size="s"]').first()
    const sliderSizeS = sliderRangeSizeSWithInput.locator('.slider-column')
    const sliderSizeSHeight = await sliderSizeS.boundingBox()
    expect(sliderSizeSHeight?.height).toBe(32)
    const inputSizeS = sliderRangeSizeSWithInput.locator('.input-column.size-s')
    const inputSizeSHeight = await inputSizeS.boundingBox()
    expect(inputSizeSHeight?.height).toBe(32)
  })

  test('[WPPOPENDS-T655] Check input validation for even/odd values and consistency', async ({ page }) => {
    await wppSlidersPage.openPage('bugfixes/27305')
    await wppSlidersPage.rangeSliderMaximum.scrollIntoViewIfNeeded()
    // If enter even number for max range value, it should become odd and 1 value less than even after clicking outside the input
    await expect(wppSlidersPage.rangeSliderMaximum).toHaveValue('19')
    await wppSlidersPage.rangeSliderMaximum.clear()
    await wppSlidersPage.rangeSliderMaximum.type('14')
    await wppSlidersPage.sliderOutsideArea.click()
    await expect(wppSlidersPage.rangeSliderMaximum).toHaveValue('13')
    // If enter value for max range that is less or equal than min range value, it should become minimum value + step
    await wppSlidersPage.rangeSliderMaximum.clear()
    await wppSlidersPage.rangeSliderMaximum.type('3') // 3 is value for min range
    await wppSlidersPage.sliderOutsideArea.click()
    await expect(wppSlidersPage.rangeSliderMaximum).toHaveValue('5')
    // If enter even number for min range value, it should become odd which is 1 value less than even after clicking outside the input
    await wppSlidersPage.rangeSliderMaximum.clear()
    await wppSlidersPage.rangeSliderMaximum.type('19') // 19 is now value for max range

    await wppSlidersPage.rangeSliderMinimum.clear()
    await wppSlidersPage.rangeSliderMinimum.type('14')
    await wppSlidersPage.sliderOutsideArea.click()
    await expect(wppSlidersPage.rangeSliderMinimum).toHaveValue('13')
    // if enter minimun value that is equal or greater than maximum value and click outside the input, value should become maximum value - step
    await wppSlidersPage.rangeSliderMinimum.clear()
    await wppSlidersPage.rangeSliderMinimum.type('19')
    await wppSlidersPage.sliderOutsideArea.click()
    await expect(wppSlidersPage.rangeSliderMinimum).toHaveValue('17')

    await wppSlidersPage.rangeSliderMinimum.clear()
    await wppSlidersPage.rangeSliderMinimum.type('25')
    await wppSlidersPage.sliderOutsideArea.click()
    await expect(wppSlidersPage.rangeSliderMinimum).toHaveValue('17')
    // If type a value smaller than the minimum accepted on the slider and click outside the input, mimimum value should become 1
    await wppSlidersPage.rangeSliderMinimum.clear()
    await wppSlidersPage.rangeSliderMinimum.type('0') // 1 is mimimum accepted value
    await wppSlidersPage.sliderOutsideArea.click()
    await expect(wppSlidersPage.rangeSliderMinimum).toHaveValue('1')
    // If type a value bigger than the maximum accepted on the slider and click outside the input, maximum value should become 199
    await wppSlidersPage.rangeSliderMaximum.clear()
    await wppSlidersPage.rangeSliderMaximum.type('699') //199 is maximum accepted value
    await wppSlidersPage.sliderOutsideArea.click()
    await expect(wppSlidersPage.rangeSliderMaximum).toHaveValue('199')
    // If enter even number for single slider value, it should become odd which is 1 value less than even after clicking outside the input
    await wppSlidersPage.singleSliderValue.clear()
    await wppSlidersPage.singleSliderValue.type('10')
    await wppSlidersPage.sliderOutsideArea.click()
    await expect(wppSlidersPage.singleSliderValue).toHaveValue('9')
    // If type a value smaller than the minimum accepted on the single slider and click outside the input, single slider value should become 1
    await wppSlidersPage.singleSliderValue.clear()
    await wppSlidersPage.singleSliderValue.type('0') // 1 is mimimum accepted value
    await wppSlidersPage.sliderOutsideArea.click()
    await expect(wppSlidersPage.singleSliderValue).toHaveValue('1')
  })
})
