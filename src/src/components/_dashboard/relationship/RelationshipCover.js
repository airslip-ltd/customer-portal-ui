import PropTypes from 'prop-types';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
//
import MyAvatar from '../../MyAvatar';

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

RelationshipCover.propTypes = {
  relationship: PropTypes.object
};

export default function RelationshipCover({ relationship }) {
  const { invitationDetails, relationshipStatus } = relationship;

  return (
    <RootStyle>
      <InfoStyle>
        <MyAvatar
          sx={{
            mx: 'auto',
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: 'common.white',
            width: { xs: 80, md: 128 },
            height: { xs: 80, md: 128 }
          }}
        />
        <Box
          sx={{
            ml: { md: 3 },
            mt: { xs: 1, md: 0 },
            color: 'common.white',
            textAlign: { xs: 'center', md: 'left' }
          }}
        >
          <Typography variant="h4">{invitationDetails.businessName}</Typography>
          <Typography sx={{ opacity: 0.72 }}>{relationshipStatus}</Typography>
        </Box>
      </InfoStyle>
    </RootStyle>
  );
}
