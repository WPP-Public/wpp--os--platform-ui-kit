import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-steppers-example',
  templateUrl: './steppersVC.html',
  styleUrls: ['./steppersVC.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SteppersVC {
  public currentTab = 'vertical'

  handleTabChange = (event: Event) => {
    console.log('handleTabChange', event)
    this.currentTab = (event as CustomEvent).detail.value
  }
}
