```ts
@Component({
  ...
})
export class NavSidebarExample {
  public activePath: string = '/dashboard';

  public changeRoute(event): void {
    console.log('Route changed:', event.detail);
    this.activePath = event.detail.path;
  }
}
```

```html
<wpp-nav-sidebar
  [activePath]="activePath"
  (wppChange)="changeRoute($event)"
>
  <div slot="icon">
    <svg-icon></svg-icon>
    <p>App Name</p>
  </div>
  <wpp-nav-sidebar-item label="Dashboard" path="/dashboard">
    <wpp-icon-globe slot="icon-start"></wpp-icon-globe>
  </wpp-nav-sidebar-item>
  <wpp-nav-sidebar-item label="Projects" extended>
    <wpp-icon-favorites slot="icon-start"></wpp-icon-favorites>
    <wpp-nav-sidebar-item label="Projects 01" path="/project1"></wpp-nav-sidebar-item>
    <wpp-nav-sidebar-item label="Projects 02" path="/project2"></wpp-nav-sidebar-item>
  </wpp-nav-sidebar-item>
  <wpp-nav-sidebar-item
    label="Scheduled reporting"
    path="/scheduled"
    extended
    groupTitle="Reporting"
  >
    <wpp-icon-calendar slot="icon-start"></wpp-icon-calendar>
    <wpp-nav-sidebar-item label="Scheduled 01" path="/scheduled1"></wpp-nav-sidebar-item>
    <wpp-nav-sidebar-item label="Scheduled 02" path="/scheduled2"></wpp-nav-sidebar-item>
  </wpp-nav-sidebar-item>
  <wpp-nav-sidebar-item label="Attachments" path="/attachments">
    <wpp-icon-mail slot="icon-start"></wpp-icon-mail>
  </wpp-nav-sidebar-item>
</wpp-nav-sidebar>
```
