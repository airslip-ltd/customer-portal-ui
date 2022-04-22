import { Avatar, Box } from '@mui/material';
import { styled } from '@mui/styles';
import _ from 'lodash';
import PropTypes from 'prop-types';

const imageDefaults = {
  icon: {
    fileType: 'svg',
    fileSuffix: '_icon',
    width: 40,
    height: 40,
    fileName: null
  },
  logo: {
    fileType: 'svg',
    fileSuffix: '',
    width: 170,
    height: 60,
    fileName: null
  }
};

const iconTypes = {
  byIntegrationType: {
    accounting: {
      ...imageDefaults
    },
    banking: {
      ...imageDefaults
    },
    commerce: {
      ...imageDefaults
    }
  },
  byProvider: [
    {
      provider: 'airslip-bank',
      logo: {
        ...imageDefaults.logo,
        fileName: 'airslip-bank-logo.png'
      },
      icon: {
        ...imageDefaults.icon,
        fileName: 'airslip-bank-icon.png'
      }
    },
    {
      provider: 'airslip-demo',
      logo: {
        ...imageDefaults.logo,
        fileName: 'airslip-demo-logo.png'
      },
      icon: {
        ...imageDefaults.icon,
        fileName: 'airslip-demo-icon.png'
      }
    },
    {
      provider: 'amex',
      logo: {
        ...imageDefaults.logo,
        width: 50,
        height: 50
      }
    },
    {
      provider: 'aibgb',
      logo: {
        ...imageDefaults.logo,
        width: 50,
        height: 50
      }
    },

    {
      provider: 'aceshop',
      logo: {
        ...imageDefaults.logo,
        fileName: 'aceshop.png'
      },
      icon: {
        ...imageDefaults.icon,
        fileName: 'aceshop_icon.png'
      }
    },
    {
      provider: 'cscart',
      logo: {
        ...imageDefaults.logo,
        fileName: 'cscart.png'
      },
      icon: {
        ...imageDefaults.icon,
        fileName: 'cscart_icon.png'
      }
    },
    {
      provider: 'cubecart',
      logo: {
        ...imageDefaults.logo,
        fileName: 'cubecart.png'
      },
      icon: {
        ...imageDefaults.icon,
        fileName: 'cubecart_icon.png'
      }
    },
    {
      provider: 'gambio',
      logo: {
        ...imageDefaults.logo,
        fileName: 'gambio.png'
      },
      icon: {
        ...imageDefaults.icon,
        fileName: 'gambio_icon.png'
      }
    },
    {
      provider: 'creloaded',
      logo: {
        ...imageDefaults.logo,
        fileName: 'creloaded.png'
      },
      icon: {
        ...imageDefaults.icon,
        fileName: 'creloaded_icon.png'
      }
    },
    {
      provider: 'interspire',
      logo: {
        ...imageDefaults.logo,
        fileName: 'interspire.png'
      },
      icon: {
        ...imageDefaults.icon,
        fileName: 'interspire_icon.png'
      }
    },
    {
      provider: 'mijoshop',
      logo: {
        ...imageDefaults.logo,
        fileName: 'mijoshop.png'
      },
      icon: {
        ...imageDefaults.icon,
        fileName: 'mijoshop_icon.png'
      }
    },
    {
      provider: 'opencart14',
      logo: {
        ...imageDefaults.logo,
        fileName: 'opencart14.png'
      },
      icon: {
        ...imageDefaults.icon,
        fileName: 'opencart14_icon.png'
      }
    },
    {
      provider: 'oscmax2',
      logo: {
        ...imageDefaults.logo,
        fileName: 'oscmax2.png'
      },
      icon: {
        ...imageDefaults.icon,
        fileName: 'oscmax2_icon.png'
      }
    },
    {
      provider: 'oxid',
      logo: {
        ...imageDefaults.logo,
        fileName: 'oxid.png'
      },
      icon: {
        ...imageDefaults.icon,
        fileName: 'oxid_icon.png'
      }
    },
    {
      provider: 'pinnacle',
      logo: {
        ...imageDefaults.logo,
        fileName: 'pinnacle.png'
      },
      icon: {
        ...imageDefaults.icon,
        fileName: 'pinnacle_icon.png'
      }
    },
    {
      provider: 'soldo-token',
      logo: {
        ...imageDefaults.logo,
        fileName: 'soldo-token.png'
      },
      icon: {
        ...imageDefaults.icon,
        fileName: 'soldo-token_icon.png'
      }
    },
    {
      provider: 'tomatocart',
      logo: {
        ...imageDefaults.logo,
        fileName: 'tomatocart.png'
      },
      icon: {
        ...imageDefaults.icon,
        fileName: 'tomatocart_icon.png'
      }
    },
    {
      provider: 'ubercart',
      logo: {
        ...imageDefaults.logo,
        fileName: 'ubercart.png'
      },
      icon: {
        ...imageDefaults.icon,
        fileName: 'ubercart_icon.png'
      }
    },
    {
      provider: 'wpecommerce',
      logo: {
        ...imageDefaults.logo,
        fileName: 'wpecommerce.png'
      },
      icon: {
        ...imageDefaults.icon,
        fileName: 'wpecommerce_icon.png'
      }
    },
    {
      provider: 'webasyst',
      logo: {
        ...imageDefaults.logo,
        fileName: 'webasyst.png'
      },
      icon: {
        ...imageDefaults.icon,
        fileName: 'webasyst_icon.png'
      }
    },
    {
      provider: 'xcart',
      logo: {
        ...imageDefaults.logo,
        fileName: 'xcart.png'
      },
      icon: {
        ...imageDefaults.icon,
        fileName: 'xcart_icon.png'
      }
    },
    {
      provider: 'xtcommerce',
      logo: {
        ...imageDefaults.logo,
        fileName: 'xtcommerce.png'
      },
      icon: {
        ...imageDefaults.icon,
        fileName: 'xtcommerce_icon.png'
      }
    },
    {
      provider: 'aspdotnetstorefront',
      logo: {
        ...imageDefaults.logo,
        fileName: 'aspdotnetstorefront.png'
      },
      icon: {
        ...imageDefaults.icon,
        fileName: 'aspdotnetstorefront_icon.png'
      }
    },
    {
      provider: 'lsrseries',
      logo: {
        ...imageDefaults.logo,
        fileName: 'lsrseries.jpg'
      }
    }
  ]
};

