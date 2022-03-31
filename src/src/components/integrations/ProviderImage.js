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
      src={`/static/integration_logos/${icon}.${imageType || 'svg'}`}
      alt={icon}
    />
  );
}
