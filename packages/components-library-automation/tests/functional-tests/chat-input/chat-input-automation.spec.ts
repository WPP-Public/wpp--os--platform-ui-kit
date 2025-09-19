import { test, expect } from '@playwright/test'
import { WppChatInputPage } from '../../../pages/chat-input.page'

const wppChatInputPage = new WppChatInputPage();
let consoleErrors: string[] = [];
let textMessage = 'Text to display the scroll: Test for placing a file with the text when files are added after writing the text. '
  + 'Test for placing a file with the text when files are added after writing the text. '
  + 'Test for placing a file with the text when files are added after writing the text. '
  + 'Test for placing a file with the text when files are added after writing the text. '
  + 'Test for placing a file with the text when files are added after writing the text. '
  + 'Test for placing a file with the text when files are added after writing the text.'
  + 'Test for placing a file with the text when files are added after writing the text.';

test.beforeEach(async ({ page }) => {
  await wppChatInputPage.setPage(page);
  await wppChatInputPage.init();
  await wppChatInputPage.openPage('chat-input');
  consoleErrors = await wppChatInputPage.listenConsoleErrors(page);

  consoleErrors = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  })
});

test.afterEach(async () => {
  if (consoleErrors.length > 0) {
    const errorMessages = consoleErrors.join('\n');
    test.info().annotations.push({
      type: 'error',
      description: `Console Errors:\n${errorMessages}`,
    })
  }
  await expect(consoleErrors.length === 0).toBeTruthy();
});

