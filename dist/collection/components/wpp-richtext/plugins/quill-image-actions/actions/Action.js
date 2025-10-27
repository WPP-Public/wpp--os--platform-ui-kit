class Action {
  constructor(formatter) {
    this.formatter = formatter;
  }
  onCreate() { }
  onDestroy() { }
  onUpdate() { }
}
Action.formats = [];
export default Action;
