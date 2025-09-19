import { ChangeDetectionStrategy, Component } from '@angular/core'
import { AutocompleteDefaultOption } from '@platform-ui-kit/components-library'
import { fruitOptions } from './options'

@Component({
  selector: 'app-accordion-example',
  templateUrl: './accordion-example.page.html',
  styleUrls: ['./accordion-example.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionExamplePage {
  public isOpen = false
  public disable = false
  public count = 2
  public items: string[] = ['Added new title', 'Added new title']
  public fruitOptions = fruitOptions
  public dropdownConfig = { triggerElementWidth: true }
  public selectValue = ''
  public selectList = [
    { value: 1, label: 'Car' },
    { value: 2, label: 'House' },
    { value: 3, label: 'Apartment' },
  ]
  public basicValue: AutocompleteDefaultOption[] = [
    {
      id: 5,
      label: 'Pineapple',
    },
    {
      id: 3,
      label: 'Kiwi',
    },
    {
      id: 13,
      label: 'Pear',
    },
  ]
  public blockHeight = '0'
  public handleAddNewParagraph = () => {
    this.count = this.count + 1
    this.items = Array(this.count)
      .fill(null)
      .map(() => 'Added new title')
  }

  public handleBasicValue = (event: Event) => {
    this.basicValue = (event as CustomEvent).detail.value as AutocompleteDefaultOption[]
  }

  public handeOpenSideModal = () => {
    this.isOpen = true
  }

  public handeCloseSideModal = () => {
    this.isOpen = false
  }

  public handleDisableAccordion = () => {
    this.disable = !this.disable
  }

  public getLabelConfig = (text: string) => ({
    text,
  })

  public handleChangeValue = (event: Event) => {
    const customEvent = event as CustomEvent

    this.selectValue = customEvent.detail.value
  }

  ngAfterContentInit() {
    setTimeout(() => {
      this.blockHeight = '100px'
      console.log(this.blockHeight)
    }, 2000)
  }

  public getStyle = () => ({ height: this.blockHeight })
}
