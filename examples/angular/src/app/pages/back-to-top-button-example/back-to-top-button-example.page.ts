import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core'

@Component({
  selector: 'app-back-to-top-button-example',
  templateUrl: './back-to-top-button.page.html',
  styleUrls: ['./back-to-top-button.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackToTopButtonExamplePage {
  public showBackToTop: boolean = false

  public cardsList = [
    {
      title: 'Design',
      src: 'https://images.unsplash.com/photo-1658863025658-4a259cc68fc9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1925&q=80',
    },
    {
      title: 'Devices',
      src: 'https://images.unsplash.com/photo-1491947153227-33d59da6c448?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80',
    },
    {
      title: 'Place for work',
      src: 'https://images.unsplash.com/photo-1519332978332-21b7d621d05e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
    },
    {
      title: 'Place for rest',
      src: 'https://images.unsplash.com/photo-1519710889408-a67e1c7e0452?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
    },
    {
      title: 'What you can read',
      src: 'https://images.unsplash.com/photo-1535058314881-56b6eb96bd69?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    },
    {
      title: 'Good to make plans, but not for me?',
      src: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
    },
  ]

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.showBackToTop = window.scrollY > 200
  }

  public handleBackToTopClick(): void {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }
}
