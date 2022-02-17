import { React, useEffect } from 'react';
import PropTypes from 'prop-types';
// material
import { Stack, Typography } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { getBanks } from '../../../redux/slices/providers';
// components
import BankIcon from './BankIcon';

BankSummary.propTypes = {
  institutionId: PropTypes.string.isRequired
};

export default function BankSummary({ institutionId }) {
  const dispatch = useDispatch();
  const { banks } = useSelector((state) => state.provider);
  const institution = banks.response.results ? banks.response.results.find((bank) => bank.id === institutionId) : null;

  useEffect(() => {
    dispatch(getBanks());
  }, [dispatch]);

  return (
    <>
      {!banks.loading && institution && (
        <Stack direction="row" alignItems="center" spacing={2}>
          <BankIcon icon={institution.id} />
          <Typography variant="subtitle2" noWrap>
            {institution.tradingName}
          </Typography>
        </Stack>
      )}
    </>
  );
}
