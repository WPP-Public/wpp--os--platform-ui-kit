import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-segmented-control-example',
  templateUrl: './segmented-controlsVC.html',
  styleUrls: ['./segmented-controlsVC.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SegmentedControlsVC {
  public currentItem = '1'

  public handleSegmentedControlChange = (event: Event) => {
    this.currentItem = (event as CustomEvent).detail.value
  }
}
