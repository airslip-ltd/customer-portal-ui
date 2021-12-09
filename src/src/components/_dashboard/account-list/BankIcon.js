import React from 'react';
import PropTypes from 'prop-types';

const icons = {
  amex: '/static/bank_logos/Amex_icon.svg',
  bankofscotland: '/static/bank_logos/Bank_of_Scotland_icon.svg',
  bankofscotlandbusiness: '/static/bank_logos/Bank_of_Scotland_icon.svg',
  barclaycard: '/static/bank_logos/Barclaycard_icon.svg',
  barclays: '/static/bank_logos/Barclays_icon.svg',
  barclays_business: '/static/bank_logos/Barclays_icon.svg',
  firstdirect: '/static/bank_logos/First_Direct_icon.svg',
  halifax: '/static/bank_logos/Halifax_icon.svg',
  hsbc_uk: '/static/bank_logos/HSBC_icon.svg',
  monzo_ob: '/static/bank_logos/Monzo_icon.svg'
};

const BankIcon = (props) => <img width="40" height="40" src={icons[props.icon]} alt={props.icon} />;

BankIcon.propTypes = {
  icon: PropTypes.string.isRequired
};

export default BankIcon;
