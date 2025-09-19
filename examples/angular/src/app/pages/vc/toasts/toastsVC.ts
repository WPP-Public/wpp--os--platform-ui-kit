import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core'
import { ButtonState } from '@platform-ui-kit/components-library'

@Component({
  selector: 'app-toast-example',
  templateUrl: './toastsVC.html',
  styleUrls: ['./toastsVC.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastsVC {
  public childRef = null

  @ViewChild('container') toastRef!: any

  public useToast = () => {
    const showToast = (config: any) => {
      this.toastRef?.nativeElement?.addToast(config)
    }

    return showToast
  }

  handleAddToast = () => {
    const showToast = this.useToast()

    showToast({
      message: `Successful message`,
      type: 'success',
      header: 'Title',
      duration: 4000000,
      primaryBtn: {
        label: 'Button',
        variant: 'inverted' as const,
        disabled: false,
        loading: false,
        onClick: () => console.log('primaryBtn'),
      },
    })
  }

  handleAddCustomToast = () => {
    const showToast = this.useToast()

    showToast({
      message: `Lorem Ipsum is simply dummy text of the printing and typesetting industry`,
      type: 'success',
      header: 'Title',
      duration: 4000000,
      primaryBtn: {
        label: 'Button',
        variant: 'inverted' as const,
        disabled: false,
        loading: false,
        onClick: () => console.log('primaryBtn'),
      },
      maxMessageLines: 2,
      icon: {
        name: 'wpp-icon-phone',
      },
    })
  }

  handleAddToastWithLongText = () => {
    const showToast = this.useToast()

    showToast({
      message: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500`,
      type: 'success',
      header: 'Title',
      duration: 4000000,
      primaryBtn: {
        label: 'Button',
        variant: 'inverted' as const,
        disabled: false,
        loading: false,
        onClick: () => console.log('primaryBtn'),
      },
      icon: {
        url: 'https://mui.com/static/images/avatar/1.jpg',
      },
    })
  }

  primaryButton: ButtonState = {
    label: 'Button',
    variant: 'inverted' as const,
    disabled: false,
    loading: false,
    onClick: () => console.log('Clicked'),
  }
}
