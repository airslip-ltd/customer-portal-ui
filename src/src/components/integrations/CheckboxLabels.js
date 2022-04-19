import { useCallback } from 'react';
import PropTypes from 'prop-types';
// material
import { FormGroup, FormControlLabel, Checkbox, FormControl } from '@mui/material';

CheckboxLabels.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

export default function CheckboxLabels({ onChange, options }) {
  const handleChecked = useCallback(
    (event) => {
      const items = [...options];
      const itemIndex = items.findIndex((filter) => filter.key === event.target.name);

      const item = {
        ...items[itemIndex],
        selected: event.target.checked
      };
      items[itemIndex] = item;
      onChange(items);
    },
    [onChange, options]
  );

  return (
    <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
      <FormGroup aria-label="position" row>
        {options.map((row) => {
          const { key, label, selected } = row;
          return (
            <FormControlLabel
              key={key}
              control={<Checkbox checked={selected} onChange={handleChecked} name={key} />}
              label={label}
            />
          );
        })}
      </FormGroup>
    </FormControl>
  );
}
