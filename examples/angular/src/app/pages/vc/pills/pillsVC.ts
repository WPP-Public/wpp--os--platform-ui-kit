import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-pill-example',
  templateUrl: './pillsVC.html',
  styleUrls: ['./pillsVC.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PillsVC {
  public pillValue = 'item-a'
  public avatarURL =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8huvp8b3bXl2v8ac6MSqz0Uk3zqauY2ttIA&usqp=CAU'
  public logoURL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU'
  public labelConfig = {
    icon: 'wpp-icon-info',
    text: 'Multi Group',
    description: 'Description',
    locales: {
      optional: 'Optional',
    },
  }

  public handleSinglePillGroupChange = (event: Event) => {
    console.log('event.detail =>', (event as CustomEvent).detail.value)
    this.pillValue = (event as CustomEvent).detail.value
  }
}
