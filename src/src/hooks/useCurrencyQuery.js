import { useContext } from 'react';
import { CurrencySelectionContext } from '../contexts/CurrencySelectionContext';

// ----------------------------------------------------------------------

const useCurrencyQuery = () => useContext(CurrencySelectionContext);

export default useCurrencyQuery;
