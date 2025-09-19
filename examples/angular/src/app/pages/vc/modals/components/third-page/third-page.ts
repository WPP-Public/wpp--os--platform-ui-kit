import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-third-page',
  templateUrl: './third-page.html',
  styleUrls: ['./third-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThirdModalPageVC {
  public handleCloseSideModal = () => {
    console.log('modal closed')
  }
}
