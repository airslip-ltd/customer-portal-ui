import { getGridDateOperators } from '@mui/x-data-grid';

export const dateFilterOperators = getGridDateOperators().filter(
  (operator) =>
    operator.value === 'before' ||
    operator.value === 'onOrBefore' ||
    operator.value === 'after' ||
    operator.value === 'onOrAfter'
);
