const request = require("request");
const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1IjoiaGFyc2gtdHJpcGF0aGkiLCJhIjoiY2todXhobmU0MDFpNDJ6bHg0Zm55bml5MSJ9.lODAWlan2L5BZPESH88R_Q&limit=1";
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback(
        { error: "Unable to connect to geolocation service" },
        undefined
      );
    } else if (body.message) {
      callback(
        { error: "Unable to find location!Try another search" },
        undefined
      );
    } else if (body.features.length === 0) {
      callback(
        { error: "Unable to find location!Try another search" },
        undefined
      );
    } else {
      const data = {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      };
      callback(undefined, data);
    }
  });
};

module.exports = geocode;
