import { Link as RouterLink } from 'react-router-dom';
// material
import { Button, Stack } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import StandardPage from '../../layouts/StandardPage';
import { MerchantSummary } from '../../components/_dashboard/merchant-view';

// ----------------------------------------------------------------------

export default function RelationshipSummary() {
  // const { current } = useSelector((state) => state.relationship);
  // const { id } = useParams();

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
      <MerchantSummary />
    </StandardPage>
  );
}
