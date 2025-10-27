import Action from './Action';
export default class DeleteAction extends Action {
  onCreate(): void;
  onDestroy(): void;
  onKeyUp: (e: KeyboardEvent) => void;
}
