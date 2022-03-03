import PropTypes from 'prop-types';
// material
import { Card, Grid, CardActionArea, CardContent, Box, Button } from '@mui/material';
// components
import { ProviderImage, CardOverlay } from '.';

ProviderSelector.propTypes = {
  providerDetail: PropTypes.object.isRequired,
  imageType: PropTypes.string,
  hasChildren: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default function ProviderSelector({ providerDetail, imageType, hasChildren, onSelect }) {
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
                icon={providerDetail.id}
                integrationType={providerDetail.integrationType}
                imageType={imageType}
              />
            </Box>
          </CardContent>
        </CardActionArea>
        {providerDetail.availability === 'ComingSoon' && <CardOverlay title="Coming Soon" />}
      </Card>
    </Grid>
  );
}
