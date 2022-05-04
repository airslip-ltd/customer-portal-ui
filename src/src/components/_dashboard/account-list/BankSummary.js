import { React, useEffect } from 'react';
import PropTypes from 'prop-types';
// material
import { Stack, Typography } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { search } from '../../../redux/slices/providers';
// components
import ProviderImage from '../../integrations/ProviderImage';

BankSummary.propTypes = {
  institutionId: PropTypes.string.isRequired
};

export default function BankSummary({ institutionId }) {
  const dispatch = useDispatch();
  const { providers } = useSelector((state) => state.provider);
  const institution = providers.response.results
    ? providers.response.results.find((provider) => provider.id === institutionId)
    : null;

  useEffect(() => {
    dispatch(search());
  }, [dispatch]);

  return (
    <>
      {!providers.loading && institution && (
        <Stack direction="row" alignItems="center" spacing={2}>
          <ProviderImage provider={institution.id} integrationType="Banking" fileType="icon" />
          <Typography variant="subtitle2" noWrap>
            {institution.friendlyName}
          </Typography>
        </Stack>
      )}
    </>
  );
}
