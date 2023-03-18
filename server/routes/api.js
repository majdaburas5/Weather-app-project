const express = require("express");
const router = express.Router();
const axios = require("axios");
const API_KEY = "9df1f2b6c11e188d4e33502f53a60686";
const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?q=`;

const Weather = require("../models/weatherModel");

const getWeatherByCityName = function (cityName) {
  return axios
    .get(`${WEATHER_URL}${cityName}&APPID=${API_KEY}&units=metric`)
    .then((result) => {
      let data = result.data;
      let newCity = new Weather({
        name: data.name,
        temperature: data.main.temp,
        condition: data.weather[0].main,
        conditionPic: data.weather[0].icon,
      });
      return newCity;
    });
};

router.get("/getWeather/:cityName", function (req, res) {
  let cityName = req.params.cityName;
  getWeatherByCityName(cityName).then((city) => {
    res.send(city);
  });
});

router.get("/getCityData", function (req, res) {
  Weather.find({}).then((cityData) => res.send(cityData));
});

router.post("/addNewCity", function (req, res) {
  let cityName = req.body?.name;
  getWeatherByCityName(cityName).then((city) => {
    city.save();
    res.send(city);
  });
});

router.delete("/deleteCity/:cityName", function (req, res) {
  let cityName = req.params.cityName;
  Weather.findOneAndDelete({ name: cityName }).then((deleteCity) =>
    res.send(deleteCity)
  );
});

module.exports = router;
