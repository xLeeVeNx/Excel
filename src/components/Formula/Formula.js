import {ExcelComponent} from '@/core/ExcelComponent';
import {$} from '@/core/DOM';

export class Formula extends ExcelComponent {
  static className = 'formula';

  constructor($root, options = {}) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribes: ['currentText', 'rowState', 'columnState'],
      ...options,
    });
  }

  onInput(event) {
    this.$emit('formula:input', $(event.target).text());
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab'];
    if (keys.includes(event.key)) {
      event.preventDefault();
      this.$emit('formula:entered');
    }
  }

  storeChanged(changes) {
    this.$formulaInput.text(changes.currentText);
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

    this.$formulaInput = this.$root.find('#formula-input');

    this.$on('table:select', (text) => {
      this.$formulaInput.text(text);
    });
  }
}
