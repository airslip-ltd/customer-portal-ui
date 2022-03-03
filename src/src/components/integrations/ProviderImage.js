import React from 'react';
import PropTypes from 'prop-types';

ProviderImage.propTypes = {
  icon: PropTypes.string.isRequired,
  integrationType: PropTypes.string,
  imageType: PropTypes.string
};

export default function ProviderImage({ integrationType, icon, imageType }) {
  return (
    <img
      style={{ maxHeight: 60, opacity: 0.85, margin: 'auto' }}
      src={`/static/${integrationType.toString().toLowerCase()}_logos/${icon}.${imageType || 'png'}`}
      alt={icon}
    />
  );
}
