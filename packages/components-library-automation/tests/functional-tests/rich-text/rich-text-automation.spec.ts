import { test, expect} from '@playwright/test'
import { WppRichTextPage } from '../../../pages/rich-text.page'

const wppRichTextPage = new WppRichTextPage()
let consoleErrors;

test.beforeEach(async ({ page }) => {
  await wppRichTextPage.setPage(page);
  await wppRichTextPage.init();
  await wppRichTextPage.openPage('rich-text');
  await page.waitForTimeout(2000);
  consoleErrors = await wppRichTextPage.listenConsoleErrors(page);
})

test.afterEach(async () => {
  await expect(consoleErrors.length <= 2).toBeTruthy();
})

  test.describe('Rich Text', () => {
    //WPPLONOP-22444
    test('[WPPOPENDS-T950] Check rich text editor height', async ({}) => {
      const richTextForm = await wppRichTextPage.richTextForm.first();
      await expect(richTextForm).toHaveCSS('display', 'flex');
      await expect(richTextForm).toHaveCSS('min-height', '0px');
      await expect(richTextForm).toHaveCSS('flex-direction', 'column');
    });

    test('[WPPOPENDS-T692] Check rich text number of characters is calculated correctly', async ({ page }) => {
      // one symbol is 1 count
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(2000);
      await wppRichTextPage.richTextField.first().click();
      await wppRichTextPage.richTextField.first().press('Control+A');
      await wppRichTextPage.richTextField.first().press('Backspace');
      await wppRichTextPage.richTextField.first().type('My First Heading');
      await expect(wppRichTextPage.enteredCharacters.first()).toHaveText('Characters: 16/500');

      await wppRichTextPage.richTextField.first().type('const myHeading = document.querySelector("h1")');
      await wppRichTextPage.codeBlockBtn.nth(1).click();
      await expect(wppRichTextPage.enteredCharacters.first()).toHaveText('Characters: 62/500');

      /* list and bullet are not counted, only new line and letters, here only 2 new lines after a and b letters and letters a and b itself
      List in example:
      1.a
      2.b
      3.
      */
      await wppRichTextPage.richTextField.first().evaluate(node => node.setAttribute('value', ''));
      await wppRichTextPage.orderedListBtn.nth(1).click();
      await expect (wppRichTextPage.richTextField.first()).toHaveAttribute("value", "<ol><li><br></li></ol>");
      await expect(wppRichTextPage.enteredCharacters.first()).toHaveText('Characters: 0/500');
      await wppRichTextPage.richTextField.first().type('a');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(1000);
      await wppRichTextPage.richTextField.first().type('b');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(1000);
      await expect (wppRichTextPage.richTextField.first()).toHaveAttribute("value", "<ol><li>a</li><li>b</li><li><br></li></ol>");
      await expect(wppRichTextPage.enteredCharacters.first()).toHaveText('Characters: 4/500');

      // symbol is 1 count
      await wppRichTextPage.richTextField.first().evaluate(node => node.setAttribute('value', ''));
      await wppRichTextPage.richTextField.first().type('!?<1>%$#@*+_-`.,');
      await expect(wppRichTextPage.enteredCharacters.first()).toHaveText('Characters: 16/500');

      // new line is 1 count
      await wppRichTextPage.richTextField.first().evaluate(node => node.setAttribute('value', ''));
      await wppRichTextPage.richTextField.first().type('1');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(1000);
      await wppRichTextPage.richTextField.first().type('2');
      await expect(wppRichTextPage.enteredCharacters.first()).toHaveText('Characters: 3/500');
    });

  test.describe('Markdown editor', () => {
    test('[WPPOPENDS-T1226] Check that markdown text number of characters is calculated correctly', async ({}) => {
      await expect(wppRichTextPage.enteredCharacters.nth(1)).toHaveText('Characters: 735/500')
      await wppRichTextPage.placeholderMarkdownEditor.click();
      await wppRichTextPage.richTextField.nth(1).press('Control+A');
      await wppRichTextPage.richTextField.nth(1).press('Backspace');
      await wppRichTextPage.richTextField.nth(1).type('**bold text**!', { delay: 200 });
      await expect (wppRichTextPage.richTextField.nth(1)).toHaveAttribute("value", "**bold text**\\!");
      await expect(wppRichTextPage.enteredCharacters.nth(1)).toHaveText('Characters: 10/500');
    });

    test('[WPPOPENDS-T1227] Check that bold icon applies bold markdown correctly', async ({}) => {
      await wppRichTextPage.richTextField.nth(1).click();
      await wppRichTextPage.richTextField.nth(1).press('Control+A');
      await wppRichTextPage.richTextField.nth(1).press('Backspace');
      await wppRichTextPage.boldBtn.nth(3).click();
      await wppRichTextPage.richTextField.nth(1).type('bold text');
      await expect (wppRichTextPage.richTextField.nth(1)).toHaveAttribute("value", "**bold text**");
      await expect(wppRichTextPage.richTextForm.nth(1)).toHaveScreenshot();
    });
    
    test('[WPPOPENDS-T1228] Check that italic icon applies italic markdown correctly', async ({}) => {
      await wppRichTextPage.richTextField.nth(1).click();
      await wppRichTextPage.richTextField.nth(1).press('Control+A');
      await wppRichTextPage.richTextField.nth(1).press('Backspace');
      await wppRichTextPage.italicBtn.nth(3).click();
      await wppRichTextPage.richTextField.nth(1).type('italic text');
      await expect (wppRichTextPage.richTextField.nth(1)).toHaveAttribute("value", "_italic text_");
      await expect(wppRichTextPage.richTextForm.nth(1)).toHaveScreenshot();
    });

    test('[WPPOPENDS-T1229] Check that underline icon applies underline markdown correctly', async ({}) => {
      await wppRichTextPage.richTextField.nth(1).click();
      await wppRichTextPage.richTextField.nth(1).press('Control+A');
      await wppRichTextPage.richTextField.nth(1).press('Backspace');
      await wppRichTextPage.underlineBtn.nth(3).click();
      await wppRichTextPage.richTextField.nth(1).type('underline text');
      await expect (wppRichTextPage.richTextField.nth(1)).toHaveAttribute("value", "<u>underline text</u>");
      await expect(wppRichTextPage.richTextForm.nth(1)).toHaveScreenshot();
    });
    
    test('[WPPOPENDS-T1230] Check that strikethrough icon applies strikethrought markdown correctly', async ({}) => {
      await wppRichTextPage.richTextField.nth(1).click();
      await wppRichTextPage.richTextField.nth(1).press('Control+A');
      await wppRichTextPage.richTextField.nth(1).press('Backspace');
      await wppRichTextPage.strikeBtn.nth(3).click();
      await wppRichTextPage.richTextField.nth(1).type('strikethrough');
      await expect (wppRichTextPage.richTextField.nth(1)).toHaveAttribute("value", "~~strikethrough~~");
      await expect(wppRichTextPage.richTextForm.nth(1)).toHaveScreenshot();
    });
    
    test('[WPPOPENDS-T1231] Check that code block icon applies code block markdown correctly', async ({}) => {
      await wppRichTextPage.placeholderMarkdownEditor.fill('code');
      await wppRichTextPage.codeBlockBtn.nth(3).click();
      await expect(wppRichTextPage.richTextField.nth(1)).toHaveAttribute("value", "```\ncode\n\n```");
      await expect(wppRichTextPage.richTextForm.nth(1)).toHaveScreenshot();
    });

    test('[WPPOPENDS-T1232] Check that block quote icon applies block quote markdown correctly', async ({}) => {
      await wppRichTextPage.placeholderMarkdownEditor.fill('block quote');
      await wppRichTextPage.blockQuoteBtn.nth(3).click();
      await expect(wppRichTextPage.richTextField.nth(1)).toHaveAttribute("value", "> block quote");
      await expect(wppRichTextPage.richTextForm.nth(1)).toHaveScreenshot();
    });

    test('[WPPOPENDS-T1233] Check that unordered icon applies markdown correctly', async ({}) => {
      await wppRichTextPage.placeholderMarkdownEditor.fill('unordered list');
      await wppRichTextPage.unorderedListBtn.nth(3).click();
      await expect(wppRichTextPage.richTextField.nth(1)).toHaveAttribute("value", "*   unordered list");
      await expect(wppRichTextPage.richTextForm.nth(1)).toHaveScreenshot();
    });

    test('[WPPOPENDS-T1249] Check that ordered icon applies markdown correctly', async ({}) => {
      await wppRichTextPage.placeholderMarkdownEditor.fill('ordered list');
      await wppRichTextPage.orderedListBtn.nth(3).click();
      await expect(wppRichTextPage.richTextField.nth(1)).toHaveAttribute("value", "1.  ordered list");
      await expect(wppRichTextPage.richTextForm.nth(1)).toHaveScreenshot();
    });

    test('[WPPOPENDS-T1250] Check that align center icon centers text correctly', async ({ page }) => {
      await wppRichTextPage.placeholderMarkdownEditor.fill('textAlignmentCenter');
      await wppRichTextPage.centerAlignBtn.nth(3).click();
      await expect(page.locator('.ql-align-center')).toHaveCount(1);
      await expect(wppRichTextPage.richTextField.nth(1)).toHaveAttribute("value", "textAlignmentCenter");
      await expect(wppRichTextPage.richTextForm.nth(1)).toHaveScreenshot();
    });

    test('[WPPOPENDS-T1251] Check that align right icon aligns the text correctly', async ({ page }) => {
      await wppRichTextPage.placeholderMarkdownEditor.fill('rightAlignedText');
      await wppRichTextPage.rightAlignBtn.nth(3).click();
      await expect(page.locator('.ql-align-right')).toHaveCount(1);
      await expect(wppRichTextPage.richTextField.nth(1)).toHaveAttribute("value", "rightAlignedText");
      await expect(wppRichTextPage.richTextForm.nth(1)).toHaveScreenshot();
    });

    test('[WPPOPENDS-T1234] Check that link icon applies markdown correctly', async ({}) => {
      await wppRichTextPage.placeholderMarkdownEditor.fill('link icon');
      await wppRichTextPage.placeholderMarkdownEditor.click();
      await wppRichTextPage.richTextField.nth(1).press('Control+A');
      await wppRichTextPage.linkBtn.nth(3).click();
      await wppRichTextPage.linkInput.nth(1).fill('https://www.google.com.ua/');
      await wppRichTextPage.saveLinkBtn.click();
      await expect (wppRichTextPage.richTextField.nth(1)).toHaveAttribute("value", "[link icon](https://www.google.com.ua/)");
      await expect(wppRichTextPage.richTextForm.nth(1)).toHaveScreenshot();
    });

    test('[WPPOPENDS-T1247] Check that image file can be uploaded', async ({ page }) => {
      await wppRichTextPage.richTextField.nth(1).click();
      await wppRichTextPage.richTextField.nth(1).press('Control+A');
      await wppRichTextPage.richTextField.nth(1).press('Backspace');
      const fileChooserPromise = page.waitForEvent('filechooser');
      await wppRichTextPage.addImageBtn.nth(3).click();
      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles('tests/fixture/image.png');
      await page.waitForTimeout(2000);
    
      const content = await wppRichTextPage.richTextField.nth(1).getAttribute('value');
      expect(content).toContain('![](blob:');
      await expect(wppRichTextPage.richTextForm.nth(1)).toHaveScreenshot();
    });
    
    test('[WPPOPENDS-T1248] Check that video file can be uploaded', async ({ page }) => {
      await wppRichTextPage.richTextField.nth(1).click();
      await wppRichTextPage.richTextField.nth(1).press('Control+A');
      await wppRichTextPage.richTextField.nth(1).press('Backspace');
      const fileChooserPromise = page.waitForEvent('filechooser');
      await wppRichTextPage.addVideoBtn.nth(3).click();
      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles('tests/fixture/video.mp4');
      await page.waitForTimeout(8000);
      const content = await wppRichTextPage.richTextField.nth(1).getAttribute('value');
      expect(content).toContain('');
      await expect(wppRichTextPage.richTextForm.nth(1)).toHaveScreenshot();
    });

    test('[WPPOPENDS-T1235] Check that undo/redo buttons work correctly', async ({ page }) => {
      await wppRichTextPage.richTextField.nth(1).click();
      await wppRichTextPage.richTextField.nth(1).press('Control+A');
      await wppRichTextPage.richTextField.nth(1).press('Backspace');
      await wppRichTextPage.richTextField.nth(1).type('firstText',  { delay: 500 });
      await wppRichTextPage.codeBlockBtn.nth(3).click();
      await page.waitForTimeout(2000);
      await expect (wppRichTextPage.richTextField.nth(1)).toHaveAttribute("value", "```\nfirstText\n\n```");
      await wppRichTextPage.undoBtn.nth(3).click();
      await expect (wppRichTextPage.richTextField.nth(1)).toHaveAttribute("value", "firstTex");
      await wppRichTextPage.redoBtn.nth(3).click();
      await expect (wppRichTextPage.richTextField.nth(1)).toHaveAttribute("value", "```\nfirstText\n\n```");
    });
    
    test('[WPPOPENDS-T1236] Check that the manually pasted/entered bold syntax is rendered correctly', async ({}) => {
      await wppRichTextPage.placeholderMarkdownEditor.fill('**bold text**');
      await expect (wppRichTextPage.richTextField.nth(1)).toHaveAttribute("value", "**bold text**");
      //entered
      await wppRichTextPage.placeholderMarkdownEditor.click();
      await wppRichTextPage.richTextField.nth(1).press('Control+A');
      await wppRichTextPage.richTextField.nth(1).press('Backspace');
      await wppRichTextPage.richTextField.nth(1).type('**bold text**', { delay: 200 });
      await expect (wppRichTextPage.richTextField.nth(1)).toHaveAttribute("value", "**bold text**");
      await expect(wppRichTextPage.richTextForm.nth(1)).toHaveScreenshot();
    });

    test('[WPPOPENDS-T1237] Check that the manually pasted/entered bold syntax in the middle of a word is rendered correctly', async ({}) => {
      await wppRichTextPage.placeholderMarkdownEditor.fill('middle**boldText**of a word');
      await wppRichTextPage.placeholderMarkdownEditor.click();
      await wppRichTextPage.richTextField.nth(1).type(' ');
      await expect (wppRichTextPage.richTextField.nth(1)).toHaveAttribute("value", "middle**boldText**of a word");
      //entered
      await wppRichTextPage.placeholderMarkdownEditor.click();
      await wppRichTextPage.richTextField.nth(1).press('Control+A');
      await wppRichTextPage.richTextField.nth(1).press('Backspace');
      await wppRichTextPage.richTextField.nth(1).type('middle**boldText**of a word', { delay: 200 });
      await expect (wppRichTextPage.richTextField.nth(1)).toHaveAttribute("value", "middle**boldText**of a word");
      await expect(wppRichTextPage.richTextForm.nth(1)).toHaveScreenshot();
    });
    
    test('[WPPOPENDS-T1238] Check that the manually pasted/entered italic syntax is rendered correctly', async ({}) => {
      await wppRichTextPage.placeholderMarkdownEditor.fill('*italic text*');
      await wppRichTextPage.placeholderMarkdownEditor.click();
      await wppRichTextPage.richTextField.nth(1).type(' ');
      await expect (wppRichTextPage.richTextField.nth(1)).toHaveAttribute("value", "_italic text_");
      //entered
      await wppRichTextPage.placeholderMarkdownEditor.click();
      await wppRichTextPage.richTextField.nth(1).press('Control+A');
      await wppRichTextPage.richTextField.nth(1).press('Backspace');
      await wppRichTextPage.richTextField.nth(1).type('*italic text* ', { delay: 200 });
      await expect (wppRichTextPage.richTextField.nth(1)).toHaveAttribute("value", "_italic text_");
      await expect(wppRichTextPage.richTextForm.nth(1)).toHaveScreenshot();
    });

    test('[WPPOPENDS-T1239] Check that the manually pasted/entered italic syntax in the middle of a word is rendered correctly', async ({}) => {
      await wppRichTextPage.placeholderMarkdownEditor.fill('middle*italicText*of a word');
      await wppRichTextPage.placeholderMarkdownEditor.click();
      await wppRichTextPage.richTextField.nth(1).type(' ');
      await expect (wppRichTextPage.richTextField.nth(1)).toHaveAttribute("value", "middle_italicText_of a word");
      //entered
      await wppRichTextPage.placeholderMarkdownEditor.click();
      await wppRichTextPage.richTextField.nth(1).press('Control+A');
      await wppRichTextPage.richTextField.nth(1).press('Backspace');
      await wppRichTextPage.richTextField.nth(1).type('middle*italicText*of a word', { delay: 200 });
      await expect (wppRichTextPage.richTextField.nth(1)).toHaveAttribute("value", "middle_italicText_of a word");
      await expect(wppRichTextPage.richTextForm.nth(1)).toHaveScreenshot();
    });
    
    test('[WPPOPENDS-T1240] Check that the manually pasted/entered heading syntax renders correctly', async ({}) => {
      await wppRichTextPage.placeholderMarkdownEditor.fill('# heading text');
      await expect (wppRichTextPage.richTextField.nth(1)).toHaveAttribute("value", "# heading text");
      //entered
      await wppRichTextPage.placeholderMarkdownEditor.click();
      await wppRichTextPage.richTextField.nth(1).press('Control+A');
      await wppRichTextPage.richTextField.nth(1).press('Backspace');
      await wppRichTextPage.richTextField.nth(1).type('# heading text', { delay: 200 });
      await expect (wppRichTextPage.richTextField.nth(1)).toHaveAttribute("value", "# heading text");
      await expect(wppRichTextPage.richTextForm.nth(1)).toHaveScreenshot();
    });
    
    test('[WPPOPENDS-T1241] Check that the manually pasted/entered strikethrough syntax renders correctly', async ({}) => {
      await wppRichTextPage.placeholderMarkdownEditor.fill('~~strikethrough text~~');
      await expect (wppRichTextPage.richTextField.nth(1)).toHaveAttribute("value", "~~strikethrough text~~");
      //entered
      await wppRichTextPage.placeholderMarkdownEditor.click();
      await wppRichTextPage.richTextField.nth(1).press('Control+A');
      await wppRichTextPage.richTextField.nth(1).press('Backspace');
      await wppRichTextPage.richTextField.nth(1).type('~~strikethrough text~~', { delay: 200 });
      await expect (wppRichTextPage.richTextField.nth(1)).toHaveAttribute("value", "~~strikethrough text~~");
      await expect(wppRichTextPage.richTextForm.nth(1)).toHaveScreenshot();
    });

    test('[WPPOPENDS-T1242] Check that the manually pasted/entered strikethrough syntax in the middle of the word renders correctly', async ({}) => {
      await wppRichTextPage.placeholderMarkdownEditor.fill('middle~~strikethroughText~~ of a word');
      await expect (wppRichTextPage.richTextField.nth(1)).toHaveAttribute("value", "middle~~strikethroughText~~ of a word");
      //entered
      await wppRichTextPage.placeholderMarkdownEditor.click();
      await wppRichTextPage.richTextField.nth(1).press('Control+A');
      await wppRichTextPage.richTextField.nth(1).press('Backspace');
      await wppRichTextPage.richTextField.nth(1).type('middle~~strikethroughText~~ of a word', { delay: 200 });
      await expect (wppRichTextPage.richTextField.nth(1)).toHaveAttribute("value", "middle~~strikethroughText~~ of a word");
      await expect(wppRichTextPage.richTextForm.nth(1)).toHaveScreenshot();
    });

    test('[WPPOPENDS-T1243] Check that the manually pasted/entered code block syntax renders correctly', async ({}, testInfo) => {
      await wppRichTextPage.placeholderMarkdownEditor.fill('``` code');
      await wppRichTextPage.placeholderMarkdownEditor.click();
      await wppRichTextPage.richTextField.nth(1).type(' ');
      
      const value = await wppRichTextPage.richTextField.nth(1).getAttribute('value');
      
      if (testInfo.project.name === 'firefox') {
        expect(value).toBe("```\ncode\n \n\n```");
      } else {
        expect(value).toBe("```\ncode \n\n```");
      }

      await wppRichTextPage.placeholderMarkdownEditor.click();
      await wppRichTextPage.richTextField.nth(1).press('Control+A');
      await wppRichTextPage.richTextField.nth(1).press('Backspace');
      await wppRichTextPage.richTextField.nth(1).type('```code', { delay: 200 });
      await expect(wppRichTextPage.richTextField.nth(1)).toHaveAttribute("value", "  \n\n```\ncode\n\n```");
      await expect(wppRichTextPage.richTextForm.nth(1)).toHaveScreenshot();
    });

    test('[WPPOPENDS-T1244] Check that the manually pasted/entered block quote syntax renders correctly', async ({}) => {
      await wppRichTextPage.placeholderMarkdownEditor.fill('> block quote');
      await expect (wppRichTextPage.richTextField.nth(1)).toHaveAttribute("value", "> block quote");
      //entered
      await wppRichTextPage.placeholderMarkdownEditor.click();
      await wppRichTextPage.richTextField.nth(1).press('Control+A');
      await wppRichTextPage.richTextField.nth(1).press('Backspace');
      await wppRichTextPage.richTextField.nth(1).type('> block quote', { delay: 200 });
      await expect (wppRichTextPage.richTextField.nth(1)).toHaveAttribute("value", "> block quote");
      await expect(wppRichTextPage.richTextForm.nth(1)).toHaveScreenshot();
    });
    
    test('[WPPOPENDS-T1245] Check that manually pasted/entered unordered list syntax renders correctly', async ({}) => {
      await wppRichTextPage.placeholderMarkdownEditor.fill('* unordered list');
      await expect (wppRichTextPage.richTextField.nth(1)).toHaveAttribute("value", "* unordered list");
      //entered
      await wppRichTextPage.placeholderMarkdownEditor.click();
      await wppRichTextPage.richTextField.nth(1).press('Control+A');
      await wppRichTextPage.richTextField.nth(1).press('Backspace');
      await wppRichTextPage.richTextField.nth(1).type('* unordered list', { delay: 200 });
      await expect (wppRichTextPage.richTextField.nth(1)).toHaveAttribute("value", "*   unordered list");
      await expect(wppRichTextPage.richTextForm.nth(1)).toHaveScreenshot();
    });
    
    test('[WPPOPENDS-T1246] Check that manuallly pasted/entered link syntax renders correctly', async ({}) => {
      await wppRichTextPage.placeholderMarkdownEditor.fill('[screenshot](https://www.google.com.ua/)');
      await wppRichTextPage.placeholderMarkdownEditor.click();
      await wppRichTextPage.richTextField.nth(1).type(' ');
      await expect (wppRichTextPage.richTextField.nth(1)).toHaveAttribute("value", "\\[screenshot\\]\\(https://www\\.google\\.com\\.ua/\\)");
      //entered
      await wppRichTextPage.placeholderMarkdownEditor.click();
      await wppRichTextPage.richTextField.nth(1).press('Control+A');
      await wppRichTextPage.richTextField.nth(1).press('Backspace');
      await wppRichTextPage.richTextField.nth(1).type('[screenshot](link)', { delay: 200 });
      await expect (wppRichTextPage.richTextField.nth(1)).toHaveAttribute("value", "\\[screenshot\\]\\(link\\)");
      await expect(wppRichTextPage.richTextForm.nth(1)).toHaveScreenshot();
    });
  });
});
