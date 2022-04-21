import PropTypes from 'prop-types';
// material
import { Card, Grid, CardActionArea, CardContent, Box, Button, Typography } from '@mui/material';
// components
import { ProviderImage, CardOverlay } from '.';

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

  console.log(providerDetail);

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
                sx={{ margin: 'auto' }}
              />
            </Box>
          </CardContent>
        </CardActionArea>
        {providerDetail.availability === 'ComingSoon' && (
          <CardOverlay>
            <Typography variant="h4" sx={{ mt: 3 }}>
              Coming Soon
            </Typography>
          </CardOverlay>
        )}
      </Card>
    </Grid>
  );
}
