export class TableSelection {
  static className = 'selected';

  constructor() {
    this.$cells = [];
    this.$current = null;
  }

  select($cell) {
    this.clear();
    this.$cells.push($cell);
    $cell.focus().addClass(TableSelection.className);
    this.$current = $cell;
  }

  selectGroup($cells = []) {
    this.clear();

    this.$cells = $cells;
    this.$cells.forEach(($cell) => $cell.addClass(TableSelection.className));
  }

  changeStyle(style) {
    this.$cells.forEach(($cell) => {
      $cell.css(style);
    });
  }

  get selectedIds() {
    return this.$cells.map(($cell) => $cell.id());
  }

  clear() {
    this.$cells.forEach(($cell) => $cell.removeClass(TableSelection.className));
    this.$cells = [];
  }
}
