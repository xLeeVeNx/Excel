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
