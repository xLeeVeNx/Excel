import {ExcelComponent} from '@/core/ExcelComponent';
import {createTable} from '@/components/Table/table.template';

export class Table extends ExcelComponent {
  static className = 'table';

  toHTML() {
    return createTable(31);
  }
}
