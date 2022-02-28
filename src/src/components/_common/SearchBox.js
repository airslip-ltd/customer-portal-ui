import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
// material
import { styled } from '@mui/material/styles';
import { Box, OutlinedInput, InputAdornment } from '@mui/material';

// ----------------------------------------------------------------------

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`
  }
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
      value={filterName}
      onChange={onFilterName}
      placeholder={placeholder}
      startAdornment={
        <InputAdornment position="start">
          <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled' }} />
        </InputAdornment>
      }
    />
  );
}