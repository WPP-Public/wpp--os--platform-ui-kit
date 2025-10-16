import { h } from '@stencil/core'
import { newSpecPage } from '@stencil/core/testing'
import { WppToggle } from '../wpp-toggle'
import { WppLabel } from '../../wpp-label/wpp-label'
import { WppInternalLabel } from '../../wpp-label/components/wpp-internal-label/wpp-internal-label'

describe('wpp-toggle', () => {
  it('renders component', async () => {
    const page = await newSpecPage({
      components: [WppToggle],
      html: `<wpp-toggle name="toggle" />`,
    })

    expect(page.root).toMatchSnapshot()
  })

  it('renders component with disabled state', async () => {
    const page = await newSpecPage({
      components: [WppToggle],
      html: `<wpp-toggle name="toggle" disabled/>`,
    })

    expect(page.root).toMatchSnapshot()
  })

  it('should render label with all text and icon with tooltip description', async () => {
    const labelConfig = {
      text: 'Test label',
      locales: {
        optional: 'Optick',
      },
      icon: 'wpp-icon-mail',
      description: 'Your email will be used to send you a confirmation number',
    }

    const page = await newSpecPage({
      components: [WppToggle, WppLabel, WppInternalLabel],
      template: () => <wpp-toggle labelConfig={labelConfig} required name="toggle" />,
    })

    expect(page.root).toMatchSnapshot()
  })
})
