import React from 'react';
import PropTypes from 'prop-types';

const ProviderImage = (props) => (
  <img style={{ margin: 'auto' }} height={60} src={`/static/pos_logos/${props.icon}.png`} alt={props.icon} />
);

ProviderImage.propTypes = {
  icon: PropTypes.string.isRequired
};

export default ProviderImage;
