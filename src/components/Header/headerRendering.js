const createButton = (classNameButton = '', classNameIcon = '', href = '') => {
  return `
    <button class="${classNameButton}" type="button">
      <svg class="${classNameIcon}">
        <use xlink:href="${href}"></use>
      </svg>
    </button>
  `;
};

const createInput = (
  className = '',
  type = 'text',
  value = 'Новая таблица'
) => {
  return `
    <label class="header__label">
      <input class="${className}" type="${type}" value="${value}">
    </label>
  `;
};

export const createHeader = (state) => {
  return `
    <div class="header__box">
      ${createButton('header__button-icon', 'header__icon', '#excel')}
      ${createInput('header__input', 'text', state.tableTitle)}
    </div>
    <div class="header__buttons">
      ${createButton('header__button', 'header__delete', '#delete')}
      ${createButton('header__button', 'header__exit-back', '#exit-back')}
    </div>
  `;
};
