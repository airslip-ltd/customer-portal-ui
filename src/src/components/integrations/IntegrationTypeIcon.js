import React from 'react';
import PropTypes from 'prop-types';
import AccountBalanceIcon from '@mui/icons-material/AccountBalanceOutlined';
import SavingsIcon from '@mui/icons-material/SavingsOutlined';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBagOutlined';
import Tooltip from '@mui/material/Tooltip';

IntegrationTypeIcon.propTypes = {
  integrationType: PropTypes.string.isRequired
};

export default function IntegrationTypeIcon({ integrationType }) {
  switch (integrationType) {
    case 'Banking':
      return (
        <Tooltip title="Banking">
          <SavingsIcon />
        </Tooltip>
      );
    case 'Commerce':
      return (
        <Tooltip title="Commerce">
          <ShoppingBagIcon />
        </Tooltip>
      );
    case 'Accounting':
      return (
        <Tooltip title="Accounting">
          <AccountBalanceIcon />
        </Tooltip>
      );
    default:
      return <></>;
  }
}
