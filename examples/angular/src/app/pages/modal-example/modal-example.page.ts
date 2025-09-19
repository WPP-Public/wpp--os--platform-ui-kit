import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-modal-example',
  templateUrl: './modal-example.page.html',
  styleUrls: ['./modal-example.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalExamplePage {
  public isModalOpen: boolean = false
  public isSideModalOpen: boolean = false
  public isSideModalBackdrop = false

  public openModal(): void {
    this.isModalOpen = true
  }

  public closeModal(): void {
    this.isModalOpen = false
  }

  public openSideModal(): void {
    this.isSideModalOpen = true
  }

  public closeSideModal(): void {
    this.isSideModalOpen = false
  }

  public openSideModalBackdrop(): void {
    this.isSideModalBackdrop = true
  }

  public closeSideModalBackdrop(): void {
    this.isSideModalBackdrop = false
  }
}
