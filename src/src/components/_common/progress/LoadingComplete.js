import PropTypes from 'prop-types';
import Lottie from 'react-lottie-player';
import animationData from '../../../lotties/loading-complete.json';

// ----------------------------------------------------------------------

LoadingComplete.propTypes = {
  size: PropTypes.number
};

export default function LoadingComplete({ size }) {
  size = size || 80;

  return (
    <>
      <Lottie animationData={animationData} play loop={false} style={{ width: size, height: size }} />
    </>
  );
}