const getDefaults = (integrationType, fileType) => {
  integrationType = _.toLower(integrationType);
  const imageTypes = iconTypes.byIntegrationType[integrationType]
    ? iconTypes.byIntegrationType[integrationType]
    : imageDefaults;

  return imageTypes[fileType];
};

const getProviderOverride = (provider, fileType) => {
  const match = iconTypes.byProvider.find((item) => item.provider === provider);

  return match ? match[fileType] : null;
};

const getImageDetails = (provider, integrationType, fileType) => {
  const defaults = getDefaults(integrationType, fileType);
  const imageDetails = {
    ...defaults,
    ...getProviderOverride(provider, fileType)
  };
  const fileName = imageDetails.fileName || `${provider}${imageDetails.fileSuffix}.${imageDetails.fileType}`;
  imageDetails.imageUrl = `/static/integration_logos/${fileName}`;

  return imageDetails;
};

const BorderedAvatar = styled(Avatar)({
  border: '1px solid lightgrey',
  padding: 2,
  backgroundColor: 'white'
});

RenderedImage.propTypes = {
  imageDetails: PropTypes.object.isRequired,
  provider: PropTypes.string.isRequired,
  fileType: PropTypes.string.isRequired
};

function RenderedImage({ imageDetails, provider, fileType }) {
  if (fileType === 'icon')
    return (
      <BorderedAvatar
        src={imageDetails.imageUrl}
        alt={provider}
        sx={{ height: imageDetails.height, width: imageDetails.width }}
      />
    );

  return (
    <Box
      component="img"
      src={imageDetails.imageUrl}
      alt={provider}
      sx={{ maxHeight: imageDetails.height, margin: 'auto' }}
    />
  );
}

ProviderImage.propTypes = {
  provider: PropTypes.string.isRequired,
  integrationType: PropTypes.string.isRequired,
  fileType: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number
};

export default function ProviderImage({ provider, integrationType, fileType, width, height, ...other }) {
  const imageDetails = getImageDetails(provider, integrationType, fileType);
  if (width) imageDetails.width = width;
  if (height) imageDetails.height = height;
  return (
    <Box {...other}>
      <Box sx={{ width: imageDetails.width }}>
        <RenderedImage imageDetails={imageDetails} provider={provider} fileType={fileType} />
      </Box>
    </Box>
  );
}
