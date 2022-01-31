const LETTERS_CODES = {
  A: 65,
  Z: 90,
};

const fromCharCode = (_, index) => {
  return String.fromCharCode(LETTERS_CODES.A + index);
};

const createRowCell = () => {
  return `
    <div class="table__row-cell" contenteditable></div>
  `;
};

const createRowLetter = (letter = '') => {
  return `
    <div class="table__row-letter">${letter}</div>
  `;
};

const createRow = (number, content = '') => {
  return `
      <div class="table__row">
        <div class="table__row-number">${number && number}</div>
        <div class="table__row-container">${content}</div>
      </div>
  `;
};

export const createTable = (rowsCount = 30) => {
  const tableLayout = [];
  const lettersCount = Math.abs(LETTERS_CODES.A - LETTERS_CODES.Z) + 1;
  const rowLetters = new Array(lettersCount)
    .fill('')
    .map(fromCharCode)
    .map(createRowLetter)
    .join('');
  const rowCells = new Array(lettersCount)
    .fill('')
    .map(createRowCell)
    .join('');

  tableLayout.push(createRow('', rowLetters));

  for (let index = 1; index <= rowsCount; index++) {
    tableLayout.push(createRow(index, rowCells));
  }

  return tableLayout.join('');
};
