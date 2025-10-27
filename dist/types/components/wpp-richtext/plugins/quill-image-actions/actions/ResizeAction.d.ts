import Action from './Action';
import ImageActions from '../ImageActions';
interface HandleStyle {
  width: string;
  height: string;
}
export default class ResizeAction extends Action {
  static formats: string[];
  topLeftHandle: HTMLElement;
  topRightHandle: HTMLElement;
  bottomRightHandle: HTMLElement;
  bottomLeftHandle: HTMLElement;
  dragHandle: HTMLElement | null | undefined;
  dragStartX: number;
  preDragWidth: number;
  targetRatio: number;
  constructor(formatter: ImageActions);
  onCreate(): void;
  onDestroy(): void;
  createHandle(position: string, cursor: string): HTMLElement;
  repositionHandles(handleStyle: HandleStyle | null | undefined): void;
  setCursor(value: string): void;
  onMouseDown: (event: MouseEvent) => void;
  onDrag: (event: MouseEvent) => void;
  onMouseUp: () => void;
}
export {};
