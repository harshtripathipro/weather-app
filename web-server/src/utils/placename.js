const request = require("request");
const place = (longitude, latitude, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    longitude +
    "," +
    latitude +
    ".json?access_token=pk.eyJ1IjoiaGFyc2gtdHJpcGF0aGkiLCJhIjoiY2todXhobmU0MDFpNDJ6bHg0Zm55bml5MSJ9.lODAWlan2L5BZPESH88R_Q&limit=1";
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback({ error: "Unable to connect to location service" }, undefined);
    } else {
      callback(undefined, body.features[0].place_name);
    }
  });
};
module.exports = place;
