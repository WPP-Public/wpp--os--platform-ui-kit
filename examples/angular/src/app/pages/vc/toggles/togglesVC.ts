import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-toggles',
  templateUrl: './togglesVC.html',
  styleUrls: ['./togglesVC.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TogglesVC {
  public value: boolean = false
  public labelConfig = {
    text: 'Label Text',
  }
  public labelConfigHover = {
    text: 'Hover test',
  }
}
