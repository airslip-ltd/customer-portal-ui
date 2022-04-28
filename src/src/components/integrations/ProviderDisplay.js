import PropTypes from 'prop-types';
// material
import { Card, Grid, CardActionArea, CardContent, Box, Button, CardHeader, Stack } from '@mui/material';
// components
import { ProviderImage, IntegrationTypeIcon, BankDetailSummary, CommerceDetailSummary } from '.';

ProviderDisplay.propTypes = {
  providerDetail: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default function ProviderDisplay({ providerDetail, onSelect }) {
  return (
    <Grid item xs={6} lg={4} xl={3}>
      <Card>
        <CardActionArea component={Button} onClick={() => onSelect(providerDetail)}>
          <CardHeader
            sx={{ p: 1.5 }}
            avatar={
              <ProviderImage
                provider={providerDetail.provider.id}
                integrationType={providerDetail.provider.integrationType}
                fileType="icon"
                sx={{ margin: 'auto' }}
              />
            }
            title={
              <Stack spacing={1} direction="row">
                <Box>{providerDetail.provider.friendlyName}</Box>
                <Box>
                  <IntegrationTypeIcon integrationType={providerDetail.provider.integrationType} />
                </Box>
              </Stack>
            }
          />
          <CardContent sx={{ p: 2, pt: 0 }}>
            <Box sx={{ minHeight: 60, display: 'flex' }}>
              {providerDetail.provider.integrationType === 'Banking' && (
                <BankDetailSummary accountDetail={providerDetail.accountDetail} />
              )}
              {providerDetail.provider.integrationType === 'Commerce' && (
                <CommerceDetailSummary providerDetail={providerDetail} />
              )}
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
