function newsTemplate(newsData) {
    const dateTime = new Date(newsData.webPublicationDate).toUTCString();
    return `<div class="news-element">
        <p class="small-text">${dateTime}</p>
        <h3>${newsData.webTitle}</h3>
        <p class="small-text">${newsData.sectionName}</p>
        <a href="${newsData.webUrl}">Read More</a>
    </div>`;
}

export default class News {
    constructor(dataSource) {
        this.newsData = {};
        this.dataSource = dataSource;
    }

    async init(selector, page=1, filters={}) {
        this.newsData = await this.dataSource.getNews(page, filters);
        this.renderNews(selector);
    }

    renderNews(selector) {
        const element = document.querySelector(selector);
        element.innerHTML = "";
        for (let i = 0; i < this.newsData.length; i++) {
            element.insertAdjacentHTML(
                "afterBegin",
                newsTemplate(this.newsData[i])
            );
        }
    }
}