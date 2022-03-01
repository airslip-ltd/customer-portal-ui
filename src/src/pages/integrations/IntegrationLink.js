import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Container,
  Grid,
  Stack,
  Typography,
  CardActionArea,
  CardContent,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormControl,
  FormLabel
} from '@mui/material';

import SearchBox from '../../components/_common/SearchBox';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProviders } from '../../redux/slices/providers';
// routes
import { PATH_INTEGRATE, PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { ProviderImage } from '../../components/_dashboard/integration-list';

// ----------------------------------------------------------------------

export default function IntegrationLink() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { providers } = useSelector((state) => state.provider);
  const [filterBy, setFilterBy] = useState('');
  const [integrationFilters, setIntegrationFilters] = useState({
    banking: true,
    commerce: true,
    accounting: true
  });
  const { banking, commerce, accounting } = integrationFilters;

  useEffect(() => {
    dispatch(getProviders());
  }, [dispatch]);

  const onFilterChanged = (event) => {
    const { value } = event.target;
    setFilterBy(value);
  };

  const handleChange = (event) => {
    setIntegrationFilters({
      ...integrationFilters,
      [event.target.name]: event.target.checked
    });
  };

  ProviderSelector.propTypes = {
    provider: PropTypes.string.isRequired,
    integration: PropTypes.string.isRequired,
    integrationType: PropTypes.string.isRequired,
    friendlyName: PropTypes.string.isRequired,
    installationCount: PropTypes.number.isRequired,
    imageType: PropTypes.string
  };

  function CheckboxLabels() {
    return (
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Show Integrations</FormLabel>
        <FormGroup aria-label="position" row>
          <FormControlLabel
            control={<Checkbox checked={banking} onChange={handleChange} name="banking" />}
            label="Banking"
          />
          <FormControlLabel
            control={<Checkbox checked={commerce} onChange={handleChange} name="commerce" />}
            label="Commerce"
          />
          <FormControlLabel
            control={<Checkbox checked={accounting} onChange={handleChange} name="accounting" />}
            label="Accounting"
          />
        </FormGroup>
      </FormControl>
    );
  }

  function ProviderSelector({ provider, integration, integrationType, imageType, friendlyName, installationCount }) {
    return (
      <Grid item xs={6} md={4}>
        <Card sx={{ display: 'flex', minHeight: 150 }}>
          <CardActionArea component={RouterLink} to={`${PATH_INTEGRATE.authorise}/${provider}/${integration}`}>
            <CardContent>
              <Grid container spacing={1}>
                <Grid item xs={6} sx={{ minHeight: 60 }}>
                  <ProviderImage icon={integration} integrationType={integrationType} imageType={imageType} />
                </Grid>
                <Grid item xs={6} sx={{ textAlign: 'right' }}>
                  {installationCount > 0 && (
                    <>
                      <Typography variant="body2">
                        <Typography variant="subtitle1">{installationCount} installs</Typography>
                        in the last 7 days
                      </Typography>
                    </>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">{friendlyName}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    );
  }

  ProviderList.propTypes = {
    integrationType: PropTypes.string.isRequired,
    imageType: PropTypes.string
  };

  function ProviderList({ integrationType, imageType }) {
    if (!integrationFilters[integrationType.toLowerCase()]) return <></>;

    const list = providers.response.results.filter((row) => {
      const str = `${row.name}# ${row.friendlyName}# ${row.id}`;
      return row.integrationType === integrationType && str.match(filterBy);
    });

    if (list.length === 0) return <></>;

    return (
      <>
        <Grid item xs={12}>
          <Typography variant="h4">{integrationType}</Typography>
        </Grid>
        {list.map((row) => {
          const { id, integrationType, provider, friendlyName, installationCount } = row;
          return (
            <ProviderSelector
              key={id}
              provider={provider}
              integration={id}
              integrationType={integrationType}
              imageType={imageType}
              friendlyName={friendlyName}
              installationCount={installationCount}
            />
          );
        })}
      </>
    );
  }

  return (
    <Page title="Integrations | Link | Airslip">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Connect Integration"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Commerce', href: PATH_DASHBOARD.integrations.root },
            { name: 'Link' }
          ]}
        />

        <Grid container spacing={3} justify="center">
          <Grid item xs={12}>
            <Typography noWrap variant="body" sx={{ color: 'text.secondary' }}>
              Let's connect a commerce and accounting provider. By connecting your commerce and accounting providers,
              you can visualise your data to make improved decisions and get access to more financial products.
            </Typography>
          </Grid>

          {providers.hasData && (
            <>
              <Grid item xs={12}>
                <Stack direction="row" spacing={2}>
                  <SearchBox placeholder="Find your integration" filterName={filterBy} onFilterName={onFilterChanged} />

                  <CheckboxLabels />
                </Stack>
              </Grid>
              <ProviderList integrationType="Banking" imageType="svg" />
              <ProviderList integrationType="Commerce" />
              <ProviderList integrationType="Accounting" />
            </>
          )}
        </Grid>
      </Container>
    </Page>
  );
}
