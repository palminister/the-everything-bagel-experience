'use client';

import { Suspense, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { BagelScene } from '@/components/Bagel';
import { Lighting } from '@/components/Lighting';
import { Effects } from '@/components/Effects';
import { Loader } from '@/components/Loader';
import { Description } from '@/components/Description';
import Lottie from 'lottie-react';
import soundAnimation from '../../public/sound.json';

export default function Home() {
  const [started, setStart] = useState(false);
  const [mute, setMute] = useState(false);
  const lottieRef = useRef();

  const handleMute = () => {
    setMute(!mute);
    if (!mute && lottieRef.current) {
      lottieRef.current.pause();
    } else {
      lottieRef.current.play();
    }
  };
  return (
    <>
      <Loader started={started} onStarted={() => setStart(true)} />
      <Description started={started} />
      <button
        onClick={handleMute}
        className="absolute z-10 w-28 left-1/2 bottom-[8%] transform -translate-x-1/2"
      >
        <Lottie
          lottieRef={lottieRef}
          animationData={soundAnimation}
          loop={true}
        />
      </button>
      <Canvas dpr={[1, 2]}>
        <Suspense fallback={null}>
          <BagelScene started={started} mute={mute} />
          <Lighting />
          <Effects />
        </Suspense>
      </Canvas>
    </>
  );
}
