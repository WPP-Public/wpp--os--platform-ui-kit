import { Component, Host, h, Prop, Method, State, Element } from '@stencil/core'
import { uuidv4 } from '../../../../utils/utils'
import { ToastState } from './types'
import { ToastCompleteDetail } from '../../types'

import { ANIMATION_DURATION } from '../../const'
import { Z_INDEX } from '../../../../common/consts'

/**
 * @part item - toast item
 */
@Component({
  tag: 'wpp-toast-container',
  styleUrl: 'wpp-toast-container.scss',
  shadow: true,
})
export class WppToastContainer {
  @Element() host: HTMLWppToastContainerElement

  @State() toasts: (ToastState & { id: string })[] = []

  @State() toastsQueue: (ToastState & { id: string })[] = []

  /**
   * Defines the maximum number of toasts to display at once.
   */
  @Prop() readonly maxToastsToDisplay: number = 4

  /**
   * Defines the z-index of the WppToastContainer.
   */
  @Prop() readonly zIndex: number = Z_INDEX.TOAST

  /**
   * Method for adding toasts to `toast-container`.
   */
  @Method()
  async addToast(data: ToastState) {
    const toastsList = [...this.toasts, ...this.toastsQueue, { ...data, id: uuidv4() }]

    this.toasts = toastsList.slice(0, this.maxToastsToDisplay)
    this.toastsQueue = toastsList.slice(this.maxToastsToDisplay)

    return toastsList[toastsList.length - 1].id
  }

  /**
   * Method for hiding toasts from `toast-container`.
   */
  @Method()
  async hideToast(id: string) {
    const toastsInShadowDom =
      (this.host.shadowRoot as ShadowRoot).querySelectorAll<HTMLWppToastElement>('.wpp-toast') || []

    for (let i = 0; i < toastsInShadowDom.length; i++) {
      if (toastsInShadowDom[i].index === id) {
        toastsInShadowDom[i].classList.add('hide')
      }
    }

    setTimeout(() => this.removeToastById(id), ANIMATION_DURATION)
  }

  /**
   * Method for updating toast from `toast-container`.
   */
  @Method()
  async updateToast(id: string, updatedData: Partial<Omit<ToastState, 'duration'>>) {
    const toastIndex = this.toasts.findIndex(toast => toast.id === id)
    const toastsCopy = [...this.toasts]

    toastsCopy[toastIndex] = {
      ...toastsCopy[toastIndex],
      ...updatedData,
    }

    this.toasts = toastsCopy
  }

  private handleToastComplete = (e: CustomEvent<ToastCompleteDetail>) => {
    this.removeToastById(e.detail.currentIndex)
  }

  private removeToastById = (id: string) => {
    const toastListWithoutRemovedToast = [...this.toasts].filter(toast => toast.id !== id)
    const toastsList = [...toastListWithoutRemovedToast, ...this.toastsQueue]

    this.toasts = toastsList.slice(0, this.maxToastsToDisplay)
    this.toastsQueue = toastsList.slice(this.maxToastsToDisplay)
  }

  private hostCssClasses = () => ({
    'wpp-toast-container': true,
  })

  render() {
    const { toasts } = this

    return (
      <Host class={this.hostCssClasses()} style={{ zIndex: this.zIndex.toString() }} exportparts="item">
        {toasts.map(toast => (
          <wpp-toast
            key={toast.id}
            index={toast.id}
            message={toast.message}
            type={toast.type}
            header={toast.header}
            duration={toast.duration}
            primaryBtn={toast.primaryBtn}
            maxMessageLines={toast.maxMessageLines}
            icon={toast.icon}
            part="item"
            onWppToastComplete={this.handleToastComplete}
          ></wpp-toast>
        ))}
      </Host>
    )
  }
}
