import React from "react";

const SearchIcon = ({ color = "#fff", width = 25, height = 35 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 29 27">
    <g>
      <g>
        <path
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeMiterlimit="50"
          strokeWidth="2"
          d="M18.11 16.79L27.32 26"
        />
      </g>
      <g>
        <path
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeMiterlimit="50"
          strokeWidth="2"
          d="M10.868 19.421c5.45 0 9.869-4.124 9.869-9.21C20.737 5.124 16.319 1 10.868 1 5.418 1 1 5.124 1 10.21c0 5.087 4.418 9.211 9.868 9.211z"
        />
      </g>
    </g>
  </svg>
);

export default SearchIcon;
