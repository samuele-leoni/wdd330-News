import { loadHeaderFooter } from "./utils.mjs";
import Weather from "./Weather.mjs";
import WeatherServices from "./WeatherServices.mjs";

const dataSource = new WeatherServices();

let weatherLocation = document.querySelector("#weather-location-input");

const weatherLocationButton = document.querySelector("#weather-location-button");

const weather = new Weather(dataSource, true);

// TODO: Will need this later after implementing the location permission
if(weatherLocation.value === "") {
    weatherLocation.value = "London";
}

weatherLocationButton.addEventListener("click", () => {
    weather.init("#weather-container", weatherLocation.value, true);
});

weather.init("#weather-container", weatherLocation.value, true);

loadHeaderFooter();