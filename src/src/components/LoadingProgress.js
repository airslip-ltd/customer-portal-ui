import { motion } from 'framer-motion';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  height: '100%',
  display: 'flex',
  alignItems: 'right',
  justifyContent: 'right',
  backgroundColor: theme.palette.background.default
}));

// ----------------------------------------------------------------------

export default function LoadingProgress({ ...other }) {
  return (
    <>
      <RootStyle {...other}>
        <motion.div
          initial={{ rotateY: 0 }}
          animate={{ rotateY: 360 }}
          transition={{
            duration: 2,
            ease: 'easeInOut',
            repeatDelay: 1,
            repeat: Infinity
          }}
        />

        <Box
          component={motion.div}
          animate={{
            scale: [1.2, 1, 1, 1.2, 1.2],
            rotate: [270, 0, 0, 270, 270],
            opacity: [0.25, 1, 1, 1, 0.25],
            borderRadius: ['25%', '25%', '50%', '50%', '25%']
          }}
          transition={{ ease: 'linear', duration: 3.2, repeat: Infinity }}
          sx={{
            width: 30,
            height: 30,
            borderRadius: '25%',
            position: 'absolute',
            border: (theme) => `solid 2px ${alpha(theme.palette.primary.dark, 0.24)}`
          }}
        />

        <Box
          component={motion.div}
          animate={{
            scale: [1, 1.2, 1.2, 1, 1],
            rotate: [0, 270, 270, 0, 0],
            opacity: [1, 0.25, 0.25, 0.25, 1],
            borderRadius: ['25%', '25%', '50%', '50%', '25%']
          }}
          transition={{
            ease: 'linear',
            duration: 3.2,
            repeat: Infinity
          }}
          sx={{
            width: 40,
            height: 40,
            borderRadius: '25%',
            position: 'relative',
            marginTop: '-5px',
            left: '5px',
            border: (theme) => `solid 4px ${alpha(theme.palette.primary.dark, 0.24)}`
          }}
        />
      </RootStyle>
    </>
  );
}
