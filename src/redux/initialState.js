import {storage} from '@/core/utils';
import {defaultStyles, defaultTableTitle} from '@/constants';

const defaultState = {
  columnState: {},
  rowState: {},
  cellsState: {},
  stylesState: {},
  currentStyles: defaultStyles,
  tableTitle: defaultTableTitle,
  currentText: '',
};

const reload = (state) => {
  return {
    ...state,
    currentStyles: defaultStyles,
    currentText: '',
  };
};

export const initialState = storage('excel-state')
  ? reload(storage('excel-state'))
  : defaultState;
