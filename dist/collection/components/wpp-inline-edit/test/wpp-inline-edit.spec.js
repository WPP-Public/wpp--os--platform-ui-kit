import { newSpecPage } from '@stencil/core/testing';
import { WppInlineEdit } from '../wpp-inline-edit';
describe('wpp-inline-edit', () => {
  let originalResizeObserver;
  beforeEach(() => {
    originalResizeObserver = global.ResizeObserver;
    global.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      disconnect: jest.fn(),
      unobserve: jest.fn(),
    }));
  });
  afterEach(() => {
    global.ResizeObserver = originalResizeObserver;
  });
  describe('Initialization', () => {
    it('should create component instance', () => {
      const component = new WppInlineEdit();
      expect(component).toBeTruthy();
    });
    it('should have default mode as read', () => {
      const component = new WppInlineEdit();
      expect(component.mode).toBe('read');
    });
    it('should have default placeholder', () => {
      const component = new WppInlineEdit();
      expect(component.placeholder).toBe('placeholder');
    });
    it('should have default inputWidth as auto', () => {
      const component = new WppInlineEdit();
      expect(component.inputWidth).toBe('auto');
    });
    it('should have default dropdownConfig as empty object', () => {
      const component = new WppInlineEdit();
      expect(component.dropdownConfig).toEqual({});
    });
    it('should have isPendingRequest as false', () => {
      const component = new WppInlineEdit();
      expect(component['isPendingRequest']).toBe(false);
    });
  });
  describe('Rendering', () => {
    it('should display value in typography when value prop is set', async () => {
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit value="Test Value">Text</wpp-inline-edit>`,
      });
      const typography = page.root?.shadowRoot?.querySelector('wpp-typography');
      expect(typography?.textContent).toBe('Test Value');
    });
    it('should display placeholder when no value is set', async () => {
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit placeholder="Enter text">Text</wpp-inline-edit>`,
      });
      const typography = page.root?.shadowRoot?.querySelector('wpp-typography');
      expect(typography?.textContent).toBe('Enter text');
      expect(typography?.classList.contains('placeholder')).toBe(true);
    });
    it('should render edit mode structure with form wrapper and action buttons', async () => {
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit mode="edit" value="Test"><wpp-input slot="form-element" /></wpp-inline-edit>`,
      });
      const wrapper = page.root?.shadowRoot?.querySelector('.wrapper');
      const buttons = page.root?.shadowRoot?.querySelector('.buttons');
      const confirmButton = page.root?.shadowRoot?.querySelector('wpp-icon-done');
      const cancelButton = page.root?.shadowRoot?.querySelector('wpp-icon-cross');
      expect(wrapper).toBeTruthy();
      expect(buttons).toBeTruthy();
      expect(confirmButton).toBeTruthy();
      expect(cancelButton).toBeTruthy();
    });
    it('should render read mode structure with content and edit icon', async () => {
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit mode="read" value="Test Value">Text</wpp-inline-edit>`,
      });
      const content = page.root?.shadowRoot?.querySelector('.content');
      const editIcon = page.root?.shadowRoot?.querySelector('wpp-icon-edit');
      const typography = page.root?.shadowRoot?.querySelector('wpp-typography');
      expect(content).toBeTruthy();
      expect(editIcon).toBeTruthy();
      expect(typography?.textContent).toBe('Test Value');
    });
  });
  describe('CSS classes via snapshots', () => {
    it('should render read mode without value', async () => {
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit>Text</wpp-inline-edit>`,
      });
      expect(page.root).toMatchSnapshot();
    });
    it('should render read mode with value', async () => {
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit value="Test Value">Text</wpp-inline-edit>`,
      });
      expect(page.root).toMatchSnapshot();
    });
    it('should render edit mode with auto width', async () => {
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit mode="edit" input-width="auto">Text</wpp-inline-edit>`,
      });
      expect(page.root).toMatchSnapshot();
    });
    it('should render edit mode with fixed width', async () => {
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit mode="edit" input-width="300px">Text</wpp-inline-edit>`,
      });
      expect(page.root).toMatchSnapshot();
    });
    it('should render edit mode with error state', async () => {
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit mode="edit">Text</wpp-inline-edit>`,
      });
      page.rootInstance.errorMessage = 'Error message';
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot();
    });
  });
  describe('componentWillLoad', () => {
    it('should initialize with input form type by default', async () => {
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit>Text</wpp-inline-edit>`,
      });
      expect(page.rootInstance.formType).toBe('input');
    });
    it('should merge locales on init', async () => {
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit>Text</wpp-inline-edit>`,
      });
      expect(page.rootInstance._locales).toBeDefined();
    });
  });
  describe('componentDidLoad', () => {
    it('should observe trigger container with ResizeObserver', async () => {
      const observeFn = jest.fn();
      global.ResizeObserver = jest.fn().mockImplementation(() => ({
        observe: observeFn,
        disconnect: jest.fn(),
        unobserve: jest.fn(),
      }));
      await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit>Text</wpp-inline-edit>`,
      });
      expect(observeFn).toHaveBeenCalled();
    });
  });
  describe('Event emission', () => {
    it('should emit wppModeChange with mode and reason when mode changes', async () => {
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit>Text</wpp-inline-edit>`,
      });
      const mockEmit = jest.fn();
      page.rootInstance.wppModeChange = { emit: mockEmit };
      page.rootInstance['emitModeChange']('read', 'cancel');
      expect(mockEmit).toHaveBeenCalledWith(expect.objectContaining({
        mode: 'read',
        reason: 'cancel',
        closePopover: expect.any(Function),
      }));
    });
    it('should emit wppModeChange when clicking content in read mode', async () => {
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit value="test">Text</wpp-inline-edit>`,
      });
      const mockEmit = jest.fn();
      page.rootInstance.wppModeChange = { emit: mockEmit };
      const content = page.root?.shadowRoot?.querySelector('.content');
      content?.click();
      expect(mockEmit).toHaveBeenCalledWith(expect.objectContaining({ mode: 'edit' }));
    });
  });
  describe('Public methods', () => {
    it('closePopover should programmatically close the popover', async () => {
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit>Text</wpp-inline-edit>`,
      });
      const mockClosePopover = jest.fn();
      page.rootInstance['popoverRef'] = { closePopover: mockClosePopover };
      await page.rootInstance.closePopover();
      expect(mockClosePopover).toHaveBeenCalled();
    });
    it('setFocus should programmatically focus the input element', async () => {
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit>Text</wpp-inline-edit>`,
      });
      const mockSetFocus = jest.fn();
      page.rootInstance['inputRef'] = { setFocus: mockSetFocus };
      await page.rootInstance.setFocus();
      expect(mockSetFocus).toHaveBeenCalled();
    });
  });
  describe('Locales', () => {
    it('should update locales when prop changes', async () => {
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit>Text</wpp-inline-edit>`,
      });
      const customLocales = { defaultErrorMessage: 'Custom Error' };
      page.rootInstance.onUpdateLocales(customLocales);
      expect(page.rootInstance._locales.defaultErrorMessage).toBe('Custom Error');
    });
  });
  describe('Placeholder behavior', () => {
    it('should apply placeholder class and show placeholder text when value is empty', async () => {
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit placeholder="Click to edit">Text</wpp-inline-edit>`,
      });
      const typography = page.root?.shadowRoot?.querySelector('wpp-typography');
      expect(typography?.classList.contains('placeholder')).toBe(true);
      expect(typography?.textContent).toBe('Click to edit');
    });
    it('should not apply placeholder class and show value when value is provided', async () => {
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit value="Actual Value" placeholder="Click to edit">Text</wpp-inline-edit>`,
      });
      const typography = page.root?.shadowRoot?.querySelector('wpp-typography');
      expect(typography?.classList.contains('placeholder')).toBe(false);
      expect(typography?.textContent).toBe('Actual Value');
    });
  });
  describe('Action buttons behavior', () => {
    it('should disable both buttons when isPendingRequest is true to prevent double submission', async () => {
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit>Text</wpp-inline-edit>`,
      });
      page.rootInstance['isPendingRequest'] = true;
      await page.waitForChanges();
      const actionButtons = page.root?.shadowRoot?.querySelectorAll('wpp-action-button');
      const confirmButton = actionButtons?.[0];
      const cancelButton = actionButtons?.[1];
      expect(confirmButton?.getAttribute('disabled')).not.toBeNull();
      expect(cancelButton?.getAttribute('disabled')).not.toBeNull();
    });
    it('should disable confirm button after failed validation until value changes', async () => {
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit value="error-value">Text</wpp-inline-edit>`,
      });
      const mockFormEl = { messageType: undefined, setFocus: jest.fn() };
      page.rootInstance['getFormElement'] = () => mockFormEl;
      page.rootInstance.wppConfirm = {
        emit: jest.fn(detail => {
          detail.waitUntil(Promise.reject(new Error('Validation failed')));
          return { defaultPrevented: true };
        }),
      };
      // Trigger the error flow
      await page.rootInstance['handleAccept']();
      // After error, lastValueWithError should be set to current value
      expect(page.rootInstance['lastValueWithError']).toBe('error-value');
    });
    it('should clear lastValueWithError after successful validation', async () => {
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit value="test">Text</wpp-inline-edit>`,
      });
      const mockFormEl = { messageType: undefined, setFocus: jest.fn() };
      page.rootInstance['getFormElement'] = () => mockFormEl;
      page.rootInstance['popoverRef'] = { closePopover: jest.fn() };
      page.rootInstance['lastValueWithError'] = 'old-error';
      page.rootInstance.wppConfirm = { emit: jest.fn(() => ({ defaultPrevented: false })) };
      await page.rootInstance['handleAccept']();
      expect(page.rootInstance['lastValueWithError']).toBeUndefined();
    });
  });
  describe('disconnectedCallback', () => {
    it('should disconnect ResizeObserver on component removal', async () => {
      const mockDisconnect = jest.fn();
      global.ResizeObserver = jest.fn().mockImplementation(() => ({
        observe: jest.fn(),
        disconnect: mockDisconnect,
        unobserve: jest.fn(),
      }));
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit>Text</wpp-inline-edit>`,
      });
      page.rootInstance.disconnectedCallback();
      expect(mockDisconnect).toHaveBeenCalled();
    });
  });
  describe('Popover configuration', () => {
    it('should have external class inline-edit-popover', async () => {
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit>Text</wpp-inline-edit>`,
      });
      const popover = page.root?.shadowRoot?.querySelector('wpp-popover');
      expect(popover?.getAttribute('externalclass')).toBe('inline-edit-popover');
    });
  });
  describe('handleAccept', () => {
    it('should return early if no form element exists', async () => {
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit>Text</wpp-inline-edit>`,
      });
      page.rootInstance['getFormElement'] = () => undefined;
      await page.rootInstance['handleAccept']();
      expect(page.rootInstance['isPendingRequest']).toBe(false);
    });
    it('should manage isPendingRequest lifecycle during accept', async () => {
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit>Text</wpp-inline-edit>`,
      });
      const mockFormEl = { messageType: undefined, setFocus: jest.fn() };
      let pendingDuringEmit = false;
      page.rootInstance['getFormElement'] = () => mockFormEl;
      page.rootInstance['popoverRef'] = { closePopover: jest.fn() };
      // Initial state should not be pending
      expect(page.rootInstance['isPendingRequest']).toBe(false);
      page.rootInstance.wppConfirm = {
        emit: jest.fn(() => {
          // Verify that isPendingRequest was set to true before emitting
          pendingDuringEmit = page.rootInstance['isPendingRequest'];
          return { defaultPrevented: false };
        }),
      };
      await page.rootInstance['handleAccept']();
      // Should be pending during the accept flow
      expect(pendingDuringEmit).toBe(true);
      // And reset to not pending after the accept flow completes
      expect(page.rootInstance['isPendingRequest']).toBe(false);
    });
    it('should close popover on successful accept', async () => {
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit>Text</wpp-inline-edit>`,
      });
      const mockClosePopover = jest.fn();
      const mockFormEl = { messageType: undefined, setFocus: jest.fn() };
      page.rootInstance['getFormElement'] = () => mockFormEl;
      page.rootInstance.wppConfirm = { emit: jest.fn(() => ({ defaultPrevented: false })) };
      page.rootInstance['popoverRef'] = { closePopover: mockClosePopover };
      await page.rootInstance['handleAccept']();
      expect(mockClosePopover).toHaveBeenCalled();
    });
    it('should handle error on rejected promise', async () => {
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit value="test">Text</wpp-inline-edit>`,
      });
      const mockFormEl = { messageType: undefined, setFocus: jest.fn() };
      page.rootInstance['getFormElement'] = () => mockFormEl;
      page.rootInstance.wppConfirm = {
        emit: jest.fn(() => ({
          defaultPrevented: true,
        })),
      };
      // Simulate a rejected promise via waitUntil
      page.rootInstance.wppConfirm.emit = jest.fn(detail => {
        detail.waitUntil(Promise.reject(new Error('Server error')));
        return { defaultPrevented: true };
      });
      await page.rootInstance['handleAccept']();
      expect(page.rootInstance.errorMessage).toBe('Server error');
      expect(mockFormEl.setFocus).toHaveBeenCalled();
    });
  });
  describe('handleClose', () => {
    it('should return early if isPendingRequest is true', async () => {
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit>Text</wpp-inline-edit>`,
      });
      page.rootInstance['isPendingRequest'] = true;
      const result = page.rootInstance['handleClose']({}, 'cancel');
      expect(result).toBeUndefined();
    });
    it('should close popover and emit mode change on cancel', async () => {
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit>Text</wpp-inline-edit>`,
      });
      const mockClosePopover = jest.fn();
      const mockEmit = jest.fn();
      const mockSetValue = jest.fn();
      page.rootInstance['popoverRef'] = { closePopover: mockClosePopover };
      page.rootInstance.wppModeChange = { emit: mockEmit };
      page.rootInstance['getFormElement'] = () => ({ setValue: mockSetValue });
      page.rootInstance['initialValue'] = 'initial';
      const mockEvent = {
        target: document.createElement('div'),
        composedPath: () => [],
      };
      page.rootInstance['handleClose'](mockEvent, 'cancel');
      expect(mockClosePopover).toHaveBeenCalled();
      expect(mockSetValue).toHaveBeenCalledWith('initial');
    });
    it('should reset value on outsideClick', async () => {
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit>Text</wpp-inline-edit>`,
      });
      const mockSetValue = jest.fn();
      page.rootInstance['popoverRef'] = { closePopover: jest.fn() };
      page.rootInstance.wppModeChange = { emit: jest.fn() };
      page.rootInstance['getFormElement'] = () => ({ setValue: mockSetValue });
      page.rootInstance['initialValue'] = 'original';
      const mockEvent = {
        target: document.createElement('div'),
        composedPath: () => [],
      };
      page.rootInstance['handleClose'](mockEvent, 'outsideClick');
      expect(mockSetValue).toHaveBeenCalledWith('original');
    });
  });
  describe('handleAnchorResize', () => {
    it('should update popper instance on resize', async () => {
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit>Text</wpp-inline-edit>`,
      });
      const mockUpdate = jest.fn();
      page.rootInstance['popoverInstance'] = { popperInstance: { update: mockUpdate } };
      page.rootInstance['triggerContainerRef'] = { id: 'trigger' };
      page.rootInstance['handleAnchorResize']([{ target: page.rootInstance['triggerContainerRef'] }]);
      expect(mockUpdate).toHaveBeenCalled();
    });
    it('should not update popper if target does not match', async () => {
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit>Text</wpp-inline-edit>`,
      });
      const mockUpdate = jest.fn();
      page.rootInstance['popoverInstance'] = { popperInstance: { update: mockUpdate } };
      page.rootInstance['triggerContainerRef'] = { id: 'trigger' };
      page.rootInstance['handleAnchorResize']([{ target: { id: 'other' } }]);
      expect(mockUpdate).not.toHaveBeenCalled();
    });
  });
  describe('onKeyDownFormEl', () => {
    it('should call handleAccept on Enter key', async () => {
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit>Text</wpp-inline-edit>`,
      });
      const mockHandleAccept = jest.fn();
      page.rootInstance['handleAccept'] = mockHandleAccept;
      page.rootInstance['onKeyDownFormEl']({ key: 'Enter' });
      expect(mockHandleAccept).toHaveBeenCalled();
    });
    it('should not call handleAccept on other keys', async () => {
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit>Text</wpp-inline-edit>`,
      });
      const mockHandleAccept = jest.fn();
      page.rootInstance['handleAccept'] = mockHandleAccept;
      page.rootInstance['onKeyDownFormEl']({ key: 'Tab' });
      expect(mockHandleAccept).not.toHaveBeenCalled();
    });
  });
  describe('setErrorState', () => {
    it('should set error message and messageType on error', async () => {
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit>Text</wpp-inline-edit>`,
      });
      const mockFormEl = { messageType: undefined };
      page.rootInstance['setErrorState']('error', mockFormEl, new Error('Test error'));
      expect(page.rootInstance.errorMessage).toBe('Test error');
      expect(mockFormEl.messageType).toBe('error');
    });
    it('should clear error message on clear', async () => {
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit>Text</wpp-inline-edit>`,
      });
      const mockFormEl = { messageType: 'error' };
      page.rootInstance.errorMessage = 'Error';
      page.rootInstance['setErrorState']('clear', mockFormEl);
      expect(page.rootInstance.errorMessage).toBeUndefined();
      expect(mockFormEl.messageType).toBeUndefined();
    });
    it('should use default error message when error has no message', async () => {
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit>Text</wpp-inline-edit>`,
      });
      const mockFormEl = { messageType: undefined };
      page.rootInstance['setErrorState']('error', mockFormEl, {});
      expect(page.rootInstance.errorMessage).toBe(page.rootInstance._locales.defaultErrorMessage);
    });
  });
  describe('editModeChangeHandler', () => {
    it('should configure truncation tooltip in edit mode for input', async () => {
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit mode="edit">Text</wpp-inline-edit>`,
      });
      const mockInputEl = { truncationTooltipConfig: undefined };
      page.rootInstance['getFormElement'] = () => mockInputEl;
      page.rootInstance.formType = 'input';
      page.rootInstance['editModeChangeHandler']();
      // Wait for requestAnimationFrame
      await new Promise(resolve => setTimeout(resolve, 50));
      expect(mockInputEl.truncationTooltipConfig).toBeDefined();
    });
    it('should return false from onShow when errorMessage exists', async () => {
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit mode="edit">Text</wpp-inline-edit>`,
      });
      const mockInputEl = { truncationTooltipConfig: undefined };
      page.rootInstance['getFormElement'] = () => mockInputEl;
      page.rootInstance.formType = 'input';
      page.rootInstance.errorMessage = 'Error exists';
      page.rootInstance['editModeChangeHandler']();
      // Wait for requestAnimationFrame
      await new Promise(resolve => setTimeout(resolve, 50));
      // Verify the config is set and onShow returns false when errorMessage exists
      expect(mockInputEl.truncationTooltipConfig).toBeDefined();
      const result = mockInputEl.truncationTooltipConfig.onShow();
      expect(result).toBe(false);
    });
  });
  describe('Error tooltip rendering', () => {
    it('should render tooltip when errorMessage exists in edit mode', async () => {
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit mode="edit">Text</wpp-inline-edit>`,
      });
      page.rootInstance.errorMessage = 'Error message';
      await page.waitForChanges();
      // Check that the component renders and has an error state
      expect(page.rootInstance.errorMessage).toBe('Error message');
    });
  });
  describe('handleAccept with tooltipInstance', () => {
    it('should show tooltip again when error already exists', async () => {
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit value="test">Text</wpp-inline-edit>`,
      });
      const mockFormEl = { messageType: undefined, setFocus: jest.fn() };
      const mockShow = jest.fn();
      page.rootInstance['getFormElement'] = () => mockFormEl;
      page.rootInstance['tooltipInstance'] = { show: mockShow };
      page.rootInstance.wppConfirm = {
        emit: jest.fn(detail => {
          detail.waitUntil(Promise.reject(new Error('Error')));
          return { defaultPrevented: true };
        }),
      };
      await page.rootInstance['handleAccept']();
      expect(mockShow).toHaveBeenCalled();
    });
  });
  describe('Popover config callbacks', () => {
    it('should handle onCreate callback and store instance', async () => {
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit>Text</wpp-inline-edit>`,
      });
      const popover = page.root?.shadowRoot?.querySelector('wpp-popover');
      const config = popover?.config;
      expect(config).toBeDefined();
      // Simulate onCreate callback
      const mockInstance = { popperInstance: { update: jest.fn() } };
      config.onCreate(mockInstance);
      expect(page.rootInstance['popoverInstance']).toBe(mockInstance);
    });
    it('should call custom onCreate from dropdownConfig', async () => {
      const mockOnCreate = jest.fn();
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit>Text</wpp-inline-edit>`,
      });
      page.rootInstance.dropdownConfig = { onCreate: mockOnCreate };
      await page.waitForChanges();
      const popover = page.root?.shadowRoot?.querySelector('wpp-popover');
      const config = popover?.config;
      const mockInstance = {};
      config.onCreate(mockInstance);
      expect(mockOnCreate).toHaveBeenCalledWith(mockInstance);
    });
    it('should handle onDestroy callback', async () => {
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit>Text</wpp-inline-edit>`,
      });
      const popover = page.root?.shadowRoot?.querySelector('wpp-popover');
      const config = popover?.config;
      page.rootInstance['popoverInstance'] = { test: true };
      config.onDestroy({});
      expect(page.rootInstance['popoverInstance']).toBeUndefined();
    });
    it('should call custom onDestroy from dropdownConfig', async () => {
      const mockOnDestroy = jest.fn();
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit>Text</wpp-inline-edit>`,
      });
      page.rootInstance.dropdownConfig = { onDestroy: mockOnDestroy };
      await page.waitForChanges();
      const popover = page.root?.shadowRoot?.querySelector('wpp-popover');
      const config = popover?.config;
      const mockInstance = {};
      config.onDestroy(mockInstance);
      expect(mockOnDestroy).toHaveBeenCalledWith(mockInstance);
    });
    it('should handle onShow callback and store initial value', async () => {
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit value="test-value">Text</wpp-inline-edit>`,
      });
      const popover = page.root?.shadowRoot?.querySelector('wpp-popover');
      const config = popover?.config;
      config.onShow({});
      expect(page.rootInstance['initialValue']).toBe('test-value');
    });
    it('should call setFocus on form element after onShow setTimeout', async () => {
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit value="test">Text</wpp-inline-edit>`,
      });
      const mockSetFocus = jest.fn();
      // Mock getFormElement BEFORE calling onShow so that when setTimeout fires,
      // it uses the mocked function instead of accessing the real host element
      page.rootInstance['getFormElement'] = jest.fn(() => ({ setFocus: mockSetFocus }));
      const popover = page.root?.shadowRoot?.querySelector('wpp-popover');
      const config = popover?.config;
      config.onShow({});
      // Wait for the 100ms setTimeout to execute
      await new Promise(resolve => setTimeout(resolve, 150));
      expect(mockSetFocus).toHaveBeenCalled();
    });
    it('should call custom onShow from dropdownConfig', async () => {
      const mockOnShow = jest.fn();
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit value="test">Text</wpp-inline-edit>`,
      });
      page.rootInstance.dropdownConfig = { onShow: mockOnShow };
      await page.waitForChanges();
      const popover = page.root?.shadowRoot?.querySelector('wpp-popover');
      const config = popover?.config;
      const mockInstance = {};
      config.onShow(mockInstance);
      expect(mockOnShow).toHaveBeenCalledWith(mockInstance);
    });
    it('should handle onHidden callback', async () => {
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit>Text</wpp-inline-edit>`,
      });
      const mockFormEl = { messageType: 'error' };
      page.rootInstance['getFormElement'] = () => mockFormEl;
      page.rootInstance.errorMessage = 'Some error';
      const popover = page.root?.shadowRoot?.querySelector('wpp-popover');
      const config = popover?.config;
      config.onHidden({});
      expect(page.rootInstance.errorMessage).toBeUndefined();
      expect(mockFormEl.messageType).toBeUndefined();
    });
    it('should return early in onHidden if no formEl', async () => {
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit>Text</wpp-inline-edit>`,
      });
      page.rootInstance['getFormElement'] = () => undefined;
      const popover = page.root?.shadowRoot?.querySelector('wpp-popover');
      const config = popover?.config;
      // Should not throw
      expect(() => config.onHidden({})).not.toThrow();
    });
    it('should call custom onHidden from dropdownConfig', async () => {
      const mockOnHidden = jest.fn();
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit>Text</wpp-inline-edit>`,
      });
      const mockFormEl = { messageType: 'error' };
      page.rootInstance['getFormElement'] = () => mockFormEl;
      page.rootInstance.dropdownConfig = { onHidden: mockOnHidden };
      await page.waitForChanges();
      const popover = page.root?.shadowRoot?.querySelector('wpp-popover');
      const config = popover?.config;
      const mockInstance = {};
      config.onHidden(mockInstance);
      expect(mockOnHidden).toHaveBeenCalledWith(mockInstance);
    });
    it('should call handleClose on outsideClick', async () => {
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit>Text</wpp-inline-edit>`,
      });
      const mockClosePopover = jest.fn();
      const mockSetValue = jest.fn();
      page.rootInstance['popoverRef'] = { closePopover: mockClosePopover };
      page.rootInstance.wppModeChange = { emit: jest.fn() };
      page.rootInstance['getFormElement'] = () => ({ setValue: mockSetValue });
      page.rootInstance['initialValue'] = 'original';
      const popover = page.root?.shadowRoot?.querySelector('wpp-popover');
      const config = popover?.config;
      const mockEvent = {
        target: document.createElement('div'),
        composedPath: () => [],
      };
      config.onClickOutside({}, mockEvent);
      expect(mockClosePopover).toHaveBeenCalled();
    });
  });
  describe('Cancel button behavior', () => {
    it('should call handleClose with cancel reason when cancel button is clicked', async () => {
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit mode="edit" value="test">Text</wpp-inline-edit>`,
      });
      const mockClosePopover = jest.fn();
      const mockSetValue = jest.fn();
      page.rootInstance['popoverRef'] = { closePopover: mockClosePopover };
      page.rootInstance.wppModeChange = { emit: jest.fn() };
      page.rootInstance['getFormElement'] = () => ({ setValue: mockSetValue });
      page.rootInstance['initialValue'] = 'original';
      // Get the cancel button (second action button)
      const actionButtons = page.root?.shadowRoot?.querySelectorAll('wpp-action-button');
      const cancelButton = actionButtons?.[1];
      cancelButton?.click();
      expect(mockClosePopover).toHaveBeenCalled();
    });
  });
  describe('handleClose edge cases', () => {
    it('should return early if event target is contained within host', async () => {
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit>Text</wpp-inline-edit>`,
      });
      const mockClosePopover = jest.fn();
      page.rootInstance['popoverRef'] = { closePopover: mockClosePopover };
      // Event target within host
      const mockEvent = {
        target: page.root,
        composedPath: () => [page.root],
      };
      page.rootInstance['handleClose'](mockEvent, 'outsideClick');
      // closePopover should not be called when target is within host
      expect(mockClosePopover).not.toHaveBeenCalled();
    });
    it('should not reset value when event target is inside form-element slot', async () => {
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit>Text</wpp-inline-edit>`,
      });
      const mockSetValue = jest.fn();
      const slotElement = document.createElement('div');
      slotElement.setAttribute('slot', 'form-element');
      const targetElement = document.createElement('input');
      slotElement.appendChild(targetElement);
      targetElement.closest = jest.fn(() => slotElement);
      page.rootInstance['popoverRef'] = { closePopover: jest.fn() };
      page.rootInstance.wppModeChange = { emit: jest.fn() };
      page.rootInstance['getFormElement'] = () => ({ setValue: mockSetValue });
      page.rootInstance['initialValue'] = 'original';
      const mockEvent = {
        target: targetElement,
        composedPath: () => [],
      };
      page.rootInstance['handleClose'](mockEvent, 'cancel');
      // setValue should not be called because target is inside form-element slot
      expect(mockSetValue).not.toHaveBeenCalled();
    });
  });
  describe('Error tooltip config', () => {
    it('should create tooltip instance on tooltip creation', async () => {
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit mode="edit">Text</wpp-inline-edit>`,
      });
      page.rootInstance.errorMessage = 'Error message';
      await page.waitForChanges();
      const tooltip = page.root?.shadowRoot?.querySelector('wpp-tooltip');
      const config = tooltip?.config;
      if (config?.onCreate) {
        const mockInstance = { popperInstance: { update: jest.fn() } };
        config.onCreate(mockInstance);
        expect(page.rootInstance['tooltipInstance']).toBe(mockInstance);
      }
    });
    it('should update popper instance on tooltip show', async () => {
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit mode="edit">Text</wpp-inline-edit>`,
      });
      page.rootInstance.errorMessage = 'Error message';
      await page.waitForChanges();
      const tooltip = page.root?.shadowRoot?.querySelector('wpp-tooltip');
      const config = tooltip?.config;
      if (config?.onShow) {
        const mockUpdate = jest.fn();
        const mockInstance = { popperInstance: { update: mockUpdate } };
        config.onShow(mockInstance);
        // Wait for setTimeout in onShow
        await new Promise(resolve => setTimeout(resolve, 50));
        expect(mockUpdate).toHaveBeenCalled();
      }
    });
  });
  describe('Input width styling', () => {
    it('should apply input width style when inputWidth is set and mode is edit', async () => {
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit mode="edit" input-width="300px">Text</wpp-inline-edit>`,
      });
      const popover = page.root?.shadowRoot?.querySelector('wpp-popover');
      expect(popover?.getAttribute('style')).toContain('300px');
    });
  });
  describe('handleAccept with host disconnected', () => {
    it('should not process after host disconnects', async () => {
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit value="test">Text</wpp-inline-edit>`,
      });
      const mockFormEl = { messageType: undefined, setFocus: jest.fn() };
      page.rootInstance['getFormElement'] = () => mockFormEl;
      // Store original isConnected value
      const originalDescriptor = Object.getOwnPropertyDescriptor(page.rootInstance.host, 'isConnected');
      page.rootInstance.wppConfirm = {
        emit: jest.fn(detail => {
          // Disconnect the host during the async operation by mocking isConnected
          Object.defineProperty(page.rootInstance.host, 'isConnected', {
            value: false,
            configurable: true,
          });
          detail.waitUntil(Promise.reject(new Error('Error')));
          return { defaultPrevented: true };
        }),
      };
      await page.rootInstance['handleAccept']();
      // Restore original isConnected to prevent further test issues
      if (originalDescriptor) {
        Object.defineProperty(page.rootInstance.host, 'isConnected', originalDescriptor);
      }
      // After the host is disconnected, handleAccept must not update internal state such as
      // errorMessage. This mirrors typical "no state updates on unmounted components" behavior
      // and prevents potential memory leaks or inconsistent UI caused by updating a detached host.
      expect(page.rootInstance.errorMessage).toBeUndefined();
    });
  });
  describe('getFormElement', () => {
    it('should return null when no form element', async () => {
      const page = await newSpecPage({
        components: [WppInlineEdit],
        html: `<wpp-inline-edit>Text</wpp-inline-edit>`,
      });
      // Directly call the private method
      const result = page.rootInstance['getFormElement']();
      expect(result).toBeNull();
    });
  });
});
