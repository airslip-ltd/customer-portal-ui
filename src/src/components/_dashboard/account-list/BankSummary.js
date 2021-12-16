import { React, useEffect } from 'react';
import PropTypes from 'prop-types';
// material
import { Stack, Typography } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { getBankList } from '../../../redux/slices/banks';
// components
import BankIcon from './BankIcon';

BankSummary.propTypes = {
  institutionId: PropTypes.string.isRequired
};

export default function BankSummary({ institutionId }) {
  const dispatch = useDispatch();
  const { bankList } = useSelector((state) => state.bank);
  const institution = bankList.find((bank) => bank.id === institutionId);

  useEffect(() => {
    dispatch(getBankList());
  }, [dispatch]);

  return (
    <>
      {institution && (
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
