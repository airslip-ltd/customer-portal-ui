import React from 'react';
import PropTypes from 'prop-types';

const icons = {
  amex: '/static/bank_logos/Amex_icon.svg',
  aibgb: '/static/bank_logos/Allied_Irish_Bank_icon.svg',
  aibgbbusiness: '/static/bank_logos/Allied_Irish_Bank_icon.svg',
  bankofireland_uk: '/static/bank_logos/Bank_of_Ireland_icon.svg',
  bankofirelandbusiness_uk: '/static/bank_logos/Bank_of_Ireland_icon.svg',
  bankofscotland: '/static/bank_logos/Bank_of_Scotland_icon.svg',
  bankofscotlandbusiness: '/static/bank_logos/Bank_of_Scotland_icon.svg',
  barclaycard: '/static/bank_logos/Barclaycard_icon.svg',
  barclaycard_commercial_payments: '/static/bank_logos/Barclaycard_icon.svg',
  barclays: '/static/bank_logos/Barclays_icon.svg',
  bbank: '/static/bank_logos/B_Bank_icon.svg',
  barclays_business: '/static/bank_logos/Barclays_icon.svg',
  cashplus: '/static/bank_logos/Cashplus_icon.svg',
  capitalone_uk: '/static/bank_logos/Capital_One_icon.svg',
  firstdirect: '/static/bank_logos/First_Direct_icon.svg',
  halifax: '/static/bank_logos/Halifax_icon.svg',
  caterallen: '/static/bank_logos/Cater_Allen_icon.svg',
  chelseabuildingsociety: '/static/bank_logos/Chelsea_Building_Society_icon.svg',
  hsbc_uk: '/static/bank_logos/HSBC_icon.svg',
  monzo_ob: '/static/bank_logos/Monzo_icon.svg'
};

const BankIcon = (props) => <img width="40" height="40" src={icons[props.icon]} alt={props.icon} />;

BankIcon.propTypes = {
  icon: PropTypes.string.isRequired
};

export default BankIcon;
