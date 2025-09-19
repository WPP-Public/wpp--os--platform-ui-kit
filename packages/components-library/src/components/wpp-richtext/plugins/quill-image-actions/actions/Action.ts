import ImageActions from '../ImageActions'

export default class Action {
  static formats: string[] = []

  formatter: ImageActions

  constructor(formatter: ImageActions) {
    this.formatter = formatter
  }

  onCreate(): void {}

  onDestroy(): void {}

  onUpdate(): void {}
}
