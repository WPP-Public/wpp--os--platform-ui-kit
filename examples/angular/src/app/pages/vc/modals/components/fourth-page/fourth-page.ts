import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-fourth-page',
  templateUrl: './fourth-page.html',
  styleUrls: ['./fourth-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FourthModalPageVC {}
