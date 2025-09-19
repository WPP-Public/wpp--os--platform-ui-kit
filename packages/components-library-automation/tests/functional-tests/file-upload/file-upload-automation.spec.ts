import { expect } from '@playwright/test'
import { WppFileUploadsPage } from '../../../pages/file-uploads.page'
import test from './../../../utils'

const wppFileUploadsPage = new WppFileUploadsPage()
let consoleErrors: string[] = []

test.beforeEach(async ({ page }) => {
  await wppFileUploadsPage.setPage(page)
  await wppFileUploadsPage.init()
  await wppFileUploadsPage.openPage('file-upload')
  consoleErrors = await wppFileUploadsPage.listenConsoleErrors(page)
})

test.afterEach(async () => {
  await expect(consoleErrors.length === 0).toBeTruthy()
})

test.describe('File Upload', () => {
  test('[WPPOPENDS-T117] Check that uploaded item is displayed by default', async () => {
    await expect(wppFileUploadsPage.fileUploadItem).toBeVisible()
  })

  test('[WPPOPENDS-T115] Check that one valid file can be uploaded', async () => {
    const changeDetail = await wppFileUploadsPage.uploadFiles(['tests/fixture/image.png'])

    await expect(changeDetail).toMatchSnapshot()
    await expect(wppFileUploadsPage.fileUploadItem).toHaveCount(2)
  })

  test('[WPPOPENDS-T116] Check that 2 valid files with different formats and 1 invalid file can be uploaded', async () => {
    const changeDetail = await wppFileUploadsPage.uploadFiles([
      'tests/fixture/less_than_1mb.jpg',
      'tests/fixture/more_than_1mb.jpg',
      'tests/fixture/image.png',
    ])

    await expect(changeDetail).toMatchSnapshot()
    await expect(wppFileUploadsPage.fileUploadItem).toHaveCount(4)
  })

  test('[WPPOPENDS-T113] Check that 3 items can be uploaded then delete 1 item', async ({ page }) => {
    let changeDetail

    await page.setInputFiles(wppFileUploadsPage.multipleUploader, [
      'tests/fixture/less_than_1mb.jpg',
      'tests/fixture/more_than_1mb.jpg',
      'tests/fixture/image.png',
    ])
    const icon = await page.locator('[data-testid="file-upload-multiple"] .wpp-icon-cross').first()

    page.on('console', msg => {
      if (msg.type() === 'log') {
        changeDetail = msg.text()
      }
    })

    await icon.dispatchEvent('click')

    await page.waitForTimeout(1000)

    await expect(changeDetail).toMatchSnapshot()
    await expect(wppFileUploadsPage.fileUploadItem).toHaveCount(3)
  })

  test('[WPPOPENDS-T114] Check that bulk upload of already uploaded files can be performed', async ({ page }) => {
    await page.setInputFiles(wppFileUploadsPage.multipleUploader, [
      'tests/fixture/less_than_1mb.jpg',
      'tests/fixture/more_than_1mb.jpg',
    ])

    await page.waitForTimeout(1000)

    // Upload 2 same files and 1 new
    const changeDetail = await wppFileUploadsPage.uploadFiles([
      'tests/fixture/less_than_1mb.jpg',
      'tests/fixture/more_than_1mb.jpg',
      'tests/fixture/image.png',
    ])

    await expect(changeDetail).toMatchSnapshot()
    await expect(wppFileUploadsPage.fileUploadItem).toHaveCount(6)
  })

  //bug WPPLONOP-9496 fixed
  test('[WPPOPENDS-T245] Check that a valid file is displayed after the invalid one was uploaded to a single file upload', async ({
    page,
  }) => {
    await page.setInputFiles(wppFileUploadsPage.singleUploader, ['tests/fixture/text.txt'])
    await page.waitForTimeout(2000)

    await expect(page.locator('[data-testid="file-upload-single"] .file-upload-item')).toHaveCount(2)
    await expect(page.locator('[data-testid="file-upload-single"] .file-upload-item .name').first()).toHaveText(
      'below_1MB-file-1.png',
    )
    await expect(page.locator('[data-testid="file-upload-single"] .file-upload-item .name').nth(1)).toHaveText(
      'text.txt',
    )
    await expect(page.locator('[data-testid="file-upload-single"] .file-upload-item .message')).toHaveText(
      'Wrong format',
    )
  })

  test('[WPPOPENDS-T474] Check that the component is disabled when the max amount of files is reached', async ({
    page,
  }) => {
    await page.setInputFiles(wppFileUploadsPage.limitedFileUpload, [
      'tests/fixture/less_than_1mb.jpg',
      'tests/fixture/more_than_1mb.jpg',
      'tests/fixture/image.png',
    ])

    await page.waitForTimeout(1000)

    await expect(page.locator('[data-testid="limited-file-upload"] .wpp-file-upload-item')).toHaveCount(2)
    await expect(page.locator('[data-testid="limited-file-upload"] .upload-wrapper')).toHaveCSS(
      'background-color',
      'rgb(244, 245, 247)',
    )
  })

  test('[WPPOPENDS-T468] Check that -1 is displayed after uploading files with the same name', async () => {
    await wppFileUploadsPage.uploadFiles(['tests/fixture/less_than_1mb.jpg'])
    await wppFileUploadsPage.uploadFiles(['tests/fixture/less_than_1mb.jpg'])

    await expect(wppFileUploadsPage.fileUploadItem).toHaveCount(3)
    await expect(wppFileUploadsPage.fileUploadItem.nth(1)).toHaveText('less_than_1mb.jpg531 KB')
    await expect(wppFileUploadsPage.fileUploadItem.nth(2)).toHaveText('less_than_1mb-1.jpg531 KB')
  })

  //WPPLONOP-24703
  test('[WPPOPENDS-T648] Check that info text is divided into 2 rows when it is too long', async ({ page }) => {
    const textInfo = wppFileUploadsPage.multipleFileUploadContainer.locator('.text-info')
    const lineHeight = 20
    await textInfo.evaluate(el => {
      el.textContent =
        'Please upload the retailer logo as JPEG or PNG file.The file should not exceed 1MB and must fit within dimensions of 800(width)'
    })
    const textInfoSize = await textInfo.boundingBox()
    const textInfoSizeHeight = textInfoSize?.height

    // validate text is in 2 rows
    await expect(lineHeight * 2).toEqual(textInfoSizeHeight)

    // validate text is centered
    const elementHandle = await textInfo.elementHandle()
    const textAlign = await page.evaluate((el: SVGElement | HTMLElement | null) => {
      if (!el) return null
      return window.getComputedStyle(el).textAlign
    }, elementHandle)
    await expect(textAlign).toEqual('center')
  })

//WPPLONOP-24703
  test('[WPPOPENDS-T929] Check that info text is divided into 3 rows when it is too long', async ({ page }) => {
    const textInfo = wppFileUploadsPage.multipleFileUploadContainer.locator('.text-info')
    const lineHeight = 20
    await textInfo.evaluate(el => {
      el.textContent =
        'Please upload the retailer logo as JPEG or PNG file.The file should not exceed 1MB and must fit within dimensions of 800(width) and 600(height) pixels.Otherwise the image will not be uploaded if it is wrong'
    })
    const textInfoSize = await textInfo.boundingBox()
    const textInfoSizeHeight = Math.round(textInfoSize?.height || 0);
    // validate text is in 3 rows
    await expect(lineHeight * 3).toEqual(textInfoSizeHeight)

    // validate text is centered
    const elementHandle = await textInfo.elementHandle()
    const textAlign = await page.evaluate((el: SVGElement | HTMLElement | null) => {
      if (!el) return null
      return window.getComputedStyle(el).textAlign
    }, elementHandle)
    await expect(textAlign).toEqual('center')
  })
})
