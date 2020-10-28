const redirectToMap = (lat, lng) => {
  const UA = window.navigator.userAgent.toLowerCase();

  const isIOS = UA.includes("iphone") || UA.includes("ipad") || UA.includes("ipod");
  const isAndroid = UA.includes("android");

  if (isIOS) {
    return `maps://maps.google.com/maps?q=${lat},${lng}`;
  }

  if (isAndroid) {
    return `geo:${lat},${lng}?q=${lat},${lng}`;
  }

  return `https://maps.google.com/maps?q=${lat},${lng}`;
};

export default redirectToMap;
