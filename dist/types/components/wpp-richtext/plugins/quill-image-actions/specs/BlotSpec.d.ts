import ImageActions from '../ImageActions';
interface Action {
  onCreate(): void;
  onDestroy(): void;
  onUpdate(): void;
}
interface ExtendsAction {
  new (...rest: any): Action;
}
export default class BlotSpec {
  el: HTMLElement | null | undefined;
  formatter: ImageActions;
  constructor(formatter: ImageActions);
  init(): void;
  getActions(): ExtendsAction[];
  getTargetElement(): HTMLElement | null | undefined;
  getOverlayElement(): HTMLElement | null | undefined;
  setSelection(): void;
  onHide(): void;
}
export {};
