import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-grid-css',
  templateUrl: './grid-cssVC.html',
  styleUrls: ['./grid-cssVC.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridCssVC {
  public ids = [1, 2, 3]
  public imgPath = 'examples/angular/src/app/pages/vc/grid-css/assets/googleImg.jpeg'
}
