import {ExcelComponent} from '@/core/ExcelComponent';
import {createTable} from '@/components/Table/tableRendering';
import {$} from '@/core/DOM';
import {tableResize} from '@/components/Table/tableResize';
import {
  getIds,
  getNextSelector,
  isResize,
  isSelect,
} from '@/components/Table/tableFunctions';
import {TableSelection} from '@/components/Table/TableSelection';
import {
  changeStylesAC,
  changeTextAC, saveStylesAC,
  tableResizeAC,
} from '@/redux/actionCreators';
import {defaultStyles} from '@/constants';

export class Table extends ExcelComponent {
  static className = 'table';
  static initCellId = '[data-id="A:1"]';
  static tableHeight = 100;

  constructor($root, options = {}) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    this.selectCell(this.$root.find(Table.initCellId));

    this.$on('formula:input', (text) => {
      this.selection.$current.text(text);
      this.updateTextInStore(text);
    });

    this.$on('formula:entered', () => {
      this.selection.$current.focus();
    });

    this.$on('toolbar:changeStyle', (value) => {
      this.selection.changeStyle(value);
      this.$dispatch(saveStylesAC({
        value,
        ids: this.selection.selectedIds,
      }));
    });
  }

  toHTML() {
    return createTable(Table.tableHeight, this.store.getState());
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell.text());
    const styles = $cell.getStyles(Object.keys(defaultStyles));
    console.log('Styles to dispatch', styles);
    this.$dispatch(changeStylesAC(styles));
  }

  updateTextInStore(value) {
    this.$dispatch(changeTextAC({
      value,
      id: this.selection.$current.id(),
    }));
  }

  async onMousedown(event) {
    const $target = $(event.target);

    if (isResize($target)) {
      const data = await tableResize(event, this.$root, $target);
      this.$dispatch(tableResizeAC(data));
    }

    if (isSelect($target)) {
      if (event.shiftKey) {
        const $cells = getIds($target, this.selection.$current)
          .map((id) => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectGroup($cells);
      } else {
        this.selectCell($target);
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowUp',
      'ArrowRight',
      'ArrowDown',
      'ArrowLeft',
    ];
    const {key} = event;

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const id = this.selection.$current.id(true);
      const $nextCell = this.$root.find(getNextSelector(key, id));

      this.selectCell($nextCell);
    }
  }

  onInput(event) {
    this.updateTextInStore(event.target.textContent);
  }
}
