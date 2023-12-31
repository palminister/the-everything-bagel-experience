import { useRef, useMemo } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Object3D } from 'three';

export const Particles = ({ count = 1000 }) => {
  const mesh = useRef();

  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;
  const width = 100;
  const height = 60;
  const depth = 20;

  const dummy = useMemo(() => new Object3D(), []);
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
      // temp.push({
      //   t: Math.random() * 100,
      //   factor: 20 + Math.random() * 100,
      //   // speed: 0.01 + Math.random() / 200,
      //   speed: 0.01 + Math.random() / 200,
      //   // Adjust the range of factors to fit the screen
      //   xFactor: Math.random() * width - width / 2,
      //   yFactor: Math.random() * height - height / 2,
      //   // zFactor: -5 + Math.random() * 10, // Adjust the z-axis range
      //   zFactor: Math.random() * depth - depth / 2,
      //   mx: 0,
      //   my: 0,
      // });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    const mouse = {
      // x: state.mouse.x * aspect * 0.7,
      // y: state.mouse.y * aspect * 0.7,
      x: (state.mouse.x * viewport.width) / 4,
      y: (state.mouse.y * viewport.height) / 4,
    };
    // Run through the randomized data to calculate some movement
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);

      particle.mx += (mouse.x - particle.mx) * 0.1;
      particle.my += (mouse.y * -1 - particle.my) * 0.1;
      // Update the dummy object
      dummy.position.set(
        (particle.mx / 10) * a +
          xFactor +
          Math.cos((t / 10) * factor) +
          (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b +
          yFactor +
          Math.sin((t / 10) * factor) +
          (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b +
          zFactor +
          Math.cos((t / 10) * factor) +
          (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      // And apply the matrix to the instanced item
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <>
      <instancedMesh ref={mesh} args={[null, null, count]}>
        {/* <dodecahedronGeometry attach="geometry" args={[0.2, 0]} /> */}
        <sphereGeometry args={[0.2, 2, 2]} />
        {/* <meshPhongMaterial attach="material" color="hotpink" /> */}
        <meshStandardMaterial attach="material" color="#050505" />
        {/* <meshPhongMaterial attach="material" color="#050505" /> */}
      </instancedMesh>
    </>
  );
};
