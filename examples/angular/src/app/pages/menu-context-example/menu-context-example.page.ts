import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'menu-context-example',
  templateUrl: './menu-context-example.page.html',
  styleUrls: ['./menu-context-example.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuContextExamplePage {
  public dropdownConfig = {
    onShow: (instance: any) => console.log('Show', instance),
    onHide: (instance: any) => console.log('Hide', instance),
  }
  public linkConfig = { href: 'https://google.com', target: '_blank' }
  public listWidth = '150px'
}
