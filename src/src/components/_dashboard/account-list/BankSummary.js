import { React, useEffect } from 'react';
import PropTypes from 'prop-types';
// material
import { Stack, Typography } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { getProviders } from '../../../redux/slices/providers';
// components
import BankIcon from './BankIcon';

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
    dispatch(getProviders());
  }, [dispatch]);

  return (
    <>
      {!providers.loading && institution && (
        <Stack direction="row" alignItems="center" spacing={2}>
          <BankIcon icon={institution.id} />
          <Typography variant="subtitle2" noWrap>
            {institution.friendlyName}
          </Typography>
        </Stack>
      )}
    </>
  );
}
