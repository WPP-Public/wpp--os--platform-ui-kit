import Action from '../Action';
import ImageActions from '../../ImageActions';
import { Aligner } from './Aligner';
import { Toolbar } from './Toolbar';
export default class AlignAction extends Action {
  static formats: string[];
  toolbar: Toolbar;
  aligner: Aligner;
  constructor(formatter: ImageActions);
  onCreate(): void;
  onDestroy(): void;
}
