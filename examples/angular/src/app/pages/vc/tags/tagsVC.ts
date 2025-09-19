import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-tag-example',
  templateUrl: './tagsVC.html',
  styleUrls: ['./tagsVC.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsVC {
  public tooltipConfig = { placement: 'right' }
}
