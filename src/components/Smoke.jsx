import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

export const Smoke = () => {
  const smokeTexture = useTexture('/textures/smoke.jpg');
  const smoke = useRef();
  useFrame((state, delta) => {
    smoke.current.rotation.z += delta * 0.03;
  });

  return (
    <mesh ref={smoke} position-z={7}>
      <planeGeometry args={[50, 40]} />
      <meshStandardMaterial
        // color="pink"
        alphaMap={smokeTexture}
        map={smokeTexture}
        transparent
        opacity={0.1}
      />
    </mesh>
  );
};
