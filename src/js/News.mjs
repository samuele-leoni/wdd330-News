function newsTemplate(newsData) {
    const dateTime = new Date(newsData.webPublicationDate).toLocaleString();
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

    async init(selector) {
        this.newsData = await this.dataSource.getRecentNews();
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