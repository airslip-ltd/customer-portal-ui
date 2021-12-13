import React from 'react';
import PropTypes from 'prop-types';
import { merge } from 'lodash';

const imageDefaults = {
  width: 40,
  height: 40
};

const overrides = {};

BankIcon.propTypes = {
  icon: PropTypes.string.isRequired
};

export default function BankIcon({ icon }) {
  const override = overrides[icon] ?? {};
  const options = merge(imageDefaults, override);
  const url = `/static/bank_logos/${icon}_icon.svg`;

  return <img height={options.height} width={options.width} src={url} alt={icon} />;
}
