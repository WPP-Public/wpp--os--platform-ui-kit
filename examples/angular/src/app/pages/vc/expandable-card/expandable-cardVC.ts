import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ExpandableCardSectionChangeEventDetail } from '@platform-ui-kit/components-library'

@Component({
  selector: 'app-expandable-card',
  templateUrl: './expandable-cardVC.html',
  styleUrls: ['./expandable-cardVC.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpandableCardVC {
  public handleChange = (event: Event) => {
    console.log('e ====>', (event as CustomEvent<ExpandableCardSectionChangeEventDetail>).detail.expanded)
  }
}
