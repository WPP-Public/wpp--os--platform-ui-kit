import { ChangeDetectionStrategy, Component } from '@angular/core'
import { NavigationState } from '@platform-ui-kit/components-library/dist/types/components/wpp-topbar/types'

@Component({
  selector: 'app-topbar-example',
  templateUrl: './topbar-example.page.html',
  styleUrls: ['./topbar-example.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarExamplePage {
  public initNavigation: NavigationState[] = [
    {
      label: 'Home',
      value: 'home',
      path: '/topbar',
    },
    {
      label: 'Client services',
      value: 'clientServices',
      path: '/topbar/client-services',
    },
    {
      label: 'Learning',
      value: 'learning',
      children: [
        {
          label: 'Guided tour',
          value: 'guidedTour',
          path: '/topbar/learning/guided-tour',
        },
        {
          label: 'Case studies',
          value: 'caseStudies',
          path: '/topbar/learning/case-studies',
        },
        {
          label: 'Community',
          value: 'community',
          path: '/topbar/learning/community',
          children: [
            {
              label: 'People',
              value: 'people',
              path: '/topbar/learning/people',
            },
            {
              label: 'Workers',
              value: 'workers',
              path: '/topbar/learning/workers',
            },
          ],
        },
      ],
    },
    {
      label: 'Marketplace',
      value: 'marketplace',
      path: '/topbar/marketplace',
    },
    {
      label: 'Dev portal',
      value: 'devPortal',
      path: '/topbar/devPortal',
    },
  ]

  public value = 'devPortal'
  public navigationData = this.initNavigation

  public handleTopbarItemChange = (event: Event) => {
    this.value = (event as CustomEvent).detail.value

    console.log((event as CustomEvent).detail.path)
  }

  public handleAddNavigationItemToBeginning = () => {
    this.navigationData = [{ label: 'Start', value: 'start', path: '/topbar/start' }, ...this.navigationData]
  }

  public handleAddNavigationItemToEnd = () => {
    this.navigationData = [...this.navigationData, { label: 'End', value: 'end', path: '/topbar/end' }]
  }
}
