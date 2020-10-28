const throttle = (func, delay) => {
  let inProgress = false;

  return (...args) => {
    if (inProgress) {
      return;
    }

    inProgress = true;

    setTimeout(() => {
      func(...args);
      inProgress = false;
    }, delay);
  };
};

export default throttle;
