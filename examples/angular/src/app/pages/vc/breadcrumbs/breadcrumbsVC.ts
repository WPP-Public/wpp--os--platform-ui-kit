import { ChangeDetectionStrategy, Component } from '@angular/core'
import { BreadcrumbItemState } from '@platform-ui-kit/components-library'
import { Router } from '@angular/router'

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbsVC.html',
  styleUrls: ['./breadcrumbsVC.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsVC {
  public readonly items: BreadcrumbItemState[] = [
    {
      label: 'Home',
      path: '/breadcrumb',
    },

    {
      label: 'Alfa',
      path: '/breadcrumb/alfa',
    },

    {
      label: 'Bravo (International Radiotelephony Spelling Alphabet)',
      path: '/breadcrumb/alfa/bravo',
    },

    {
      label: 'Charlie',
      path: '/breadcrumb/alfa/bravo/charlie',
    },

    {
      label: 'Delta (International Radiotelephony Spelling Alphabet)',
      path: '/breadcrumb/alfa/bravo/charlie/delta',
    },

    {
      label: 'Echo',
      path: '/breadcrumb/alfa/bravo/charlie/delta/echo',
    },

    {
      label: 'Foxtrot (International Radiotelephony Spelling Alphabet)',
      path: '/breadcrumb/alfa/bravo/charlie/delta/echo/foxtrot',
    },
  ]

  constructor(private readonly router: Router) {}

  public handleRouteChange(event: Event): void {
    this.router.navigateByUrl((event as CustomEvent<string>).detail)
  }
}
