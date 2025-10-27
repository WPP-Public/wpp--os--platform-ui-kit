import { Toolbar } from './Toolbar';
import { Aligner } from './Aligner';
import { Alignment } from './Alignment';
import ImageActions from '../../ImageActions';
export default class DefaultToolbar implements Toolbar {
  toolbar: HTMLElement | null | undefined;
  buttons: HTMLElement[];
  constructor();
  create(formatter: ImageActions, aligner: Aligner): HTMLElement;
  destroy(): void;
  getElement(): HTMLElement | null | undefined;
  addToolbarStyle(formatter: ImageActions, toolbar: HTMLElement): void;
  addButtonStyle(button: HTMLElement, index: number, formatter: ImageActions): void;
  addButtons(formatter: ImageActions, toolbar: HTMLElement, aligner: Aligner): void;
  preselectButton(button: HTMLElement, alignment: Alignment, formatter: ImageActions, aligner: Aligner): void;
  onButtonClick(button: HTMLElement, formatter: ImageActions, alignment: Alignment, aligner: Aligner): void;
  clickButton(button: HTMLElement, alignTarget: HTMLElement, formatter: ImageActions, alignment: Alignment, aligner: Aligner): void;
  selectButton(formatter: ImageActions, button: HTMLElement): void;
  deselectButton(formatter: ImageActions, button: HTMLElement): void;
}
