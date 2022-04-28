import PropTypes from 'prop-types';
// material
import { Box, Stack, Typography } from '@mui/material';
// custom
import { ProviderImage } from '.';
import { CoverStyle } from '../_common';
import IntegrationTypeIcon from './IntegrationTypeIcon';
// utils
import { descriptors } from '../../utils/descriptors';

// ----------------------------------------------------------------------

IntegrationCover.propTypes = {
  integration: PropTypes.object
};

export default function IntegrationCover({ integration }) {
  return (
    <CoverStyle
      avatar={
        <ProviderImage
          width={30}
          height={30}
          provider={integration.provider.id}
          integrationType={integration.provider.integrationType}
          fileType="icon"
          sx={{
            mx: 'auto',
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: 'common.white',
            width: { xs: 80, md: 128 },
            height: { xs: 80, md: 128 }
          }}
        />
      }
    >
      <Stack>
        <Stack spacing={1} direction="row">
          <Box>
            <Typography variant="h4">{integration.provider.friendlyName}</Typography>
          </Box>
          <Box>
            <IntegrationTypeIcon integrationType={integration.provider.integrationType} />
          </Box>
        </Stack>
        <Typography sx={{ opacity: 0.72 }}>{descriptors.integration(integration)}</Typography>
      </Stack>
    </CoverStyle>
  );
}
