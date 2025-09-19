import { newSpecPage } from '@stencil/core/testing'
import { WppAvatar } from '../wpp-avatar'

describe('wpp-avatar', () => {
  it('renders component', async () => {
    const page = await newSpecPage({
      components: [WppAvatar],
      html: `<wpp-avatar color='var(--wpp-dataviz-color-cat-neutral-4)'></wpp-avatar>`,
    })

    expect(page.root).toMatchSnapshot()
  })

  it('renders component with abbreviation message when image source was not provided', async () => {
    const page = await newSpecPage({
      components: [WppAvatar],
      html: `<wpp-avatar color='var(--wpp-dataviz-color-cat-neutral-4)' with-tooltip name='Test Avatar'></wpp-avatar>`,
    })

    expect(page.root).toMatchSnapshot()
  })

  it('renders component with number of hidden avatars when number was provided', async () => {
    const page = await newSpecPage({
      components: [WppAvatar],
      html: `<wpp-avatar color='var(--wpp-dataviz-color-cat-neutral-4)' amount-of-hidden-avatars='4'></wpp-avatar>`,
    })

    expect(page.root).toMatchSnapshot()
  })

  it('renders component with image when source was provided', async () => {
    const page = await newSpecPage({
      components: [WppAvatar],
      html: `<wpp-avatar color='var(--wpp-dataviz-color-cat-neutral-4)' with-tooltip name='Test Avatar' size='m' src='https://mui.com/static/images/avatar/1.jpg'></wpp-avatar>`,
    })

    expect(page.root).toMatchSnapshot()
  })

  it('renders component with abbreviation when flag with-tooltip is disabled', async () => {
    const page = await newSpecPage({
      components: [WppAvatar],
      html: `<wpp-avatar color='var(--wpp-dataviz-color-cat-neutral-4)' name='Test Avatar'></wpp-avatar>`,
    })

    expect(page.root).toMatchSnapshot()
  })
})
