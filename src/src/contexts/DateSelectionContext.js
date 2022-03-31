import { Box, Button, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { createContext, useState } from 'react';
import Picker from 'react-month-picker';

MonthBox.propTypes = {
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

function MonthBox({ value, onClick }) {
  return <Button onClick={onClick}>{value}</Button>;
}

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
  const [startDateRaw, setStartDate] = useState({ year: 2021, month: 3 });
  const [endDateRaw, setEndDate] = useState({ year: 2022, month: 3 });
  const startMonthRef = React.createRef();
  const endMonthRef = React.createRef();

  const pickerLang = {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    from: 'From',
    to: 'To'
  };

  const makeText = (m) => {
    if (m && m.year && m.month) return `${pickerLang.months[m.month - 1]}. ${m.year}`;
    return '?';
  };

  return (
    <DateSelectionContext.Provider
      value={{
        dateQuery: {
          startDate: `${startDateRaw.year}-${startDateRaw.month}-01`,
          endDate: `${endDateRaw.year}-${endDateRaw.month}-01`
        }
      }}
    >
      <Stack>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <Stack direction="row" sx={{ py: 2 }}>
              <Typography variant="subtitle1" sx={{ mt: 0.8, mr: 1 }}>
                Date range
              </Typography>
              <Picker
                ref={startMonthRef}
                years={5}
                value={startDateRaw}
                lang={pickerLang.months}
                onChange={(year, month) => setStartDate({ year, month })}
                onDismiss={setStartDate}
              >
                <MonthBox value={`From: ${makeText(startDateRaw)}`} onClick={() => startMonthRef.current.show()} />
              </Picker>
              <Typography variant="subtitle1" sx={{ mt: 0.8, mx: 1 }}>
                -
              </Typography>
              <Picker
                ref={endMonthRef}
                years={5}
                value={endDateRaw}
                lang={pickerLang.months}
                onChange={(year, month) => setEndDate({ year, month })}
                onDismiss={setEndDate}
              >
                <MonthBox value={`To: ${makeText(endDateRaw)}`} onClick={() => endMonthRef.current.show()} />
              </Picker>
            </Stack>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
        </Box>
        <>{children}</>
      </Stack>
    </DateSelectionContext.Provider>
  );
}

export { DateSelectionProvider, DateSelectionContext };
