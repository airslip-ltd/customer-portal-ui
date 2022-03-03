import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
// material
import {
  Card,
  Grid,
  Stack,
  Typography,
  CardActionArea,
  CardContent,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormControl,
  FormLabel,
  Box,
  Button,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText
} from '@mui/material';

import SearchBox from '../_common/SearchBox';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProviders } from '../../redux/slices/providers';
// routes
import { PATH_INTEGRATE } from '../../routes/paths';
// components
import { ProviderImage } from '.';

// ----------------------------------------------------------------------

function MultiProviderSelection({ onClose, open, items }) {
  const handleClose = () => {
    onClose(null);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Select account type</DialogTitle>
      <List sx={{ pt: 0 }}>
        {items.map((item) => (
          <ListItem button onClick={() => handleListItemClick(item)} key={item.id}>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

MultiProviderSelection.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired
};

export default function ProviderSelection() {
  const dispatch = useDispatch();
  const { providers } = useSelector((state) => state.provider);
  const [filterBy, setFilterBy] = useState('');
  const [renderProviders, setRenderProviders] = useState([]);
  const [selectChild, setSelectChild] = useState(false);
  const [providerChildren, setProviderChildren] = useState([]);
  const [integrationFilters, setIntegrationFilters] = useState({
    banking: true,
    commerce: true,
    accounting: true
  });
  const { banking, commerce, accounting } = integrationFilters;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProviders());
  }, [dispatch]);

  useEffect(() => {
    if (!providers.hasData) return;
    const distinctProviders = providers.response.results.reduce((acc, curr) => {
      const hasItem = acc.find(
        (row) =>
          row.friendlyName === curr.friendlyName &&
          row.integrationType === curr.integrationType &&
          row.provider === curr.provider
      );

      if (hasItem) {
        hasItem.children.push(curr);
        hasItem.installationCount += curr.installationCount;
      } else {
        acc.push({
          friendlyName: curr.friendlyName,
          id: curr.id,
          provider: curr.provider,
          integrationType: curr.integrationType,
          children: [curr],
          installationCount: curr.installationCount
        });
      }

      return acc;
    }, []);

    setRenderProviders(distinctProviders);
  }, [providers, setRenderProviders]);

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

  const navigateToProvider = (providerChild) => {
    navigate(`${PATH_INTEGRATE.authorise}/${providerChild.provider}/${providerChild.integration}`);
  };

  const handleProviderSelection = (providerDetail) => {
    console.log(providerDetail);

    if (providerDetail.children.length === 1) {
      navigateToProvider(providerDetail.children[0]);
    } else {
      setProviderChildren(providerDetail.children);
      setSelectChild(true);
    }
  };

  const handleClose = (selectedChild) => {
    setSelectChild(false);
    if (selectedChild) navigateToProvider(selectedChild);
  };

  ProviderSelector.propTypes = {
    providerDetail: PropTypes.object.isRequired,
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

  function ProviderSelector({ providerDetail, imageType }) {
    return (
      <Grid item xs={6} md={3}>
        <Card>
          <CardActionArea component={Button} onClick={() => handleProviderSelection(providerDetail)}>
            <CardContent>
              <Box sx={{ minHeight: 60, display: 'flex', justifyContent: 'center' }}>
                <ProviderImage
                  icon={providerDetail.id}
                  integrationType={providerDetail.integrationType}
                  imageType={imageType}
                />
              </Box>
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

    const list = renderProviders.filter((row) => {
      const str = `${row.friendlyName}# ${row.id}`;
      return row.integrationType === integrationType && str.match(filterBy);
    });

    if (list.length === 0) return <></>;

    return (
      <>
        <Grid item xs={12}>
          <Typography variant="h6">{integrationType}</Typography>
        </Grid>
        {list.map((row) => {
          const { id } = row;
          return <ProviderSelector key={id} providerDetail={row} imageType={imageType} />;
        })}
      </>
    );
  }

  if (!providers.hasData) return <></>;

  return (
    <>
      <Grid container spacing={3} justify="center">
        <Grid item xs={12}>
          <Stack direction="row" spacing={2}>
            <SearchBox placeholder="Find your integration" filterName={filterBy} onFilterName={onFilterChanged} />

            <CheckboxLabels />
          </Stack>
        </Grid>
        <ProviderList integrationType="Banking" imageType="svg" />
        <ProviderList integrationType="Commerce" />
        <ProviderList integrationType="Accounting" />
      </Grid>
      <MultiProviderSelection open={selectChild} onClose={handleClose} items={providerChildren} />
    </>
  );
}
