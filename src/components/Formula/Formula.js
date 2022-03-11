import {ExcelComponent} from '@/core/ExcelComponent';
import {$} from '@/core/DOM';

export class Formula extends ExcelComponent {
  static className = 'formula';

  constructor($root, options = {}) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options,
    });
  }

  onInput(event) {
    this.$dispatch('formula:input', $(event.target).text());
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab'];
    if (keys.includes(event.key)) {
      event.preventDefault();
      this.$dispatch('formula:entered');
    }
  }

  toHTML() {
    return `
        <div class="formula__fx">
            <svg class="formula__fx-icon">
                <use xlink:href="#fx"></use>
            </svg>
        </div>
        <div 
            class="formula__input" 
            id="formula-input" 
            contenteditable 
            spellcheck="false">
        </div>
    `;
  }

  init() {
    super.init();
    const $formulaInput = this.$root.find('#formula-input');

    this.$on('table:input', (text) => {
      $formulaInput.text(text);
    });

    this.$on('table:select', (text) => {
      $formulaInput.text(text);
    });
  }
}
