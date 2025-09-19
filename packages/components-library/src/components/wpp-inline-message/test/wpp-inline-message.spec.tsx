import { newSpecPage } from '@stencil/core/testing'
import { WppInlineMessage } from '../wpp-inline-message'

describe('wpp-inline-message', () => {
  it('should render component', async () => {
    const page = await newSpecPage({
      components: [WppInlineMessage],
      html: `<wpp-inline-message />`,
    })

    expect(page.root).toMatchSnapshot()
  })

  it('should render component with warning message', async () => {
    const page = await newSpecPage({
      components: [WppInlineMessage],
      html: `<wpp-inline-message message='warning message' message-type='warning' />`,
    })

    expect(page.root).toMatchSnapshot()
  })

  it('should render component with error message', async () => {
    const page = await newSpecPage({
      components: [WppInlineMessage],
      html: `<wpp-inline-message message='error message' message-type='error' />`,
    })

    expect(page.root).toMatchSnapshot()
  })

  it('should render component with info message', async () => {
    const page = await newSpecPage({
      components: [WppInlineMessage],
      html: `<wpp-inline-message message='information message' message-type='information' />`,
    })

    expect(page.root).toMatchSnapshot()
  })

  it('should render component with success message', async () => {
    const page = await newSpecPage({
      components: [WppInlineMessage],
      html: `<wpp-inline-message message='success message' message-type='success' />`,
    })

    expect(page.root).toMatchSnapshot()
  })
})
