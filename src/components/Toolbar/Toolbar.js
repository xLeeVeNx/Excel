import {ExcelComponent} from '@/core/ExcelComponent';

export class Toolbar extends ExcelComponent {
  static className = 'toolbar';

  toHTML() {
    return `
        <div class="toolbar__buttons">
            <button class="toolbar__button">
                <svg class="toolbar__button">
                    <use xlink:href="#format-left"></use>
                </svg>
            </button>
            <button class="toolbar__button">
                <svg class="toolbar__button">
                    <use xlink:href="#format-center"></use>
                </svg>
            </button>
            <button class="toolbar__button">
                <svg class="toolbar__button">
                    <use xlink:href="#format-right"></use>
                </svg>
            </button>
            <button class="toolbar__button">
                <svg class="toolbar__button">
                    <use xlink:href="#format-bold"></use>
                </svg>
            </button>
            <button class="toolbar__button">
                <svg class="toolbar__button">
                    <use xlink:href="#format-italic"></use>
                </svg>
            </button>
            <button class="toolbar__button">
                <svg class="toolbar__button">
                    <use xlink:href="#format-underlined"></use>
                </svg>
            </button>
        </div>
    `;
  }
}
