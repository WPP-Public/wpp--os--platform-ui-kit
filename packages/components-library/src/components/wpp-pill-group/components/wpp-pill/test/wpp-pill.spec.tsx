import { newSpecPage } from '@stencil/core/testing'
import { WppPill } from '../wpp-pill'

describe('wpp-pill', () => {
  it('renders component', async () => {
    const page = await newSpecPage({
      components: [WppPill],
      html: `<wpp-pill type='single'/>`,
    })

    expect(page.root).toMatchSnapshot()
  })

  it('renders component with label Text and checked state', async () => {
    const page = await newSpecPage({
      components: [WppPill],
      html: `<wpp-pill type='single' label='Text' checked/>`,
    })

    expect(page.root).toMatchSnapshot()
  })

  it('renders display type component', async () => {
    const page = await newSpecPage({
      components: [WppPill],
      html: `<wpp-pill type='display'/>`,
    })

    expect(page.root).toMatchSnapshot()
  })

  it('renders draggable type component', async () => {
    const page = await newSpecPage({
      components: [WppPill],
      html: `<wpp-pill type='draggable'/>`,
    })

    expect(page.root).toMatchSnapshot()
  })

  it('renders component with type "multiple" and disabled state', async () => {
    const page = await newSpecPage({
      components: [WppPill],
      html: `<wpp-pill type='multiple' disabled label='Text'/>`,
    })

    expect(page.root).toMatchSnapshot()
  })
})
