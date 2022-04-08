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
    width: 200,
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
  console.log(imageDetails);
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
  if (fileType === 'icon') return <BorderedAvatar src={imageDetails.imageUrl} alt={provider} />;

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
  fileType: PropTypes.string.isRequired
};

export default function ProviderImage({ provider, integrationType, fileType, ...other }) {
  const imageDetails = getImageDetails(provider, integrationType, fileType);
  return (
    <Box {...other}>
      <Box sx={{ width: imageDetails.width }}>
        <RenderedImage imageDetails={imageDetails} provider={provider} fileType={fileType} />
      </Box>
    </Box>
  );
}
