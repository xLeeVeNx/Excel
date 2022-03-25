import {
  CHANGE_STYLES,
  CHANGE_TEXT,
  CHANGE_TITLE,
  SAVE_STYLES,
  TABLE_RESIZE,
} from '@/redux/types';

export const tableResizeAC = (data) => {
  return {
    type: TABLE_RESIZE,
    data,
  };
};

export const changeTextAC = (data) => {
  return {
    type: CHANGE_TEXT,
    data,
  };
};

export const changeStylesAC = (data) => {
  return {
    type: CHANGE_STYLES,
    data,
  };
};

export const saveStylesAC = (data) => {
  return {
    type: SAVE_STYLES,
    data,
  };
};

export const changeTitleAC = (data) => {
  return {
    type: CHANGE_TITLE,
    data,
  };
};
