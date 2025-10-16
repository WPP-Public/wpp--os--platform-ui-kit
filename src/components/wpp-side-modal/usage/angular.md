```ts
import { Component } from '@angular/core'

@Component({
  // ...
})
export class SideModalExample {
  public isOpen: boolean = false

  public open(): void {
    this.isOpen = true
  }

  public close(): void {
    this.isOpen = false
  }

  // Action handlers for actionsConfig
  public handleCancel(): void {
    this.close()
  }

  public handleConfirm(): void {
    alert('Confirm action clicked')
  }

  public handleRemove(): void {
    alert('Remove action clicked')
  }

  /**
    The `actionsConfig` property is an array that can contain at most 1 of each:
      - 1 WppButton with variant = "primary" / "destructive"
      - 1 WppButton with variant = "secondary" / "destructive-secondary"
      - 1 WppActionButton with variant = "primary" / "destructive". The button also has to have an icon.
  */
  public actionsConfig = [
    {
      label: 'Cancel',
      variant: 'secondary',
      onClick: () => this.handleCancel(),
      size: 'm',
      name: 'Cancel-secondary-btn',
      ariaProps: { label: 'Cancel btn' },
    },
    {
      label: 'Confirm',
      variant: 'primary',
      onClick: () => this.handleConfirm(),
      size: 'm',
      name: 'confirm-primary-btn',
      ariaProps: { label: 'Confirm btn' },
    },
    {
      label: 'Remove',
      variant: 'destructive',
      onClick: () => this.handleRemove(),
      icon: 'wpp-icon-remove-circle',
      name: 'remove-destructive-btn',
      ariaProps: { label: 'Remove btn' },
    },
  ]
}
```

```html
<!-- Note: The `actions` slot is deprecated and will be removed in a future release. Please use the `actionsConfig` property instead. -->

<wpp-button (click)="open()">Open</wpp-button>

<!-- Using actionsConfig -->
<wpp-side-modal [open]="isOpen" (wppSideModalClose)="close()" [actionsConfig]="actionsConfig">
  <div slot="header">Lorem Ipsum</div>

  <div slot="body">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua.
    </p>
  </div>
</wpp-side-modal>

<!-- Using the deprecated actions slot -->
<wpp-side-modal [open]="isOpen" (onWppSideModalClose)="close()">
  <div slot="header">Lorem Ipsum</div>

  <div slot="body">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua.
    </p>
  </div>

  <!-- Deprecated actions slot -->
  <div slot="actions">
    <wpp-button variant="secondary" (click)="close()">Close</wpp-button>
  </div>
</wpp-side-modal>
```
