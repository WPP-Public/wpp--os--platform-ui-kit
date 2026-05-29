import { newSpecPage } from '@stencil/core/testing';
import { WppToastContainer } from '../wpp-toast-container';
describe('wpp-toast-container', () => {
  it('renders component', async () => {
    const page = await newSpecPage({
      components: [WppToastContainer],
      html: `<wpp-toast-container></wpp-toast-container>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('respects maxToastsToDisplay when adding many toasts', async () => {
    const page = await newSpecPage({
      components: [WppToastContainer],
      html: `<wpp-toast-container max-toasts-to-display="4" stagger-interval="0"></wpp-toast-container>`,
    });
    const container = page.rootInstance;
    for (let i = 0; i < 10; i++) {
      await container.addToast({ message: `Toast ${i}`, type: 'success' });
    }
    expect(container.toasts.length).toBe(4);
    expect(container.toastsQueue.length).toBe(6);
  });
  it('promotes queued toasts when visible toast completes', async () => {
    const page = await newSpecPage({
      components: [WppToastContainer],
      html: `<wpp-toast-container max-toasts-to-display="2" stagger-interval="0"></wpp-toast-container>`,
    });
    const container = page.rootInstance;
    const id1 = await container.addToast({ message: 'Toast 1', type: 'success' });
    await container.addToast({ message: 'Toast 2', type: 'error' });
    await container.addToast({ message: 'Toast 3', type: 'warning' });
    expect(container.toasts.length).toBe(2);
    expect(container.toastsQueue.length).toBe(1);
    // Simulate first toast completing
    container.removeToastById(id1);
    expect(container.toasts.length).toBe(2);
    expect(container.toastsQueue.length).toBe(0);
    expect(container.toasts[0].message).toBe('Toast 2');
    expect(container.toasts[1].message).toBe('Toast 3');
  });
  it('handles duplicate removeToastById calls gracefully', async () => {
    const page = await newSpecPage({
      components: [WppToastContainer],
      html: `<wpp-toast-container max-toasts-to-display="4" stagger-interval="0"></wpp-toast-container>`,
    });
    const container = page.rootInstance;
    const id1 = await container.addToast({ message: 'Toast 1', type: 'success' });
    await container.addToast({ message: 'Toast 2', type: 'error' });
    expect(container.toasts.length).toBe(2);
    // Remove same toast twice — second call should be a no-op
    container.removeToastById(id1);
    expect(container.toasts.length).toBe(1);
    container.removeToastById(id1);
    expect(container.toasts.length).toBe(1);
  });
  it('handles removing non-existent toast ID gracefully', async () => {
    const page = await newSpecPage({
      components: [WppToastContainer],
      html: `<wpp-toast-container stagger-interval="0"></wpp-toast-container>`,
    });
    const container = page.rootInstance;
    await container.addToast({ message: 'Toast 1', type: 'success' });
    expect(container.toasts.length).toBe(1);
    container.removeToastById('non-existent-id');
    expect(container.toasts.length).toBe(1);
  });
  it('does not rebuild visible toasts array when adding to queue', async () => {
    const page = await newSpecPage({
      components: [WppToastContainer],
      html: `<wpp-toast-container max-toasts-to-display="2" stagger-interval="0"></wpp-toast-container>`,
    });
    const container = page.rootInstance;
    await container.addToast({ message: 'Toast 1', type: 'success' });
    await container.addToast({ message: 'Toast 2', type: 'error' });
    const toastsRefBefore = container.toasts;
    // Adding a third toast should only add to queue, not rebuild visible array
    await container.addToast({ message: 'Toast 3', type: 'warning' });
    // Reference stability is an intentional optimization contract:
    // when adding to queue only, this.toasts must NOT be reassigned
    // to avoid triggering Stencil re-renders for the visible list.
    expect(container.toasts).toBe(toastsRefBefore);
    expect(container.toasts.length).toBe(2);
    expect(container.toastsQueue.length).toBe(1);
  });
  describe('staggering', () => {
    it('only displays the first toast immediately when many are added rapidly', async () => {
      const page = await newSpecPage({
        components: [WppToastContainer],
        html: `<wpp-toast-container max-toasts-to-display="5"></wpp-toast-container>`,
      });
      const container = page.rootInstance;
      for (let i = 0; i < 10; i++) {
        await container.addToast({ message: `Toast ${i}`, type: 'success' });
      }
      // Only the first toast becomes visible immediately; the rest wait for stagger
      expect(container.toasts.length).toBe(1);
      expect(container.toastsQueue.length).toBe(9);
      expect(container.toasts[0].message).toBe('Toast 0');
    });
    it('drains the queue at the stagger interval', async () => {
      const page = await newSpecPage({
        components: [WppToastContainer],
        html: `<wpp-toast-container max-toasts-to-display="5" stagger-interval="50"></wpp-toast-container>`,
      });
      const container = page.rootInstance;
      for (let i = 0; i < 5; i++) {
        await container.addToast({ message: `Toast ${i}`, type: 'success' });
      }
      expect(container.toasts.length).toBe(1);
      expect(container.toastsQueue.length).toBe(4);
      // Wait for the queue to fully drain at the 50ms stagger
      await new Promise(resolve => setTimeout(resolve, 350));
      await page.waitForChanges();
      expect(container.toasts.length).toBe(5);
      expect(container.toastsQueue.length).toBe(0);
      expect(container.toasts.map((t) => t.message)).toEqual([
        'Toast 0',
        'Toast 1',
        'Toast 2',
        'Toast 3',
        'Toast 4',
      ]);
    });
    it('respects stagger interval when promoting from queue after a removal', async () => {
      const page = await newSpecPage({
        components: [WppToastContainer],
        html: `<wpp-toast-container max-toasts-to-display="2" stagger-interval="50"></wpp-toast-container>`,
      });
      const container = page.rootInstance;
      const id1 = await container.addToast({ message: 'Toast 1', type: 'success' });
      await container.addToast({ message: 'Toast 2', type: 'error' });
      await container.addToast({ message: 'Toast 3', type: 'warning' });
      // Wait for stagger to fill visible slots
      await new Promise(resolve => setTimeout(resolve, 150));
      await page.waitForChanges();
      expect(container.toasts.length).toBe(2);
      expect(container.toastsQueue.length).toBe(1);
      // Removing a visible toast promotes from queue — deferred via stagger scheduler
      container.removeToastById(id1);
      expect(container.toasts.length).toBe(1);
      expect(container.toastsQueue.length).toBe(1);
      // After stagger interval, the promoted toast should appear
      await new Promise(resolve => setTimeout(resolve, 80));
      await page.waitForChanges();
      expect(container.toasts.length).toBe(2);
      expect(container.toastsQueue.length).toBe(0);
      expect(container.toasts[1].message).toBe('Toast 3');
    });
    it('clears pending stagger timer on disconnectedCallback', async () => {
      const page = await newSpecPage({
        components: [WppToastContainer],
        html: `<wpp-toast-container max-toasts-to-display="5" stagger-interval="1000"></wpp-toast-container>`,
      });
      const container = page.rootInstance;
      // Add multiple toasts — first displays, rest queued with pending timer
      await container.addToast({ message: 'Toast 1', type: 'success' });
      await container.addToast({ message: 'Toast 2', type: 'error' });
      expect(container.displayTimer).toBeDefined();
      container.disconnectedCallback();
      expect(container.displayTimer).toBeUndefined();
    });
  });
});
