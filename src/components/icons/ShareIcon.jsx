import React from "react";

const ShareIcon = ({ size = 26, color = "#5d5d5d" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 25 29">
    <g>
      <g xmlns="http://www.w3.org/2000/svg">
        <g>
          <path
            fill="none"
            stroke={color}
            strokeMiterlimit="50"
            strokeWidth="2"
            d="M8.782 14.482c0 2.122-1.707 3.842-3.811 3.842-2.105 0-3.811-1.72-3.811-3.842s1.706-3.842 3.81-3.842c2.105 0 3.812 1.72 3.812 3.842z"
          />
        </g>
        <g>
          <path
            fill="none"
            stroke={color}
            strokeMiterlimit="50"
            strokeWidth="2"
            d="M23.942 5.002c0 2.122-1.707 3.842-3.811 3.842-2.105 0-3.811-1.72-3.811-3.842s1.706-3.842 3.81-3.842c2.105 0 3.812 1.72 3.812 3.842z"
          />
        </g>
        <g>
          <path
            fill="none"
            stroke={color}
            strokeMiterlimit="50"
            strokeWidth="2"
            d="M23.942 24.062c0 2.122-1.707 3.843-3.811 3.843-2.105 0-3.811-1.72-3.811-3.843 0-2.122 1.706-3.842 3.81-3.842 2.105 0 3.812 1.72 3.812 3.842z"
          />
        </g>
        <g>
          <path
            fill="none"
            stroke={color}
            strokeMiterlimit="50"
            strokeWidth="2"
            d="M7.9 17.16l8.876 5.199"
          />
        </g>
        <g>
          <path
            fill="none"
            stroke={color}
            strokeMiterlimit="50"
            strokeWidth="2"
            d="M7.81 12.035l8.876-5.195"
          />
        </g>
      </g>
    </g>
  </svg>
);

export default ShareIcon;
