import Weather from "./Weather.mjs";
import WeatherServices from "./WeatherServices.mjs";

const dataSource = new WeatherServices();

let location = document.querySelector("#weather-location-input");

let metric = JSON.parse(localStorage.getItem("metric"));

if(metric === null) {
    metric = true;
}

const locationButtonCity = document.querySelector("#weather-location-search-button");
const locationButton = document.querySelector("#weather-location-button");
const metricButton = document.querySelector("#unit-celsius");
const imperialButton = document.querySelector("#unit-fahrenheit");

const weather = new Weather(dataSource);

navigator.geolocation.getCurrentPosition(async (position) => {
    await weather.initByCoords("#weather-container", location, position.coords.latitude, position.coords.longitude, metric, true);
});

if(location.value === "") {
    location.value = "London";
}

locationButton.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
        await weather.initByCoords("#weather-container", location, position.coords.latitude, position.coords.longitude, metric, true);
    });
});

locationButtonCity.addEventListener("click", () => {
    weather.init("#weather-container", location.value, metric);
});

weather.init("#weather-container", location.value, metric);

metricButton.addEventListener("click", async () => {
    metric = true;
    localStorage.setItem("metric", JSON.stringify(metric));
    await weather.init("#weather-container", location.value, metric);
});

imperialButton.addEventListener("click", async () => {
    metric = false;
    localStorage.setItem("metric", JSON.stringify(metric));
    await weather.init("#weather-container", location.value, metric);
});