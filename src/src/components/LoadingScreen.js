import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';

import { Stack, Box } from '@mui/material';
import { LoadingProgress, LoadingFailed } from './_common/progress';
import { ApiErrorDetailed } from './_common/Errors';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.default
}));

// ----------------------------------------------------------------------

LoadingScreen.propTypes = {
  request: PropTypes.object,
  children: PropTypes.node
};

export default function LoadingScreen({ request, children, ...other }) {
  return (
    <>
      <RootStyle {...other}>
        <Stack spacing={3}>
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ flexGrow: 1 }} />
            <Box>
              {(!request || !request.hasError) && <LoadingProgress />}
              {request && request.hasError && <LoadingFailed />}
            </Box>
            <Box sx={{ flexGrow: 1 }} />
          </Box>

          {request && request.hasError && <ApiErrorDetailed error={request.error} />}
          {request && request.hasError && children}
        </Stack>
      </RootStyle>
    </>
  );
}
