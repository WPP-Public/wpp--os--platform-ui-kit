import { test, expect } from '@playwright/test'
import { WppTimePickerPage } from '../../../pages/time-picker.page'

const wppTimePickerPage = new WppTimePickerPage();

let consoleErrors

test.beforeEach(async ({ page }) => {
  await wppTimePickerPage.setPage(page)
  await wppTimePickerPage.init()
  await wppTimePickerPage.openPage('time-picker')
  await page.waitForTimeout(1000)
  consoleErrors = await wppTimePickerPage.listenConsoleErrors(page)
})

test.afterEach(async () => {
  await expect(consoleErrors.length === 0).toBeTruthy()
})

test.describe('Time Picker', () => {
    test('[WPPOPENDS-T968] Check that all component states match the design', async({ page }) => {
        //m-size
        await expect(wppTimePickerPage.timePickerSizeM.nth(0)).toHaveCSS('width', '198px');
        await expect(wppTimePickerPage.timePickerSizeM.nth(0)).toHaveCSS('height', '40px');
        //s-size
        await expect(wppTimePickerPage.timePickerSizeS.nth(0)).toHaveCSS('width', '198px');
        await expect(wppTimePickerPage.timePickerSizeS.nth(0)).toHaveCSS('height', '32px');
        //disavled state
        await expect(wppTimePickerPage.timePickerDisabled.nth(0)).toHaveClass(/disabled/);
        await expect(wppTimePickerPage.timePickerDisabled).toHaveCSS('background-color', 'rgb(248, 249, 251)');
        await expect(wppTimePickerPage.timePickerDisabled).toHaveCSS('border-color', 'rgb(193, 199, 205)');
        //hover state
        await wppTimePickerPage.timePickerSizeM.nth(0).hover();
        await expect(wppTimePickerPage.timePickerSizeM.nth(0)).toHaveCSS('background-color', 'rgb(244, 245, 247)');
        await expect(wppTimePickerPage.timePickerSizeM.nth(0)).toHaveCSS('border-color', 'rgb(105, 112, 119)');
        //focus state
        await wppTimePickerPage.timePickerSizeM.nth(0).click();
        await expect(wppTimePickerPage.timePickerFocus.nth(0)).toHaveCSS('border-color', 'rgb(77, 83, 88)');
        //filed state
        await wppTimePickerPage.setHoursFromDropDownList('04').click();
        await wppTimePickerPage.setMinutesFromDropDownList('15').click();
        await expect(wppTimePickerPage.timePickerFiled.nth(0)).toHaveCSS('border-color', 'rgb(162, 169, 176)');
    });

    test('[WPPOPENDS-T969] Check that the field is cleared after clicking on the cross', async() => {
        await wppTimePickerPage.timePickerSizeM.nth(0).click();
        await wppTimePickerPage.setHoursFromDropDownList('08').click();
        await wppTimePickerPage.setMinutesFromDropDownList('45').click();
        await expect(wppTimePickerPage.timePickerInput.nth(0)).toHaveValue('08:45');
        await wppTimePickerPage.clearTimePickerBtn.nth(0).click();
        await expect(wppTimePickerPage.timePickerInput.nth(0)).toHaveValue('');        
    });

    test('[WPPOPENDS-T970] Check that the correct time is set using the drop-down list', async() => {
        await wppTimePickerPage.timePickerSizeM.nth(0).click();
        await wppTimePickerPage.setHoursFromDropDownList('08').click();
        await wppTimePickerPage.setMinutesFromDropDownList('30').click();
        await expect(wppTimePickerPage.timePickerInput.nth(0)).toHaveValue('08:30');
    });

    test('[WPPOPENDS-T971] Check that the time can be set without using the drop-down list', async() => {
        await wppTimePickerPage.timePickerSizeM.nth(0).click();
        await wppTimePickerPage.timePickerSizeM.nth(0).type('1230', { delay: 200 });
        await expect(wppTimePickerPage.timePickerInput.nth(0)).toHaveValue('12:30')
    });

    test('[WPPOPENDS-T972] Check that the correct time is set after clicking the "Set value" button', async() => {
        //7:30
        await wppTimePickerPage.setValueAndMinutesIntervalBtn.nth(0).click();
        await expect(wppTimePickerPage.timePickerInput.nth(0)).toHaveValue('07:30');
        //7:45
        await wppTimePickerPage.setValueAndMinutesIntervalBtn.nth(1).click();
        await expect(wppTimePickerPage.timePickerInput.nth(0)).toHaveValue('07:45');
        //7:25
        await wppTimePickerPage.setValueAndMinutesIntervalBtn.nth(4).click();
        await wppTimePickerPage.setValueAndMinutesIntervalBtn.nth(2).click();
        await expect(wppTimePickerPage.timePickerInput.nth(0)).toHaveValue('07:25');
    });

    test('[WPPOPENDS-T973] Check that an incorrect time cannot be entered', async() => {
        await wppTimePickerPage.timePickerSizeM.nth(0).click();
        await wppTimePickerPage.timePickerSizeM.nth(0).type('6666');
        await expect(wppTimePickerPage.timePickerInput.nth(0)).toHaveValue('23:45');   
    });

    test('[WPPOPENDS-T974] Check that letters and symbols cannot be entered', async() => {
        await wppTimePickerPage.timePickerSizeM.nth(0).click();
        await wppTimePickerPage.timePickerSizeM.nth(0).type('TExp<>?');
        await expect(wppTimePickerPage.timePickerInput.nth(0)).toHaveValue('hh:mm'); 
    });

    test('[WPPOPENDS-T975] Check that the minute interval can be changed', async({ page }) => {
        //minutes interval 01
        await wppTimePickerPage.setValueAndMinutesIntervalBtn.nth(4).click();
        await wppTimePickerPage.timePickerSizeM.nth(0).click();
        await page.waitForTimeout(1000);
        await wppTimePickerPage.timePickerSizeM.nth(0).type('1211', { delay: 400 });
        await page.waitForTimeout(1000);
        await expect(wppTimePickerPage.timePickerInput.nth(0)).toHaveValue('12:11');
        await wppTimePickerPage.clearTimePickerBtn.nth(0).click();
        //minutes interval 05
        await wppTimePickerPage.setValueAndMinutesIntervalBtn.nth(5).click();
        await page.waitForTimeout(1000);
        await wppTimePickerPage.timePickerSizeM.nth(0).click();
        await page.waitForTimeout(1000);
        await wppTimePickerPage.timePickerSizeM.nth(0).type('1010', { delay: 400 });
        await page.waitForTimeout(1000);
        await expect(wppTimePickerPage.timePickerInput.nth(0)).toHaveValue('10:10');
        await wppTimePickerPage.clearTimePickerBtn.nth(0).click();
        //minutes interval 10
        await wppTimePickerPage.setValueAndMinutesIntervalBtn.nth(6).click();
        await wppTimePickerPage.timePickerSizeM.nth(0).click();
        await page.waitForTimeout(1000);
        await wppTimePickerPage.timePickerSizeM.nth(0).type('1020', { delay: 600 });
        await page.waitForTimeout(1000);
        await expect(wppTimePickerPage.timePickerInput.nth(0)).toHaveValue('10:20');
        await wppTimePickerPage.clearTimePickerBtn.nth(0).click();
        //minutes interval 15
        await wppTimePickerPage.setValueAndMinutesIntervalBtn.nth(7).click();
        await wppTimePickerPage.timePickerSizeM.nth(0).click();
        await page.waitForTimeout(1000);
        await wppTimePickerPage.timePickerSizeM.nth(0).type('1015', { delay: 400 });
        await expect(wppTimePickerPage.timePickerInput.nth(0)).toHaveValue('10:15');
    });

    test('[WPPOPENDS-T976] Check that the set time is displayed at the top of the drop-down list when you reopen it', async() => {
        await wppTimePickerPage.setValueAndMinutesIntervalBtn.nth(4).click();
        await wppTimePickerPage.timePickerSizeM.nth(0).click();
        await wppTimePickerPage.setHoursFromDropDownList('08').click();
        await wppTimePickerPage.setMinutesFromDropDownList('30').click();
        await wppTimePickerPage.timePickerFiled.nth(0).click();

        const scrollPositionHoursSections = await wppTimePickerPage.hoursSectionDropDownList.evaluate((el) => {
            return el.scrollTop;
        });
        const scrollPositionMinutesSections = await wppTimePickerPage.minutesSectionDropDownList.evaluate((el) => {
            return el.scrollTop;
        });
        await expect(scrollPositionHoursSections).toBe(288); 
        await expect(scrollPositionMinutesSections).toBe(1080); 
    });

    test('[WPPOPENDS-T1003] Check that the entered hours automatically scrolls to the top of the drop-down list', async({ page }) => {
        await wppTimePickerPage.setValueAndMinutesIntervalBtn.nth(4).click();
        await wppTimePickerPage.timePickerSizeM.nth(0).click();
        await wppTimePickerPage.timePickerInput.nth(0).type('08');
        await page.waitForTimeout(3000);

        const scrollPositionHoursSections = await wppTimePickerPage.hoursSectionDropDownList.evaluate((el) => {
            return el.scrollTop;
        });

        await expect(scrollPositionHoursSections).toBe(288);
        await wppTimePickerPage.timePickerInput.nth(0).type('15');
        await wppTimePickerPage.timePickerFiled.nth(0).click();

        const scrollPositionMinutesSections = await wppTimePickerPage.minutesSectionDropDownList.evaluate((el) => {
            return el.scrollTop;
        });

        await expect(scrollPositionMinutesSections).toBe(540); 
    });

    test('[WPPOPENDS-T1004] Check that the input automatically updates the minutes to respect the minutesInterval', async({ page }) => {
        await wppTimePickerPage.timePickerSizeM.nth(0).click();
        await page.waitForTimeout(1000);
        await wppTimePickerPage.timePickerSizeM.nth(0).type('1212', { delay:400 });
        await expect(wppTimePickerPage.timePickerInput.nth(0)).toHaveValue('12:15');
        await wppTimePickerPage.setValueAndMinutesIntervalBtn.nth(5).click();
        await wppTimePickerPage.timePickerInput.nth(0).click();
        await page.waitForTimeout(1000);
        await wppTimePickerPage.timePickerInput.nth(0).type('1022', { delay: 400 });
        await expect(wppTimePickerPage.timePickerInput.nth(0)).toHaveValue('10:20');
    });

    test('[WPPOPENDS-T977] Check that the event contains a name', async({ page }) => {
        const eventDetail = await Promise.race([
            page.evaluate(() => {
                return new Promise(resolve => {
                    document.addEventListener('wppChange', (event: any) => {
                        resolve(event.detail);
                    }, { once: true });
                });
            }),
            (async () => {
                await wppTimePickerPage.timePickerSizeM.nth(0).click();
                await wppTimePickerPage.setHoursFromDropDownList('08').click();
                await wppTimePickerPage.setMinutesFromDropDownList('30').click();
            })()
        ]);

        expect(eventDetail).not.toBeNull();
        expect(eventDetail).toMatchObject({
            name: 'time-picker'
        }); 
    });

    test('[WPPOPENDS-T990] Check that the screenshot test passed', async() => {
        await expect(wppTimePickerPage.timePickerContainer).toHaveScreenshot();  
    });
});
