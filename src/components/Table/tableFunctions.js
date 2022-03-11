import {fromCharCode, range} from '@/core/utils';
import {Table} from '@/components/Table/Table';

export const isResize = ($target) => {
  return $target.data.resize;
};

export const isSelect = ($target) => {
  return $target.data.type === 'cell';
};

export const getIds = ($target, $current) => {
  const targetId = $target.id(true);
  const currentId = $current.id(true);

  const columns = range(targetId.column, currentId.column);
  const rows = range(targetId.row, currentId.row);

  return columns.reduce((acc, col) => {
    rows.forEach((row) => {
      const id = `${fromCharCode(col)}:${row}`; // A:3; C:7
      acc.push(id);
    });
    return acc;
  }, []);
};

export const getNextSelector = (key, {column, row}) => {
  const MIN_COLUMN_VALUE = 65;
  const MAX_COLUMN_VALUE = 90;
  const MIN_ROW_VALUE = 1;
  const MAX_ROW_VALUE = Table.tableHeight;

  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row = row + 1 > MAX_ROW_VALUE ? MAX_ROW_VALUE : row + 1;
      break;
    case 'Tab':
    case 'ArrowRight':
      column = column + 1 > MAX_COLUMN_VALUE ? MAX_COLUMN_VALUE : column + 1;
      break;
    case 'ArrowLeft':
      column = column - 1 < MIN_COLUMN_VALUE ? MIN_COLUMN_VALUE : column - 1;
      break;
    case 'ArrowUp':
      row = row - 1 < MIN_ROW_VALUE ? MIN_ROW_VALUE : row - 1;
      break;
  }

  return `[data-id="${fromCharCode(column)}:${row}"]`;
};
