import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
// material
import { styled } from '@mui/material/styles';
import { Box, TextField, InputAdornment } from '@mui/material';

// ----------------------------------------------------------------------

const SearchStyle = styled(TextField)(() => ({
  width: 320
}));

// ----------------------------------------------------------------------

SearchBox.propTypes = {
  placeholder: PropTypes.string,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func
};

export default function SearchBox({ filterName, onFilterName, placeholder }) {
  return (
    <SearchStyle
      label="Search"
      value={filterName}
      onChange={onFilterName}
      placeholder={placeholder}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled' }} />
          </InputAdornment>
        )
      }}
    />
  );
}
