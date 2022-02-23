const LETTERS_CODES = {
  A: 65,
  Z: 90,
};

const fromCharCode = (_, index) => {
  return String.fromCharCode(LETTERS_CODES.A + index);
};

const createRowCell = (_, index) => {
  return `
    <div class="table__row-cell" data-number="${index}" contenteditable></div>
  `;
};

const createRowLetter = (letter = '', index) => {
  return `
    <div class="table__row-letter" data-type="resizable" data-number="${index}">
        <span>${letter}</span>
        <div class="horizontal-resize" data-resize="horizontal"></div>
    </div>
  `;
};

const createRow = (number, content = '') => {
  return `
      <div class="table__row" ${number && 'data-type="resizable"'}>
        <div class="table__row-number">
            <span>${number && number}</span>
            <div class="vertical-resize" data-resize="vertical"></div>
        </div>
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
