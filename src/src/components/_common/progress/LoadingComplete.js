import Lottie from 'react-lottie-player';
import animationData from '../../../lotties/loading-complete.json';

// ----------------------------------------------------------------------

export default function LoadingComplete() {
  return (
    <>
      <Lottie animationData={animationData} play loop={false} style={{ width: 80, height: 80 }} />
    </>
  );
}