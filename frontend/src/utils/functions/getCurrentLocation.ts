// eslint-disable-next-line consistent-return
export const getCurrentLocation = async () => {
  if (navigator.geolocation) {
    return new Promise((resolve, rejected) => {
      navigator.geolocation.getCurrentPosition(resolve, rejected);
    });
  }
  alert("위치 접근 허용을 하지 않았어요.");
};
