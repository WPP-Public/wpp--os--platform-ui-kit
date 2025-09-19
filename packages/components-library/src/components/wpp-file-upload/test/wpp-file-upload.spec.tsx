import { h } from '@stencil/core'
import { newSpecPage } from '@stencil/core/testing'
import { WppFileUpload } from '../wpp-file-upload'
import { WppFileUploadItem } from '../components/wpp-file-upload-item'

describe('wpp-file-upload', () => {
  const value = [
    {
      url: 'https://fake-url.png',
      name: 'FileData.png',
      size: 45260,
      type: 'image/png',
      lastModified: 1666971799250,
    },
    {
      url: 'https://fake-url-second.png',
      name: 'FileDataSecond.png',
      size: 452607,
      type: 'image/png',
      lastModified: 1666971799250,
    },
  ]

  it('should render file upload', async () => {
    const page = await newSpecPage({
      components: [WppFileUpload],
      html: `<wpp-file-upload></wpp-file-upload>`,
    })

    expect(page.root).toMatchSnapshot()
  })

  it('should render file upload with different accept file format', async () => {
    const page = await newSpecPage({
      components: [WppFileUpload],
      html: `<wpp-file-upload .accept=".mov, .avi"></wpp-file-upload>`,
    })

    expect(page.root).toMatchSnapshot()
  })

  it('should render file uploader with file items based on url', async () => {
    const page = await newSpecPage({
      components: [WppFileUpload, WppFileUploadItem],
      template: () => <wpp-file-upload value={value} />,
    })

    expect(page.root).toMatchSnapshot()
  })
})
