import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-skeleton-example',
  templateUrl: './skeletonVC.html',
  styleUrls: ['./skeletonVC.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonVC {
  public labelConfig = { text: 'Skeleton' }
}
