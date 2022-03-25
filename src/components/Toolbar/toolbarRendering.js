const createButton = (button) => {
  return (`
    <button 
      class="toolbar__button ${button.active ? 'active' : ''}"
      data-type="button"
      data-value='${JSON.stringify(button.value)}'
    >
      <svg class="toolbar__button">
        <use xlink:href="#${button.href}"></use>
      </svg>
    </button>
  `);
};

export const createToolbar = (state) => {
  const buttons = [
    {
      href: 'format-left',
      active: state['textAlign'] === 'left',
      value: {
        textAlign: 'left',
      },
    },
    {
      href: 'format-center',
      active: state['textAlign'] === 'center',
      value: {
        textAlign: 'center',
      },
    },
    {
      href: 'format-right',
      active: state['textAlign'] === 'right',
      value: {
        textAlign: 'right',
      },
    },
    {
      href: 'format-bold',
      active: state['fontWeight'] === '700',
      value: {
        fontWeight: state['fontWeight'] === '700' ? '400' : '700',
      },
    },
    {
      href: 'format-italic',
      active: state['fontStyle'] === 'italic',
      value: {
        fontStyle: state['fontStyle'] === 'italic' ? 'normal' : 'italic',
      },
    },
    {
      href: 'format-underlined',
      active: state['textDecoration'] === 'underline',
      value: {
        textDecoration: state['textDecoration'] === 'underline'
          ? 'none'
          : 'underline',
      },
    },
  ];

  return (` 
    <div class="toolbar__buttons">
      ${buttons.map(createButton).join('')}
    </div>
  `);
};
