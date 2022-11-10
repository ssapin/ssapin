import React, { forwardRef, LegacyRef } from "react";

const Card = forwardRef((props, ref: LegacyRef<HTMLDListElement>) => {
  return (
    <div className="box" ref={ref}>
      <div>
        <svg
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <defs>
            <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f079ba" />
              <stop offset="100%" stopColor="#e34a82" />
            </linearGradient>
          </defs>
          <path
            fill="url(#linear)"
            fillOpacity="1"
            d="M0,224L60,208C120,192,240,160,360,165.3C480,171,600,213,720,197.3C840,181,960,107,1080,74.7C1200,43,1320,53,1380,58.7L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
        </svg>
        <div>Bank</div>
        <div className="content">
          <div>
            <div className="label">Card Holder name</div>
            <div className="value">Colin van Eenige</div>
          </div>
          <div>
            <div className="label">Expiry Date</div>
            <div className="value value-right">05/25</div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Card;
