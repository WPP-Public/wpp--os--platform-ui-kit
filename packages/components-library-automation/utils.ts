import { test as _test } from '@playwright/test'

const test = _test.extend<{ _autoSuffix: void }>({
  _autoSuffix: [
    async ({}, use, testInfo) => {
      testInfo.snapshotSuffix = ``
      await use()
    },
    { auto: true },
  ],
})

export default test
