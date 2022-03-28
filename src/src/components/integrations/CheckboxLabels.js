import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// material
import { FormGroup, FormControlLabel, Checkbox, FormControl, FormLabel } from '@mui/material';

CheckboxLabels.propTypes = {
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

export default function CheckboxLabels({ title, onChange, options }) {
  const [integrationFilters, setIntegrationFilters] = useState([]);

  const newFilters = [];
  options.forEach((item) => {
    newFilters.push({
      ...item,
      selected: true
    });
  });
  setIntegrationFilters(newFilters);

  // useEffect(() => {
  //   const filters = {};
  //   integrationFilters.forEach((item) => {
  //     filters[item.key] = item.selected;
  //   });
  //   onChange(filters);
  // }, [onChange, integrationFilters]);

  const handleChecked = (event) => {
    setIntegrationFilters({
      ...integrationFilters,
      [event.target.name]: event.target.checked
    });
  };

  return (
    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
      <FormLabel component="legend">{title}</FormLabel>
      <FormGroup aria-label="position" row>
        {integrationFilters.map((row) => {
          const { key, label, selected } = row;
          return (
            <FormControlLabel
              key={key}
              control={<Checkbox checked={selected} onChange={handleChecked} name="banking" />}
              label={label}
            />
          );
        })}
      </FormGroup>
    </FormControl>
  );
}
