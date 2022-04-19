import { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
// material
import { Autocomplete, TextField } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getCountries } from '../../redux/slices/countries';

CountrySelection.propTypes = {
  onChange: PropTypes.func.isRequired
};
export default function CountrySelection({ onChange }) {
  const dispatch = useDispatch();
  const { countries } = useSelector((state) => state.countries);

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  const handleChanged = useCallback(
    (_, value) => {
      onChange(value.id);
    },
    [onChange]
  );

  return (
    <Autocomplete
      id="asynchronous-demo"
      sx={{ width: 300 }}
      onChange={handleChanged}
      disableClearable
      size="small"
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => `${option.id} - ${option.name}`}
      options={countries.response.results}
      defaultValue={{ id: 'GB', name: 'United Kingdom' }}
      renderInput={(params) => <TextField {...params} label="Select a Country" />}
    />
  );
}
