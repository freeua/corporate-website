import React from "react";

const ArrowIcon = ({
  color = "#002c90",
  direction = "right",
  pixelWeight = 1,
  margin = "0 0 0 20px",
  transition = false,
  size = 3,
}) => {
  let degree;

  switch (direction) {
    case "up":
      degree = -135;
      break;
    case "right":
      degree = -45;
      break;
    case "down":
      degree = 45;
      break;
    case "left":
      degree = 135;
      break;
    default:
      degree = -45;
  }

  return (
    <i
      style={{
        border: `solid ${color}`,
        borderWidth: `0 ${pixelWeight}px ${pixelWeight}px 0`,
        display: "inline-block",
        padding: size,
        transform: `rotate(${degree}deg)`,
        WebkitTransform: `rotate(${degree}deg)`,
        height: 0,
        margin: margin,
        transition: transition && "all 0.3s ease",
        WebkitTransition: transition && "all 0.3s ease",
      }}
    />
  );
};

export default ArrowIcon;
