import { test, expect } from '@playwright/test'
import { WppAutocompletePage } from '../../../pages/autocomplete.page'

const wppAutocompletePage = new WppAutocompletePage()
let consoleErrors: string[] = []

test.beforeEach(async ({ page }) => {
  await wppAutocompletePage.setPage(page)
  await wppAutocompletePage.init()
  await wppAutocompletePage.openPage('vc/autocomplete')
  consoleErrors = await wppAutocompletePage.listenConsoleErrors(page)
})

test.afterEach(async () => {
  await expect(consoleErrors.length === 0).toBeTruthy()
})

test.describe('Single Autocomplete', () => {
  //WPPLONOP-4897
  test('[WPPOPENDS-T218] Check that component is focused when the page is opened', async () => {
    await expect(wppAutocompletePage.singleAutocompleteWithoutSuggestions).toBeFocused()
  })

  test('[WPPOPENDS-T210] Check that component can be searched for a valid item and an item can be selected', async () => {
    await wppAutocompletePage.singleAutocompleteWithoutSuggestions.type('Oran')

    await wppAutocompletePage.searchResultShouldHaveText('Orange', 'Oran')

    await wppAutocompletePage.singleAutocompleteWithoutSuggestions.locator('.wpp-list-item:visible').click()

    await expect(wppAutocompletePage.basicWithInitialValuesAutocompleteInput).toHaveText('Orange')
    await expect(wppAutocompletePage.singleAutocompleteWithoutSuggestions.locator('.wpp-icon-cross')).toBeVisible
  })

  test('[WPPOPENDS-T211] Check that component can be searched for a valid item with several spaces before the search query', async () => {
    await wppAutocompletePage.singleAutocompleteWithoutSuggestions.type('   WAter')

    await wppAutocompletePage.searchResultShouldHaveText('Watermelon', 'Water')
  })

  test('[WPPOPENDS-T212] Check that component can be searched for a valid item with several spaces after the search query', async () => {
    await wppAutocompletePage.singleAutocompleteWithoutSuggestions.type('Blueberry    ')

    await wppAutocompletePage.searchResultShouldHaveText('Blueberry', 'Blueberry')
  })

  test('[WPPOPENDS-T213] Check that component can be searched for a valid item with search query under item truncation', async () => {
    await wppAutocompletePage.singleAutocompleteWithoutSuggestions.type('universe')

    await wppAutocompletePage.searchResultShouldHaveText(
      'All the fruits in the world mixed into a SUPER FRUIT MIX! Trimmed to the edge of the universe -_-',
      'universe',
    )
  })

  test('[WPPOPENDS-T214] Check that the component can have default value', async ({ page }) => {
    await wppAutocompletePage.singleAutocompleteWithoutSearchNoSuggest.click()

    await expect(wppAutocompletePage.basicWithInitialValuesAutocompleteInput).toHaveText('Elderberry')

    await wppAutocompletePage.singleAutocompleteWithoutSuggestions.click()
    await page.waitForTimeout(1000)
    await wppAutocompletePage.singleAutocompleteWithoutSuggestions.type('Elder')

    await expect(
      wppAutocompletePage.singleAutocompleteWithoutSuggestions
        .locator('.wpp-list-item:visible .highlight-text')
        .first(),
    ).toHaveText('Elderberry')
    await expect(
      wppAutocompletePage.singleAutocompleteWithoutSuggestions.locator('.wpp-list-item:visible'),
    ).toHaveJSProperty('checked', true)
  })

  test('[WPPOPENDS-T215] Check that the item remains selected when you click on it again', async () => {
    await wppAutocompletePage.singleAutocompleteWithoutSuggestions.type('elder')
    await wppAutocompletePage.singleAutocompleteWithoutSuggestions.locator('[label="Elderberry"]').click()

    await expect(wppAutocompletePage.basicWithInitialValuesAutocompleteInput).toHaveText('Elderberry')
    await expect(wppAutocompletePage.singleAutocompleteWithoutSuggestions).not.toBeFocused()
  })

  test('[WPPOPENDS-T216] Check that the x icon is not displayed', async () => {
    await wppAutocompletePage.singleAutocompleteWithoutSearchNoSuggest.click()
    await expect(wppAutocompletePage.basicWithInitialValuesAutocompleteInput).toHaveText('Elderberry')
    await expect(wppAutocompletePage.singleAutocompleteWithoutSuggestions.locator('.wpp-icon-cross')).not.toBeVisible
  })

  test('[WPPOPENDS-T414] Check that Nothing Found label is displayed when searching for non-existent item', async () => {
    await wppAutocompletePage.singleAutocompleteWithoutSuggestions.type('ololo')

    await expect(
      wppAutocompletePage.singleAutocompleteWithoutSuggestions.locator('.wpp-list-item:visible'),
    ).toHaveCount(2)
    await expect(
      wppAutocompletePage.singleAutocompleteWithoutSuggestions.locator('.wpp-list-item:visible').first(),
    ).toHaveText('Nothing found')
    await expect(
      wppAutocompletePage.singleAutocompleteWithoutSuggestions.locator('.wpp-list-item:visible').nth(1),
    ).toHaveText('Create new element')
  })

  test('[WPPOPENDS-T201] Check that component is closed when clicked outside the component', async () => {
    await wppAutocompletePage.singleAutocompleteWithoutSuggestions.type('test search')
    await wppAutocompletePage.singleAutocompleteWithoutSearchNoSuggest.click()

    await expect(wppAutocompletePage.basicWithInitialValuesAutocompleteInput).toHaveText('Elderberry')
    await expect(wppAutocompletePage.singleAutocompleteWithoutSuggestions.locator('.wpp-icon-cross')).toBeVisible
    await expect(wppAutocompletePage.singleAutocompleteWithoutSuggestions).not.toBeFocused()
  })

  test('[WPPOPENDS-T217] Check that all the items are displayed in the list when simpleSearch=false', async () => {
    await wppAutocompletePage.singleAutocompleteWithoutSearchNoSuggest.click()
    await wppAutocompletePage.singleAutocompleteWithoutSearchNoSuggest.type('Apple')

    await expect(
      wppAutocompletePage.singleAutocompleteWithoutSearchNoSuggest.locator('.wpp-list-item:visible'),
    ).toHaveCount(16)
    await expect(
      wppAutocompletePage.singleAutocompleteWithoutSearchNoSuggest.locator('.highlight').first(),
    ).toBeVisible()
  })

  test('[WPPOPENDS-T336] Check that item can be unselected from the list - Multiple', async ({ page } ) => {
    //Select one more item
    await wppAutocompletePage.regularAutocompleteWithoutSuggestions.click()
    await wppAutocompletePage.regularAutocompleteWithoutSuggestions.type('apple')
    await wppAutocompletePage.regularAutocompleteWithoutSuggestions.locator('[label="Apple"]').click()
    await wppAutocompletePage.missClick.click()
    await page.waitForTimeout(1000)

    //Unselect one item
    await wppAutocompletePage.regularAutocompleteWithoutSuggestions.click()
    await wppAutocompletePage.regularAutocompleteWithoutSuggestions.type('elder')
    await wppAutocompletePage.regularAutocompleteWithoutSuggestions.locator('[label="Elderberry"] li').click()

    await wppAutocompletePage.checkAutocompletePillAndInputValues()
  })

  test('[WPPOPENDS-T335] Check that item can be unselected by clicking x icon on a pill - Multiple', async () => {
    //Select one more item
    await wppAutocompletePage.regularAutocompleteWithoutSuggestions.click()
    await wppAutocompletePage.regularAutocompleteWithoutSuggestions.type('apple')
    await wppAutocompletePage.regularAutocompleteWithoutSuggestions.locator('[label="Apple"]').click()

    //Unselect a pill
    await wppAutocompletePage.regularAutocompleteWithoutSuggestions
      .getByRole('checkbox', { name: /Elderberry/, exact: true })
      .locator('.wpp-icon-cross')
      .click()

    await wppAutocompletePage.checkAutocompletePillAndInputValues()
  })

  test('[WPPOPENDS-T593] Check autocomplete style', async ({}) => {
    await expect(wppAutocompletePage.singleAutocompleteInputWithoutSuggestions).toHaveCSS(
      '--autocomplete-border-color',
      '#A2A9B0',
    )
    await expect(wppAutocompletePage.singleAutocompleteInputWithoutSuggestions).toHaveCSS(
      '--autocomplete-placeholder-color',
      '#697077',
    )
  })

  //WPPLONOP-20535
  //WPPLONOP-20536
  test('[WPPOPENDS-T592] Check autocomplete search with infinite search is not empty', async ({ page }) => {
    await wppAutocompletePage.openPage('bugfixes/20537')

    const autocompleteInput = await page.locator('.autocomplete-input').nth(1)
    const firstVariant = await page.locator('[label="aa.dataaa@company.org"]')
    const secondVariant = await page.locator('[label="user1aa@example.com"]')

    await expect(firstVariant).toBeVisible({ visible: false })
    await expect(secondVariant).toBeVisible({ visible: false })

    await autocompleteInput.fill('aaa')
    await expect(firstVariant).toBeVisible({ visible: true })
    await expect(firstVariant).toHaveAttribute('highlight', 'aaa')

    await autocompleteInput.fill('aa')
    await expect(secondVariant).toBeVisible({ visible: true })
    await expect(secondVariant).toHaveAttribute('highlight', 'aa')
  })

  //WPPLONOP-20537
  test('[WPPOPENDS-T927] Check that if search element is not in list, create new element option is available and after its created, second search shows element in list and create new element option is not avaliable', async ({
    page,
  }) => {
    await wppAutocompletePage.openPage('bugfixes/20537')

    const autocompleteInput = await page.locator('.autocomplete-input').first()
    const createNewOption = await page.locator('.create-new-option.wpp-typography')
    await autocompleteInput.fill('first')
    await expect(createNewOption).toBeVisible({ visible: true })
    await createNewOption.click()
    await autocompleteInput.fill('first')
    await expect(createNewOption).toBeVisible({ visible: false })
    const elementInList = await page.locator('.highlight')
    await expect(elementInList).toHaveText('first')
  })

  test('[WPPOPENDS-T535] Check that "Create new element" button is clickable', async ({ page }) => {
    await wppAutocompletePage.openPage('bugfixes/20537')

    const autocompleteInput = await page.locator('.autocomplete-input').first()
    const createNewOption = await page.locator('.create-new-option.wpp-typography')
    await autocompleteInput.fill('first')
    await expect(page.locator('.nothing-found.wpp-typography')).toBeVisible({ visible: true })
    await expect(createNewOption).toBeVisible({ visible: true })
    await createNewOption.click()
    await expect(page.locator('[slot="selected-values"] >> [label="first"]')).toBeVisible({ visible: true })
  })
//WPPLONOP-32217
  test('[WPPOPENDS-T671] Check dynamic search functionality', async ({ page }) => {
    const apiSearchAutocompleteInput = page.locator('input[placeholder="Type to search..."]').first()
    const firstResult = page.locator(
      ':has-text("Item matching"):has-text("1"):has-text("testAPI").wpp-list-item.wpp-mounted',
    )
    const secondResult = page.locator(
      ':has-text("Item matching"):has-text("2"):has-text("testAPI").wpp-list-item.wpp-mounted',
    )
    await apiSearchAutocompleteInput.scrollIntoViewIfNeeded()
    await apiSearchAutocompleteInput.click()
    await apiSearchAutocompleteInput.type('testAPI')
    await expect(firstResult).toBeVisible()
    await expect(secondResult).toBeVisible()
    await secondResult.click()
    await expect(page.locator('.input-placeholder.wpp-typography').nth(13)).toHaveText('Item matching "testAPI" 2')
  })

  test('[WPPOPENDS-T707] Сheck that invalid values cannot be entered into the Search', async () => {
    await expect (wppAutocompletePage.nothingFoundLabel).not.toBeVisible()
    await wppAutocompletePage.singleAutocompleteInputWithoutSuggestions.type(':')
    await expect (wppAutocompletePage.nothingFoundLabel).toBeVisible()

    await wppAutocompletePage.singleAutocompleteInputWithoutSuggestions.clear()
    await expect (wppAutocompletePage.nothingFoundLabel).not.toBeVisible()

    await wppAutocompletePage.singleAutocompleteInputWithoutSuggestions.type(':orange')
    await expect (wppAutocompletePage.nothingFoundLabel).toBeVisible()

    await wppAutocompletePage.singleAutocompleteInputWithoutSuggestions.clear()
    await expect (wppAutocompletePage.nothingFoundLabel).not.toBeVisible()

    await wppAutocompletePage.singleAutocompleteInputWithoutSuggestions.type('orange:')
    await expect (wppAutocompletePage.nothingFoundLabel).toBeVisible()
  })

  test('[WPPOPENDS-T708] Check that component can be searched for a valid item with spaces before and after the search query', async ({page}) => {
    await wppAutocompletePage.singleAutocompleteInputWithoutSuggestions.type('      orange')
    await wppAutocompletePage.searchResultShouldHaveText('Orange', 'Orange')
    await wppAutocompletePage.singleAutocompleteInputWithoutSuggestions.clear()

    await wppAutocompletePage.singleAutocompleteInputWithoutSuggestions.type('orange     ')
    await wppAutocompletePage.searchResultShouldHaveText('Orange', 'Orange')
    await wppAutocompletePage.singleAutocompleteInputWithoutSuggestions.clear()

    await wppAutocompletePage.singleAutocompleteInputWithoutSuggestions.type('q     ')
    await expect (wppAutocompletePage.nothingFoundLabel).toBeVisible()
    await wppAutocompletePage.singleAutocompleteInputWithoutSuggestions.clear()

    await wppAutocompletePage.singleAutocompleteInputWithoutSuggestions.type('     q')
    await expect (wppAutocompletePage.nothingFoundLabel).toBeVisible()
    await wppAutocompletePage.singleAutocompleteInputWithoutSuggestions.clear()
  })
})

