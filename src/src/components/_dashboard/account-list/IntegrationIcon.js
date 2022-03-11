import React from 'react';
import PropTypes from 'prop-types';
import { merge } from 'lodash';

const imageDefaults = {
  width: 40,
  height: 40
};

const overrides = {};

IntegrationIcon.propTypes = {
  icon: PropTypes.string.isRequired
};

export default function IntegrationIcon({ icon }) {
  const override = overrides[icon] ?? {};
  const options = merge(imageDefaults, override);
  const url = `/static/integration_logos/${icon}_icon.svg`;

  return <img height={options.height} width={options.width} src={url} alt={icon} />;
}
