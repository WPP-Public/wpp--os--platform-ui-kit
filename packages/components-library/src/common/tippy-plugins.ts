import { Instance, Plugin } from 'tippy.js'

export const hideOnEsc: Plugin = {
  name: 'hideOnEsc',
  defaultValue: false,
  fn(instance: Instance) {
    function onKeyDown(event: KeyboardEvent) {
      if (event.code === 'Escape' && instance.state.isVisible) {
        instance.hide()
      }
    }

    return {
      onShow() {
        document.addEventListener('keydown', onKeyDown)
      },
      onHide() {
        document.removeEventListener('keydown', onKeyDown)
      },
      onDestroy() {
        document.removeEventListener('keydown', onKeyDown)
      },
    }
  },
}
