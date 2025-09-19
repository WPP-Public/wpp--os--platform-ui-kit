import { expect } from '@playwright/test'
import { WppFileUploadsPage } from '../../pages/file-uploads.page'
import test from './../../utils'

const wppFileUploadsPage = new WppFileUploadsPage()

test.beforeEach(async ({ page }) => {
  await wppFileUploadsPage.setPage(page)
  await wppFileUploadsPage.init()
  await wppFileUploadsPage.openPage('vc/file-upload')
  await wppFileUploadsPage.setViewportSize(1280, 720)
  await page.waitForTimeout(1000)
})

test.describe('WPP File Uploads', () => {
  test('[WPPOPENDS-T303] Check that the component passes the visual check', async () => {
    await expect(wppFileUploadsPage.fileUploads).toHaveScreenshot()
  })

  test('[WPPOPENDS-T304] Check that the several files can be uploaded', async ({ page }) => {
    await page.setInputFiles(wppFileUploadsPage.uploader, [
      'tests/fixture/archive.zip',
      'tests/fixture/image.png',
      'tests/fixture/other.key',
      'tests/fixture/text.txt',
      'tests/fixture/video.mov',
      'tests/fixture/table.xlsx',
    ])
    await page.waitForTimeout(1000)

    await expect(wppFileUploadsPage.fileUploads).toHaveScreenshot()
  })

  test('[WPPOPENDS-T342] Check that the file with a forbidden file type cannot be uploaded', async ({ page }) => {
    await page.setInputFiles(wppFileUploadsPage.uploaderWithErrors, ['tests/fixture/archive.zip'])
    await page.waitForTimeout(1000)

    await expect(wppFileUploadsPage.fileUploads).toHaveScreenshot()
  })

  test('[WPPOPENDS-T343] Check that the file that exceeds size limit cannot be uploaded', async ({ page }) => {
    await page.setInputFiles(wppFileUploadsPage.uploaderWithErrors, ['tests/fixture/error.jpeg'])
    await page.waitForTimeout(1000)

    await expect(wppFileUploadsPage.fileUploads).toHaveScreenshot()
  })

  test('[WPPOPENDS-T361] Check that the rar file can be uploaded and the archive icon is displayed', async ({
    page,
  }) => {
    await page.setInputFiles(wppFileUploadsPage.uploader, ['tests/fixture/archive-rar.rar'])
    await page.waitForTimeout(1000)

    await expect(wppFileUploadsPage.fileUploads).toHaveScreenshot()
  })

  test('[WPPOPENDS-T396] Check that the file item validation is present', async ({ page }) => {
    await page.locator('text=File Upload').first().click()

    await page.setInputFiles(wppFileUploadsPage.multipleUploader, ['tests/fixture/validator-test.jpg'])
    await page.waitForTimeout(1000)

    await expect(wppFileUploadsPage.multipleFileUploadContainer).toHaveScreenshot()
  })
})
