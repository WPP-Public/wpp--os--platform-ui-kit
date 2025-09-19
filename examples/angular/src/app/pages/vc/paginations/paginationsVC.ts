import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-pagination-example',
  templateUrl: './paginationsVC.html',
  styleUrls: ['./paginationsVC.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationsVC {
  public dropdownConfig = { popperOptions: { strategy: 'fixed' } }
  public itemsPerPageOptions = [3, 5, 8]
}
