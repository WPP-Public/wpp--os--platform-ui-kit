import { ChangeDetectionStrategy, Component } from '@angular/core'
import { users, interactableUsers } from '../../../dummy-data/user-avatars'
import { UserState } from '@platform-ui-kit/components-library/dist/types/components/wpp-avatar-group/types'

@Component({
  selector: 'app-avatars',
  templateUrl: './avatarsVC.html',
  styleUrls: ['./avatarsVC.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarsVC {
  public readonly users: UserState[] = users
  public readonly interactableUsers: UserState[] = interactableUsers
  public topPlacement = { placement: 'top' }
  public logoLink =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU'
  public icon = 'wpp-icon-premium'

  handleWppClick(event: Event) {
    console.log('Wpp Click event', event)
  }
}
