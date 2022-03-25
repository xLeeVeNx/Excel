import {
  CHANGE_STYLES,
  CHANGE_TEXT, CHANGE_TITLE,
  SAVE_STYLES,
  TABLE_RESIZE,
} from '@/redux/types';
import {deepClone} from '@/core/utils';

const updateState = (state, action) => {
  state = deepClone(state);
  state[action.data.id] = action.data.value;
  return state;
};

export const rootReducer = (state, action) => {
  state = deepClone(state);
  let key = null;
  let previousState = null;
  switch (action.type) {
    case TABLE_RESIZE: {
      key = action.data.type === 'horizontal' ? 'columnState' : 'rowState';
      return {...state, [key]: updateState(state[key], action)};
    }
    case CHANGE_TEXT: {
      return {
        ...state,
        currentText: action.data.value,
        cellsState: updateState(state.cellsState, action),
      };
    }
    case CHANGE_STYLES: {
      return {...state, currentStyles: action.data};
    }
    case SAVE_STYLES: {
      previousState = state['stylesState'] || {};
      action.data.ids.forEach((id) => {
        previousState[id] = {...previousState[id], ...action.data.value};
      });
      return {
        ...state,
        stylesState: previousState,
        currentStyles: {...state.currentStyles, ...action.data.value},
      };
    }
    case CHANGE_TITLE: {
      return {...state, tableTitle: action.data};
    }
    default: return state;
  }
};
