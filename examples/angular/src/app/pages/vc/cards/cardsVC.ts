import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-cards',
  templateUrl: './cardsVC.html',
  styleUrls: ['./cardsVC.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsVC {}
