import BlotSpec from './BlotSpec';
import ImageActions from '../ImageActions';
export default class ImageSpec extends BlotSpec {
  el: HTMLElement | null | undefined;
  constructor(formatter: ImageActions);
  init(): void;
  getTargetElement(): HTMLElement | null | undefined;
  onHide(): void;
  onClick: (event: MouseEvent) => void;
}
