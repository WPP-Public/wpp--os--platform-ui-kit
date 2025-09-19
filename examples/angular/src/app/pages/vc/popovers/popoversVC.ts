import { ChangeDetectionStrategy, Component, ViewChild, ElementRef } from '@angular/core'
import { WppPopover } from '@platform-ui-kit/components-library-angular'
import { usersList } from './config'
import { User } from './types'
import { InlineEditMode, InputChangeEventDetail, ListItemChangeEventDetail } from '@platform-ui-kit/components-library'
import { SAMPLE_LIST_2 } from '../../single-select-example/consts'

@Component({
  selector: 'popover-example',
  templateUrl: './popoversVC.html',
  styleUrls: ['./popoversVC.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoversVC {
  public currentUser: User = usersList[0]
  public searchValue = ''
  public users = usersList

  public persistantSearch = false
  public popoverSearchValue = ''

  public selectList = SAMPLE_LIST_2
  public inputMode1 = 'read'
  public inputText1 = ''

  @ViewChild('popoverElement')
  private readonly popover!: ElementRef<WppPopover>

  @ViewChild('userPopoverElement')
  private readonly userPopover!: ElementRef<WppPopover>

  public handleCrossIconClick(): void {
    this.popover.nativeElement.closePopover()
  }

  public handleClickOpenBtn(): void {
    this.popover.nativeElement.openPopover()
  }

  handleSubmitButtonClick = () => {
    alert('Some message')
  }

  handleInputChange = (event: CustomEvent<InputChangeEventDetail>) => {
    const newSearchValue = event.detail.value as string

    this.searchValue = newSearchValue

    this.users = newSearchValue
      ? usersList.filter(user => user.name.toLowerCase().includes(newSearchValue.toLowerCase()))
      : usersList
  }

  handleListItemChecked = (event: Event, src: string) => {
    const userName = (event as CustomEvent<ListItemChangeEventDetail>).detail.label as string

    this.currentUser = { name: userName, src }
    this.searchValue = ''

    setTimeout(() => {
      this.users = usersList
    }, 300)

    this.userPopover.nativeElement.closePopover()
  }

  handleSearchChange = (event: Event) => {
    const customEvent = event as CustomEvent

    console.log('On Change search event:', event)

    this.popoverSearchValue = customEvent.detail.value
  }

  handleTogglePersistantSearch = () => {
    this.persistantSearch = !this.persistantSearch
  }

  handleSetSearchValue = () => {
    this.popoverSearchValue = 'Test'
  }

  setInputMode1 = (mode: InlineEditMode) => {
    this.inputMode1 = mode
  }

  onChangeInlineEdit = (event: Event) => {
    const customEvent = event as CustomEvent

    console.log(customEvent.detail)

    this.inputMode1 = customEvent.detail.mode

    if (customEvent.detail.mode === 'read') {
      customEvent.detail.closePopover()
    }
  }

  getLabelConfig = (text: string) => ({
    text,
  })

  onChangeSelect = (e: Event) => {
    console.log('On Change', e)
  }

  onSearchChangePopover = (event: Event) => {
    console.log('On Change search event:', event)
  }

  onChangeInput = (e: Event) => {
    const customEvent = e as CustomEvent

    this.inputText1 = customEvent.detail.value!
  }
}
