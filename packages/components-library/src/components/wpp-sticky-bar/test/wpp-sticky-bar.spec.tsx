import { newSpecPage } from '@stencil/core/testing'
import { WppStickyBar } from '../wpp-sticky-bar'
import { h } from '@stencil/core'

describe('wpp-sticky-bar', () => {
  it('render one-line sticky bar', async () => {
    const page = await newSpecPage({
      components: [WppStickyBar],
      template: () => <wpp-sticky-bar variant="one-line" barTitle="Page Title" />,
    })

    expect(page.root).toMatchSnapshot()
  })

  it('render two-lines sticky bar with custom content', async () => {
    const page = await newSpecPage({
      components: [WppStickyBar],
      template: () => (
        <wpp-sticky-bar
          variant="two-lines"
          barTitle="Page Title"
          buttons={[
            {
              variant: 'primary',
              text: 'Primary',
            },
            {
              variant: 'secondary',
              text: 'Secondary 1',
            },
            {
              variant: 'secondary',
              text: 'Secondary 2',
            },
            {
              variant: 'action-button',
              text: 'Action Btn',
            },
          ]}
        >
          <div slot="content">
            <wpp-typography type="m-body">Body Content</wpp-typography>
          </div>
        </wpp-sticky-bar>
      ),
    })

    expect(page.root).toMatchSnapshot()
  })

  it('render two-lines-with-tabs sticky bar', async () => {
    const page = await newSpecPage({
      components: [WppStickyBar],
      template: () => (
        <wpp-sticky-bar
          variant="two-lines-with-tabs"
          barTitle="Page Title"
          buttons={[
            {
              variant: 'primary',
              text: 'Primary',
            },
            {
              variant: 'secondary',
              text: 'Secondary 1',
            },
            {
              variant: 'secondary',
              text: 'Secondary 2',
            },
            {
              variant: 'action-button',
              text: 'Action Btn',
            },
          ]}
          tabs={[
            {
              text: 'Tab 1',
              value: 'tab1',
            },
            {
              text: 'Tab 2',
              value: 'tab2',
            },
            {
              text: 'Tab 3',
              value: 'tab3',
            },
            {
              text: 'Tab 4',
              value: 'tab4',
            },
            {
              text: 'Tab 5',
              value: 'tab5',
            },
          ]}
        />
      ),
    })

    expect(page.root).toMatchSnapshot()
  })
})
