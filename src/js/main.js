import { loadHeaderFooter } from "./utils.mjs";
import Weather from "./Weather.mjs";
import WeatherServices from "./WeatherServices.mjs";
import News from "./News.mjs";
import NewsServices from "./NewsServices.mjs";

loadHeaderFooter();

const weatherDataSource = new WeatherServices();

let weatherLocation = document.querySelector("#weather-location-input");

const weatherLocationButtonCity = document.querySelector("#weather-location-search-button");
const weatherLocationButton = document.querySelector("#weather-location-button");

const weather = new Weather(weatherDataSource, true);

navigator.geolocation.getCurrentPosition(async (position) => {
    await weather.initByCoords("#weather-container", weatherLocation, position.coords.latitude, position.coords.longitude, true, true);
});

if(weatherLocation.value === "") {
    weatherLocation.value = "London";
}

weatherLocationButton.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
        await weather.initByCoords("#weather-container", weatherLocation, position.coords.latitude, position.coords.longitude, true, true);
    });
});

weatherLocationButtonCity.addEventListener("click", () => {
    weather.init("#weather-container", weatherLocation.value, true);
});

weather.init("#weather-container", weatherLocation.value, true);

const newsDataSource = new NewsServices();

const news = new News(newsDataSource);

news.init("#news-container");