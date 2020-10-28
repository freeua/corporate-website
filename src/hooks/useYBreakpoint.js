import { useEffect, useState } from "react";

const useYBreakpoint = breakpoint => {
  const [isBreak, setIsBreak] = useState(window.pageYOffset > breakpoint ? true : false);

  const handleScroll = () => {
    if (window.pageYOffset > breakpoint) {
      return setIsBreak(true);
    }
    return setIsBreak(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return isBreak;
};

export default useYBreakpoint;
