import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-buttons',
  templateUrl: './buttonsVC.html',
  styleUrls: ['./buttonsVC.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonsVC {
  public ariaProps = { label: 'More items menu' }

  public handleClick = () => {
    console.log('Clicked')
  }
}
