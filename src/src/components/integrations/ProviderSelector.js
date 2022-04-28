import PropTypes from 'prop-types';
// material
import { Card, Grid, CardActionArea, CardContent, Box, Button } from '@mui/material';
// components
import { ProviderImage, CardOverlay } from '.';
import { featureEnabled } from '../../utils/feature-switch';

ProviderSelector.propTypes = {
  providerDetail: PropTypes.object.isRequired,
  hasChildren: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default function ProviderSelector({ providerDetail, hasChildren, onSelect }) {
  const handleProviderSelection = (providerDetail) => {
    if (providerDetail.children.length === 1) {
      onSelect(providerDetail.children[0]);
    } else {
      hasChildren(providerDetail.children);
    }
  };

  return (
    <Grid item xs={6} md={3}>
      <Card>
        <CardActionArea component={Button} onClick={() => handleProviderSelection(providerDetail)}>
          <CardContent>
            <Box sx={{ height: 60, display: 'flex', alignItems: 'center' }}>
              <ProviderImage
                provider={providerDetail.id}
                integrationType={providerDetail.integrationType}
                fileType="logo"
              />
            </Box>
          </CardContent>
        </CardActionArea>
        {featureEnabled('coming-soon') && providerDetail.availability === 'ComingSoon' && (
          <CardOverlay>
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ flexGrow: 1 }} />
              <Box component="img" src="/static/icons/coming_soon.png" sx={{ height: 80, mt: '28px' }} />
            </Box>
          </CardOverlay>
        )}
      </Card>
    </Grid>
  );
}
