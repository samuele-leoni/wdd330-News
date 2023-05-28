const baseURL = import.meta.env.VITE_NEWS_BASE_URL;
const apiKey = import.meta.env.VITE_NEWS_API_KEY;
async function convertToJson(res) {
    const data = await res.json();
    if (res.ok) {
        return data;
    } else {
        throw { name: "servicesError", message: data }
    }
}

export default class NewsServices {
    constructor() {
    }
    async getRecentNews() {
        const response = await fetch(`${baseURL}top-headlines?country=us&apiKey=${apiKey}`);
        const data = await convertToJson(response);
        console.log(data);
        return data.articles;
    }
}