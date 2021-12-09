import React from 'react';
import PropTypes from 'prop-types';

const icons = {
  shopify: {
    url: '/static/pos_logos/Shopify.svg',
    width: 50,
    height: 50
  }
};

const ProviderImage = (props) => (
  <img
    style={{ margin: 'auto' }}
    height={icons[props.icon] ? icons[props.icon].height : 0}
    width={icons[props.icon] ? icons[props.icon].width : 0}
    src={icons[props.icon] ? icons[props.icon].url : ''}
    alt={props.icon}
  />
);

ProviderImage.propTypes = {
  icon: PropTypes.string.isRequired
};

export default ProviderImage;
