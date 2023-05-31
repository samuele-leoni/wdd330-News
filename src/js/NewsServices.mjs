import { filterBuilder } from "./utils.mjs";
import { convertFilterString } from "./utils.mjs";

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
    async getNews(page, filters) {
        let filterString = "";
        for (const filter in filters) {
            const filterStr = convertFilterString(filter);
            filterString += filterBuilder(filterStr, filters[filter]);
        }
        const url = `${baseURL}search?page=${page}${filterString}&api-key=${apiKey}`;
        const response = await fetch(url);
        const data = await convertToJson(response);
        return data.response.results;
    }

}