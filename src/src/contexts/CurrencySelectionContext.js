import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Collapse, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { createContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../redux/store';
import { getCurrencies } from '../redux/slices/dataLists';
import useDataOwner from '../hooks/useDataOwner';
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

const initialState = {
  initialised: false,
  currencies: ['GBP'],
  currency: 'GBP',
  currencyQuery: {
    currencyCode: 'GBP'
  }
};

const CurrencySelectionContext = createContext({
  ...initialState
});

CurrencySelectionProvider.propTypes = {
  children: PropTypes.node,
  selectable: PropTypes.bool,
  defaultCurrency: PropTypes.string
};

function CurrencySelectionProvider({ children, selectable, defaultCurrency }) {
  const dispatch = useDispatch();
  const [currency, setCurrency] = useState('GBP');
  const [initialised, setInitilised] = useState(false);
  const [currencies, setCurrencies] = useState(['GBP']);

  const { dataOwnerQuery } = useDataOwner();
  const { currencyList } = useSelector((state) => state.dataLists);

  useEffect(() => {
    if (!dataOwnerQuery.ownerEntityId) return;
    dispatch(
      getCurrencies({
        ...dataOwnerQuery
      })
    );
  }, [dispatch, dataOwnerQuery]);

  useEffect(() => {
    if (!currencyList.complete) return;
    const available = currencyList.response.records;
    setCurrencies(available.map((item) => item.currencyCode));
  }, [currencyList, setCurrencies]);

  useEffect(() => {
    if (!currencyList.complete) return;
    if (!currencies.some((o) => o === currency)) setCurrency(currencies[0]);
    setInitilised(true);
  }, [currencies, setCurrency, currencyList.complete, currency]);

  useEffect(() => {
    if (!defaultCurrency) return;
    setCurrency(defaultCurrency);
    setInitilised(true);
  }, [defaultCurrency, setCurrency]);

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <CurrencySelectionContext.Provider
      value={{
        initialised,
        currencies,
        currency,
        currencyQuery: {
          currencyCode: currency
        }
      }}
    >
      <Stack>
        {!currencyList.complete && (
          <LoadingScreen request={currencyList}>
            {currencyList.hasError && (
              <Collapse in={currencyList.hasError}>
                <Stack direction="row" justifyContent="end">
                  <Button size="medium" variant="outlined" component={RouterLink} to="/">
                    Take me Home
                  </Button>
                </Stack>
              </Collapse>
            )}
          </LoadingScreen>
        )}

        {selectable && currencyList.complete && currencyList.response.records.length > 1 && (
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ flexGrow: 1 }} />
            <Box>
              <Stack direction="row" sx={{ py: 2 }}>
                <Typography variant="subtitle1" sx={{ mt: 0.8, mr: 1 }}>
                  View by Currency
                </Typography>
                <FormControl size="small">
                  <InputLabel id="currency-selection-label">Currency</InputLabel>
                  <Select
                    labelId="currency-selection-label"
                    id="currency-selection"
                    value={currency}
                    label="Currency"
                    onChange={handleChange}
                  >
                    {currencies.map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            </Box>
          </Box>
        )}
        {currencyList.complete && <>{children}</>}
      </Stack>
    </CurrencySelectionContext.Provider>
  );
}

export { CurrencySelectionContext, CurrencySelectionProvider };
