export const Description = ({ started }) => {
  return (
    <>
      <div className="absolute left-1/2 top-[10%] z-10 text-center transform -translate-x-1/2">
        <div className="text-5xl font-extenda tracking-wide flex flex-col justify-center items-center">
          <div className="flex">
            <span className="font-light text-white">THE</span>
            <span className="font-extrabold outline-text">EVERYTHING</span>
          </div>
          <div className="flex">
            <span className="font-extrabold outline-text">BAGEL</span>
            <span className="font-light text-white">EXPERIENCE</span>
          </div>
        </div>
      </div>
      <div className="absolute left-1/2 bottom-[15%] z-10 text-center text-white transform -translate-x-1/2">
        <p className="text-xs md:text-sm max-w-[260px] font-baskerville">
          Rotate the bagel in a clockwise direction to jump into an alternate
          universe
        </p>
      </div>
    </>
  );
};
