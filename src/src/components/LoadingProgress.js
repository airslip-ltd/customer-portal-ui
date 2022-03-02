import Lottie from 'react-lottie';
import animationData from '../lotties/simple-progress.json';

// ----------------------------------------------------------------------

export default function LoadingProgress() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <>
      <Lottie options={defaultOptions} height={80} width={80} />
    </>
  );
}
