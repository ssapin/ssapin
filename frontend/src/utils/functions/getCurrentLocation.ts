export const getCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const [lat, lng] = [position.coords.latitude, position.coords.longitude];
      console.log(lat, lng);
      return [lat, lng];
    });
  }
};
