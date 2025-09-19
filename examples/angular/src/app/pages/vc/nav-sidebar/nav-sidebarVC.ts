import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-nav-sidebar-example',
  templateUrl: './nav-sidebarVC.html',
  styleUrls: ['./nav-sidebarVC.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavSidebarVC {
  public activePath: string = '/dashboard'

  public handleChangeRoute(event: Event): void {
    const detail = (event as CustomEvent).detail

    console.log('Route changed to:', detail.path)
    this.activePath = detail.path
  }

  public setActivePath(path: string): void {
    this.activePath = path
  }
}
