import React from 'react';
import PropTypes from 'prop-types';

const icons = {
  amex: {
    url: '/static/bank_logos/Amex.svg',
    width: 50,
    height: 50
  },
  aibgb: {
    url: '/static/bank_logos/ABN_Amro.svg',
    width: 50,
    height: 50
  },
  bankofscotland: {
    url: '/static/bank_logos/Bank_of_Scotland.svg',
    width: 200,
    height: 50
  },
  bankofscotlandbusiness: {
    url: '/static/bank_logos/Bank_of_Scotland.svg',
    width: 200,
    height: 50
  },
  barclaycard: {
    url: '/static/bank_logos/Barclaycard.svg',
    width: 200,
    height: 50
  },
  barclays: {
    url: '/static/bank_logos/Barclays.svg',
    width: 200,
    height: 50
  },
  barclays_business: {
    url: '/static/bank_logos/Barclays.svg',
    width: 200,
    height: 50
  },
  firstdirect: {
    url: '/static/bank_logos/First_Direct.svg',
    width: 200,
    height: 50
  },
  halifax: {
    url: '/static/bank_logos/Halifax.svg',
    width: 200,
    height: 50
  },
  hsbc_uk: {
    url: '/static/bank_logos/HSBC.svg',
    width: 200,
    height: 50
  },
  monzo_ob: {
    url: '/static/bank_logos/Monzo.svg',
    width: 200,
    height: 50
  }
};

const BankImage = (props) => (
  <img
    style={{ margin: 'auto' }}
    height={icons[props.icon].height}
    width={icons[props.icon].width}
    src={icons[props.icon].url}
    alt={props.icon}
  />
);

BankImage.propTypes = {
  icon: PropTypes.string.isRequired
};

export default BankImage;
