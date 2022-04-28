import PropTypes from 'prop-types';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { MAvatar } from '../@material-extend';
import createAvatar from '../../utils/createAvatar';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  '&:before': {
    top: 0,
    zIndex: 9,
    width: '100%',
    content: "''",
    height: '100%',
    position: 'absolute',
    backdropFilter: 'blur(3px)',
    WebkitBackdropFilter: 'blur(3px)', // Fix on Mobile
    backgroundColor: alpha(theme.palette.primary.darker, 0.72)
  }
}));

const InfoStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  zIndex: 99,
  position: 'absolute',
  marginTop: theme.spacing(5),
  [theme.breakpoints.up('md')]: {
    right: 'auto',
    display: 'flex',
    alignItems: 'center',
    left: theme.spacing(3),
    bottom: theme.spacing(3)
  }
}));

// ----------------------------------------------------------------------

const Contrast = styled('div')(({ theme }) => ({
  color: `${theme.palette.primary.contrastText} !important`
}));

// ----------------------------------------------------------------------

CoverStyle.propTypes = {
  avatar: PropTypes.node,
  displayName: PropTypes.string,
  avatarUrl: PropTypes.string,
  children: PropTypes.node
};

export default function CoverStyle({ children, avatar, displayName, avatarUrl }) {
  const DisplayAvatar = () => {
    if (avatar) return avatar;

    return (
      <MAvatar
        sx={{
          mx: 'auto',
          borderWidth: 2,
          borderStyle: 'solid',
          borderColor: 'common.white',
          width: { xs: 80, md: 128 },
          height: { xs: 80, md: 128 }
        }}
        src={avatarUrl}
        alt={displayName}
        color={avatarUrl ? 'default' : createAvatar(displayName).color}
      >
        {createAvatar(displayName).name}
      </MAvatar>
    );
  };

  return (
    <RootStyle>
      <InfoStyle>
        <DisplayAvatar />
        <Box
          sx={{
            ml: { md: 3 },
            mt: { xs: 1, md: 0 },
            color: 'common.white',
            textAlign: { xs: 'center', md: 'left' }
          }}
        >
          <Contrast>{children}</Contrast>
        </Box>
      </InfoStyle>
    </RootStyle>
  );
}
