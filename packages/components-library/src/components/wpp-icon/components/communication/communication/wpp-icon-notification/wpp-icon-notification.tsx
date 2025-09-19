import { Component, h, Prop } from '@stencil/core'
import { WppIcon } from '../../../../WppIcon'

@Component({
  tag: 'wpp-icon-notification',
  styleUrl: '../../../../wpp-icon.scss',
  shadow: true,
})
export class WppIconNotification {
  /**
   Defines the icon size, where `s` is **16px** and `m` is **20px**.
   */
  @Prop() readonly size: 's' | 'm' = 'm'

  /**
   Defines the icon width and changes its default size. If you use `width` only, the icon width and height will be the same.
   */
  @Prop() readonly width?: number

  /**
    Defines the icon height and changes its default size. If you use `height` only, the icon width will not be affected.
    */
  @Prop() readonly height?: number

  /**
   Defines the icon color.
   */
  @Prop() readonly color: string = 'var(--wpp-icon-color)'

  render() {
    return (
      <WppIcon name="wpp-icon-notification" width={this.width} height={this.height} size={this.size} color={this.color}>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M16.375 7.91668C16.375 4.29398 13.3527 1.37645 9.69267 1.54876L9.69265 1.54876C6.23956 1.71141 3.62502 4.67443 3.62502 8.07543V11.0739L2.53381 13.2696L2.52673 13.2842C2.03316 14.3338 2.79791 15.5417 3.95919 15.5417H7.37792C7.44313 16.9333 8.59224 18.0418 10 18.0418C11.4078 18.0418 12.5569 16.9333 12.6221 15.5417H16.0404C17.2011 15.5417 17.9671 14.3344 17.4733 13.2842L17.4662 13.2696L16.375 11.0739V7.91668ZM11.1181 15.5417H8.88186C8.94403 16.1041 9.42102 16.5418 10 16.5418C10.579 16.5418 11.056 16.1041 11.1181 15.5417ZM5.12502 8.07543C5.12502 5.41894 7.16547 3.16947 9.76321 3.0471L9.76322 3.0471C12.564 2.91525 14.875 5.14606 14.875 7.91668V11.25C14.875 11.3658 14.9018 11.4801 14.9534 11.5838L16.1175 13.9261C16.1403 13.9809 16.1001 14.0417 16.0404 14.0417H3.95919C3.90011 14.0417 3.8595 13.9814 3.88252 13.9262L5.04665 11.5838C5.09819 11.4801 5.12502 11.3658 5.12502 11.25V8.07543Z"
          fill="currentColor"
        />
      </WppIcon>
    )
  }
}
