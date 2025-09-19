import { h } from '@stencil/core'
import { newSpecPage } from '@stencil/core/testing'

import { WppRadioGroup } from '../wpp-radio-group'
import { WppRadio } from '../../wpp-radio/wpp-radio'
import { WppLabel } from '../../wpp-label/wpp-label'
import { WppInternalLabel } from '../../wpp-label/components/wpp-internal-label/wpp-internal-label'

describe('wpp-radio-group', () => {
  it('renders component with items and attributes', async () => {
    const page = await newSpecPage({
      components: [WppRadioGroup, WppRadio, WppLabel, WppInternalLabel],
      template: () => (
        <wpp-radio-group>
          <wpp-radio name="contact" value="email" labelConfig={{ text: 'Email' }} />
          <wpp-radio name="contact" value="mail" labelConfig={{ text: 'Mail' }} />
          <wpp-radio name="contact" value="phone" labelConfig={{ text: 'Phone' }} />
        </wpp-radio-group>
      ),
    })

    expect(page.root).toMatchSnapshot()
  })
})
