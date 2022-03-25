import {ExcelComponent} from '@/core/ExcelComponent';
import {changeTitleAC} from '@/redux/actionCreators';
import {createHeader} from '@/components/Header/headerRendering';
import {$} from '@/core/DOM';
import {debounce} from '@/core/utils';

export class Header extends ExcelComponent {
  static className = 'header';

  constructor($root, options = {}) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options,
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300);
  }

  onInput(event) {
    this.$dispatch(changeTitleAC(event.target.value));
  }

  toHTML() {
    return createHeader(this.store.getState());
  }
}
