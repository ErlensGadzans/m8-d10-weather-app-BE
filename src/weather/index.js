const express = require("express");
const axios = require("axios");

const weatherApiRouter = express.Router();

weatherApiRouter.get("/city", async (req, res, next) => {
  try {
    await axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=riga&appid=${process.env.WEATHER_API_KEY}`
      )
      .then((response) => res.send(response.data));
  } catch (error) {
    console.log(error);
    next(error);
  }
});
module.exports = weatherApiRouter;
