import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-card-group-example',
  templateUrl: './card-group.html',
  styleUrls: ['./card-group.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardGroupVC {
  public isShown = false
  public multipleGroupValue = ['item-a']
  public dynamicMultipleGroupValue = ['item-b']
  public cardList = [
    { id: 0, value: 'item-a', label: 'Item A' },
    { id: 1, value: 'item-b', label: 'Item B' },
    { id: 2, value: 'item-c', label: 'Item C' },
  ]

  public handleMultipleCardGroupChange = (event: Event) => {
    console.log('event.detail =>', (event as CustomEvent).detail)

    this.multipleGroupValue = (event as CustomEvent).detail.value
  }

  public handleDynamicMultipleCardGroupChange = (event: Event) => {
    console.log('event.detail =>', (event as CustomEvent).detail)

    this.dynamicMultipleGroupValue = (event as CustomEvent).detail.value
  }

  public handleSingleCardGroupChange = (event: Event) => {
    console.log('event.detail =>', (event as CustomEvent).detail)
  }

  public handleShowCardGroup = () => {
    this.isShown = !this.isShown
  }
}
