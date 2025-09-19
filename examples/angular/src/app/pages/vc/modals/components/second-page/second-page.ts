import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.html',
  styleUrls: ['./second-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecondModalPageVC {
  public handleCloseSideModal = () => {
    console.log('modal closed')
  }
}
