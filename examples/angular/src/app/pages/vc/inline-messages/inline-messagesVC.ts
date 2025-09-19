import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-inline-message',
  templateUrl: './inline-messagesVC.html',
  styleUrls: ['./inline-messagesVC.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InlineMessagesVC {
  public isBtnHidden = false
  public ITEMS = [
    {
      type: 'warning',
      message: 'Warning message',
    },
    {
      type: 'error',
      message: 'Error message',
    },
    {
      type: 'information',
      message: 'Information message',
    },
    {
      type: 'success',
      message: 'Success message',
    },
  ]
  public title = 'Title'

  public handleClickCloseBtn = () => {
    console.log('Clicked Close btn')
  }

  public handleClickActionBtn = () => {
    console.log('Clicked Action btn')
  }

  public handleBtnClick = () => {
    this.isBtnHidden = !this.isBtnHidden
  }

  public handleClickChangeTitle = () => {
    this.title = this.title === '' ? 'Title' : ''
  }
}
