import { useEffect, useState } from "react";

const useXBreakpoint = breakpoint => {
  const [isBreak, setIsBreak] = useState(window.innerWidth < breakpoint ? true : false);

  const handleResize = () => {
    if (window.innerWidth < breakpoint) {
      return setIsBreak(true);
    }
    return setIsBreak(false);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return isBreak;
};

export default useXBreakpoint;
