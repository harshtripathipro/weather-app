const request = require("request");
const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=60bb75d233fc96758a22edd3d1d5a893&query=" +
    latitude +
    "," +
    longitude +
    "&units=m";
  console.log(url);
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback({ error: "Unable to connect to weather service" }, undefined);
    } else if (body.error) {
      callback({ error: "Unable to find location" }, undefined);
    } else {
      const forecastresponse = {
        time: body.location.localtime,
        temperature: body.current.temperature,
        weather_icons: body.current.weather_icons,
        precipitation: body.current.precip,
        humidity: body.current.humidity,
      };
      callback(undefined, forecastresponse);
    }
  });
};
module.exports = forecast;
