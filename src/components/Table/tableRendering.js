import {toInlineStyles} from '@/core/utils';
import {defaultStyles} from '@/constants';

const LETTERS_CODES = {
  A: 65,
  Z: 90,
};
const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

const fromCharCode = (_, index) => {
  return String.fromCharCode(LETTERS_CODES.A + index);
};

const getWidth = (state, index) => {
  return (state[index] || DEFAULT_WIDTH) + 'px';
};

const getHeight = (state, index) => {
  return (state[index] || DEFAULT_HEIGHT) + 'px';
};

const createRowCell = (rowNumber, state = {}) => {
  return (_, index) => {
    const letter = fromCharCode('', index);
    const width = getWidth(state.columnState, index);
    const id = `${letter}:${rowNumber}`;
    const content = state.cellsState[id] || '';
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id],
    });

    return (`
      <div 
        class="table__row-cell" 
        data-number="${index}"
        data-id="${id}"
        data-type="cell"
        data-value="${content || ''}"
        contenteditable
        style="${styles}; width: ${width};"
      >
        ${content} 
      </div>
    `);
  };
};

const rowLetterHelper = (state = {}) => {
  return (letter = '', index) => {
    return {
      letter, index, width: getWidth(state, index),
    };
  };
};

const createRowLetter = ({letter, index, width}) => {
  return (`
    <div 
      class="table__row-letter" 
      data-type="resizable" 
      data-number="${index}" 
      style="width: ${width}"
    >
      <span>${letter}</span>
      <div class="horizontal-resize" data-resize="horizontal"></div>
    </div>
  `);
};

const createRow = (number, content = '', state = {}) => {
  const height = getHeight(state, number);

  return (`
    <div 
      class="table__row" 
      ${number && `data-number="${number}"`} 
      ${number && 'data-type="resizable"'}
      style="height: ${height}"
    >
      <div class="table__row-number">
        <span>${number && number}</span>
        <div class="vertical-resize" data-resize="vertical"></div>
      </div>
      <div class="table__row-container">${content}</div>
    </div>
  `);
};

export const createTable = (rowsCount = 30, state) => {
  const tableLayout = [];
  const lettersCount = Math.abs(LETTERS_CODES.A - LETTERS_CODES.Z) + 1;
  const rowLetters = new Array(lettersCount)
    .fill('')
    .map(fromCharCode)
    .map(rowLetterHelper(state.columnState))
    .map(createRowLetter)
    .join('');
  const rowCells = (rowNumber) => {
    return new Array(lettersCount)
      .fill('')
      .map(createRowCell(rowNumber, state))
      .join('');
  };

  tableLayout.push(createRow('', rowLetters));

  for (let index = 1; index <= rowsCount; index++) {
    tableLayout.push(createRow(index, rowCells(index), state.rowState));
  }

  return tableLayout.join('');
};
