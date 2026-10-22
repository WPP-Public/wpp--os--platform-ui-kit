import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppFloatingToolbar } from '../wpp-floating-toolbar';
import { WppActionButton } from '../../wpp-action-button/wpp-action-button';
import * as utils from '../../../utils/utils';
import * as themeUtils from '../../../utils/subscribe-to-theme';
describe('wpp-floating-toolbar', () => {
  const actionButtonsWithTwoBtnConfig = [
    {
      icon: 'wpp-icon-add',
    },
    {
      icon: 'wpp-icon-add',
    },
  ];
  const actionButtonsWithThreeBtnConfig = [
    {
      icon: 'wpp-icon-add',
    },
    {
      icon: 'wpp-icon-add',
    },
    {
      icon: 'wpp-icon-add',
    },
  ];
  const actionButtonsWithTenBtnConfig = [
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
  ];
  const actionButtonsWithIDs = [
    {
      icon: 'wpp-icon-add',
      id: 'item-1',
    },
    {
      icon: 'wpp-icon-add',
      id: 'item-2',
    },
  ];
  describe('snapshots', () => {
    it('should render WppFloatingToolbar with 2 action buttons', async () => {
      const page = await newSpecPage({
        components: [WppFloatingToolbar],
        template: () => (h("wpp-floating-toolbar-v4-6-0", { actionButtonsConfig: actionButtonsWithTwoBtnConfig })),
      });
      expect(page.root).toMatchSnapshot();
    });
    it('should render WppFloatingToolbar with 7 action buttons', async () => {
      const page = await newSpecPage({
        components: [WppFloatingToolbar],
        template: () => (h("wpp-floating-toolbar-v4-6-0", { actionButtonsConfig: actionButtonsWithTenBtnConfig })),
      });
      expect(page.root).toMatchSnapshot();
    });
  });
  describe('unit tests', () => {
    it('should render WppFloatingToolbar with 2 action buttons', async () => {
      const page = await newSpecPage({
        components: [WppFloatingToolbar],
        template: () => (h("wpp-floating-toolbar-v4-6-0", { actionButtonsConfig: actionButtonsWithTwoBtnConfig })),
      });
      expect(page.rootInstance._actionButtonsConfig.length).toEqual(actionButtonsWithTwoBtnConfig.length);
    });
    it('should render WppFloatingToolbar with 7 action buttons with passed 10 items', async () => {
      const page = await newSpecPage({
        components: [WppFloatingToolbar],
        template: () => (h("wpp-floating-toolbar-v4-6-0", { actionButtonsConfig: actionButtonsWithTenBtnConfig })),
      });
      expect(page.rootInstance._actionButtonsConfig.length).toEqual(7);
    });
    it('should render WppFloatingToolbar with 1 action button', async () => {
      const page = await newSpecPage({
        components: [WppFloatingToolbar],
        template: () => h("wpp-floating-toolbar-v4-6-0", { actionButtonsConfig: [{ icon: 'wpp-icon-add' }] }),
      });
      expect(page.rootInstance._actionButtonsConfig.length).toEqual(1);
    });
    it('should render WppFloatingToolbar with default horizontal orientation', async () => {
      const page = await newSpecPage({
        components: [WppFloatingToolbar],
        template: () => (h("wpp-floating-toolbar-v4-6-0", { actionButtonsConfig: actionButtonsWithTwoBtnConfig })),
      });
      expect(page.rootInstance.orientation).toEqual('horizontal');
    });
    it('should render WppFloatingToolbar with passed vertical orientation', async () => {
      const page = await newSpecPage({
        components: [WppFloatingToolbar],
        template: () => (h("wpp-floating-toolbar-v4-6-0", { actionButtonsConfig: actionButtonsWithTwoBtnConfig, orientation: "vertical" })),
      });
      expect(page.rootInstance.orientation).toEqual('vertical');
    });
    it('should update number of action buttons', async () => {
      const page = await newSpecPage({
        components: [WppFloatingToolbar],
        template: () => (h("wpp-floating-toolbar-v4-6-0", { actionButtonsConfig: actionButtonsWithTwoBtnConfig })),
      });
      expect(page.rootInstance._actionButtonsConfig.length).toEqual(actionButtonsWithTwoBtnConfig.length);
      page.rootInstance.actionButtonsConfig = actionButtonsWithTenBtnConfig;
      await page.waitForChanges();
      expect(page.rootInstance._actionButtonsConfig.length).toEqual(7);
    });
    describe('accessibility tests', () => {
      // setFocus() uses setTimeout(0); make sure to wait a microtask
      const settle = async (waitForChanges) => {
        await waitForChanges();
        await new Promise(r => setTimeout(r, 0));
        await waitForChanges();
      };
      let originalTransformToVersionedTag;
      beforeEach(() => {
        originalTransformToVersionedTag = jest
          .spyOn(utils, 'transformToVersionedTag')
          .mockImplementation((tag) => tag);
      });
      afterEach(() => {
        originalTransformToVersionedTag.mockRestore();
      });
      it('should have role="toolbar", aria-label and aria-labeledby when it passed in ariaProps property', async () => {
        const { root } = await newSpecPage({
          components: [WppFloatingToolbar],
          template: () => (h("wpp-floating-toolbar-v4-6-0", { actionButtonsConfig: actionButtonsWithTwoBtnConfig, ariaProps: {
              role: 'toolbar',
              label: 'test',
              labelledby: 'test',
            } })),
        });
        expect(root?.getAttribute('role')).toBe('toolbar');
        expect(root?.getAttribute('aria-label')).toBe('test');
        expect(root?.getAttribute('aria-labelledby')).toBe('test');
      });
      it('should navigate with keyboard', async () => {
        const { root, waitForChanges } = await newSpecPage({
          components: [WppFloatingToolbar, WppActionButton],
          template: () => h("wpp-floating-toolbar-v4-6-0", { actionButtonsConfig: actionButtonsWithThreeBtnConfig }),
        });
        const buttons = root.shadowRoot.querySelectorAll('wpp-action-button');
        expect(buttons.length).toBe(3);
        await settle(waitForChanges);
        const b0 = buttons[0].shadowRoot.querySelector('button');
        const b1 = buttons[1].shadowRoot.querySelector('button');
        const b2 = buttons[2].shadowRoot.querySelector('button');
        expect(b0.getAttribute('tabindex')).toBe('0');
        expect(b1.getAttribute('tabindex')).toBe('-1');
        expect(b2.getAttribute('tabindex')).toBe('-1');
        // Put focus on the first item so onKeyDown can compute ndx via composedPath
        await buttons[0].focus();
        await buttons[0].setFocus();
        await settle(waitForChanges);
        // ArrowRight => move 0 -> 1
        root.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
        await settle(waitForChanges);
        expect(b0.getAttribute('tabindex')).toBe('-1');
        expect(b1.getAttribute('tabindex')).toBe('0');
        expect(b2.getAttribute('tabindex')).toBe('-1');
      });
      describe('config updates', () => {
        const actionButtons = (root) => Array.from(root.shadowRoot.querySelectorAll('wpp-action-button'));
        const tabIndexes = (root) => actionButtons(root).map(button => button.shadowRoot.querySelector('button').getAttribute('tabindex'));
        // Icon-only on purpose: these cover the roving tab stop, which predates text actions.
        const threeActions = () => [
          { icon: 'wpp-icon-remove', id: 'zoom-out', ariaProps: { label: 'Zoom out' } },
          { icon: 'wpp-icon-search', id: 'zoom-level', ariaProps: { label: 'Reset view' } },
          { icon: 'wpp-icon-add', id: 'zoom-in', ariaProps: { label: 'Zoom in' } },
        ];
        // End moves the tab stop to the last action without relying on activeElement, which the
        // mock DOM never updates.
        const focusThirdAction = async (root, waitForChanges) => {
          root.dispatchEvent(new KeyboardEvent('keydown', { key: 'End' }));
          await settle(waitForChanges);
        };
        it('should keep the tab stop on the same action when the config is replaced', async () => {
          const { root, waitForChanges } = await newSpecPage({
            components: [WppFloatingToolbar, WppActionButton],
            template: () => h("wpp-floating-toolbar-v4-6-0", { actionButtonsConfig: threeActions() }),
          });
          await settle(waitForChanges);
          await focusThirdAction(root, waitForChanges);
          expect(tabIndexes(root)).toEqual(['-1', '-1', '0']);
          root.actionButtonsConfig = threeActions();
          await settle(waitForChanges);
          expect(tabIndexes(root)).toEqual(['-1', '-1', '0']);
        });
        it('should keep exactly one tab stop when the new config has fresh ariaProps objects', async () => {
          const { root, waitForChanges } = await newSpecPage({
            components: [WppFloatingToolbar, WppActionButton],
            template: () => h("wpp-floating-toolbar-v4-6-0", { actionButtonsConfig: threeActions() }),
          });
          await settle(waitForChanges);
          root.actionButtonsConfig = threeActions().map(item => ({ ...item, ariaProps: { ...item.ariaProps } }));
          await settle(waitForChanges);
          expect(tabIndexes(root)).toEqual(['0', '-1', '-1']);
        });
        it('should give an added action a tabindex of -1', async () => {
          const { root, waitForChanges } = await newSpecPage({
            components: [WppFloatingToolbar, WppActionButton],
            template: () => h("wpp-floating-toolbar-v4-6-0", { actionButtonsConfig: threeActions().slice(0, 2) }),
          });
          await settle(waitForChanges);
          root.actionButtonsConfig = threeActions();
          await settle(waitForChanges);
          expect(tabIndexes(root)).toEqual(['0', '-1', '-1']);
        });
        it('should move focus to the previous enabled action when the focused action becomes disabled', async () => {
          const { root, waitForChanges } = await newSpecPage({
            components: [WppFloatingToolbar, WppActionButton],
            template: () => h("wpp-floating-toolbar-v4-6-0", { actionButtonsConfig: threeActions() }),
          });
          await settle(waitForChanges);
          await focusThirdAction(root, waitForChanges);
          // A browser reports the focused action as the shadow root's activeElement; the mock DOM doesn't.
          Object.defineProperty(root.shadowRoot, 'activeElement', {
            configurable: true,
            get: () => actionButtons(root)[2],
          });
          root.actionButtonsConfig = threeActions().map(item => item.id === 'zoom-in' ? { ...item, disabled: true } : item);
          await settle(waitForChanges);
          // setFocus() marks the native button with the keyboard focus ring class
          const rescued = actionButtons(root)[1].shadowRoot.querySelector('button');
          expect(rescued.classList.contains('tab-focus')).toBe(true);
          expect(tabIndexes(root)).toEqual(['-1', '0', '-1']);
        });
        it('moves focus without the keyboard ring when the action was disabled by a pointer press', async () => {
          const { root, waitForChanges } = await newSpecPage({
            components: [WppFloatingToolbar, WppActionButton],
            template: () => h("wpp-floating-toolbar-v4-6-0", { actionButtonsConfig: threeActions() }),
          });
          await settle(waitForChanges);
          await focusThirdAction(root, waitForChanges);
          Object.defineProperty(root.shadowRoot, 'activeElement', {
            configurable: true,
            get: () => actionButtons(root)[2],
          });
          // A browser bubbles the press out of the shadow root to the toolbar host; the mock DOM doesn't
          root.dispatchEvent(new Event('pointerdown'));
          root.actionButtonsConfig = threeActions().map(item => item.id === 'zoom-in' ? { ...item, disabled: true } : item);
          await settle(waitForChanges);
          const rescued = actionButtons(root)[1].shadowRoot.querySelector('button');
          expect(rescued.classList.contains('tab-focus')).toBe(false);
          expect(tabIndexes(root)).toEqual(['-1', '0', '-1']);
        });
      });
      describe('text actions', () => {
        it('should render a text action with its label as visible text and no icon', async () => {
          const { root } = await newSpecPage({
            components: [WppFloatingToolbar, WppActionButton],
            template: () => (h("wpp-floating-toolbar-v4-6-0", { actionButtonsConfig: [{ label: '100%', ariaProps: { label: '100%, reset view' } }] })),
          });
          const button = root.shadowRoot.querySelector('wpp-action-button');
          expect(button.textContent).toBe('100%');
          expect(button.querySelector('[slot="icon-start"]')).toBeNull();
          expect(button.hasAttribute('label')).toBe(false);
        });
        it('should render an icon and a label together', async () => {
          const { root } = await newSpecPage({
            components: [WppFloatingToolbar, WppActionButton],
            template: () => h("wpp-floating-toolbar-v4-6-0", { actionButtonsConfig: [{ icon: 'wpp-icon-add', label: 'Add' }] }),
          });
          const button = root.shadowRoot.querySelector('wpp-action-button');
          expect(button.textContent).toBe('Add');
          expect(button.querySelector('wpp-icon-add[slot="icon-start"]')).not.toBeNull();
        });
        it('should reach every action with ArrowRight when labels repeat and icons are shared', async () => {
          const { root, waitForChanges } = await newSpecPage({
            components: [WppFloatingToolbar, WppActionButton],
            template: () => (h("wpp-floating-toolbar-v4-6-0", { actionButtonsConfig: [
                { label: 'Same' },
                { label: 'Same' },
                { icon: 'wpp-icon-add' },
                { icon: 'wpp-icon-add' },
              ] })),
          });
          const buttons = Array.from(root.shadowRoot.querySelectorAll('wpp-action-button'));
          const tabStop = () => buttons.find(button => button.shadowRoot.querySelector('button').tabIndex === 0);
          expect(buttons.length).toBe(4);
          await settle(waitForChanges);
          // In a browser, focus follows setFocus() to the tab stop; the mock DOM never updates activeElement
          Object.defineProperty(root.shadowRoot, 'activeElement', { configurable: true, get: tabStop });
          const visited = [root.shadowRoot.activeElement];
          for (let step = 0; step < 3; step++) {
            root.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
            await settle(waitForChanges);
            visited.push(root.shadowRoot.activeElement);
          }
          expect(visited).toEqual(buttons);
        });
        it('should skip an item that has neither an icon nor a label and log an error', async () => {
          const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
          const { root } = await newSpecPage({
            components: [WppFloatingToolbar, WppActionButton],
            template: () => (
            // @ts-expect-error an item needs an icon or a label; this checks the runtime guard
            h("wpp-floating-toolbar-v4-6-0", { actionButtonsConfig: [{ id: 'empty' }, { icon: 'wpp-icon-add' }] })),
          });
          expect(root.shadowRoot.querySelectorAll('wpp-action-button').length).toBe(1);
          expect(consoleError).toHaveBeenCalledWith('Each action button needs an icon, a label, or both.');
          consoleError.mockRestore();
        });
      });
    });
    describe('Testing handleBtnClick function', () => {
      it('Testing that this.selectedIdentifier is undefined when component not selectable', async () => {
        const page = await newSpecPage({
          components: [WppFloatingToolbar],
          template: () => (h("wpp-floating-toolbar-v4-6-0", { actionButtonsConfig: actionButtonsWithTwoBtnConfig })),
        });
        const btnEl = page.root?.shadowRoot?.querySelector('wpp-action-button');
        expect(btnEl).toBeTruthy();
        btnEl?.dispatchEvent(new MouseEvent('click'));
        await page.waitForChanges();
        expect(page.rootInstance.selectedIdentifier).toBeUndefined();
      });
      it('Testing that this.selectedIdentifier is set when component is selectable', async () => {
        const page = await newSpecPage({
          components: [WppFloatingToolbar],
          template: () => (h("wpp-floating-toolbar-v4-6-0", { selectable: true, actionButtonsConfig: actionButtonsWithTwoBtnConfig })),
        });
        const btnEl = page.root?.shadowRoot?.querySelector('wpp-action-button');
        expect(btnEl).toBeTruthy();
        btnEl?.dispatchEvent(new MouseEvent('click'));
        await page.waitForChanges();
        expect(page.rootInstance.selectedIdentifier).toEqual(0);
      });
      it('Testing that onClick is called when defined on btn config and this.selectedIdentifier is set correctly', async () => {
        const onClickBtn = jest.fn();
        const btnData = {
          icon: 'wpp-icon-remove',
          id: 'item-remove',
          onClick: onClickBtn,
        };
        const page = await newSpecPage({
          components: [WppFloatingToolbar],
          template: () => (h("wpp-floating-toolbar-v4-6-0", { selectable: true, actionButtonsConfig: [...actionButtonsWithTwoBtnConfig, btnData] })),
        });
        const btnEl = page.root?.shadowRoot?.querySelector('wpp-action-button[id="item-remove"]');
        expect(btnEl).toBeTruthy();
        btnEl?.dispatchEvent(new MouseEvent('click'));
        await page.waitForChanges();
        expect(page.rootInstance.hasIdProp).toBeFalsy();
        expect(page.rootInstance.selectedIdentifier).toEqual(2);
        expect(onClickBtn).toHaveBeenCalledTimes(1);
      });
      it('Testing that this.selectedIdentifier will hold the value of the id when actionsButtonsConfig have items with this attribute', async () => {
        const page = await newSpecPage({
          components: [WppFloatingToolbar],
          template: () => (h("wpp-floating-toolbar-v4-6-0", { selectable: true, actionButtonsConfig: actionButtonsWithIDs })),
        });
        const btnEl = page.root?.shadowRoot?.querySelector('wpp-action-button');
        expect(btnEl).toBeTruthy();
        btnEl?.dispatchEvent(new MouseEvent('click'));
        await page.waitForChanges();
        expect(page.rootInstance.hasIdProp).toBeTruthy();
        expect(page.rootInstance.selectedIdentifier).toEqual('item-1');
      });
    });
  });
  describe('subscribing to theme changes', () => {
    let mockStart;
    let mockStop;
    beforeEach(() => {
      mockStart = jest.fn();
      mockStop = jest.fn();
      jest.spyOn(themeUtils, 'themeSubscriptionController').mockReturnValue({
        start: mockStart,
        stop: mockStop,
      });
    });
    afterEach(() => {
      jest.restoreAllMocks();
    });
    it('Test the component subscribes when it connects (connectedCallback & componentDidLoad)', async () => {
      await newSpecPage({
        components: [WppFloatingToolbar],
        template: () => (h("wpp-floating-toolbar-v4-6-0", { actionButtonsConfig: actionButtonsWithTwoBtnConfig })),
      });
      expect(mockStart).toHaveBeenCalledTimes(1);
    });
    it('should unsubscribe from theme when component disconnects (disconnectedCallback)', async () => {
      const page = await newSpecPage({
        components: [WppFloatingToolbar],
        template: () => (h("wpp-floating-toolbar-v4-6-0", { actionButtonsConfig: actionButtonsWithTwoBtnConfig })),
      });
      page.root?.remove();
      expect(mockStop).toHaveBeenCalledTimes(1);
    });
  });
});
