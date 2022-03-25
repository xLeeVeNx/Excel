import {createToolbar} from '@/components/Toolbar/toolbarRendering';
import {$} from '@/core/DOM';
import {ExcelStateComponent} from '@/core/ExcelStateComponent';
import {defaultStyles} from '@/constants';

export class Toolbar extends ExcelStateComponent {
  static className = 'toolbar';

  constructor($root, options = {}) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribes: ['currentStyles'],
      ...options,
    });
  }

  prepare() {
    this.initState(defaultStyles);
  }

  storeChanged(changes) {
    this.setState(changes.currentStyles);
  }

  onClick(event) {
    let $target = event.target.closest('[data-type="button"]');
    if ($target) {
      $target = $($target);
      const value = JSON.parse($target.data.value);
      this.$emit('toolbar:changeStyle', value);
    }
  }

  get layout() {
    return createToolbar(this.state);
  }

  toHTML() {
    return this.layout;
  }
}
