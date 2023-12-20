import {
  MeshDistortMaterial,
  PerspectiveCamera,
  Sampler,
  useTexture,
  useCursor,
} from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { useDrag } from '@use-gesture/react';
import { useSpring, animated } from '@react-spring/three';
import { r } from '@/helpers/utils';
import { MathUtils } from 'three';

import { Touch } from './Touch';
import { Particles } from './Particles';
import { Seeds } from './Seeds';
import { Smoke } from './Smoke';

const transformInstances = ({ dummy, position }) => {
  dummy.position.copy(position);
  dummy.scale.setScalar(Math.max(0.3, Math.random() * 0.7));
  dummy.rotation.set(
    Math.random() * Math.PI,
    Math.random() * Math.PI,
    Math.random() * Math.PI
  );
};

const Bagel = ({ mute }) => {
  const mesh = useRef();
  const instance = useRef();
  const light = useRef();
  const rimLight = useRef();
  const [suggestTouch, setSuggestTouch] = useState(true);
  const [hovered, setHover] = useState();
  const [tickSound] = useState(() => new Audio('./sound/tick.mp3'));
  const [forwardSound] = useState(() => new Audio('./sound/forward.mp3'));
  const [shutterSound] = useState(() => new Audio('./sound/shutter.mp3'));
  const [rumbleSound] = useState(() => new Audio('./sound/rumble.mp3'));

  const [spring, api] = useSpring(() => ({
    rotation: [0, 0, 0],
    config: { friction: 15, tension: 180 },
  }));

  const { size } = useThree();

  const bind = useDrag(
    ({ first, last, down, dragging, xy: [x, y], direction: [dx, dy] }) => {
      const isUpperHalf = y / size.height < 0.5;
      let rotationZ = mesh.current.rotation.z;

      if ((isUpperHalf && dx > 0) || (!isUpperHalf && dx < 0)) {
        rotationZ -= Math.ceil(x / size.width);

        const positionMultiplier = isUpperHalf ? 1 : -1;

        light.current.position.x = Math.sin(x * 10) * 50 * positionMultiplier;
        light.current.position.y = Math.cos(x * 10) * 50 * positionMultiplier;
        light.current.color.setHSL(
          Math.sin(x * 10 * Math.random()),
          Math.max(0.8, Math.random()),
          0.5
        );
        light.current.power = Math.random() * 2000;

        rimLight.current.position.x =
          -Math.sin(x * 10) * 60 * positionMultiplier;
        rimLight.current.position.y =
          Math.cos(x * 10) * 60 * positionMultiplier;
        rimLight.current.color.setHSL(Math.sin(x * 10 * Math.random()), 1, 0.5);
        rimLight.current.power = Math.random() * 1000;
      }

      api.start({ rotation: [0, 0, rotationZ] });
      document.body.style.cursor = down ? 'grabbing' : 'grab';

      tickSound.play();
      if (tickSound.currentTime > 0.025) {
        tickSound.currentTime = 0;
      }

      if (dragging) {
        forwardSound.play();
      } else {
        forwardSound.pause();
      }

      if (first) {
        setSuggestTouch(false);
        rumbleSound.play();
      }
      if (last) {
        shutterSound.play();
      }
    }
  );

  useFrame((state, delta) => {
    mesh.current.rotation.z -= delta * 0.1;
    instance.current.rotation.z = mesh.current.rotation.z;
    if (spring.rotation.animation.values[2])
      spring.rotation.animation.values[2]._value -= delta * 0.1;
  });

  const props = useTexture({
    normalMap: '/textures/normal_map.jpg',
    roughnessMap: '/textures/roughness_map.jpg',
  });

  useEffect(() => {
    if (mute) {
      tickSound.volume = 0;
      forwardSound.volume = 0;
      shutterSound.volume = 0;
      rumbleSound.volume = 0;
    } else {
      tickSound.volume = 0.3;
      forwardSound.volume = 0.63;
      shutterSound.volume = 0.25;
      rumbleSound.volume = 0.85;
    }
  }, [mute, forwardSound, rumbleSound, shutterSound, tickSound]);

  useCursor(hovered, 'grab', 'auto', document.body);
  return (
    <group>
      <pointLight
        position-z={10}
        decay={0.3}
        ref={light}
        intensity={0}
        color="white"
      />
      <pointLight
        position-z={-20}
        decay={0.3}
        ref={rimLight}
        intensity={20}
        color="white"
      />
      <Sampler count={1000} transform={transformInstances}>
        <animated.mesh
          {...spring}
          {...bind()}
          ref={mesh}
          onPointerOver={() => setHover(true)}
          onPointerOut={() => setHover(false)}
          scale={10}
        >
          <torusGeometry args={[1, 0.6, 64, 128]} />
          <MeshDistortMaterial
            color="black"
            {...props}
            distort={0.25}
            speed={0}
          />
        </animated.mesh>
        <instancedMesh ref={instance} args={[null, null, 1000]} scale={10}>
          <sphereGeometry args={[0.05, 3, 3]} />
          <meshStandardMaterial color="black" />
        </instancedMesh>
      </Sampler>
      {suggestTouch && <Touch />}
    </group>
  );
};

export const BagelScene = ({ started, mute }) => {
  const light = useRef();
  const camera = useRef();

  const [scoreFirst] = useState(() => new Audio('./sound/bagel-score.mp3'));
  const [scoreSecond] = useState(() => new Audio('./sound/bagel-score.mp3'));

  const { viewport } = useThree();

  useFrame((state) => {
    const mouse = {
      x: (state.mouse.x * viewport.width) / 2,
      y: (state.mouse.y * viewport.height) / 2,
    };
    light.current.position.set(mouse.x, mouse.y, -3);
    camera.current.rotation.set(
      MathUtils.degToRad(mouse.y / 20),
      -MathUtils.degToRad(mouse.x / 15),
      0
    );
  });

  useEffect(() => {
    const overlapTime = 8;
    if (started) {
      scoreFirst.play();
    } else {
      scoreFirst.pause();
      scoreFirst.currentTime = 0;
    }

    if (mute) {
      scoreFirst.volume = 0;
      scoreSecond.volume = 0;
    } else {
      scoreFirst.volume = 1;
      scoreSecond.volume = 1;
    }

    const handleTimeUpdate = (event) => {
      const { currentTime, duration } = event.target;
      const isScoreFirst = event.target === scoreFirst;

      if (currentTime > duration - overlapTime) {
        if (isScoreFirst) {
          scoreSecond.play();
        } else {
          scoreFirst.play();
        }
      }
    };

    scoreFirst.addEventListener('timeupdate', handleTimeUpdate);
    scoreSecond.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      scoreFirst.removeEventListener('timeupdate', handleTimeUpdate);
      scoreSecond.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [scoreFirst, scoreSecond, started, mute]);

  return (
    <>
      <PerspectiveCamera
        ref={camera}
        makeDefault
        fov={100}
        position={[0, 0, 30]}
        far={100}
      />
      <pointLight ref={light} distance={40} intensity={500} color="white" />

      <Bagel mute={mute} />
      <Smoke />
      <Seeds count={50} radius={1.5} speed={0.3} z={6} />
      <Seeds count={30} radius={7} speed={0.3} />
      <Particles count={600} />
    </>
  );
};
