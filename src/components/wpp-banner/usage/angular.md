```ts
@Component({
  ...
})
export class BannerExample {
  public isToShowBanner: boolean = true;

  public handleBannerShowStateChange(event: Event): void {
    this.isToShowBanner = (event as CustomEvent<BannerChangeEventDetail>).detail.show
  }
}
```

```html
<wpp-banner closable type='information' [show]='isToShowBanner' (wppClose)="handleBannerShowStateChange($event)">
  USPS has updated their rates. Make sure you know how these changes affect your store.
  <div slot="actions">
    <wpp-action-button variant="inverted">Close</wpp-action-button>
  </div>
</wpp-banner>
```
