import { useContext } from 'react';
import { DateSelectionContext } from '../contexts/DateSelectionContext';

// ----------------------------------------------------------------------

const useDateQuery = () => useContext(DateSelectionContext);

export default useDateQuery;
