import Lottie from 'react-lottie';
import animationData from '../lotties/simple-complete.json';

// ----------------------------------------------------------------------

export default function LoadingComplete() {
  const defaultOptions = {
    loop: false,
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
