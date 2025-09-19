import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-load-more-example',
  templateUrl: './load-moreVC.html',
  styleUrls: ['./load-moreVC.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadMoreVC {
  itemsLoaded = 30
  loading = false
  incrementBy = 20

  handleLoadMore(event: Event) {
    const { newItemsLoaded } = (event as CustomEvent<{ newItemsLoaded: number; incrementBy: number }>).detail

    this.loading = true
    setTimeout(() => {
      this.itemsLoaded = newItemsLoaded
      this.loading = false
    }, 1000)
  }
}
