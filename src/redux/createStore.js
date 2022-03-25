import {deepClone} from '@/core/utils';

export const createStore = (rootReducer, initialState = {}) => {
  let state = rootReducer(initialState, {type: '__INIT__'});
  let listeners = [];

  return {
    subscribe(callback) {
      listeners.push(callback);

      return {
        unsubscribe() {
          listeners = listeners.filter((listener) => listener !== callback);
        },
      };
    },

    dispatch(action) {
      state = rootReducer(state, action);
      listeners.forEach((listener) => listener(state));
    },

    getState() {
      return deepClone(state);
    },
  };
};
