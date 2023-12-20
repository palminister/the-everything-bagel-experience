import { Environment } from '@react-three/drei';

export const Lighting = () => (
  <>
    <color attach="background" args={['#0e1012']} />
    <Environment preset="studio" />
    <pointLight position-z={8} distance={100} intensity={5} color="#fce3c0" />
  </>
);
