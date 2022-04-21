import { useEffect, useCallback } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
// material
import { Button, Grid } from '@mui/material';
// redux
import { GET_ALL_QUERY } from '../../redux/common/search';
import { useDispatch, useSelector } from '../../redux/store';
import { search as integrationSearch, reset } from '../../redux/slices/integration';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import StandardPage from '../../layouts/StandardPage';
import { ProviderDisplay } from '../../components/integrations';

// ----------------------------------------------------------------------
const EditActions = () => (
  <Button
    size="medium"
    variant="contained"
    component={RouterLink}
    to={`${PATH_DASHBOARD.integrations.create}`}
    sx={{ mt: 1 }}
  >
    Connect a Service
  </Button>
);
// ----------------------------------------------------------------------

export default function IntegrationList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { integration } = useSelector((state) => state.integration);

  useEffect(() => {
    dispatch(integrationSearch(GET_ALL_QUERY));
  }, [dispatch]);

  const handleClick = useCallback(
    (params) => {
      dispatch(reset()).then(() => {
        navigate(`${PATH_DASHBOARD.integrations.view}/${params.id}`);
      });
    },
    [navigate, dispatch]
  );

  return (
    <StandardPage
      area="Dashboard"
      space="Services"
      spaceHref={PATH_DASHBOARD.integrations.root}
      activity="Your Services"
      heading="Your Services"
      fullWidth
      actions={<EditActions />}
      apiRequest={integration}
    >
      <Grid container spacing={3} justify="center">
        {integration.complete &&
          integration.response.results.map((row) => (
            <ProviderDisplay key={row.id} onSelect={handleClick} providerDetail={row} />
          ))}
      </Grid>
    </StandardPage>
  );
}
