import { newSpecPage } from '@stencil/core/testing'
import { WppIconButton } from '../wpp-icon-button'
import { WppIconMore } from '../../wpp-icon/components/system/menu/wpp-icon-more/wpp-icon-more'

describe('wpp-icon-button', () => {
  it('should render icon button', async () => {
    const page = await newSpecPage({
      components: [WppIconButton, WppIconMore],
      html: `<wpp-icon-button>
                <wpp-icon-more />
            </wpp-icon-button>`,
    })

    expect(page.root).toMatchSnapshot()
  })

  it('should render icon button with size s', async () => {
    const page = await newSpecPage({
      components: [WppIconButton, WppIconMore],
      html: `<wpp-icon-button size="s">
                <wpp-icon-more />
            </wpp-icon-button>`,
    })

    expect(page.root).toMatchSnapshot()
  })

  it('should render disabled icon button', async () => {
    const { root } = await newSpecPage({
      components: [WppIconButton, WppIconMore],
      html: `<wpp-icon-button disabled>
                <wpp-icon-more />
            </wpp-icon-button>`,
    })

    expect(root).toMatchSnapshot()
  })

  it('should render icon button with loading spinner and size m', async () => {
    const { root } = await newSpecPage({
      components: [WppIconButton],
      html: `<wpp-icon-button size="m" loading><wpp-icon-more /></wpp-icon-button>`,
    })

    expect(root).toMatchSnapshot()
  })
})
