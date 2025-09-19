import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SAMPLE_LIST_1, SAMPLE_LIST_2, SAMPLE_LIST_MULTIPLE } from '../single-select-example/consts'

@Component({
  selector: 'app-selects-example',
  templateUrl: './selects-example.page.html',
  styleUrls: ['./selects-example.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectsExamplePage {
  public multipleItems: any[] | undefined = ['car', 'long']
  public multipleItems2: any[] | undefined = []
  public multipleItems3: any[] | undefined = []
  public singleItems = 'car'
  public textItems = 'house'
  public noItems = ''
  public arrayValue = [5, 55]
  public SAMPLE_LIST_MULTIPLE = SAMPLE_LIST_MULTIPLE
  public SAMPLE_LIST_2 = SAMPLE_LIST_2
  public SAMPLE_LIST_1 = SAMPLE_LIST_1

  public getLabelConfig = (text: string) => ({
    text,
  })

  handleResetClick = () => {
    this.multipleItems = []
  }

  handleMultipleItems = (event: Event) => {
    this.multipleItems = (event as CustomEvent).detail.value
  }

  handleMultipleItems2 = (event: Event) => {
    this.multipleItems2 = (event as CustomEvent).detail.value
  }

  handleMultipleItems3 = (event: Event) => {
    this.multipleItems3 = (event as CustomEvent).detail.value
  }

  handleSingleItems = (event: Event) => {
    this.singleItems = (event as CustomEvent).detail.value
  }

  handleTextItems = (event: Event) => {
    this.textItems = (event as CustomEvent).detail.value
  }
}
