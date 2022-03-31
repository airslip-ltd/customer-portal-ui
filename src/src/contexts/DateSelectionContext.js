import PropTypes from 'prop-types';
import { createContext, useState } from 'react';

// ----------------------------------------------------------------------

const initialState = {
  relationship: null
};

const DateSelectionContext = createContext({
  ...initialState
});

DateSelectionProvider.propTypes = {
  children: PropTypes.node
};

function DateSelectionProvider({ children }) {
  const [startDate, setStartDate] = useState('2021-03-01');
  const [endDate, setEndDate] = useState('2022-03-01');

  return (
    <DateSelectionContext.Provider
      value={{
        startDate,
        endDate,
        dateQuery: {
          startDate,
          endDate
        }
      }}
    >
      {children}
    </DateSelectionContext.Provider>
  );
}

export { DateSelectionProvider, DateSelectionContext };
