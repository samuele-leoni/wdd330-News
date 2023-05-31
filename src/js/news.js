
import News from "./News.mjs";
import NewsServices from "./NewsServices.mjs";

const dataSource = new NewsServices();

const news = new News(dataSource);

news.init("#news-container");

/* News Navigation */

const previousButton = document.querySelector("#news-navigation-previous");
const nextButton = document.querySelector("#news-navigation-next");
const pageNumber = document.querySelector("#news-navigation-input");
const pageChangeButton = document.querySelector("#goto-page");
pageNumber.value = 1;

previousButton.addEventListener("click", () => {
    if (parseInt(pageNumber.value) > 1) {
        pageNumber.value = parseInt(pageNumber.value) - 1;
        news.init("#news-container", pageNumber.value);
    }
});

nextButton.addEventListener("click", () => {
    pageNumber.value = parseInt(pageNumber.value) + 1;
    news.init("#news-container", pageNumber.value);
});

pageChangeButton.addEventListener("click", () => {
    news.init("#news-container", pageNumber.value);
});

/* News Filters */

const searchButton = document.querySelector("#news-search-button");
const searchInput = document.querySelector("#news-search-input");
const applyFiltersButton = document.querySelector("#apply-filters");
const sectionFilter = document.querySelector("#section-filter");
const fromDateFilter = document.querySelector("#from-date-filter");
const toDateFilter = document.querySelector("#to-date-filter");
const orderByFilter = document.querySelector("#order-by-filter");
const showFiltersButton = document.querySelector("#show-filters-button");
const filtersDiv = document.querySelector("#news-filters");

showFiltersButton.addEventListener("click", () => {

    filtersDiv.style.display = filtersDiv.style.display === "none" ? "block" : "none";
    showFiltersButton.textContent = showFiltersButton.textContent === "Show Filters" ? "Hide Filters" : "Show Filters";
});

function showFilterDiv(x) {
    if (x.matches) {
        filtersDiv.style.display = "flex";
    } else {
        showFiltersButton.textContent = "Show Filters"
        filtersDiv.style.display = "none";
    }
}

var x = window.matchMedia("(min-width: 50em)")
showFilterDiv(x)
x.addEventListener("change", showFilterDiv)

const filters = {}

searchButton.addEventListener("click", () => {
    filters.q = searchInput.value;
    pageNumber.value = 1;
    news.init("#news-container", pageNumber.value, filters);
});

applyFiltersButton.addEventListener("click", () => {
    if (sectionFilter.value) {
        filters.section = sectionFilter.value;
    }
    if (fromDateFilter.value) {
        filters.fromDate = fromDateFilter.value;
    }
    if (toDateFilter.value) {
        filters.toDate = toDateFilter.value;
    }
    if (orderByFilter.value) {
        if (orderByFilter.value === "none") {
            delete filters.orderBy;
        }
        else {
            filters.orderBy = orderByFilter.value;
        }
    }
    pageNumber.value = 1;
    news.init("#news-container", pageNumber.value, filters);
});
