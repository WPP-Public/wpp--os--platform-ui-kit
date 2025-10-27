import BlotSpec from './BlotSpec';
import ImageActions from '../ImageActions';
import { EventTargetProp } from '../types';
declare const MOUSE_ENTER_ATTRIBUTE = "data-image-actions-unclickable-bound";
interface UnclickableHTMLElement extends HTMLElement {
  [MOUSE_ENTER_ATTRIBUTE]: boolean;
  __blot: any;
}
export default class UnclickableBlotSpec extends BlotSpec {
  selector: string;
  unclickable?: UnclickableHTMLElement | null;
  nextUnclickable?: UnclickableHTMLElement | null;
  proxyImage: HTMLElement & EventTargetProp;
  constructor(formatter: ImageActions, selector: string);
  init(): void;
  getTargetElement(): HTMLElement | null | undefined;
  getOverlayElement(): HTMLElement | null | undefined;
  onHide(): void;
  createProxyImage(): HTMLElement;
  hideProxyImage(): void;
  repositionProxyImage(): void;
  onTextChange: () => void;
  onMouseEnter: (event: MouseEvent) => void;
  onProxyImageClick: (e: MouseEvent) => void;
}
export {};
