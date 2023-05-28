function weatherTemplate(weatherData) {
    const iconsrc = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`;
    const desc = weatherData.weather[0].description;

    return `<img id="weather-icon" src="${iconsrc}" alt="${desc}"><span id="temperature">${weatherData.main.temp.toFixed(0)}°C</span>`;
}

export default class Weather {
    constructor(dataSource) {
        this.weatherData = {};
        this.dataSource = dataSource;
    }

    async init(selector, city, metric=false) {
        this.weatherData = await this.dataSource.getCurrentWeather(city, metric);
        this.renderWeather(selector);
    }

    renderWeather(selector) {
        const element = document.querySelector(selector);
        element.innerHTML = "";
        element.insertAdjacentHTML(
            "afterBegin",
            weatherTemplate(this.weatherData)
        );
    }
}