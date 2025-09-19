import { h } from '@stencil/core'
import { newSpecPage } from '@stencil/core/testing'
import { WppCheckboxGroup } from '../wpp-checkbox-group'
import { WppCheckbox } from '../../wpp-checkbox/wpp-checkbox'

describe('wpp-checkbox-group', () => {
  it('should render checkbox-group with 4 items', async () => {
    const page = await newSpecPage({
      components: [WppCheckboxGroup, WppCheckbox],
      template: () => (
        <wpp-checkbox-group>
          <wpp-checkbox required name="email" value="email" labelConfig={{ text: 'Email' }}></wpp-checkbox>
          <wpp-checkbox required name="mail" value="mail" labelConfig={{ text: 'Mail' }}></wpp-checkbox>
          <wpp-checkbox required name="phone" value="phone" labelConfig={{ text: 'Phone' }}></wpp-checkbox>
          <wpp-checkbox required name="fax" value="fax" labelConfig={{ text: 'Fax' }}></wpp-checkbox>
        </wpp-checkbox-group>
      ),
    })

    expect(page.root).toMatchSnapshot()
  })
})
