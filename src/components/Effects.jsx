import {
  EffectComposer,
  GodRays,
  Noise,
  DepthOfField,
  Vignette,
  ChromaticAberration,
} from '@react-three/postprocessing';
import { BlendFunction, Resizer, KernelSize } from 'postprocessing';
import { useState } from 'react';

export const Effects = () => {
  const [sunRef, set] = useState();
  return (
    <>
      <mesh ref={set} position={[0, 0, 5]}>
        <sphereGeometry args={[4, 8, 8]} />
        <meshBasicMaterial color="#fcdede" />
      </mesh>

      <EffectComposer multisampling={0} disableNormalPass>
        <DepthOfField
          target={[0, 0, 2]}
          focalLength={0.4}
          bokehScale={11}
          height={700}
        />
        {sunRef && (
          <GodRays
            sun={sunRef}
            blendFunction={BlendFunction.Additive}
            samples={30}
            density={0.9}
            decay={0.8}
            weight={1}
            clampMax={1}
            width={Resizer.AUTO_SIZE}
            height={Resizer.AUTO_SIZE}
            kernelSize={KernelSize.SMALL}
            blur={true}
          />
        )}
        <Noise opacity={0.1} />
        <Vignette
          eskil={false}
          offset={0.1}
          darkness={0.8}
          blendFunction={BlendFunction.DARKEN}
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.0008, 0.0005]}
        />
      </EffectComposer>
    </>
  );
};
