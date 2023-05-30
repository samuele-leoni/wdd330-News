import { loadHeaderFooter } from "./utils.mjs";
import Weather from "./Weather.mjs";
import WeatherServices from "./WeatherServices.mjs";
import News from "./News.mjs";
import NewsServices from "./NewsServices.mjs";

loadHeaderFooter();

/*
    WEATHER
*/

const weatherDataSource = new WeatherServices();

let weatherLocation = document.querySelector("#weather-location-input");

let metric = JSON.parse(localStorage.getItem("metric"));

if(metric === null) {
    metric = true;
}

const weatherLocationButtonCity = document.querySelector("#weather-location-search-button");
const weatherLocationButton = document.querySelector("#weather-location-button");
const weatherMetricButton = document.querySelector("#unit-celsius");
const weatherImperialButton = document.querySelector("#unit-fahrenheit");

const weather = new Weather(weatherDataSource);

navigator.geolocation.getCurrentPosition(async (position) => {
    await weather.initByCoords("#weather-container", weatherLocation, position.coords.latitude, position.coords.longitude, metric, true);
});

if(weatherLocation.value === "") {
    weatherLocation.value = "London";
}

weatherLocationButton.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
        await weather.initByCoords("#weather-container", weatherLocation, position.coords.latitude, position.coords.longitude, metric, true);
    });
});

weatherLocationButtonCity.addEventListener("click", () => {
    weather.init("#weather-container", weatherLocation.value, metric);
});

weather.init("#weather-container", weatherLocation.value, metric);

weatherMetricButton.addEventListener("click", async () => {
    metric = true;
    localStorage.setItem("metric", JSON.stringify(metric));
    await weather.init("#weather-container", weatherLocation.value, metric);
});

weatherImperialButton.addEventListener("click", async () => {
    metric = false;
    localStorage.setItem("metric", JSON.stringify(metric));
    await weather.init("#weather-container", weatherLocation.value, metric);
});

/*
    NEWS
*/

const newsDataSource = new NewsServices();

const news = new News(newsDataSource);

news.init("#news-container");

