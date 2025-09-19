import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-list-item',
  templateUrl: './list-itemsVC.html',
  styleUrls: ['./list-itemsVC.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemsVC {
  public labelTooltipConfig = {
    placement: 'top',
  }

  public handleListItemClick = (event: Event) => {
    console.log('event.detail => ', (event as CustomEvent).detail)
  }

  public handleClick = () => {
    console.log('Clicked icon more')
  }
}
