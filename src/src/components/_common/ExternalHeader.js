// material
import { Box, Typography, Stack, LinearProgress } from '@mui/material';
import { Icon } from '@iconify/react';
import { styled } from '@mui/material/styles';
// layouts
import PropTypes from 'prop-types';
import roundAccountBox from '@iconify/icons-ic/baseline-all-inclusive';

ExternalHeader.propTypes = {
  title: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired
};

const IconContainerStyle = styled('div')({
  width: 50,
  height: 50,
  display: 'inline-block',
  outline: 'none',
  overflow: 'hidden',
  borderRadius: '50%',
  backgroundColor: '#fff',
  padding: 3,
  textAlign: 'center',
  border: '4px solid'
});

Item.propTypes = {
  sx: PropTypes.object
};

function Item(props) {
  const { sx, ...other } = props;
  return <Box sx={{ p: 1, m: 1, ...sx }} {...other} />;
}

// ----------------------------------------------------------------------

export default function ExternalHeader({ title, progress }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
      <Box>
        <IconContainerStyle>
          <Icon icon={roundAccountBox} width={35} height={35} />
        </IconContainerStyle>
      </Box>
      <Item sx={{ flexGrow: 1 }}>
        <Stack>
          <Typography variant="subtitle1" gutterBottom>
            {title}
          </Typography>

          {progress > 0 && (
            <Box sx={{ width: '100%' }}>
              <LinearProgress variant="determinate" value={progress} />
            </Box>
          )}
        </Stack>
      </Item>
    </Box>
  );
}
