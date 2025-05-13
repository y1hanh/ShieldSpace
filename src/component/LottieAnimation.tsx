import React from 'react';
import Lottie from 'lottie-react';

interface LottieAnimationProps {
  animationData: any;
  height?: number | string;
  width?: number | string;
  loop?: boolean;
  autoplay?: boolean;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({
  animationData,
  height = 200,
  width = 200,
  loop = true,
  autoplay = true,
}) => {
  return (
    <Lottie
      animationData={animationData}
      style={{ height, width }}
      loop={loop}
      autoplay={autoplay}
    />
  );
};

export default LottieAnimation;
