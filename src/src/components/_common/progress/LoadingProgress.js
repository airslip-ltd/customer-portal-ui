import PropTypes from 'prop-types';
import Lottie from 'react-lottie-player';
import animationData from '../../../lotties/loading-progress.json';

// ----------------------------------------------------------------------

LoadingProgress.propTypes = {
  size: PropTypes.number
};

export default function LoadingProgress({ size }) {
  size = size || 80;

  return (
    <>
      <Lottie animationData={animationData} play loop style={{ width: size, height: size }} />
    </>
  );
}