test.describe('Chat Input', () => {
  test('[WPPOPENDS-T881] Check the chat container can be disabled', async () => {
    await wppChatInputPage.disableChatInputBtn.click();
    await expect(wppChatInputPage.disableChatInputContainer.first()).toBeVisible();
    await expect(wppChatInputPage.disableChatInputContainer.first()).toHaveCSS('outline-color', 'rgb(193, 199, 205)');
    await expect(wppChatInputPage.disableChatInputContainer.first()).toHaveCSS('outline-width', '1px');
    //minimized chat input
    await expect(wppChatInputPage.disableChatInputContainer.nth(1)).toHaveCSS('outline-color', 'rgb(193, 199, 205)');
    await expect(wppChatInputPage.disableChatInputContainer.nth(1)).toHaveCSS('outline-width', '1px');
  });

  test('[WPPOPENDS-T882] Check "Send" button is disabled if text field does not contain text/file', async () => {
    await wppChatInputPage.textInput.first().fill('');
    await expect(wppChatInputPage.sendMessageBtn.first()).toHaveAttribute('disabled');
  });

  test('[WPPOPENDS-T1279] Check if it is possible to successfully add pre-prompts to the chat', async ({ page }) => {
    const logs: any[] | Promise<any[]> = [];
    page.on('console', msg => logs.push(msg.text()));

    await wppChatInputPage.changeChatInputMessageBtn.click();
    await page.waitForTimeout(1000);
    
    const maxRetries = 3;
    let retries = 0;

    while (await wppChatInputPage.sendMessageBtn.first().getAttribute('disabled') !== null && retries < maxRetries) {
      await wppChatInputPage.changeChatInputMessageBtn.click();
      await page.waitForTimeout(1000);
      retries++;
    }

    await expect(wppChatInputPage.sendMessageBtn.first()).toBeEnabled();
    await expect(wppChatInputPage.textInput).not.toHaveValue('');

    const chatValue = await wppChatInputPage.textInput.inputValue();

    await wppChatInputPage.sendMessageBtn.first().click();
    await expect(wppChatInputPage.textInput).toHaveValue('');
    await expect.poll(() => logs.some(log => log.includes(`~ handleSendMessage ~ Message sent: ${chatValue}`))).toBe(true);
  });

  test('[WPPOPENDS-T1278] Check if it is possible to successfully edit the added pre-prompts to the chat', async ({ page }) => {
    const logs: any[] | Promise<any[]> = [];
    page.on('console', msg => logs.push(msg.text()));

    await wppChatInputPage.changeChatInputMessageBtn.click();
    await page.waitForTimeout(1000);

    const maxRetries = 3;
    let retries = 0;

    while (await wppChatInputPage.sendMessageBtn.first().getAttribute('disabled') !== null && retries < maxRetries) {
      await wppChatInputPage.changeChatInputMessageBtn.click();
      await page.waitForTimeout(1000);
      retries++;
    }

    for (let i = 0; i < 5; i++) {
      await wppChatInputPage.textInput.press('Backspace');
    }

    await expect(wppChatInputPage.textInput).not.toHaveValue('');
    const chatValue = await wppChatInputPage.textInput.inputValue();
    await wppChatInputPage.textInput.type('Test');
    await page.waitForTimeout(1000);
    await wppChatInputPage.sendMessageBtn.first().click();
    await expect(wppChatInputPage.textInput).toHaveValue('');
    await expect.poll(() => {
      const sentLogs = logs.filter(log =>
        log.includes('~ handleSendMessage ~ Message sent:')
      );
    
      return sentLogs.some(log => log.includes(chatValue + 'Test'));
    }).toBe(true);
  });

  test('[WPPOPENDS-T1277] Check if it is possible to enable debounce delay for sending the event', async ({ page }) => {
    const logs: { text: string; timestamp: number }[] = [];

    page.on('console', async msg => {
      const isRelevant = msg.text().includes('handleMessageChange');
      if (!isRelevant) return;

      const args = await Promise.all(msg.args().map(arg => arg.jsonValue()));
      const valueArg = args.find(arg => typeof arg === 'object' && arg?.value);
      if (valueArg?.value) {
        logs.push({ text: String(valueArg.value), timestamp: Date.now() });
      }
    });

    const startTime = Date.now();
    await wppChatInputPage.textInput.fill('Debounce test');

    await expect.poll(() => {
      const debounceLog = logs.find(log => log.text === 'Debounce test');
      if (!debounceLog) return false;

      const delay = debounceLog.timestamp - startTime;
      console.log(`Debounce delay: ${delay}ms`);
      return delay >=300;
    }).toBe(true);
  });

  test('[WPPOPENDS-T1276] Check if it is possible to disable debounce delay for sending the event', async ({ page }) => {
    const logs: { text: string; timestamp: number }[] = [];

    page.on('console', async msg => {
      const isRelevant = msg.text().includes('handleMessageChange');
      if (!isRelevant) return;

      const args = await Promise.all(msg.args().map(arg => arg.jsonValue()));
      const valueArg = args.find(arg => typeof arg === 'object' && arg?.value);
      if (valueArg?.value) {
        logs.push({ text: String(valueArg.value), timestamp: Date.now() });
      }
    });

    const startTime = Date.now();
    await wppChatInputPage.chengeDebounceTimeBtn.click();
    await wppChatInputPage.textInput.fill('Debounce test');

    await expect.poll(() => {
      const debounceLog = logs.find(log => log.text === 'Debounce test');
      if (!debounceLog) return false;

      const delay = debounceLog.timestamp - startTime;
      console.log(`Debounce delay: ${delay}ms`);
      return delay <= 300;
    }).toBe(true);
  });

  test('[WPPOPENDS-T883] Check that message can be sent without the attachments', async ({ page }) => {
    const logs: string[] = [];

    page.on('console', async msg => {
      const text = msg.text();
      const args = await Promise.all(msg.args().map(arg => arg.jsonValue()));

      for (const arg of args) {
        if (typeof arg === 'string') {
          logs.push(`${text} ${arg}`);
        }
        else if (Array.isArray(arg)) {
          logs.push(`${text} ${JSON.stringify(arg)}`);
        }
        else if (typeof arg === 'object' && arg !== null) {
          logs.push(`${text} ${JSON.stringify(arg)}`);
        }
      }
    });

    const message = 'Test to send the message';
    await wppChatInputPage.textInput.fill(message);
    await wppChatInputPage.sendMessageBtn.first().click();
    await expect(wppChatInputPage.textInput).toHaveText('');

    await expect.poll(() =>
      logs.some(log =>
        log.includes('handleSendMessage') &&
        log.includes('Message sent') &&
        log.includes(message)
      )
    ).toBe(true);

    await expect.poll(() =>
      logs.some(log =>
        log.includes('handleSendMessage') &&
        log.includes('Attachments') &&
        log.includes('[]')
      )
    ).toBe(true);
  });

  test('[WPPOPENDS-T884] Check that attachments can be sent without the text message', async ({ page }) => {
    const logs: string[] = [];
    let fileNames: string[] = [];

    page.on('console', async msg => {
      const text = msg.text();
      logs.push(text);

      if (text.includes('~ handleSendMessage ~ Attachments:')) {
        const args = await Promise.all(msg.args().map(arg => arg.jsonValue().catch(() => undefined)));

        for (const arg of args) {
          if (Array.isArray(arg)) {
            fileNames = arg.map(file => file?.name || 'unknown');
          }
        }
      }
    });

    await wppChatInputPage.addAttachmentsToChat([
      'tests/fixture/less_than_1mb.jpg',
      'tests/fixture/more_than_1mb.jpg',
      'tests/fixture/image.png',
    ]);

    await wppChatInputPage.sendMessageBtn.first().click();
    await expect.poll(() => logs.some(log => log.includes('~ handleSendMessage ~ Message sent:'))).toBe(true);
    await expect.poll(() => fileNames.length === 3).toBe(true)
  });

  test('[WPPOPENDS-T894] Check that the text can be sent with an attachment', async ({ page }) => {
    const logs: string[] = [];
    const textMessage = 'Test for placing a file with the text when files are added after writing the text';
    page.on('console', msg => logs.push(msg.text()));

    await wppChatInputPage.textInput.first().fill(textMessage);
    await wppChatInputPage.addAttachmentsToChat(['tests/fixture/less_than_1mb.jpg']);
    await wppChatInputPage.sendMessageBtn.first().click();
    await expect.poll(() => logs.some(log => log.includes(`~ handleSendMessage ~ Message sent: ${textMessage}`))).toBe(true);
    await expect.poll(() => {
      const attachmentLog = logs.find(log => log.includes("~ handleSendMessage ~ Attachments:"));
      if (!attachmentLog) return false;
      const attachments = attachmentLog.split("Attachments: ")[1].split(',');
      return attachments.length === 1;
      }).toBe(true);
  });

  test('[WPPOPENDS-T895] Check the attached file can be deleted', async ({ page }) => {
    const logs: string[] = [];
    const textMessage = 'Test for placing a file with the text when files are added after writing the text';
    page.on('console', msg => logs.push(msg.text()));

    await wppChatInputPage.textInput.fill(textMessage);
    await wppChatInputPage.addAttachmentsToChat([
      'tests/fixture/less_than_1mb.jpg',
      'tests/fixture/image.png',
    ]);
    await wppChatInputPage.deleteAddedFileCrossBtn.first().click();
    await wppChatInputPage.sendMessageBtn.first().click();
    await expect.poll(() => logs.some(log => log.includes(`~ handleSendMessage ~ Message sent: ${textMessage}`))).toBe(true);
    await expect.poll(() => {
      const attachmentLog = logs.find(log => log.includes("~ handleSendMessage ~ Attachments:"));
      if (!attachmentLog) return false;
      const attachments = attachmentLog.split("Attachments: ")[1].split(',');
      return attachments.length === 1;
      }).toBe(true);
  });

  test('[WPPOPENDS-T896] Check the number of files added over the allowed limit', async ({ page }) => {
    const logs: string[] = [];
    let fileNames: string[] = [];

    page.on('console', async msg => {
      const text = msg.text();
      logs.push(text);

      if (text.includes('~ handleSendMessage ~ Attachments:')) {
        const args = await Promise.all(msg.args().map(arg => arg.jsonValue().catch(() => undefined)));

        for (const arg of args) {
          if (Array.isArray(arg)) {
            fileNames = arg.map(file => file?.name || 'unknown');
          }
        }
      }
    });

    await wppChatInputPage.addAttachmentsToChat([
      'tests/fixture/less_than_1mb.jpg',
      'tests/fixture/image.png',
      'tests/fixture/error.jpeg',
      'tests/fixture/more_than_1mb.jpg',
      'tests/fixture/validator-test.jpg',
      'tests/fixture/video.mov',
    ]);

    await wppChatInputPage.sendMessageBtn.first().click();
    await expect.poll(() => logs.some(log => log.includes('~ handleSendMessage ~ Message sent:'))).toBe(true);
    await expect.poll(() => fileNames.length === 5).toBe(true)
  });

  test('[WPPOPENDS-T885] Check that attached files are displayed above text', async ({ page }) => {  
    await wppChatInputPage.textInput.fill('Test for placing a file with the text when files are added after writing the text');
    await wppChatInputPage.addAttachmentsToChat(['tests/fixture/less_than_1mb.jpg']);

    const attachmentPosition = await wppChatInputPage.fileUploadItem.boundingBox();
    const textInputPosition = await wppChatInputPage.textInput.boundingBox();

    expect(attachmentPosition).not.toBeNull();
    expect(textInputPosition).not.toBeNull();
    expect(attachmentPosition!.y).toBeLessThan(textInputPosition!.y);
  })

  test('[WPPOPENDS-T886]  Check that file is displayed when clicking on the message "1 File uploaded successfully"', async ({ page }) => {
    await wppChatInputPage.textInput.first().fill(textMessage);
    await page.waitForTimeout(1000);
    await expect(wppChatInputPage.inputArea.first()).toHaveCSS('overflow-y', 'auto');
    await wppChatInputPage.addAttachmentsToChat(['tests/fixture/video.mov']);
    await expect(wppChatInputPage.chatToastMessage.first()).toHaveText('1 File Uploaded Successfully');
    await wppChatInputPage.chatToastMessage.first().click();
    await page.waitForTimeout(1000);
    await expect(wppChatInputPage.fileUploadItem).toBeInViewport();
  })

  test('[WPPOPENDS-T889]  Check character counter is displayed if number of characters exceeded', async ({ page }) => {
    await wppChatInputPage.textInput.first().fill(textMessage);
    await expect(wppChatInputPage.charCounter.first()).toHaveText('607/200');
    await expect(wppChatInputPage.sendMessageBtn.first()).toHaveAttribute('disabled');
  })

  test('[WPPOPENDS-T891]  Check scroll is displayed if text field height is greater than 288px', async ({ page }) => {
    await wppChatInputPage.textInput.first().fill(textMessage);
    await expect(wppChatInputPage.inputArea.first()).toHaveCSS('overflow-y', 'auto');
  })

  test('[WPPOPENDS-T892]  Check that minimum chat container dimensions are 112x320px', async ({ page }) => {
    await expect(wppChatInputPage.chatInputContainer.first()).toHaveCSS('width', '320px');
    await expect(wppChatInputPage.chatInputContainer.first()).toHaveCSS('height', '112px');
  });

  test('[WPPOPENDS-T893]  Check that maximum chat container dimensions are 288x720px', async ({ page }) => {
    await expect(wppChatInputPage.chatInputContainer.first()).toHaveCSS('max-width', '720px');
    await wppChatInputPage.textInput.first().fill(textMessage);
    await expect(wppChatInputPage.chatInputContainer.first()).toHaveCSS('height', '288px');
  });

  test('[WPPOPENDS-T887] Check focus/hover state of chat container', async ({ page }) => {
    //hover state
    await wppChatInputPage.chatInputContainer.first().hover();
    await expect(wppChatInputPage.chatInputContainer.first()).toHaveCSS('outline-color', 'rgb(105, 112, 119)');
    await expect(wppChatInputPage.chatInputContainer.first()).toHaveCSS('outline-width', '1px');
    //minimized chat input hover state
    await wppChatInputPage.chatInputContainer.nth(1).hover();
    await expect(wppChatInputPage.chatInputContainer.nth(1)).toHaveCSS('outline-color', 'rgb(105, 112, 119)');
    await expect(wppChatInputPage.chatInputContainer.nth(1)).toHaveCSS('outline-width', '1px');
    //focus state
    await wppChatInputPage.textInput.first().click();
    await page.mouse.down();
    await expect(wppChatInputPage.chatInputContainer.first()).toHaveCSS('outline-color', 'rgb(77, 83, 88)');
    await expect(wppChatInputPage.chatInputContainer.first()).toHaveCSS('outline-width', '1px');
  });

  test('[WPPOPENDS-T1307] Check that a new line is added by pressing "Shift+Enter"', async ({ page }) => {
    const logs: string[] = [];
    page.on('console', async msg => {
      if (msg.type() === 'log') {
        const args = msg.args();
        for (const arg of args) {
          const val = await arg.jsonValue();
          logs.push(JSON.stringify(val));
        }
      }
    });

    await wppChatInputPage.chatInputContainer.nth(0).click();
    await wppChatInputPage.textInput.nth(0).press('Shift+Enter');
    await page.waitForTimeout(1000);
    await wppChatInputPage.textInput.nth(0).type('New line added');
    await page.waitForTimeout(1000);

    const hasNewLine = logs.some(log => {
      try {
        const parsed = JSON.parse(log);
        return parsed.value.startsWith('\n');
      } catch {
        return false;
      }
    });

    expect(hasNewLine).toBe(true);
  });

  test('[WPPOPENDS-T1308] Check that the message is sent with the Enter key', async ({ page }) => {
    const logs: string[] = [];
    page.on('console', msg => logs.push(msg.text()));

    await wppChatInputPage.chatInputContainer.nth(0).click();
    await wppChatInputPage.textInput.nth(0).fill('Message by Enter');
    await page.waitForTimeout(1000);
    await wppChatInputPage.textInput.nth(0).press('Enter');
    await expect.poll(() => logs.some(log => log.includes('Message sent: Message by Enter'))).toBe(true);
  });

  test('[WPPOPENDS-T1309] Check that the message is not sent with Enter key if character limit exceeded', async ({ page }) => {
    const logs: string[] = [];
    page.on('console', msg => logs.push(msg.text()));

    await wppChatInputPage.chatInputContainer.nth(0).click();
    await wppChatInputPage.textInput.nth(0).fill(textMessage);
    await expect(wppChatInputPage.charCounter.nth(0)).toHaveText('607/200');
    await expect(wppChatInputPage.sendMessageBtn.nth(0)).toHaveAttribute('disabled');
    await wppChatInputPage.textInput.nth(0).press('Enter');

    await expect.poll(() => logs.some(log => log.includes('Message sent:'))).toBe(false);
  });
});

