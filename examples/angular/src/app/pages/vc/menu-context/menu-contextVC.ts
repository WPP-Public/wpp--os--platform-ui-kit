import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'menu-context-example',
  templateUrl: './menu-contextVC.html',
  styleUrls: ['./menu-contextVC.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuContextVC {
  public dropdownConfig = { triggerElementWidth: true }
  public linkConfig = { href: 'https://google.com', target: '_blank' }
  public listWidth = '150px'

  public tooltipConfig = {
    rightSlot: {
      text: 'Right slot content',
      header: 'Header',
    },
  }
}
