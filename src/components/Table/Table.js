import {ExcelComponent} from '@/core/ExcelComponent';
import {createTable} from '@/components/Table/tableRendering';
import {$} from '@/core/DOM';
import {tableResize} from '@/components/Table/tableResize';
import {isResize} from '@/components/Table/tableFunctions';

export class Table extends ExcelComponent {
  static className = 'table';

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown'],
    });
  }

  onMousedown(event) {
    const $target = $(event.target);

    if (isResize($target)) {
      tableResize(event, this.$root, $target);
    }
  }

  toHTML() {
    return createTable(25);
  }
}
