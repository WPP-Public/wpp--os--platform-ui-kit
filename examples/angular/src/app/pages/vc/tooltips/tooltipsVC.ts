import { ChangeDetectionStrategy, Component } from '@angular/core'
import { TooltipThemeTypes } from '@platform-ui-kit/components-library'

@Component({
  selector: 'app-tooltip-example',
  templateUrl: './tooltipsVC.html',
  styleUrls: ['./tooltipsVC.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipsVC {
  public placement: 'top' | 'bottom' = 'top'
  public theme: TooltipThemeTypes = 'dark'
  public textContent = `Price\n\nAnd then another row and a row that is really really long because why not we can have such\n\nAnd the Last row`

  public handleCopyBtnClick = () => {
    this.placement = this.placement === 'top' ? 'bottom' : 'top'

    console.log('placement.value: ', this.placement)
  }

  public handleShow = () => {
    console.log('On Show')
  }

  public getTooltipConfig = () => ({
    placement: this.placement,
    hideOnClick: false,
    onShow: this.handleShow,
  })

  public getHTMLConfig =
    '<div><wpp-typography>This Node Element is created as HTML and parsed to string</wpp-typography><wpp-button>button</wpp-button></div>'

  public handleChangeTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark'
  }
}
