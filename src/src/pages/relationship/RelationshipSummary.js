import { Link as RouterLink } from 'react-router-dom';
// material
import { Button, Stack, Card } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import StandardPage from '../../layouts/StandardPage';
import { MerchantSummary } from '../../components/_dashboard/merchant-view';
import { MerchantSummaryDemo } from '../../components/_dashboard/merchant-demo';
import { RelationshipCover } from '../../components/_dashboard/relationship';
import useRelationship from '../../hooks/useRelationship';
import { featureEnabled } from '../../utils/feature-switch';

// ----------------------------------------------------------------------

export default function RelationshipSummary() {
  const { relationship } = useRelationship();

  const ViewActions = () => (
    <Stack direction="row" spacing={1} sx={{ pt: 3 }}>
      <Button size="medium" variant="contained" component={RouterLink} to={`${PATH_DASHBOARD.relationship.list}`}>
        Back
      </Button>
    </Stack>
  );

  return (
    <StandardPage
      area="Dashboard"
      space="Businesses"
      spaceHref={PATH_DASHBOARD.relationship.list}
      activity="Analytics Summary"
      heading="Analytics Summary"
      actions={<ViewActions />}
    >
      <Card
        sx={{
          mb: 3,
          height: 180,
          position: 'relative'
        }}
      >
        <RelationshipCover relationship={relationship} />
      </Card>

      {featureEnabled('demo') && (
        <MerchantSummaryDemo
          currentMerchant={relationship.related.business}
          accountId={relationship.related.entityId}
        />
      )}
      {!featureEnabled('demo') && <MerchantSummary />}
    </StandardPage>
  );
}
