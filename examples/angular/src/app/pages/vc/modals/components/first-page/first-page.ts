import { ChangeDetectionStrategy, Component, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.html',
  styleUrls: ['./first-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FirstModalPageVC {
  @Output()
  sideModalClosed: EventEmitter<string> = new EventEmitter<string>()
  nextPageOpened: EventEmitter<string> = new EventEmitter<string>()
  public LIST = [
    {
      label: 'Car',
      value: 1,
    },
    {
      label: 'House',
      value: 2,
      disabled: true,
    },
    {
      label: 'Apartment',
      value: 3,
    },
  ]
  public selectValue = ''

  public tooltipConfig = {
    placement: 'left',
    popperOptions: {
      modifiers: [
        {
          name: 'flip',
          options: {
            fallbackPlacements: ['left'],
          },
        },
      ],
    },
  }

  public handleNextPage() {
    this.nextPageOpened.emit('openNextPage')
  }

  public handleCloseSideModal() {
    this.sideModalClosed.emit('closeSideModal')
  }

  public getLabelConfig = (text: string) => ({
    text,
  })

  public handleSelectChange = (event: Event) => {
    const customEvent = event as CustomEvent

    this.selectValue = customEvent.detail.value
  }
}
