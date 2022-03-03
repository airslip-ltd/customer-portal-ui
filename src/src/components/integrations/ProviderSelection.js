import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
// material
import { Grid, Stack, Typography } from '@mui/material';

import SearchBox from '../_common/SearchBox';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProviders } from '../../redux/slices/providers';
// routes
import { PATH_INTEGRATE } from '../../routes/paths';
// components
import { ProviderSelector, MultiProviderSelection, CaptureStoreName, ComingSoon, ManualInstall } from '.';
// utils
import { reduceProviders } from '../../utils/utils';

// ----------------------------------------------------------------------

export default function ProviderSelection() {
  const dispatch = useDispatch();
  const { providers } = useSelector((state) => state.provider);
  const [filterBy, setFilterBy] = useState('');
  const [renderProviders, setRenderProviders] = useState([]);
  const [selectChild, setSelectChild] = useState(false);
  const [providerChildren, setProviderChildren] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState({});
  const [modalView, setModalView] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProviders());
  }, [dispatch]);

  useEffect(() => {
    if (!providers.hasData) return;
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
    navigate(
      `${PATH_INTEGRATE.authorise}/${selectedProvider.provider}/${selectedProvider.integration}?shop=${values.shop}`
    );
    setModalView(null);
  };

  const handleCloseModal = () => {
    setModalView(null);
  };

  ProviderList.propTypes = {
    integrationType: PropTypes.string.isRequired,
    imageType: PropTypes.string
  };

  function ProviderList({ integrationType, imageType }) {
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
              imageType={imageType}
              onSelect={navigateToProvider}
              hasChildren={handleChildren}
            />
          );
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
          </Stack>
        </Grid>
        <ProviderList integrationType="Banking" imageType="svg" />
        <ProviderList integrationType="Commerce" />
        <ProviderList integrationType="Accounting" />
      </Grid>
      <MultiProviderSelection open={selectChild} onClose={handleClose} items={providerChildren} />
      <CaptureStoreName open={modalView === 'OneClickWithStore'} onClose={handleStoreName} />
      <ComingSoon open={modalView === 'ComingSoon'} onClose={handleCloseModal} />
      <ManualInstall open={modalView === 'Manual'} onClose={handleCloseModal} />
    </>
  );
}
