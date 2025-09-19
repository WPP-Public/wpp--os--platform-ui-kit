import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-tree-example',
  templateUrl: './treesVC.html',
  styleUrls: ['./treesVC.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreesVC {}
