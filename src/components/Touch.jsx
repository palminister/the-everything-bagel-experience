import { useSpring, animated } from '@react-spring/three';
import { a, easings } from '@react-spring/web';
import { Html } from '@react-three/drei';

export const Touch = () => {
  const [touchSpring] = useSpring(() => ({
    from: {
      rotation: 0,
      opacity: 0,
    },
    to: [
      {
        rotation: -1,
        opacity: 1,
      },
      {
        rotation: -2,
        opacity: 0,
      },
    ],
    loop: true,
    config: {
      duration: 1600,
      easing: easings.easeInOutCirc,
    },
    delay: 1500,
  }));

  return (
    <animated.group rotation-z={touchSpring.rotation}>
      <Html
        center
        zIndexRange={[10, 0]}
        position-x={12}
        className="pointer-events-none"
      >
        <a.svg
          opacity={touchSpring.opacity}
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="14"
            cy="14"
            r="14"
            fill="url(#paint0_linear_112_48)"
            fillOpacity="0.45"
          />
          <circle cx="14" cy="14" r="13.5" stroke="white" strokeOpacity="0.2" />
          <defs>
            <linearGradient
              id="paint0_linear_112_48"
              x1="14"
              y1="0"
              x2="14"
              y2="40.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" />
              <stop offset="1" stopColor="#D9D9D9" stopOpacity="0" />
            </linearGradient>
          </defs>
        </a.svg>
      </Html>
    </animated.group>
  );
};