test.describe('Minimized Chat Input', () => {
  test('[WPPOPENDS-T1299] Check that the chat component has passed the visual check', async ({ page }) => {
    await expect(wppChatInputPage.chatInputComponent).toHaveScreenshot();
  });

  test('[WPPOPENDS-T1300] Check that the chat expands when clicking on the input field', async () => {
    await expect(wppChatInputPage.chatInputContainer.nth(1)).toHaveCSS('height', '48px');
    await expect(wppChatInputPage.chatInputContainer.nth(1)).toHaveCSS('width', '320px');
    await wppChatInputPage.chatInputContainer.nth(1).click();
    await expect(wppChatInputPage.chatInputContainer.nth(1)).toHaveCSS('height', '112px');
  });

  test('[WPPOPENDS-T1301] Check that the chat is minimized on a missed click', async ({ page }) => {
    await expect(wppChatInputPage.chatInputContainer.nth(1)).toHaveCSS('height', '48px');
    await wppChatInputPage.chatInputContainer.nth(1).click();
    await expect(wppChatInputPage.chatInputContainer.nth(1)).toHaveCSS('height', '112px');
    await wppChatInputPage.chatInputComponent.click();
    await expect(wppChatInputPage.chatInputContainer.nth(1)).toHaveCSS('height', '48px');
  });

  test('[WPPOPENDS-T1302] Check that the text is truncated when the chat window is minimized', async () => {
    await wppChatInputPage.chatInputContainer.nth(1).click();
    await wppChatInputPage.textInput.nth(1).fill(textMessage);
    await wppChatInputPage.chatInputComponent.click();
    await expect(wppChatInputPage.mininizedChatInput).toHaveCSS('text-overflow', 'ellipsis');
  });

  test('[WPPOPENDS-T1303] Check that the chat is minimized after sending a message', async ({ page }) => {
    const logs: string[] = [];
    page.on('console', msg => logs.push(msg.text()));

    await wppChatInputPage.chatInputContainer.nth(1).click();
    await wppChatInputPage.textInput.nth(1).fill('Test message for minimize');
    await wppChatInputPage.sendMessageBtn.nth(1).click();
    await expect.poll(() => logs.some(log => log.includes('Message sent: Test message for minimize'))).toBe(true);
    await expect(wppChatInputPage.chatInputContainer.nth(1)).toHaveCSS('height', '48px');
  });

  test('[WPPOPENDS-T1304] Check that the cursor is in focus when opening a chat with text', async ({ page }) => {
    await wppChatInputPage.chatInputContainer.nth(1).click();
    await wppChatInputPage.textInput.nth(1).fill(textMessage);
    await wppChatInputPage.chatInputComponent.click();
    await wppChatInputPage.chatInputContainer.nth(1).click();
    await page.waitForTimeout(5000);

    await expect(wppChatInputPage.chatInputContainer.nth(1)).toHaveScreenshot({ maxDiffPixels: 30 });
  });

  test('[WPPOPENDS-T1305] Check that the cursor is in focus when pasting text', async ({ page }) => {
    await wppChatInputPage.chatInputContainer.nth(1).click();
    await wppChatInputPage.textInput.nth(1).fill(textMessage);
    await page.waitForTimeout(5000);

    await expect(wppChatInputPage.chatInputContainer.nth(1)).toHaveScreenshot({ maxDiffPixels: 30 });
  });

  test('[WPPOPENDS-T1306] Check that spaces at the beginning/end are removed when sending the message ', async ({ page }) => {
    const logs: string[] = [];
    page.on('console', msg => logs.push(msg.text()));

    await wppChatInputPage.chatInputContainer.nth(1).click();
    await wppChatInputPage.textInput.nth(1).fill('   message with spaces   ');
    await wppChatInputPage.sendMessageBtn.nth(1).click();

    await expect.poll(() => logs.some(log => log.includes('Message sent: message with spaces'))).toBe(true);
  });
});



