import React from 'react';
import PropTypes from 'prop-types';

const ProviderImage = ({ iconType, icon }) => (
  <img style={{ margin: 'auto' }} height={60} src={`/static/${iconType || 'pos_logos'}/${icon}.png`} alt={icon} />
);

ProviderImage.propTypes = {
  icon: PropTypes.string.isRequired,
  iconType: PropTypes.string
};

export default ProviderImage;
