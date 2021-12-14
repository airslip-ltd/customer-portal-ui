import React from 'react';
import PropTypes from 'prop-types';
import { merge } from 'lodash';

const imageDefaults = {
  width: 200,
  height: 50
};

const overrides = {
  amex: {
    width: 50,
    height: 50
  },
  aibgb: {
    width: 50,
    height: 50
  }
};

BankImage.propTypes = {
  icon: PropTypes.string.isRequired
};

export default function BankImage({ icon }) {
  const override = overrides[icon] ?? {};
  const options = merge(imageDefaults, override);
  const url = `/static/bank_logos/${icon}_logo.svg`;

  return <img style={{ margin: 'auto' }} height={options.height} width={options.width} src={url} alt={icon} />;
}
