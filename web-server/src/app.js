const path = require("path");

const express = require("express");

const hbs = require("hbs");
const { dirname } = require("path");

const app = express();

const publicDirectoryPath = path.join(__dirname, "../public");

const viewsPath = path.join(__dirname, "../templates/views");

const partialPath = path.join(__dirname, "../templates/partials");

const request = require("request");

const geolocation = require("./utils/geocode");

const forecast = require("./utils/forecast");

const place = require("./utils/placename");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    person: "Harsh Tripathi",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) res.send({ error: "Plz fill the address" });
  else {
    geolocation(
      req.query.address,
      (error, { latitude, longitude, location } = {}) => {
        if (error) return res.send(error);
        forecast(latitude, longitude, (error, forecastresponse) => {
          if (error) {
            return res.send(error);
          }
          res.send({ location, forecastresponse });
        });
      }
    );
  }
});

app.get("/currentWeather", (req, res) => {
  if (!req.query.latitude || !req.query.longitude) {
    res.send({ error: "Not found" });
  } else {
    forecast(
      req.query.latitude,
      req.query.longitude,
      (error, forecastresponse) => {
        if (error) {
          return res.send(error);
        }
        res.send({ forecastresponse });
      }
    );
  }
});

app.get("/currentPlace", (req, res) => {
  if (!req.query.longitude || !req.query.latitude)
    res.send({ error: "Not found" });
  else {
    place(req.query.longitude, req.query.latitude, (error, currentplace) => {
      if (error) {
        return res.send(error);
      }
      res.send({ currentplace });
    });
  }
});

app.get("*", (req, res) => {
  res.render("404", {
    title: 404,
    person: "Harsh Tripathi",
  });
});

app.listen(3000, () => {
  console.log("Server is running");
});
