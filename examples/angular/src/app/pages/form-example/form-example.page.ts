import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'form-example',
  templateUrl: './form-example.page.html',
  styleUrls: ['./form-example.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormExamplePage {
  public currentTab = 'regularForm'

  public handleTabChange = (event: Event) => {
    this.currentTab = (event as CustomEvent).detail.value
  }
}
