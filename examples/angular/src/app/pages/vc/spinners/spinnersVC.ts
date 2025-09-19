import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-spinner-example',
  templateUrl: './spinnersVC.html',
  styleUrls: ['./spinnersVC.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnersVC {}
