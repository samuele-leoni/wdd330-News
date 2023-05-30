function weatherTemplate(weatherData, metric) {
    const iconsrc = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`;
    const desc = weatherData.weather[0].description;

    return `<img id="weather-icon" src="${iconsrc}" alt="${desc}"><span id="temperature">${weatherData.main.temp.toFixed(0)}${metric?"°C":"°F"}</span>`;
}

export default class Weather {
    constructor(dataSource) {
        this.weatherData = {};
        this.dataSource = dataSource;
    }

    async init(selector, city = "London", metric = false) {
        this.weatherData = await this.dataSource.getCurrentWeather(city, metric);
        this.renderWeather(selector, metric);
    }

    async initByCoords(selector, citySelector, lat = 0, long = 0, metric = false) {
        this.weatherData = await this.dataSource.getCurrentWeatherByCoords(lat, long, metric);
        citySelector.value = this.weatherData.name;
        this.renderWeather(selector, metric);
    }

    getWeatherUnit() {
        return this.unit;
    }

    renderWeather(selector, metric) {
        const element = document.querySelector(selector);
        element.innerHTML = "";
        element.insertAdjacentHTML(
            "afterBegin",
            weatherTemplate(this.weatherData, metric)
        );
    }
}