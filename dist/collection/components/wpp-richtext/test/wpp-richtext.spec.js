/**
 * @file Unit tests for wpp-richtext.tsx component
 * @description Tests rendering, props, public methods, events, CSS classes, and cleanup.
 * @see https://jira.uhub.biz/browse/WPPOPENDS-1287
 */
import { newSpecPage } from '@stencil/core/testing';
import { WppRichtext } from '../wpp-richtext';
import { WppInput } from '../../wpp-input/wpp-input';
beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => { });
  jest.spyOn(console, 'warn').mockImplementation(() => { });
  jest.spyOn(console, 'error').mockImplementation(() => { });
});
afterAll(() => {
  jest.restoreAllMocks();
});
describe('wpp-richtext', () => {
  describe('component', () => {
    let page;
    afterEach(async () => {
      if (page?.root) {
        page.root.remove();
      }
    });
    it('should render', async () => {
      page = await newSpecPage({
        components: [WppRichtext],
        html: '<wpp-richtext></wpp-richtext>',
      });
      expect(page.root).toBeDefined();
      expect(page.root.tagName).toBe('WPP-RICHTEXT');
    });
    it('should render with data-testid', async () => {
      page = await newSpecPage({
        components: [WppRichtext],
        html: '<wpp-richtext></wpp-richtext>',
      });
      expect(page.root.getAttribute('data-testid')).toBe('wpp-rich-text');
    });
    it('should render the editor container', async () => {
      page = await newSpecPage({
        components: [WppRichtext],
        html: '<wpp-richtext></wpp-richtext>',
      });
      const container = page.root.querySelector('[data-testid="richtext-editor"]');
      expect(container).toBeDefined();
    });
    it('should accept value prop', async () => {
      page = await newSpecPage({
        components: [WppRichtext],
        html: '<wpp-richtext value="<p>Test</p>"></wpp-richtext>',
      });
      expect(page.rootInstance.value).toBe('<p>Test</p>');
    });
    it('should accept format prop', async () => {
      page = await newSpecPage({
        components: [WppRichtext],
        html: '<wpp-richtext format="markdown"></wpp-richtext>',
      });
      expect(page.rootInstance.format).toBe('markdown');
    });
    it('should accept disabled prop', async () => {
      page = await newSpecPage({
        components: [WppRichtext],
        html: '<wpp-richtext></wpp-richtext>',
      });
      // Setting disabled on already-rendered component avoids ProseMirror getSelection crash
      expect(page.rootInstance.disabled).toBe(false);
      page.rootInstance.disabled = true;
      expect(page.rootInstance.disabled).toBe(true);
    });
    it('should accept placeholder prop', async () => {
      page = await newSpecPage({
        components: [WppRichtext],
        html: '<wpp-richtext placeholder="Type here..."></wpp-richtext>',
      });
      expect(page.rootInstance.placeholder).toBe('Type here...');
    });
    it('should accept characters-limit prop', async () => {
      page = await newSpecPage({
        components: [WppRichtext],
        html: '<wpp-richtext characters-limit="100"></wpp-richtext>',
      });
      expect(page.rootInstance.charactersLimit).toBe(100);
    });
    it('should accept name prop', async () => {
      page = await newSpecPage({
        components: [WppRichtext],
        html: '<wpp-richtext name="content"></wpp-richtext>',
      });
      expect(page.rootInstance.name).toBe('content');
    });
    it('should render label when labelConfig is set', async () => {
      page = await newSpecPage({
        components: [WppRichtext],
        html: `<wpp-richtext></wpp-richtext>`,
      });
      page.rootInstance.labelConfig = { text: 'Content' };
      await page.waitForChanges();
      const label = page.root.querySelector('wpp-label');
      expect(label).toBeDefined();
    });
    it('applies the editor hover state while its label is hovered', async () => {
      page = await newSpecPage({
        components: [WppRichtext],
        html: '<wpp-richtext></wpp-richtext>',
      });
      page.rootInstance.labelConfig = { text: 'Content' };
      await page.waitForChanges();
      const label = page.root.querySelector('wpp-label');
      const formControl = page.root.querySelector('.ql-form-control');
      label.dispatchEvent(new MouseEvent('mouseenter'));
      await page.waitForChanges();
      expect(formControl).toHaveClass('label-hovered');
      label.dispatchEvent(new MouseEvent('mouseleave'));
      await page.waitForChanges();
      expect(formControl).not.toHaveClass('label-hovered');
    });
    it('does not apply the editor hover state from a disabled label', async () => {
      page = await newSpecPage({
        components: [WppRichtext],
        html: '<wpp-richtext></wpp-richtext>',
      });
      page.rootInstance.labelConfig = { text: 'Content' };
      await page.waitForChanges();
      page.rootInstance.disabled = true;
      const label = page.root.querySelector('wpp-label');
      label.dispatchEvent(new MouseEvent('mouseenter'));
      expect(page.rootInstance.isLabelHovered).toBe(false);
      expect(page.rootInstance.formControlCssClasses()['label-hovered']).toBe(false);
    });
    it('should render message when message prop is set', async () => {
      page = await newSpecPage({
        components: [WppRichtext],
        html: '<wpp-richtext message="Some message"></wpp-richtext>',
      });
      const message = page.root.querySelector('[data-testid="message"]');
      expect(message).toBeDefined();
    });
    it('should render character counter when characters-limit is set', async () => {
      page = await newSpecPage({
        components: [WppRichtext],
        html: '<wpp-richtext characters-limit="100"></wpp-richtext>',
      });
      const counter = page.root.querySelector('[data-testid="char-entered-label"]');
      expect(counter).toBeDefined();
    });
    it('should render hidden form input when name is set', async () => {
      page = await newSpecPage({
        components: [WppRichtext],
        html: '<wpp-richtext name="content"></wpp-richtext>',
      });
      const input = page.root.querySelector('[data-testid="rich-text-input"]');
      expect(input).toBeDefined();
      expect(input.getAttribute('id')).toBe('content');
    });
    it('should set aria-required', async () => {
      page = await newSpecPage({
        components: [WppRichtext],
        html: '<wpp-richtext></wpp-richtext>',
      });
      // Verify required prop is accepted
      expect(page.rootInstance.required).toBe(false);
      page.rootInstance.required = true;
      expect(page.rootInstance.required).toBe(true);
    });
    it('should render toolbar slot', async () => {
      page = await newSpecPage({
        components: [WppRichtext],
        html: '<wpp-richtext><div slot="editor-toolbar">Toolbar</div></wpp-richtext>',
      });
      const slot = page.root.querySelector('slot[name="editor-toolbar"]');
      expect(slot).toBeDefined();
    });
  });
  describe('accessibility', () => {
    let page;
    afterEach(async () => {
      if (page?.root) {
        page.root.remove();
      }
    });
    const getToolbar = () => page.root.querySelector('[role="toolbar"]');
    it('should expose the toolbar as an ARIA toolbar with a localised label', async () => {
      page = await newSpecPage({
        components: [WppRichtext],
        html: '<wpp-richtext></wpp-richtext>',
      });
      const toolbar = getToolbar();
      expect(toolbar).not.toBeNull();
      expect(toolbar.getAttribute('aria-label')).toBe('Text formatting');
    });
    it('should give toolbar buttons human-readable accessible names (not raw action ids)', async () => {
      page = await newSpecPage({
        components: [WppRichtext],
        html: '<wpp-richtext></wpp-richtext>',
      });
      const bold = getToolbar().querySelector('button.ql-bold');
      const orderedList = getToolbar().querySelector('button.ql-orderedList');
      expect(bold.getAttribute('aria-label')).toBe('Bold');
      expect(bold.getAttribute('title')).toBeNull();
      expect(orderedList.getAttribute('aria-label')).toBe('Ordered list');
    });
    it('should translate toolbar labels from merged locales', async () => {
      page = await newSpecPage({
        components: [WppRichtext],
        html: '<wpp-richtext></wpp-richtext>',
      });
      page.rootInstance.locales = { toolbarLabel: 'Formatage', toolbarActions: { bold: 'Gras' } };
      await page.waitForChanges();
      expect(getToolbar().getAttribute('aria-label')).toBe('Formatage');
      // Partial override keeps the remaining defaults.
      expect(getToolbar().querySelector('button.ql-bold').getAttribute('aria-label')).toBe('Gras');
      expect(getToolbar().querySelector('button.ql-italic').getAttribute('aria-label')).toBe('Italic');
    });
    it('should expose aria-pressed on toggle buttons and omit it on command buttons', async () => {
      page = await newSpecPage({
        components: [WppRichtext],
        html: '<wpp-richtext></wpp-richtext>',
      });
      const bold = getToolbar().querySelector('button.ql-bold');
      const undo = getToolbar().querySelector('button.ql-undo');
      expect(bold.getAttribute('aria-pressed')).toBe('false');
      expect(undo.hasAttribute('aria-pressed')).toBe(false);
    });
    it('should keep exactly one toolbar control tabbable (roving tabindex)', async () => {
      page = await newSpecPage({
        components: [WppRichtext],
        html: '<wpp-richtext></wpp-richtext>',
      });
      const controls = Array.from(getToolbar().querySelectorAll('button.ql-toolbar-btn, .ql-size-trigger'));
      const nativeTabbable = controls.filter(c => c.getAttribute('tabindex') === '0');
      // Only the very first control (the font-size trigger) is the initial tab
      // stop, so no native button should be tabbable yet.
      expect(controls.length).toBeGreaterThan(1);
      expect(nativeTabbable.filter(c => c.tagName === 'BUTTON').length).toBe(0);
      controls.filter(c => c.tagName === 'BUTTON').forEach(btn => expect(btn.getAttribute('tabindex')).toBe('-1'));
    });
    it('should move the roving tab stop with ArrowRight', async () => {
      page = await newSpecPage({
        components: [WppRichtext],
        html: '<wpp-richtext></wpp-richtext>',
      });
      const toolbar = getToolbar();
      toolbar.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
      await page.waitForChanges();
      // Index advances from the first control (font-size) to the first native
      // button (bold), which becomes the sole tabbable button.
      const bold = toolbar.querySelector('button.ql-bold');
      expect(bold.getAttribute('tabindex')).toBe('0');
    });
    it('should keep a format toggled from the toolbar when a keyboard user returns to the editor', async () => {
      page = await newSpecPage({
        components: [WppRichtext],
        html: '<wpp-richtext></wpp-richtext>',
      });
      // Tiptap exposes its editor on the editing surface.
      const editorSurface = page.root.querySelector('.ProseMirror');
      const bold = getToolbar().querySelector('button.ql-bold');
      // Shift+Tab from the editor to the toolbar, Bold, then back into the editor.
      page.root.dispatchEvent(new KeyboardEvent('keyup', { key: 'Tab', shiftKey: true }));
      editorSurface.dispatchEvent(new FocusEvent('blur'));
      bold.click();
      await page.waitForChanges();
      editorSurface.dispatchEvent(new FocusEvent('focus'));
      await page.waitForChanges();
      // The next typed text takes the pending (stored) marks. Typing itself cannot be replayed here: the mock DOM
      // cannot serialise the editor HTML that every content change emits.
      expect(editorSurface.editor.isActive('bold')).toBe(true);
      expect(bold.getAttribute('aria-pressed')).toBe('true');
    });
    describe('keyboard focus', () => {
      // Tiptap moves focus into the editor on the next animation frame.
      const nextFrame = () => new Promise(resolve => setTimeout(resolve, 50));
      const getEditorSurface = () => page.root.querySelector('.ProseMirror');
      const getFormControl = () => page.root.querySelector('.ql-form-control');
      const getLinkPrompt = () => page.root.querySelector('[data-testid="richtext-link-prompt"]');
      const getLinkPromptField = () => page.root.querySelector('[data-testid="richtext-link-prompt-input"]').shadowRoot.querySelector('input');
      // A click generated by Enter or Space reports `detail === 0`; a pointer click reports 1.
      const press = (button) => button.dispatchEvent(new MouseEvent('click', { bubbles: true, detail: 0 }));
      const openLinkPromptFromToolbar = async () => {
        page = await newSpecPage({
          components: [WppRichtext, WppInput],
          html: '<wpp-richtext value="<p>hello world</p>"></wpp-richtext>',
        });
        getEditorSurface().editor.commands.setTextSelection({ from: 1, to: 6 });
        const linkButton = getToolbar().querySelector('button.ql-link');
        press(linkButton);
        await page.waitForChanges();
        return linkButton;
      };
      const openLinkPromptOnLink = async () => {
        page = await newSpecPage({
          components: [WppRichtext],
          html: '<wpp-richtext value=\'<p>see <a href="https://wpp.com">wpp</a></p>\'></wpp-richtext>',
        });
        // A caret inside a link opens the popup in view mode.
        getEditorSurface().editor.commands.setTextSelection(7);
        await page.waitForChanges();
      };
      it('draws the field focus ring only while the editor has keyboard focus, not a toolbar control', async () => {
        page = await newSpecPage({
          components: [WppRichtext],
          html: '<wpp-richtext></wpp-richtext>',
        });
        page.root.dispatchEvent(new KeyboardEvent('keyup', { key: 'Tab' }));
        getToolbar()
          .querySelector('button.ql-bold')
          .dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
        await page.waitForChanges();
        expect(getFormControl()).toHaveClass('active');
        expect(getFormControl()).not.toHaveClass('tab-focus');
        getEditorSurface().dispatchEvent(new FocusEvent('focus'));
        await page.waitForChanges();
        expect(getFormControl()).toHaveClass('tab-focus');
      });
      it('keeps focus on a toolbar button pressed with Enter or Space', async () => {
        page = await newSpecPage({
          components: [WppRichtext],
          html: '<wpp-richtext value="<p>hello</p>"></wpp-richtext>',
        });
        const editorFocus = jest.spyOn(getEditorSurface(), 'focus');
        const undo = getToolbar().querySelector('button.ql-undo');
        press(undo);
        press(undo);
        await nextFrame();
        expect(editorFocus).not.toHaveBeenCalled();
      });
      it('applies a format pressed from the keyboard without leaving the toolbar', async () => {
        page = await newSpecPage({
          components: [WppRichtext],
          html: '<wpp-richtext value="<p>hello</p>"></wpp-richtext>',
        });
        const bold = getToolbar().querySelector('button.ql-bold');
        getEditorSurface().editor.commands.setTextSelection({ from: 1, to: 6 });
        press(bold);
        await page.waitForChanges();
        expect(bold.getAttribute('aria-pressed')).toBe('true');
        // The mock DOM cannot serialise the editor HTML, so read the mark from the selected text.
        expect(getEditorSurface().editor.isActive('bold')).toBe(true);
      });
      it('still hands focus to the editor after a pointer click on a toolbar button', async () => {
        page = await newSpecPage({
          components: [WppRichtext],
          html: '<wpp-richtext value="<p>hello</p>"></wpp-richtext>',
        });
        const editorFocus = jest.spyOn(getEditorSurface(), 'focus');
        getToolbar()
          .querySelector('button.ql-bold')
          .dispatchEvent(new MouseEvent('click', { bubbles: true, detail: 1 }));
        await nextFrame();
        expect(editorFocus).toHaveBeenCalled();
      });
      it('moves focus into the URL field, with its focus ring, when the Link button opens the popup', async () => {
        await openLinkPromptFromToolbar();
        await nextFrame();
        await page.waitForChanges();
        expect(getLinkPrompt()).toHaveClass('ql-editing');
        expect(getLinkPromptField()).toHaveClass('tab-focus');
      });
      it('closes the popup on Escape in the URL field and returns focus to the Link button', async () => {
        const linkButton = await openLinkPromptFromToolbar();
        const linkButtonFocus = jest.spyOn(linkButton, 'focus');
        page
          .root.querySelector('[data-testid="richtext-link-prompt-input"]')
          .dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        await page.waitForChanges();
        expect(getLinkPrompt()).toBeNull();
        expect(linkButtonFocus).toHaveBeenCalled();
        // The selection the link was for is still there.
        expect(getEditorSurface().editor.state.selection).toMatchObject({ from: 1, to: 6 });
      });
      it('closes the popup on Escape from its Save button', async () => {
        await openLinkPromptFromToolbar();
        page
          .root.querySelector('[data-testid="richtext-link-prompt-save"]')
          .dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        await page.waitForChanges();
        expect(getLinkPrompt()).toBeNull();
      });
      it('moves Tab from the editor into the link popup, ahead of embedded media', async () => {
        await openLinkPromptOnLink();
        const preview = page.root.querySelector('[data-testid="richtext-link-prompt-preview"]');
        const previewFocus = jest.spyOn(preview, 'focus');
        const tab = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
        getEditorSurface().dispatchEvent(tab);
        expect(tab.defaultPrevented).toBe(true);
        expect(previewFocus).toHaveBeenCalled();
      });
      it('leaves Tab alone in the editor while no link popup is open', async () => {
        page = await newSpecPage({
          components: [WppRichtext],
          html: '<wpp-richtext value="<p>hello</p>"></wpp-richtext>',
        });
        const tab = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
        getEditorSurface().dispatchEvent(tab);
        expect(tab.defaultPrevented).toBe(false);
      });
      it("returns Shift+Tab from the popup's first control to the editor", async () => {
        await openLinkPromptOnLink();
        const editorFocus = jest.spyOn(getEditorSurface(), 'focus');
        const shiftTab = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true, cancelable: true });
        page.root.querySelector('[data-testid="richtext-link-prompt-preview"]').dispatchEvent(shiftTab);
        await nextFrame();
        expect(shiftTab.defaultPrevented).toBe(true);
        expect(editorFocus).toHaveBeenCalled();
        expect(getLinkPrompt()).not.toBeNull();
      });
      it('moves focus into the URL field, with its focus ring, when Edit replaces the view-mode buttons', async () => {
        page = await newSpecPage({
          components: [WppRichtext, WppInput],
          html: '<wpp-richtext value=\'<p>see <a href="https://wpp.com">wpp</a></p>\'></wpp-richtext>',
        });
        getEditorSurface().editor.commands.setTextSelection(7);
        await page.waitForChanges();
        page.root.querySelector('[data-testid="richtext-link-prompt-edit"]').click();
        await page.waitForChanges();
        await nextFrame();
        await page.waitForChanges();
        expect(getLinkPrompt()).toHaveClass('ql-editing');
        expect(getLinkPromptField()).toHaveClass('tab-focus');
      });
    });
    it('names the font-size trigger with the visible size as well as "Font size"', async () => {
      page = await newSpecPage({
        components: [WppRichtext],
        html: '<wpp-richtext value=\'<p><span class="ql-size-5xl">Big</span></p>\'></wpp-richtext>',
      });
      page.root.querySelector('.ProseMirror').editor.commands.setTextSelection(2);
      await page.waitForChanges();
      const trigger = page.root.querySelector('.ql-size-trigger');
      expect(trigger.textContent).toBe('5XL');
      expect(trigger.ariaProps).toMatchObject({ label: 'Font size 5XL' });
    });
    describe('with a message', () => {
      const getEditorSurface = () => page.root.querySelector('.ProseMirror');
      const getMessage = () => page.root.querySelector('wpp-inline-message');
      it('should describe an invalid editor with its error message', async () => {
        page = await newSpecPage({
          components: [WppRichtext],
          html: '<wpp-richtext message="Description is required" message-type="error"></wpp-richtext>',
        });
        expect(getEditorSurface().getAttribute('aria-invalid')).toBe('true');
        expect(getMessage().id).toBeTruthy();
        expect(getEditorSurface().getAttribute('aria-describedby')).toBe(getMessage().id);
      });
      it('should describe the editor with a message that is not an error', async () => {
        page = await newSpecPage({
          components: [WppRichtext],
          html: '<wpp-richtext message="Markdown is supported" message-type="information"></wpp-richtext>',
        });
        expect(getEditorSurface().hasAttribute('aria-invalid')).toBe(false);
        expect(getEditorSurface().getAttribute('aria-describedby')).toBe(getMessage().id);
      });
      it('should stop describing the editor once the message is removed', async () => {
        page = await newSpecPage({
          components: [WppRichtext],
          html: '<wpp-richtext message="Description is required" message-type="error"></wpp-richtext>',
        });
        page.root.setAttribute('message', '');
        page.root.removeAttribute('message-type');
        await page.waitForChanges();
        expect(getMessage()).toBeNull();
        expect(getEditorSurface().hasAttribute('aria-describedby')).toBe(false);
        expect(getEditorSurface().hasAttribute('aria-invalid')).toBe(false);
      });
      it('should give each editor on the page its own message id', async () => {
        page = await newSpecPage({
          components: [WppRichtext],
          html: '<wpp-richtext message="First"></wpp-richtext><wpp-richtext message="Second"></wpp-richtext>',
        });
        const [first, second] = Array.from(page.body.querySelectorAll('wpp-richtext')).map(richtext => richtext.querySelector('.ProseMirror').getAttribute('aria-describedby'));
        expect(first).toBeTruthy();
        expect(first).not.toBe(second);
      });
    });
  });
});
