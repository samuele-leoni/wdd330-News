function newsTemplate(newsData) {
    const dateTime = new Date(newsData.publishedAt).toLocaleString();
    const author = newsData.author ? newsData.author : "Unknown Author";
    return `<div class="news-element">
        <p class="small-text">${dateTime}</p>
        <h3>${newsData.title}</h3>
        <p>${newsData.description}</p>
        <p class="small-text">${author}</p>
        <a href="${newsData.url}">Read More</a>
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