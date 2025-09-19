import { h } from '@stencil/core'
import { newSpecPage } from '@stencil/core/testing'

import { WppSlider } from '../wpp-slider'
import { WppLabel } from '../../wpp-label/wpp-label'
import { WppInternalLabel } from '../../wpp-label/components/wpp-internal-label/wpp-internal-label'

describe('wpp-slider', () => {
  it('should render slider component', async () => {
    const value = 1

    const page = await newSpecPage({
      components: [WppSlider],
      template: () => <wpp-slider value={value} />,
    })

    expect(page.root).toMatchSnapshot()
  })

  it('should render disabled slider with input', async () => {
    const page = await newSpecPage({
      components: [WppSlider],
      html: `<wpp-slider value='5' disabled with-input />`,
    })

    expect(page.root).toMatchSnapshot()
  })

  it('should render slider with generated marks', async () => {
    const page = await newSpecPage({
      components: [WppSlider],
      html: `<wpp-slider value='5' max='7' marks />`,
    })

    expect(page.root).toMatchSnapshot()
  })

  it('should render slider with marks', async () => {
    const marks = [
      {
        label: 'low',
        value: 1,
      },
      {
        label: 'medium',
        value: 2,
      },
      {
        label: 'rare',
        value: 3,
      },
    ]

    const page = await newSpecPage({
      components: [WppSlider],
      template: () => <wpp-slider value={2} marks={marks} max={3} />,
    })

    expect(page.root).toMatchSnapshot()
  })

  it('should render range slider with value 4-75', async () => {
    const value = [4, 75]

    const page = await newSpecPage({
      components: [WppSlider],
      template: () => <wpp-slider type="range" value={value} />,
    })

    expect(page.root).toMatchSnapshot()
  })

  it('should render range slider with displayed value', async () => {
    const value = [1, 3]

    const page = await newSpecPage({
      components: [WppSlider],
      template: () => <wpp-slider type="range" max={5} step={2} value={value} with-value />,
    })

    expect(page.root).toMatchSnapshot()
  })

  it('should render range slider with label, icon and tooltip description', async () => {
    const value = [1, 3]
    const labelConfig = {
      text: 'Test label',
      locales: {
        optional: 'Optick',
      },
      icon: 'wpp-icon-mail',
      description: 'Your email will be used to send you a confirmation number',
    }

    const page = await newSpecPage({
      components: [WppSlider, WppLabel, WppInternalLabel],
      template: () => <wpp-slider type="range" max={5} step={2} value={value} labelConfig={labelConfig} />,
    })

    expect(page.root).toMatchSnapshot()
  })
})
