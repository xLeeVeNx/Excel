import {ExcelComponent} from '@/core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'formula';

  toHTML() {
    return `
        <div class="formula__fx">
            <svg class="formula__fx-icon">
                <use xlink:href="#fx"></use>
            </svg>
        </div>
        <div class="formula__input" contenteditable spellcheck="false"></div>
    `;
  }
}
