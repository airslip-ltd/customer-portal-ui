import Lottie from 'react-lottie-player';
import animationData from '../../../lotties/loading-failed.json';

// ----------------------------------------------------------------------

export default function LoadingFailed() {
  return (
    <>
      <Lottie animationData={animationData} play loop={false} style={{ width: 80, height: 80 }} />
    </>
  );
}
