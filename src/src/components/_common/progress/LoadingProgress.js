import Lottie from 'react-lottie-player';
import animationData from '../../../lotties/loading-progress.json';

// ----------------------------------------------------------------------

export default function LoadingProgress() {
  return (
    <>
      <Lottie animationData={animationData} play loop style={{ width: 80, height: 80 }} />
    </>
  );
}
