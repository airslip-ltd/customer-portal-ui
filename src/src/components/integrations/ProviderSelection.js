import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
// material
import { Grid, Stack, Typography } from '@mui/material';

import SearchBox from '../_common/SearchBox';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { search } from '../../redux/slices/providers';
// routes
import { PATH_INTEGRATE } from '../../routes/paths';
// components
import {
  ProviderSelector,
  MultiProviderSelection,
  CaptureStoreName,
  ComingSoon,
  ManualInstall,
  CheckboxLabels,
  CountrySelection
} from '.';
// utils
import { reduceProviders } from '../../utils/utils';

// ----------------------------------------------------------------------

export default function ProviderSelection() {
  const dispatch = useDispatch();
  const { providers } = useSelector((state) => state.provider);
  const [filterBy, setFilterBy] = useState('');
  const [country, setCountry] = useState('GB');
  const [renderProviders, setRenderProviders] = useState([]);
  const [selectChild, setSelectChild] = useState(false);
  const [providerChildren, setProviderChildren] = useState([]);
  const [selected, setSelected] = useState([
    {
      key: 'banking',
      label: 'Banking',
      selected: true
    },
    {
      key: 'commerce',
      label: 'Commerce',
      selected: true
    },
    {
      key: 'accounting',
      label: 'Accounting',
      selected: true
    }
  ]);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [modalView, setModalView] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(search(country));
  }, [dispatch, country]);

  useEffect(() => {
    if (!providers.complete) return;
    const distinctProviders = reduceProviders(providers.response.results);

    setRenderProviders(distinctProviders);
  }, [providers, setRenderProviders]);

  const onFilterChanged = (event) => {
    const { value } = event.target;
    setFilterBy(value);
  };

  const navigateToProvider = (providerChild) => {
    setSelectedProvider(providerChild);
    switch (providerChild.availability) {
      case 'ComingSoon':
      case 'OneClickWithStore':
      case 'Manual':
        setModalView(providerChild.availability);
        break;
      default:
        navigate(`${PATH_INTEGRATE.authorise}/${providerChild.provider}/${providerChild.integration}`);
        break;
    }
  };

  const handleChildren = (children) => {
    setProviderChildren(children);
    setSelectChild(true);
  };

  const handleClose = (selectedChild) => {
    setSelectChild(false);
    if (selectedChild) navigateToProvider(selectedChild);
  };

  const handleStoreName = (values) => {
    setModalView(null);

    if (values != null) {
      navigate(
        `${PATH_INTEGRATE.authorise}/${selectedProvider.provider}/${selectedProvider.integration}?shop=${values.shop}`
      );
    }
  };

  const handleCloseModal = () => {
    setModalView(null);
  };

  const handleOptionsChanged = useCallback(
    (items) => {
      setSelected(items);
    },
    [setSelected]
  );

  const handleCountryChanged = useCallback(
    (countryId) => {
      setCountry(countryId);
    },
    [setCountry]
  );

  ProviderList.propTypes = {
    integrationType: PropTypes.string.isRequired
  };

  function ProviderList({ integrationType }) {
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
          return (
            <ProviderSelector
              key={id}
              providerDetail={row}
              onSelect={navigateToProvider}
              hasChildren={handleChildren}
            />
          );
        })}
      </>
    );
  }

  if (!providers.complete) return <></>;

  return (
    <>
      <Grid container spacing={3} justify="center">
        <Grid item xs={12}>
          <Stack direction="row" spacing={2}>
            <SearchBox placeholder="Find your integration" filterName={filterBy} onFilterName={onFilterChanged} />
            <CountrySelection title="Country" onChange={handleCountryChanged} />
            <CheckboxLabels options={selected} onChange={handleOptionsChanged} />
          </Stack>
        </Grid>
        {selected.find((_item) => _item.key === 'banking' && _item.selected) && (
          <ProviderList integrationType="Banking" />
        )}
        {selected.find((_item) => _item.key === 'commerce' && _item.selected) && (
          <ProviderList integrationType="Commerce" />
        )}
        {selected.find((_item) => _item.key === 'accounting' && _item.selected) && (
          <ProviderList integrationType="Accounting" />
        )}
      </Grid>
      <MultiProviderSelection open={selectChild} onClose={handleClose} items={providerChildren} />
      <CaptureStoreName
        open={modalView === 'OneClickWithStore'}
        onClose={handleStoreName}
        provider={selectedProvider}
      />
      <ComingSoon open={modalView === 'ComingSoon'} onClose={handleCloseModal} />
      <ManualInstall open={modalView === 'Manual'} provider={selectedProvider} onClose={handleCloseModal} />
    </>
  );
}
