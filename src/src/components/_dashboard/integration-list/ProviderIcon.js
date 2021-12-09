import React from 'react';
import PropTypes from 'prop-types';

const icons = {
  shopify: '/static/pos_logos/shopify.svg'
};

const ProviderIcon = (props) => <img width="40" height="40" src={icons[props.icon]} alt={props.icon} />;

ProviderIcon.propTypes = {
  icon: PropTypes.string.isRequired
};

export default ProviderIcon;
