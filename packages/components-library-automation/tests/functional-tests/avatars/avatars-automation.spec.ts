import { test, expect } from '@playwright/test'
import { WppAvatarsPage } from '../../../pages/avatars.page'

const wppAvatarsPage = new WppAvatarsPage()

test.beforeEach(async ({ page }) => {
    await wppAvatarsPage.setPage(page)
    await wppAvatarsPage.init()
    await wppAvatarsPage.openPage('vc/avatars')
})

test.describe('Avatars', () => {
    // WPPLONOP-24144
    test('[WPPOPENDS-T591] Check the size of avatar icons', async () => {
        const avatarWithoutImageSize = await wppAvatarsPage.avatarWithoutImage.nth(3).boundingBox()
        await expect(avatarWithoutImageSize?.height).toEqual(56)
        await expect(avatarWithoutImageSize?.width).toEqual(56)

        const avatarWithoutImageLVariantSize = await wppAvatarsPage.avatarWithoutImageLVariant.boundingBox()
        await expect(avatarWithoutImageLVariantSize?.height).toEqual(72)
        await expect(avatarWithoutImageLVariantSize?.width).toEqual(72)
    })

    //WPPLONOP-22744
    test('[WPPOPENDS-T926] Check that avatar images are present', async () => {
        await expect(wppAvatarsPage.avatarIcon.first().locator('svg')).toHaveAttribute('role', 'presentation')
    })

    test('[WPPOPENDS-T898] Check that the event is sent in the console when you click on the avatar groups', async ({ page }) => {
        const eventDetail = await Promise.race([
            page.evaluate(() => {
                return new Promise(resolve => {
                    document.addEventListener('wppSelectItem', (event: any) => {
                        resolve(event.detail);
                    }, { once: true });
                });
            }),
            (async () => {
                await wppAvatarsPage.avatarGroups.nth(3).click();
            })()
        ]);

        expect(eventDetail).not.toBeNull();
        expect(eventDetail).toMatchObject({
            avatarIndex: 3,
            fromDropdown: false
        });
    });

    test('[WPPOPENDS-T989] Check that the event is sent in the console when you click on the avatar from drop-down list', async ({ page }) => {
        const eventDetail = await Promise.race([
            page.evaluate(() => {
                return new Promise(resolve => {
                    document.addEventListener('wppSelectItem', (event: any) => {
                        resolve(event.detail);
                    }, { once: true });
                });
            }),
            (async () => {
                await wppAvatarsPage.moreButton.click();
                await wppAvatarsPage.avatarFromDropdown.nth(1).click();
            })()
        ]);

        expect(eventDetail).not.toBeNull();
        expect(eventDetail).toMatchObject({
            avatarIndex: 1,
            fromDropdown: true
        });
    });

    test('[WPPOPENDS-T986] Check that the event is sent in the console when you click on the avatars', async ({ page }) => {
        const eventDetailPromise = page.locator('[data-testid="hover-avatar"]').evaluate((icon) => {
            return new Promise(resolve => {
                icon.addEventListener('wppClick', (event: any) => {
                    let value = event.detail?.value;
                    if (value instanceof HTMLElement) {
                        value = value.getAttribute('class') || value.textContent;
                    }
    
                    resolve(value);
                }, { once: true });
            });
        });

        await wppAvatarsPage.avatarWithoutImage.nth(2).click();

        const eventDetail = await eventDetailPromise;
    
        expect(eventDetail).not.toBeNull();
        expect(eventDetail).toContain('wpp-avatar with-tooltip size-m');
    });

    test('[WPPOPENDS-T987] Check that the event is sent in the console when you click on the logo', async () => {
        const eventDetailPromise = wppAvatarsPage.avatarLogo.nth(2).evaluate((icon) => {
            return new Promise(resolve => {
                icon.addEventListener('wppClick', (event: any) => {
                    let value = event.detail?.value;
                    if (value instanceof HTMLElement) {
                        value = value.getAttribute('class') || value.textContent;
                    }
    
                    resolve(value);
                }, { once: true });
            });
        });

        await wppAvatarsPage.avatarLogo.nth(2).click();

        const eventDetail = await eventDetailPromise;
    
        expect(eventDetail).not.toBeNull();
        expect(eventDetail).toContain('AvatarsVC_item__re2Ww wpp-avatar size-m');
    });

    test('[WPPOPENDS-T988] Check that the event is sent in the console when you click on the icon', async ({ page }) => {
        const eventDetailPromise = wppAvatarsPage.avatarLogo.nth(5).evaluate((icon) => {
            return new Promise(resolve => {
                icon.addEventListener('wppClick', (event: any) => {
                    let value = event.detail?.value;
                    if (value instanceof HTMLElement) {
                        value = value.getAttribute('class') || value.textContent;
                    }
    
                    resolve(value);
                }, { once: true });
            });
        });

        await wppAvatarsPage.avatarIcon.nth(2).click();

        const eventDetail = await eventDetailPromise;
    
        expect(eventDetail).not.toBeNull();
        expect(eventDetail).toContain('AvatarsVC_item__re2Ww wpp-avatar size-m');
    });
    
    test('[WPPOPENDS-T1275] Check that the +n button has a correct hover state', async ({ page }) => {
        await wppAvatarsPage.avatarWithoutImage.nth(65).hover();
        await expect(wppAvatarsPage.avatarWithoutImage.nth(65)).toHaveCSS('cursor', 'pointer');
        await expect(wppAvatarsPage.avatarWithoutImage.nth(65)).toHaveCSS('z-index', '1');
        await expect(wppAvatarsPage.avatarWithoutImage.nth(65)).toHaveCSS('--avatar-counter-bg-color-hover', '#F4F5F7');
    });
    
    test('[WPPOPENDS-T1274] Check that the avatars has a correct hover state', async ({ page }) => {
        await wppAvatarsPage.avatarWithoutImage.nth(59).hover();
        await expect(wppAvatarsPage.avatarWithoutImage.nth(59)).toHaveCSS('cursor', 'pointer');
        await expect(wppAvatarsPage.avatarWithoutImage.nth(59)).toHaveCSS('z-index', '1');
        const bgColor = await wppAvatarsPage.avatarWithoutImage.nth(59).evaluate(el =>
                window.getComputedStyle(el, '::before').getPropertyValue('background-color')
            );
        await expect(bgColor.trim()).toBe('rgba(255, 255, 255, 0.4)');
    });
});