test.describe('Autocomplete with dynamic suggestions', () => {
  test('[WPPOPENDS-T1310] Check that the suggestions list is not displayed if it is empty', async ({ page }) => {
    //single autocomplete
    await wppAutocompletePage.singleAutocompleteWithDynamicSuggestions.click();
    await expect(wppAutocompletePage.dynamicSuggestionsListFirst).toBeHidden();
    //multiple autocomplete
    await wppAutocompletePage.multipleAutocompleteWithDynamicSuggestions.click();
    await expect(wppAutocompletePage.dynamicSuggestionsListFirst).toBeHidden();
    //multiple autocomplete with persistent search
    await wppAutocompletePage.autocompleteWithDynamicSuggestionsPersistantSearch.click();
    await expect(wppAutocompletePage.dynamicSuggestionsListFirst).toBeHidden();
  });

  test('[WPPOPENDS-T1311] Check that the suggestions list is displayed after clicking the "Update suggestions" button', async ({ page }) => {
    //single autocomplete
    await wppAutocompletePage.updateSuggestionsBtn.click();
    await wppAutocompletePage.singleAutocompleteWithDynamicSuggestions.click();
    await expect(wppAutocompletePage.dynamicSuggestionsListFirst).toBeVisible();
    await page.click('body');
    await page.waitForTimeout(1000);
    //multiple autocomplete
    await wppAutocompletePage.multipleAutocompleteWithDynamicSuggestions.click();
    await expect(wppAutocompletePage.dynamicSuggestionsListFirst).toBeVisible();
    await page.click('body');
    await page.waitForTimeout(1000);
    //multiple autocomplete with persistent search
    await wppAutocompletePage.autocompleteWithDynamicSuggestionsPersistantSearch.click();
    await expect(wppAutocompletePage.dynamicSuggestionsListFirst).toBeVisible();
  });

  test('[WPPOPENDS-T1312] Check that it is possible to update the suggestion list by clicking the "update suggestions" button', async ({ page }) => {
    //single autocomplete
    await wppAutocompletePage.updateSuggestionsBtn.click();
    await wppAutocompletePage.singleAutocompleteWithDynamicSuggestions.click();
    await expect(wppAutocompletePage.dynamicSuggestionsListFirst).toBeVisible();
    await page.click('body');
    await page.waitForTimeout(1000);
    await wppAutocompletePage.updateSuggestionsBtn.click();
    await wppAutocompletePage.singleAutocompleteWithDynamicSuggestions.click();
    await expect(wppAutocompletePage.dynamicSuggestionsListSecond).toBeVisible();
    await page.click('body');
    await page.waitForTimeout(1000);
    //multiple autocomplete
    await wppAutocompletePage.multipleAutocompleteWithDynamicSuggestions.click();
    await expect(wppAutocompletePage.dynamicSuggestionsListSecond).toBeVisible();
    await page.click('body');
    await page.waitForTimeout(1000);
    //multiple autocomplete with persistent search
    await wppAutocompletePage.autocompleteWithDynamicSuggestionsPersistantSearch.click();
    await expect(wppAutocompletePage.dynamicSuggestionsListSecond).toBeVisible();
  });

  test('[WPPOPENDS-T1313] Check that it is possible to update the suggestion list if the field contains selected items', async ({ page }) => {
      const avacadoItem = page.locator('[id="\\31 "]').getByRole('listitem')

      await wppAutocompletePage.updateSuggestionsBtn.click();
      await wppAutocompletePage.singleAutocompleteWithDynamicSuggestions.click();
      await avacadoItem.click();
      await page.waitForTimeout(500);

      await wppAutocompletePage.multipleAutocompleteWithDynamicSuggestions.click();
      await avacadoItem.click();
      await page.click('body');
      await page.waitForTimeout(1000);

      await wppAutocompletePage.autocompleteWithDynamicSuggestionsPersistantSearch.click();
      await avacadoItem.click();
      await page.click('body');
      await page.waitForTimeout(500);

      //single autocomplete
      await wppAutocompletePage.updateSuggestionsBtn.click();
      await wppAutocompletePage.singleAutocompleteWithDynamicSuggestions.click();
      await expect(wppAutocompletePage.dynamicSuggestionsListSecond).toBeVisible();
      await page.click('body');
      await page.waitForTimeout(1000);
      //multiple autocomplete
      await page.getByTestId('multiple-autocomplete-dynamic-suggestions').getByTestId('wpp-autocomplete-input-placeholder').click();
      await expect(wppAutocompletePage.dynamicSuggestionsListSecond).toBeVisible();
      await page.click('body');
      await page.waitForTimeout(1000);
      //multiple autocomplete with persistent search
      await page.getByTestId('multiple-autocomplete-dynamic-suggestions-search').getByTestId('wpp-autocomplete-input-placeholder').click();
      await expect(wppAutocompletePage.dynamicSuggestionsListSecond).toBeVisible();
    });

  test('[WPPOPENDS-T1314] Check that items from the 2nd suggestion list are not displayed as selected when items from the 1st list are selected', async ({ page }) => {
    const avacadoItem = page.locator('[id="\\31 "]').getByRole('listitem')
    const grapefruitItem = page.locator('[id="\\31 0"]').getByRole('listitem')

    await wppAutocompletePage.updateSuggestionsBtn.click();
    await wppAutocompletePage.singleAutocompleteWithDynamicSuggestions.click();
    await avacadoItem.click();
    await page.waitForTimeout(500);

    await wppAutocompletePage.multipleAutocompleteWithDynamicSuggestions.click();
    await avacadoItem.click();
    await page.click('body');
    await page.waitForTimeout(1000);

    await wppAutocompletePage.autocompleteWithDynamicSuggestionsPersistantSearch.click();
    await avacadoItem.click();
    await page.click('body');
    await page.waitForTimeout(500);

    //single autocomplete
    await wppAutocompletePage.updateSuggestionsBtn.click();
    await wppAutocompletePage.singleAutocompleteWithDynamicSuggestions.click();
    await expect(wppAutocompletePage.dynamicSuggestionsListSecond).toBeVisible();
    await expect(grapefruitItem).not.toHaveClass('item selectable checked');
    await page.click('body');
    await page.waitForTimeout(1000);
    //multiple autocomplete
    await page.getByTestId('multiple-autocomplete-dynamic-suggestions').getByTestId('wpp-autocomplete-input-placeholder').click();
    await expect(wppAutocompletePage.dynamicSuggestionsListSecond).toBeVisible();
    await expect(grapefruitItem).not.toHaveClass('item selectable checked');
    await page.click('body');
    await page.waitForTimeout(1000);
    //multiple autocomplete with persistent search
    await page.getByTestId('multiple-autocomplete-dynamic-suggestions-search').getByTestId('wpp-autocomplete-input-placeholder').click();
    await expect(wppAutocompletePage.dynamicSuggestionsListSecond).toBeVisible();
    await expect(grapefruitItem).not.toHaveClass('item selectable checked');
  });

  test('[WPPOPENDS-T1315] Check that the suggestion list is not updated if the persistent search input is not empty', async ({ page }) => {    
    await wppAutocompletePage.updateSuggestionsBtn.click();
    await wppAutocompletePage.autocompleteWithDynamicSuggestionsPersistantSearch.click();
    await expect(wppAutocompletePage.dynamicSuggestionsListFirst).toBeVisible();
    await wppAutocompletePage.autocompleteWithDynamicSuggestionsPersistantSearch.fill('apple');
    await page.click('body');
    await page.waitForTimeout(500);
    await wppAutocompletePage.updateSuggestionsBtn.click();
    await wppAutocompletePage.autocompleteWithDynamicSuggestionsPersistantSearch.fill('');
    await expect(wppAutocompletePage.dynamicSuggestionsListFirst).toBeVisible();
  });

  test('[WPPOPENDS-T1316] Check that the suggestion list updates after clearing the persistent search input', async ({ page }) => {
    await wppAutocompletePage.updateSuggestionsBtn.click();
    await wppAutocompletePage.autocompleteWithDynamicSuggestionsPersistantSearch.click();
    await expect(wppAutocompletePage.dynamicSuggestionsListFirst).toBeVisible();
    await wppAutocompletePage.autocompleteWithDynamicSuggestionsPersistantSearch.fill('apple');
    await page.click('body');
    await page.waitForTimeout(500);
    await wppAutocompletePage.updateSuggestionsBtn.click();
    await wppAutocompletePage.autocompleteWithDynamicSuggestionsPersistantSearch.fill('');
    await page.waitForTimeout(500);
    await expect(wppAutocompletePage.dynamicSuggestionsListFirst).toBeVisible();
    await page.click('body');
    await wppAutocompletePage.updateSuggestionsBtn.click();
    await wppAutocompletePage.updateSuggestionsBtn.click();
    await page.waitForTimeout(1000);
    await wppAutocompletePage.autocompleteWithDynamicSuggestionsPersistantSearch.click();
    await expect(wppAutocompletePage.dynamicSuggestionsListSecond).toBeVisible();
  });

  test('[WPPOPENDS-T1317] Check that items are not shown as selected in the dropdown list after clearing if the search input contains a value', async ({ page }) => {
    const avacadoItem = page.getByRole('listitem').getByText('Avacado')

    await wppAutocompletePage.updateSuggestionsBtn.click();
    await page.waitForTimeout(500);
    await wppAutocompletePage.autocompleteWithDynamicSuggestionsPersistantSearch.click();
    await wppAutocompletePage.autocompleteWithDynamicSuggestionsPersistantSearch.fill('avacado');
    await avacadoItem.click();
    await page.click('body');
    await page.waitForTimeout(500);
    await wppAutocompletePage.clearAllCrossBtn.nth(22).click();
    await wppAutocompletePage.autocompleteWithDynamicSuggestionsPersistantSearch.click();
    await expect(avacadoItem).not.toHaveClass('item selectable checked');
  });
});
