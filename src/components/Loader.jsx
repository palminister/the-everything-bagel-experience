import { useProgress } from '@react-three/drei';
import { useTrail, useSpring, useTransition, a } from '@react-spring/web';

export const Loader = ({ started, onStarted }) => {
  const { progress } = useProgress();
  const loaded = progress === 100;
  const [titleSpring] = useSpring(() => ({
    config: { mass: 5, tension: 300, friction: 95 },
    opacity: 1,
    y: 0,
    from: { opacity: 0, y: 20 },
  }));

  const [fadeSpring] = useSpring(() => ({
    config: { mass: 5, tension: 300, friction: 135 },
    delay: 2000,
    opacity: 1,
    y: 0,
    from: { opacity: 0, y: 20 },
  }));

  const transition = useTransition(started, {
    from: { opacity: 1, y: 0 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: -40 },
  });

  return transition(
    (style, item) =>
      !item && (
        <a.div className="absolute z-50" style={style}>
          <div className="flex flex-col justify-center items-center w-screen h-screen bg-[#0e1012]">
            <p className="absolute top-5 text-8xl opacity-10 blur-sm text-white font-baskerville">
              {loaded ? 1 : 0}
            </p>
            <a.div
              style={titleSpring}
              className="text-5xl font-extenda tracking-wide flex flex-col justify-center items-center"
            >
              <div className="flex">
                <span className="font-light text-white">THE</span>
                <span className="font-extrabold outline-text">
                  <Trail>EVERYTHING</Trail>
                </span>
              </div>
              <div className="flex">
                <span className="font-extrabold outline-text">
                  <Trail>BAGEL</Trail>
                </span>
                <span className="font-light text-white">EXPERIENCE</span>
              </div>
            </a.div>
            <a.p
              className="text-md mt-2 font-baskerville text-white"
              style={fadeSpring}
            >
              contains <em>audio</em> elements that play{' '}
              <strong>automatically.</strong>
            </a.p>
            <button
              onClick={onStarted}
              className="relative italic text-lg mt-14 transition-opacity hover:opacity-90 text-white font-baskerville"
            >
              <Trail loaded={loaded}>Enter</Trail>
              <div className="absolute -top-8 -left-6">
                <svg
                  width="94"
                  height="81"
                  viewBox="0 0 94 81"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={loaded ? 'active' : ''}
                >
                  <path
                    d="M72.08 29.6864C66.6109 27.6855 61.832 24.6189 57.3645 20.9283C51.7618 16.3 45.5205 10.6345 37.7601 10.7453C33.4184 10.8074 29.5639 12.9923 26.3119 15.7078C20.933 20.1995 16.7574 26.2685 13.9302 32.6467C8.03263 45.9516 9.4167 60.5996 19.5314 71.3887C23.0037 75.0924 27.1598 78.133 32.1588 79.3607C38.1423 80.83 44.7184 79.9919 50.5594 78.3043C57.7134 76.2373 64.553 72.711 70.7534 68.6249C76.9114 64.5668 82.6977 59.6107 87.1395 53.6883C89.9586 49.9295 92.6423 45.4614 93.011 40.6678C93.4284 35.2424 90.4682 30.7071 86.378 27.414C73.4941 17.0408 54.5849 15.8018 38.927 18.6682C22.7222 21.6346 6.34539 31.8101 1.42565 48.3818C-0.222478 53.9334 -0.383397 60.3276 2.16266 65.6401C4.73495 71.0072 10.1483 73.5704 15.7727 74.5455C21.4429 75.5287 27.2766 74.8346 32.8713 73.7103C41.0326 72.0701 48.9749 69.3789 56.6029 66.07C63.7648 62.9632 70.9026 59.2743 77.0425 54.4007C80.7807 51.4335 84.6612 47.5081 84.7811 42.4121C84.8788 38.2593 82.5462 34.5876 79.9783 31.5289C75.4787 26.1695 69.5014 21.3685 63.0517 18.5945C55.9456 15.5381 48.8973 15.9468 41.8873 19.0244C34.8894 22.0966 28.6083 26.9398 24.0149 33.0644C20.8127 37.334 18.2864 42.4372 18.082 47.8659C17.8473 54.0984 20.7451 59.9456 24.7888 64.5223C33.0734 73.8989 45.8259 78.5078 57.9786 74.5947C66.7406 71.7734 76.0047 64.9436 76.4652 54.9657C76.6773 50.37 75.0891 45.8447 72.9399 41.847C69.3419 35.1544 64.1323 29.1148 58.8139 23.7412C54.4134 19.2951 49.4269 14.9734 43.4719 12.7844C37.1817 10.4722 30.8099 11.8562 25.145 15.1551C12.9596 22.251 4.60893 37.3496 10.2697 51.1702C15.2226 63.2624 27.461 71.0619 40.2905 71.4993C46.7662 71.72 53.3053 70.3736 59.3789 68.1827C64.9631 66.1684 70.6115 63.1599 74.6595 58.7245C83.027 49.5562 80.3526 36.9562 75.5071 26.7875C72.0964 19.6299 67.6679 12.7902 62.1304 7.08487C57.8561 2.68098 52.8755 -0.183442 46.5673 0.611495C33.6147 2.24373 22.1953 14.8978 18.6962 26.9595C14.5261 41.334 20.8752 56.4533 31.8395 65.9963C35.6118 69.2796 39.9781 71.9151 44.7371 73.4892C48.5822 74.7609 53.2104 75.5751 57.0697 73.8822C60.8624 72.2185 62.9014 68.0566 63.8747 64.252C65.3762 58.3824 65.0462 51.8867 63.8747 45.9988C62.6085 39.6352 60.3013 33.4081 57.6838 27.4877C55.1591 21.7769 51.9348 15.8011 46.3708 12.5264C32.9193 4.60966 20.0957 19.2589 15.8096 30.7674C10.6358 44.6592 13.9441 62.6683 26.6313 71.4747C31.0596 74.5485 36.2449 75.5921 41.5188 74.5947C45.848 73.7759 49.4154 71.5782 53.0653 69.2637"
                    stroke="white"
                    strokeLinecap="round"
                    strokeWidth={0.35}
                    className="svg-elem-1"
                  ></path>
                </svg>
              </div>
            </button>
            <p className="absolute bottom-5 text-8xl opacity-10 blur-sm text-white font-baskerville">
              {loaded ? '00' : Math.round(progress).toString().padStart(2, '0')}
            </p>
          </div>
        </a.div>
      )
  );
};

const Trail = ({ loaded = true, children }) => {
  const items = children.split('');
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: loaded ? 1 : 0,
    transform: loaded ? 'translateY(0px)' : 'translateY(20px)',
    filter: loaded ? 'blur(0px)' : 'blur(5px)',
    from: { opacity: 0, transform: 'translateY(20px)', filter: 'blur(5px)' },
  });

  return (
    <div className="flex">
      {trail.map(({ ...props }, index) => (
        <a.div key={index} style={{ ...props }}>
          {items[index] === ' ' ? (
            <span className="opacity-0">I</span>
          ) : (
            items[index]
          )}
        </a.div>
      ))}
    </div>
  );
};
