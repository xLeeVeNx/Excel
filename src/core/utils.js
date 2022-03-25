import {defaultStyles} from '@/constants';

export const capitalize = (string) => {
  if (typeof string !== 'string') {
    return '';
  }

  return string[0].toUpperCase() + string.slice(1);
};

export const range = (begin, end) => {
  const minValue = Math.min(begin, end);

  return new Array(Math.abs(begin - end) + 1)
    .fill('')
    .map((_, index) => minValue + index);
};

export const fromCharCode = (code) => {
  return String.fromCharCode(code);
};

export const storage = (key, data = null) => {
  if (!data) {
    return JSON.parse(localStorage.getItem(key));
  }

  localStorage.setItem(key, JSON.stringify(data));
};

export const deepClone = (obj) => {
  if (obj === null) {
    return null;
  }

  const clone = Object.assign({}, obj);

  Object.keys(clone).forEach(
    (key) =>
      (clone[key] =
        typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key])
  );

  return Array.isArray(obj) && obj.length
    ? (clone.length = obj.length) && Array.from(clone)
    : Array.isArray(obj)
      ? Array.from(obj)
      : clone;
};

export const isEqual = (a, b) => {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b);
  }

  return a === b;
};

export const camelToDashCase = (string) => {
  return string.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
};

export const toInlineStyles = (styles = {}) => {
  return Object.keys(styles)
    .map((key) => `${camelToDashCase(key)}: ${styles[key]}`)
    .join('; ');
};

export const debounce = (callback, delay = 300) => {
  let timeout = null;

  return function(...args) {
    const later = () => {
      clearTimeout(timeout);
      // eslint-disable-next-line no-invalid-this
      callback.apply(this, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, delay);
  };
};
