```ts
@Component({
  ...
})
export class TabsExample {
  public activeTab: string = 'tab-1';

  public handleActiveTabChange(event: Event): void {
    this.activeTab = (event as CustomEvent<TabsChangeEventDetail>).detail.value
  }
}
```

```html
<wpp-tabs [value]="activeTab" (wppChange)="handleActiveTabChange($event)">
  <wpp-tab value="tab-1">Tab 1</wpp-tab>
  <wpp-tab value="tab-2" [counter]="10">Tab 2</wpp-tab>
  <wpp-tab value="tab-3" disabled>Tab 3</wpp-tab>
</wpp-tabs>

<ng-container [ngSwitch]="activeTab">
  <wpp-card *ngSwitchCase="'tab-1'">
    <wpp-typography type="l-heading">Tab 1</wpp-typography>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  </wpp-card>

  <wpp-card *ngSwitchCase="'tab-2'">
    <wpp-typography type="l-heading">Tab 2</wpp-typography>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  </wpp-card>

  <wpp-card *ngSwitchCase="'tab-3'">
    <wpp-typography type="l-heading">Tab 3</wpp-typography>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  </wpp-card>
</ng-container>
```
