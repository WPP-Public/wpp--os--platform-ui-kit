import { h } from '@stencil/core'
import { newSpecPage } from '@stencil/core/testing'
import { WppFloatingToolbar } from '../wpp-floating-toolbar'
import { ActionButtonData } from '../types'
import { WppActionButton } from '../../wpp-action-button/wpp-action-button'
import * as utils from '../../../utils/utils'

describe('wpp-floating-toolbar', () => {
  const actionButtonsWithTwoBtnConfig: ActionButtonData[] = [
    {
      icon: 'wpp-icon-add',
    },
    {
      icon: 'wpp-icon-add',
    },
  ]
  const actionButtonsWithThreeBtnConfig: ActionButtonData[] = [
    {
      icon: 'wpp-icon-add',
    },
    {
      icon: 'wpp-icon-add',
    },
    {
      icon: 'wpp-icon-add',
    },
  ]
  const actionButtonsWithTenBtnConfig: ActionButtonData[] = [
    {
      icon: 'wpp-icon-add',
    },
    {
      icon: 'wpp-icon-add',
    },
    {
      icon: 'wpp-icon-add',
    },
    {
      icon: 'wpp-icon-add',
    },
    {
      icon: 'wpp-icon-add',
    },
    {
      icon: 'wpp-icon-add',
    },
    {
      icon: 'wpp-icon-add',
    },
    {
      icon: 'wpp-icon-add',
    },
    {
      icon: 'wpp-icon-add',
    },
    {
      icon: 'wpp-icon-add',
    },
  ]

  describe('snapshots', () => {
    it('should render WppFloatingToolbar with 2 action buttons', async () => {
      const page = await newSpecPage({
        components: [WppFloatingToolbar],
        template: () => (
          <wpp-floating-toolbar actionButtonsConfig={actionButtonsWithTwoBtnConfig}></wpp-floating-toolbar>
        ),
      })

      expect(page.root).toMatchSnapshot()
    })

    it('should render WppFloatingToolbar with 7 action buttons', async () => {
      const page = await newSpecPage({
        components: [WppFloatingToolbar],
        template: () => (
          <wpp-floating-toolbar actionButtonsConfig={actionButtonsWithTenBtnConfig}></wpp-floating-toolbar>
        ),
      })

      expect(page.root).toMatchSnapshot()
    })
  })

  describe('unit tests', () => {
    it('should render WppFloatingToolbar with 2 action buttons', async () => {
      const page = await newSpecPage({
        components: [WppFloatingToolbar],
        template: () => (
          <wpp-floating-toolbar actionButtonsConfig={actionButtonsWithTwoBtnConfig}></wpp-floating-toolbar>
        ),
      })

      expect(page.rootInstance._actionButtonsConfig.length).toEqual(actionButtonsWithTwoBtnConfig.length)
    })

    it('should render WppFloatingToolbar with 7 action buttons with passed 10 items', async () => {
      const page = await newSpecPage({
        components: [WppFloatingToolbar],
        template: () => (
          <wpp-floating-toolbar actionButtonsConfig={actionButtonsWithTenBtnConfig}></wpp-floating-toolbar>
        ),
      })

      expect(page.rootInstance._actionButtonsConfig.length).toEqual(7)
    })

    it('should render WppFloatingToolbar with 1 action button', async () => {
      const page = await newSpecPage({
        components: [WppFloatingToolbar],
        template: () => <wpp-floating-toolbar actionButtonsConfig={[{ icon: 'wpp-icon-add' }]}></wpp-floating-toolbar>,
      })

      expect(page.rootInstance._actionButtonsConfig.length).toEqual(1)
    })

    it('should render WppFloatingToolbar with default horizontal orientation', async () => {
      const page = await newSpecPage({
        components: [WppFloatingToolbar],
        template: () => (
          <wpp-floating-toolbar actionButtonsConfig={actionButtonsWithTwoBtnConfig}></wpp-floating-toolbar>
        ),
      })

      expect(page.rootInstance.orientation).toEqual('horizontal')
    })

    it('should render WppFloatingToolbar with passed vertical orientation', async () => {
      const page = await newSpecPage({
        components: [WppFloatingToolbar],
        template: () => (
          <wpp-floating-toolbar
            actionButtonsConfig={actionButtonsWithTwoBtnConfig}
            orientation="vertical"
          ></wpp-floating-toolbar>
        ),
      })

      expect(page.rootInstance.orientation).toEqual('vertical')
    })

    it('should update number of action buttons', async () => {
      const page = await newSpecPage({
        components: [WppFloatingToolbar],
        template: () => (
          <wpp-floating-toolbar actionButtonsConfig={actionButtonsWithTwoBtnConfig}></wpp-floating-toolbar>
        ),
      })

      expect(page.rootInstance._actionButtonsConfig.length).toEqual(actionButtonsWithTwoBtnConfig.length)
      page.rootInstance.actionButtonsConfig = actionButtonsWithTenBtnConfig
      await page.waitForChanges()
      expect(page.rootInstance._actionButtonsConfig.length).toEqual(7)
    })

    describe('accessibility tests', () => {
      // setFocus() uses setTimeout(0); make sure to wait a microtask
      const settle = async (waitForChanges: () => Promise<void>) => {
        await waitForChanges()
        await new Promise(r => setTimeout(r, 0))
        await waitForChanges()
      }

      let originalTransformToVersionedTag: jest.SpyInstance<string, string[]>

      beforeEach(() => {
        originalTransformToVersionedTag = jest
          .spyOn(utils, 'transformToVersionedTag')
          .mockImplementation((tag: string) => tag)
      })

      afterEach(() => {
        originalTransformToVersionedTag.mockRestore()
      })

      it('should have role="toolbar", aria-label and aria-labeledby when it passed in ariaProps property', async () => {
        const { root } = await newSpecPage({
          components: [WppFloatingToolbar],
          template: () => (
            <wpp-floating-toolbar
              actionButtonsConfig={actionButtonsWithTwoBtnConfig}
              ariaProps={{
                role: 'toolbar',
                label: 'test',
                labelledby: 'test',
              }}
            />
          ),
        })

        expect(root?.getAttribute('role')).toBe('toolbar')
        expect(root?.getAttribute('aria-label')).toBe('test')
        expect(root?.getAttribute('aria-labelledby')).toBe('test')
      })

      it('should navigate with keyboard', async () => {
        const { root, waitForChanges } = await newSpecPage({
          components: [WppFloatingToolbar, WppActionButton],
          template: () => <wpp-floating-toolbar actionButtonsConfig={actionButtonsWithThreeBtnConfig} />,
        })

        const buttons = root!.shadowRoot!.querySelectorAll(
          'wpp-action-button',
        ) as NodeListOf<HTMLWppActionButtonElement>

        expect(buttons.length).toBe(3)
        await settle(waitForChanges)

        const b0 = buttons[0].shadowRoot!.querySelector('button') as HTMLButtonElement
        const b1 = buttons[1].shadowRoot!.querySelector('button') as HTMLButtonElement
        const b2 = buttons[2].shadowRoot!.querySelector('button') as HTMLButtonElement

        expect(b0.getAttribute('tabindex')).toBe('0')
        expect(b1.getAttribute('tabindex')).toBe('-1')
        expect(b2.getAttribute('tabindex')).toBe('-1')

        // Put focus on the first item so onKeyDown can compute ndx via composedPath
        await buttons[0].focus()
        await buttons[0].setFocus()
        await settle(waitForChanges)

        // ArrowRight => move 0 -> 1
        root!.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }))
        await settle(waitForChanges)

        expect(b0.getAttribute('tabindex')).toBe('-1')
        expect(b1.getAttribute('tabindex')).toBe('0')
        expect(b2.getAttribute('tabindex')).toBe('-1')
      })
    })
  })
})
