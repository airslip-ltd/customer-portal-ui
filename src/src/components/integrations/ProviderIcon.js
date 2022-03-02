import React from 'react';
import PropTypes from 'prop-types';

const ProviderIcon = (props) => <img width="40" src={`/static/pos_logos/${props.icon}.png`} alt={props.icon} />;

ProviderIcon.propTypes = {
  icon: PropTypes.string.isRequired
};

export default ProviderIcon;
