import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-typography-example',
  templateUrl: './typographyVC.html',
  styleUrls: ['./typographyVC.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypographyVC {}
