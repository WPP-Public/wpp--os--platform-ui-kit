import { Plugin } from 'vue'

import { applyPolyfills, defineCustomElements } from '@platform-ui-kit/components-library/loader'

export const ComponentLibrary: Plugin = {
  async install() {
    applyPolyfills().then(() => {
      defineCustomElements()
    })
  },
}
