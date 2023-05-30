const baseURL = import.meta.env.VITE_WEATHER_BASE_URL;
const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
async function convertToJson(res) {
    const data = await res.json();
    if (res.ok) {
        return data;
    } else {
        throw { name: "servicesError", message: data }
    }
}

export default class WeatherServices {
    constructor() {
    }
    async getCurrentWeather(city, metric) {
        const response = await fetch(`${baseURL}weather?q=${city}&appid=${apiKey}&units=${metric? "metric" : "imperial"}`);
        const data = await convertToJson(response);
        return data;
    }
    async getCurrentWeatherByCoords(lat, lon, metric) {
        const response = await fetch(`${baseURL}weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${metric? "metric" : "imperial"}`);
        const data = await convertToJson(response);
        return data;
    }
}