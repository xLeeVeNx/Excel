import {ExcelComponent} from '@/core/ExcelComponent';

export class Header extends ExcelComponent {
  static className = 'header';

  constructor($root, options = {}) {
    super($root, {
      name: 'Header',
      ...options,
    });
  }

  toHTML() {
    return `
        <div class="header__box">
            <button class="header__button-icon">
                <svg class="header__icon">
                    <use xlink:href="#excel"></use>
                </svg>
            </button>
            <label class="header__label">
                <input class="header__input" type="text" value="Новая таблица">
            </label>
        </div>
        <div class="header__buttons">
            <button class="header__button">
                <svg class="header__delete">
                    <use xlink:href="#delete"></use>
                </svg>
            </button>
            <button class="header__button">
                <svg class="header__exit-back">
                    <use xlink:href="#exit-back"></use>
                </svg>
            </button>
        </div>
    `;
  }
}
