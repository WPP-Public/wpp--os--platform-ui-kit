import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-icons',
  templateUrl: './iconsVC.html',
  styleUrls: ['./iconsVC.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconsVC {}
