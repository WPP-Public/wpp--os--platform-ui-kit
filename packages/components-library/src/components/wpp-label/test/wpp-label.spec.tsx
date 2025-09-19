import { h } from '@stencil/core'
import { newSpecPage } from '@stencil/core/testing'

import { WppLabel } from '../wpp-label'
import { WppInternalLabel } from '../components/wpp-internal-label/wpp-internal-label'

describe('wpp-label', () => {
  it('should render label with text and disabled state', async () => {
    const labelConfig = {
      text: 'Test label',
    }

    const page = await newSpecPage({
      components: [WppLabel, WppInternalLabel],
      template: () => <wpp-label config={labelConfig} disabled typography="s-body" />,
    })

    expect(page.root).toMatchSnapshot()
  })

  it('should render label with optional text and icon', async () => {
    const labelConfig = {
      text: 'Test label',
      icon: 'wpp-icon-edit',
    }

    const page = await newSpecPage({
      components: [WppLabel, WppInternalLabel],
      template: () => <wpp-label config={labelConfig} typography="s-body" />,
    })

    expect(page.root).toMatchSnapshot()
  })

  it('should render label with all text and icon with tooltip description ', async () => {
    const labelConfig = {
      text: 'Test label',
      locales: {
        optional: 'Optick',
      },
      icon: 'wpp-icon-mail',
      description: 'Your email will be used to send you a confirmation number',
    }

    const page = await newSpecPage({
      components: [WppLabel, WppInternalLabel],
      template: () => <wpp-label config={labelConfig} optional typography="s-body" />,
    })

    expect(page.root).toMatchSnapshot()
  })
})
