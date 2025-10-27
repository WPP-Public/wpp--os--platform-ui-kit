import ImageActions from '../ImageActions';
export default class Action {
  static formats: string[];
  formatter: ImageActions;
  constructor(formatter: ImageActions);
  onCreate(): void;
  onDestroy(): void;
  onUpdate(): void;
}
