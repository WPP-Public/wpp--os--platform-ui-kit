import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-topbar-example',
  templateUrl: './topbarVC.html',
  styleUrls: ['./topbarVC.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarVC {
  public initNavigation = [
    {
      label: 'Home',
      value: 'home',
      path: '/topbar',
    },
    {
      chevronOnly: true,
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

  public firstValue = 'devPortal'
  public secondValue = 'community'
  public navigationData = this.initNavigation

  public handleTopbarItemChange = (event: Event) => {
    this.firstValue = (event as CustomEvent).detail.value
    this.secondValue = (event as CustomEvent).detail.value

    console.log((event as CustomEvent).detail.path)
  }

  public handleAddNavigationItemToBeginning = () => {
    this.navigationData = [{ label: 'Start', value: 'start', path: '/topbar/start' }, ...this.navigationData]
  }

  public handleAddNavigationItemToEnd = () => {
    this.navigationData = [...this.navigationData, { label: 'End', value: 'end', path: '/topbar/end' }]
  }
}
