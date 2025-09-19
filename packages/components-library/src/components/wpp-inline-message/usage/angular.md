```html
<wpp-inline-message
  size="s"
  [message]="message"
  [type]="messageType"
  [showTooltipFrom]="showTooltipFrom"
></wpp-inline-message>

<wpp-inline-message class="item" size="m" message="Warning message" type="warning"></wpp-inline-message>

<wpp-inline-message
  class="item"
  size="l"
  action-btn-text="Action"
  title-text="Title"
  message="Success Message"
  type="success"
  (wppClickCloseBtn)="handleClickCloseBtn()"
  (wppClickActionBtn)="handleClickActionBtn()"
></wpp-inline-message>
```
