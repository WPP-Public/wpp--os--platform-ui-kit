import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-banner-states-example',
  templateUrl: './banner-states.html',
  styleUrls: ['./banner-states.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerStates {}
