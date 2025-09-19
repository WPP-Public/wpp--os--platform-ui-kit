import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core'
import { WppPopover } from '@platform-ui-kit/components-library-angular'

@Component({
  selector: 'app-custom-dropdown',
  templateUrl: './custom-dropdown.html',
  styleUrls: ['./custom-dropdown.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomDropdown {
  public OPTIONS_LIST = ['Admin', 'Country Admin', 'User']

  public selectedOption = ''
  public isActive = false
  public popoverRef!: ElementRef<WppPopover>
  public popoverConfig = {
    onShow: () => (this.isActive = true),
    onHide: () => (this.isActive = false),
    triggerElementWidth: true,
  }
  public labelConfig = { text: 'Role (Custom dropdown using WppInput + WppPoppover)' }

  public handleOptionSelect = (selectedOption: string) => {
    this.selectedOption = selectedOption
    this.popoverRef.nativeElement.closePopover()
  }

  public style: Record<string, string> = { '--wpp-list-item-width': '200px' }

  public handleIconState() {
    const state: string = this.isActive ? 'up' : 'down'

    return state
  }
}
