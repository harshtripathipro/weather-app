console.log("Client side Javascript is loaded");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const mainContent = document.querySelector(".main-content");
const message1 = document.querySelector("#message1");
const message2 = document.querySelector("#message2");
const message3 = document.querySelector("#message3");
const message4 = document.querySelector("#message4");
const message5 = document.querySelector("#message5");
const message6 = document.querySelector("#message6");
const message7 = document.querySelector("#message7");
const message8 = document.querySelector("#message8");
const message9 = document.querySelector("#message9");
const message10 = document.querySelector("#message10");
const head = document.querySelector("#head");
search.placeholder = "Location";

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  message1.textContent = "Loading....";
  message2.textContent = "";
  if (mainContent.hasAttribute("paragraph")) mainContent.removeChild(paragraph);
  const address = search.value;
  const url = "http://localhost:3000/weather?address=" + address;
  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        message1.textContent = data.error;
      } else {
        message1.innerHTML = "Location is " + data.location;
        message2.innerHTML = "Time: " + data.forecastresponse.time;
        message3.innerHTML =
          "Temperature: " + data.forecastresponse.temperature + " &#8451;";
        message4.innerHTML =
          "Precipitation: " + data.forecastresponse.precipitation;
        message5.innerHTML = "Humidity: " + data.forecastresponse.humidity;
      }
    });
  });
  weatherForm.reset();
});

const successCallback = (position) => {
  const longitude = position.coords.longitude;
  const latitude = position.coords.latitude;
  const url1 =
    "http://localhost:3000/currentPlace?longitude=" +
    longitude +
    "&latitude=" +
    latitude;
  const url2 =
    "http://localhost:3000/currentWeather?longitude=" +
    longitude +
    "&latitude=" +
    latitude;
  addressGet(url1);
  weatherGet(url2);
};

const addressGet = (url) => {
  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        message6.innerHTML = data.error;
      } else {
        message6.innerHTML = "Location is " + data.currentplace;
      }
    });
  });
};
const weatherGet = (url) => {
  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        message7.innerHTML = data.error;
      } else {
        message7.innerHTML = "Time: " + data.forecastresponse.time;
        message8.innerHTML =
          "Temperature: " + data.forecastresponse.temperature + " &#8451;";
        message9.innerHTML =
          "Precipitation: " + data.forecastresponse.precipitation;
        message10.innerHTML = "Humidity: " + data.forecastresponse.humidity;
        const img = document.createElement("img");
        img.src = data.forecastresponse.weather_icons[0];
        document.getElementById("head").appendChild(img);
        img.style.borderRadius = "10px";
      }
    });
  });
};

const errorCallback = (error) => {
  console.error(error);
};

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
