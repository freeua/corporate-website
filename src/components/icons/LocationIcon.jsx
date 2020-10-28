import React from "react";

const LocationIcon = ({ width = 20, height = 27, color = "white" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 20 27">
    <g>
      <g>
        <g>
          <path
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="50"
            strokeWidth="2"
            d="M9.696 1A8.696 8.696 0 0 0 1 9.75c0 7.88 8.696 15.76 8.696 15.76v0s8.695-7.934 8.695-15.76A8.696 8.696 0 0 0 9.696 1z"
          />
        </g>
        <g>
          <path
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="50"
            strokeWidth="2"
            d="M9.69 12.952a3.26 3.26 0 1 0 0-6.522 3.26 3.26 0 0 0 0 6.522z"
          />
        </g>
      </g>
    </g>
  </svg>
);

export default LocationIcon;
